"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef as TanColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import type { SimpleTableProps, ColumnDef } from "./types";

// ── Convert our ColumnDef → TanStack ColumnDef ────────────────────────────────
function toTanColumns<TRow extends object>(
  cols: ColumnDef<TRow>[]
): TanColumnDef<TRow, unknown>[] {
  return cols.map((col) => ({
    id: col.id,
    header: col.header,
    accessorFn: (row) => (row as Record<string, unknown>)[col.id],
    cell: ({ row }) =>
      col.cell
        ? col.cell(row.original, 0)
        : String((row.original as Record<string, unknown>)[col.id] ?? "—"),
  }));
}

export default function SimpleTable<TRow extends object>({
  columns,
  data,
  striped = false,
  emptyMessage = "No data available.",
}: SimpleTableProps<TRow>) {
  const tanColumns = useMemo(() => toTanColumns(columns), [columns]);

  const table = useReactTable({
    data,
    columns: tanColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ overflowX: "auto", width: "100%", fontFamily: "Jost, Jost Fallback" }}>
      <table style={styles.table}>
        {/* ── Header ── */}
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header, i) => {
                const col = columns[i];
                return (
                  <th
                    key={header.id}
                    style={{
                      ...styles.th,
                      textAlign: col?.align ?? (i === 0 ? "left" : "right"),
                      width: col?.width,
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        {/* ── Body ── */}
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "24px" }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                style={{
                  background: striped && rowIndex % 2 === 1 ? "#f9f9f7" : "#fff",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#f4f6f9")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    striped && rowIndex % 2 === 1 ? "#f9f9f7" : "#fff")
                }
              >
                {row.getVisibleCells().map((cell, i) => {
                  const col = columns[i];
                  return (
                    <td
                      key={cell.id}
                      style={{
                        ...styles.td,
                        textAlign: col?.align ?? (i === 0 ? "left" : "right"),
                        width: col?.width,
                        color:
                          // Red for negative values
                          typeof cell.getValue() === "string" &&
                          String(cell.getValue()).startsWith("-")
                            ? "#e53935"
                            : styles.td.color,
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    minWidth: 500,
    fontFamily: "Jost, Jost Fallback",
  },
  th: {
    padding: "10px 16px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: "#888",
    borderBottom: "1px solid #e8e8e8",
    background: "#fafafa",
    whiteSpace: "nowrap" as const,
  },
  td: {
    padding: "12px 16px",
    fontSize: 13,
    color: "#333",
    borderBottom: "1px solid #f0f0f0",
    fontFamily: "Jost, Jost Fallback",
  },
} as const;