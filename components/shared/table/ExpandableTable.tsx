"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { PortfolioRow } from "./types";

interface Props {
  data: PortfolioRow[];
  columns: ColumnDef<PortfolioRow>[];
}

export default function ExpandableTable({ data, columns }: Props) {
  const table = useReactTable({
    data,
    columns,
    getSubRows: (row) => row.children,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-custom-200">
      <table className="w-full border-collapse text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-gray-50 border-b border-gray-custom-200"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer select-none px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  <span className="inline-flex items-center gap-1">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <span className="text-gray-custom-300">
                      {{
                        asc: "↑",
                        desc: "↓",
                      }[header.column.getIsSorted() as string] ?? "↕"}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-gray-custom-200">
          {table.getRowModel().rows.map((row) => {
            const isParent = row.depth === 0;
            return (
              <tr
                key={row.id}
                className={
                  isParent
                    ? "bg-white border-b border-gray-custom-200"
                    : "bg-white"
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`px-4 py-3 whitespace-nowrap ${
                      isParent
                        ? "font-semibold text-gray-custom-900"
                        : "text-gray-600"
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
