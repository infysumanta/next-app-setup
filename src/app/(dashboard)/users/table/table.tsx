/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useMemo } from "react";
import { useTable } from "./provider";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableFilterField } from "@/components/data-table/types";
import { useDataTable } from "@/components/data-table/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/advanced/data-table-advanced-toolbar";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { TableToolbarActions } from "./toolbal";
import { TableFloatingBar } from "./floating";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
type Props = {
  promise: Promise<any>;
};

// "albumId":1
// "id":1
// "title":"accusamus beatae ad facilis cum similique qui sunt"
// "url":"https://via.placeholder.com/600/92c952"
// "thumbnailUrl":"https://via.placeholder.com/150/92c952"

function getColumns(): ColumnDef<any>[] {
  return [
    {
      id: "albumId",
      accessorKey: "albumId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Album ID" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-2">
            <Button>{row.getValue("albumId")}</Button>
            <Button>{row.getValue("albumId")}</Button>
          </div>
        );
      },
      enableSorting: true,
      enableHiding: false,
    },
    {
      id: "id",
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "title",
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "url",
      accessorKey: "url",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="URL" />
      ),
      cell: ({ row }) => <div>{row.getValue("url")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "thumbnailUrl",
      id: "thumbnailUrl",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Thumbnail URL" />
      ),
      cell: ({ row }) => <div>{row.getValue("thumbnailUrl")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onSelect={console.log}>Edit</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={row.original.label}
                      onValueChange={(value) => {
                        console.log(value);
                      }}
                    ></DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={console.log}>
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
      size: 40,
    },
  ];
}

const Table = ({ promise }: Props) => {
  const { featureFlags, setFeatureFlags } = useTable();

  useEffect(() => {
    setFeatureFlags(["advancedFilter"]);
    setFeatureFlags(["floatingBar"]);
  }, [setFeatureFlags]);

  const data = React.use(promise);
  //   console.log(data, promise);

  const columns = useMemo(() => getColumns(), []);

  const filterFields: DataTableFilterField<any>[] = [
    {
      label: "albumId",
      value: "albumId",
      placeholder: "Search titles",
    },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount: 10,
    filterFields,
    enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
    },
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
  });

  return (
    <DataTable
      table={table}
      floatingBar={
        featureFlags.includes("floatingBar") ? (
          <TableFloatingBar table={table} />
        ) : null
      }
    >
      {featureFlags.includes("advancedFilter") ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <TableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <TableToolbarActions table={table} />
        </DataTableToolbar>
      )}
    </DataTable>
  );
};

export default Table;
