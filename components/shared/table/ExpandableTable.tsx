"use client";

import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  type ColumnDef as TanColumnDef,
  type CellContext,
  type Row,
  type ExpandedState,
} from "@tanstack/react-table";
import { useMemo, useState, useCallback } from "react";
import type { ExpandableTableProps, ColumnDef, ExpandableRow } from "./types";

// ── Convert our ColumnDef → TanStack ColumnDef ────────────────────────────────
function toTanColumns<TRow extends object>(
  cols: ColumnDef<TRow>[]
): TanColumnDef<ExpandableRow<TRow>, unknown>[] {
  return cols.map((col, colIndex) => ({
    id: col.id,
    header: col.header,
    accessorFn: (row: ExpandableRow<TRow>) =>
      (row as Record<string, unknown>)[col.id],

    // ⚠️ Fix: TanStack passes the full CellContext object.
    // We must destructure { row } from it — NOT use the argument directly as row.
    cell: (cellCtx: CellContext<ExpandableRow<TRow>, unknown>) => {
      const { row } = cellCtx;
      const depth = row.depth;
      const original = row.original;

      if (colIndex === 0) {
        return (
          <FirstCell<TRow>
            row={row as Row<ExpandableRow<TRow>>}
            depth={depth}
            original={original}
            col={col}
          />
        );
      }

      return col.cell
        ? col.cell(original as TRow, depth)
        : String((original as Record<string, unknown>)[col.id] ?? "—");
    },
  }));
}

// ── First cell — indent + expand toggle + color dot ───────────────────────────
function FirstCell<TRow extends object>({
  row,
  depth,
  original,
  col,
}: {
  row: Row<ExpandableRow<TRow>>;
  depth: number;
  original: ExpandableRow<TRow>;
  col: ColumnDef<TRow>;
}) {
  const hasChildren = row.getCanExpand();
  const isExpanded = row.getIsExpanded();
  const paddingLeft = 12 + depth * 20;

  const label = col.cell
    ? col.cell(original as TRow, depth)
    : String((original as Record<string, unknown>)[col.id] ?? "—");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        paddingLeft,
        cursor: hasChildren ? "pointer" : "default",
        fontFamily: "Jost, Jost Fallback"
      }}
      onClick={hasChildren ? row.getToggleExpandedHandler() : undefined}
    >
      {/* Color dot — depth 0 only */}
      {depth === 0 && original.dotColor && (
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: 3,
            background: original.dotColor,
            flexShrink: 0,
            fontFamily: "Jost, Jost Fallback",
            display: "inline-block",
          }}
        />
      )}

      {/* Indent guide for depth > 0 */}
      {depth > 0 && (
        <span style={{ color: "#ccc", fontSize: 10, flexShrink: 0, fontFamily: "Jost, Jost Fallback" }}>→</span>
      )}

      {/* Label */}
      <span
        style={{
          fontWeight: depth === 0 ? 700 : depth === 1 ? 600 : 400,
          fontSize: depth === 0 ? 13 : 12,
          color: depth === 0 ? "#222" : depth === 1 ? "#444" : "#666",
          fontFamily:
            depth === 0 ? "Jost, Jost Fallback" : "Jost, Jost Fallback",
          maxWidth: 180,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={String((original as Record<string, unknown>)[col.id] ?? "")}
      >
        {label}
      </span>

      {/* Expand / collapse chevron */}
      {hasChildren && (
        <span
          style={{ marginLeft: 4, color: "#aaa", fontSize: 10, flexShrink: 0, fontFamily: "Jost, Jost Fallback" }}
        >
          {isExpanded ? "▲" : "▼"}
        </span>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ExpandableTable<TRow extends object>({
  columns,
  data,
  defaultExpandedIds = [],
  rowKey,
  emptyMessage = "No data available.",
}: ExpandableTableProps<TRow>) {
  const initialExpanded: ExpandedState = useMemo(() => {
    const state: Record<string, boolean> = {};
    defaultExpandedIds.forEach((id) => {
      state[id] = true;
    });
    return state;
  }, [defaultExpandedIds]);

  const [expanded, setExpanded] = useState<ExpandedState>(initialExpanded);

  const tanColumns = useMemo(
    () => toTanColumns<TRow>(columns),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns]
  );

  const getRowId = useCallback(
    (row: ExpandableRow<TRow>, index: number): string => {
      if (rowKey) {
        return String((row as Record<string, unknown>)[rowKey as string]);
      }
      return String(index);
    },
    [rowKey]
  );

  const table = useReactTable({
    data,
    columns: tanColumns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.children,
    getRowId,
  });

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <table style={styles.table}>
        {/* Header */}
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
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        {/* Body */}
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  ...styles.td,
                  textAlign: "center",
                  color: "#aaa",
                  padding: "24px",
                }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => {
              const depth = row.depth;
              const bg = rowBackground(depth);

              return (
                <tr
                  key={row.id}
                  style={{
                    background: bg,
                    transition: "background 0.15s",
                    borderLeft:
                      depth === 1
                        ? "3px solid #e0e0e0"
                        : depth === 2
                        ? "3px solid #f0f0f0"
                        : "3px solid transparent",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "#f0f6ff")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = bg)
                  }
                >
                  {row.getVisibleCells().map((cell, i) => {
                    const col = columns[i];
                    const value = cell.getValue();
                    const isNegative =
                      typeof value === "string" &&
                      (value as string).startsWith("-");

                    return (
                      <td
                        key={cell.id}
                        style={{
                          ...styles.td,
                          textAlign:
                            col?.align ?? (i === 0 ? "left" : "right"),
                          width: col?.width,
                          paddingTop: depth === 0 ? 14 : 10,
                          paddingBottom: depth === 0 ? 14 : 10,
                          color: isNegative ? "#e53935" : styles.td.color,
                          fontWeight: depth === 0 && i !== 0 ? 600 : 400,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function rowBackground(depth: number): string {
  if (depth === 0) return "#ffffff";
  if (depth === 1) return "#fafafa";
  return "#f5f5f3";
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    minWidth: 600,
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
    padding: "11px 16px",
    fontSize: 12,
    color: "#444",
    borderBottom: "1px solid #f0f0f0",
    fontFamily: "Jost, Jost Fallback",
  },
} as const;