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
