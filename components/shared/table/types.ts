export interface PortfolioRow {
  name: string;
  totalValue?: string;
  current?: string;
  netFlow?: string;
  gainLoss?: string;
  xirr?: string;
  children?: PortfolioRow[];
}
import { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";

export const columns: ColumnDef<PortfolioRow>[] = [
  {
    accessorKey: "name",
    header: "Members",
  },
  {
    accessorKey: "totalValue",
    header: "Total Family Value",
  },
  {
    accessorKey: "current",
    header: "Current",
  },
  {
    accessorKey: "netFlow",
    header: "Net Flow",
  },
  {
    accessorKey: "gainLoss",
    header: "Gain Loss",
  },
  {
    accessorKey: "xirr",
    header: "XIRR",
  },
];


// ─────────────────────────────────────────────────────────────────────────────
// COLUMN DEFINITION
// ─────────────────────────────────────────────────────────────────────────────

export interface ColumnDef<TRow> {
  /** Unique key — must match a key in TRow or be a custom id */
  id: string;
  /** Header label */
  header: string;
  /** Text alignment for header + cells */
  align?: "left" | "right" | "center";
  /** Width hint e.g. "180px", "1fr" */
  width?: string;
  /**
   * How to render the cell value.
   * Return a string for plain text, or ReactNode for custom content.
   * If omitted, falls back to String(row[id]).
   */
  cell?: (row: TRow, depth: number) => ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// SIMPLE TABLE
// ─────────────────────────────────────────────────────────────────────────────

export interface SimpleTableProps<TRow extends object> {
  columns: ColumnDef<TRow>[];
  data: TRow[];
  /** Optional: show zebra striping */
  striped?: boolean;
  /** Optional: override empty state message */
  emptyMessage?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPANDABLE TABLE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Each row can optionally carry sub-rows.
 * The `children` key is reserved for nesting.
 * Depth 0 = Asset Class, Depth 1 = Category, Depth 2 = Security.
 */
export type ExpandableRow<TRow> = TRow & {
  /** Nested child rows (any depth) */
  children?: ExpandableRow<TRow>[];
  /** Optional: color dot shown on the row label (depth 0) */
  dotColor?: string;
};

export interface ExpandableTableProps<TRow extends object> {
  columns: ColumnDef<TRow>[];
  data: ExpandableRow<TRow>[];
  /** Which row ids are expanded by default. Pass [] for all collapsed. */
  defaultExpandedIds?: string[];
  /**
   * Key used to uniquely identify each row.
   * Defaults to "id" if present, otherwise falls back to row index.
   */
  rowKey?: keyof TRow;
  /** Optional: override empty state message */
  emptyMessage?: string;
}