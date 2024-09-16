import { searchParamsSchema } from "@/components/data-table/lib/validation";
import { SearchParams } from "@/components/data-table/types";
import React, { Suspense } from "react";
import { TableProvider } from "./table/provider";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import Table from "./table/table";

type Props = {
  searchParams: SearchParams;
};

const UsersPage = ({ searchParams }: Props) => {
  const search = searchParamsSchema.parse(searchParams);
  const page = search.page;
  const per_page = search.per_page;
  const start = (page - 1) * per_page;

  const promise = fetch(
    `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${per_page}`,
  ).then((response) => response.json());

  return (
    <>
      <TableProvider>
        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
              shrinkZero
            />
          }
        >
          <Table promise={promise} />
        </Suspense>
      </TableProvider>
    </>
  );
};

export default UsersPage;
