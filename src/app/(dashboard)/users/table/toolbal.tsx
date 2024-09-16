"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

interface TableToolbarActionsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
}

export function TableToolbarActions({ table }: TableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? <>DELETE</> : null}
      <>CREATE</>
      <Button
        variant="outline"
        size="sm"
        onClick={() => console.log("export function")}
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
