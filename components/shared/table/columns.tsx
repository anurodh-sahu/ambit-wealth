import { ColumnDef } from "@tanstack/react-table";
import { PortfolioRow } from "./types";

export const columns: ColumnDef<PortfolioRow>[] = [
  {
    accessorKey: "name",
    header: "Members",
    enableSorting: true,
    cell: ({ row, getValue }) => {
      const isParent = row.getCanExpand();
      return (
        <div
          className=""
          style={{ paddingLeft: isParent ? 0 : `${row.depth * 20}px` }}
        >
          {!isParent && <span className="text-gray-custom-300 text-xs">→</span>}
          {isParent ? (
            <div className="flex items-center gap-2 justify-between">
              <div className="flex-1">{getValue() as string}</div>
              <button
                onClick={row.getToggleExpandedHandler()}
                className="text-gray-custom-400 shrink-0 text-xs"
              >
                {row.getIsExpanded() ? "▼" : "▶"}
              </button>
            </div>
          ) : (
            <span className="flex-1">{getValue() as string}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "totalValue",
    header: "Total Family Value",
    enableSorting: true,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "current",
    header: "Current",
    enableSorting: true,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "netFlow",
    header: "Net Flow",
    enableSorting: true,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "gainLoss",
    header: "Gain Loss",
    enableSorting: true,
    cell: ({ getValue }) => {
      const raw = getValue() as string;
      const num = parseFloat(raw?.replace(/[₹,Cr ]/g, "") ?? "0");
      return (
        <div
          className={`text-right font-medium ${
            num > 0 ? "text-green-500" : num < 0 ? "text-red-500" : ""
          }`}
        >
          {raw}
        </div>
      );
    },
  },
  {
    accessorKey: "xirr",
    header: "XIRR",
    enableSorting: true,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
];
