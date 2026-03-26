import type { Meta, StoryObj } from "@storybook/react";
import ExpandableTable from "@/components/shared/table/ExpandableTable";
import type { ColumnDef, ExpandableRow } from "@/components/shared/table/types";

interface PortfolioItem {
  id: string;
  name: string;
  value: number;
  allocation: string;
  children?: PortfolioItem[];
  dotColor?: string;
}

const meta = {
  title: "Components/Tables/ExpandableTable",
  component: ExpandableTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ExpandableTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Fixtures ────────────────────────────────────────────────────────────────
const portfolioData: PortfolioItem[] = [
  {
    id: "equity",
    name: "Equity",
    value: 500000,
    allocation: "50%",
    dotColor: "#2563eb",
    children: [
      {
        id: "large-cap",
        name: "Large Cap",
        value: 300000,
        allocation: "30%",
        dotColor: "#3b82f6",
        children: [
          { id: "hdfc", name: "HDFC Bank", value: 150000, allocation: "15%", dotColor: "#60a5fa" },
          { id: "infy", name: "Infosys", value: 100000, allocation: "10%", dotColor: "#60a5fa" },
          { id: "tcs", name: "TCS", value: 50000, allocation: "5%", dotColor: "#60a5fa" },
        ],
      },
      {
        id: "mid-cap",
        name: "Mid Cap",
        value: 150000,
        allocation: "15%",
        dotColor: "#7c3aed",
        children: [
          { id: "wipro", name: "Wipro", value: 75000, allocation: "7.5%", dotColor: "#a78bfa" },
          { id: "hcl", name: "HCL Tech", value: 75000, allocation: "7.5%", dotColor: "#a78bfa" },
        ],
      },
      {
        id: "small-cap",
        name: "Small Cap",
        value: 50000,
        allocation: "5%",
        dotColor: "#dc2626",
        children: [
          { id: "other", name: "Other Holdings", value: 50000, allocation: "5%", dotColor: "#fca5a5" },
        ],
      },
    ],
  },
  {
    id: "fixed-income",
    name: "Fixed Income",
    value: 300000,
    allocation: "30%",
    dotColor: "#10b981",
    children: [
      {
        id: "govt-bonds",
        name: "Government Securities",
        value: 150000,
        allocation: "15%",
        dotColor: "#34d399",
        children: [
          { id: "10yr", name: "10Y GoSec", value: 100000, allocation: "10%", dotColor: "#6ee7b7" },
          { id: "5yr", name: "5Y GoSec", value: 50000, allocation: "5%", dotColor: "#6ee7b7" },
        ],
      },
      {
        id: "corp-bonds",
        name: "Corporate Bonds",
        value: 150000,
        allocation: "15%",
        dotColor: "#059669",
      },
    ],
  },
  {
    id: "alternatives",
    name: "Alternatives",
    value: 200000,
    allocation: "20%",
    dotColor: "#f59e0b",
    children: [
      {
        id: "gold",
        name: "Gold",
        value: 100000,
        allocation: "10%",
        dotColor: "#fbbf24",
      },
      {
        id: "reits",
        name: "REITs",
        value: 100000,
        allocation: "10%",
        dotColor: "#f59e0b",
      },
    ],
  },
];

const columns: ColumnDef<PortfolioItem>[] = [
  { id: "name", header: "Asset Class" },
  { id: "value", header: "Value (₹)", align: "right" },
  { id: "allocation", header: "Allocation %", align: "center" },
];

// ── Stories ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    columns,
    data: portfolioData,
    rowKey: "id",
  },
};

export const Expanded: Story = {
  args: {
    columns,
    data: portfolioData,
    rowKey: "id",
    defaultExpandedIds: ["equity", "large-cap", "fixed-income"],
  },
  parameters: {
    docs: {
      description: {
        story: "ExpandableTable with specific rows expanded by default.",
      },
    },
  },
};

export const WithCustomFormatting: Story = {
  args: {
    columns: [
      { id: "name", header: "Asset Class" },
      {
        id: "value",
        header: "Portfolio Value",
        align: "right",
        cell: (row) => {
          const val = row.value as number;
          return `₹${val.toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;
        },
      },
      {
        id: "allocation",
        header: "Weight",
        align: "center",
        cell: (row) => row.allocation as string,
      },
    ],
    data: portfolioData,
    rowKey: "id",
  },
  parameters: {
    docs: {
      description: {
        story: "ExpandableTable with custom formatting for better data presentation.",
      },
    },
  },
};

export const SimpleHierarchy: Story = {
  args: {
    columns: [
      { id: "name", header: "Category" },
      { id: "value", header: "Count", align: "right" },
    ],
    data: [
      {
        id: "tech",
        name: "Technology",
        value: 15,
        allocation: "",
        dotColor: "#2563eb",
        children: [
          { id: "soft", name: "Software", value: 8, allocation: "", dotColor: "#3b82f6" },
          { id: "hard", name: "Hardware", value: 7, allocation: "", dotColor: "#3b82f6" },
        ],
      },
      {
        id: "finance",
        name: "Finance",
        value: 12,
        allocation: "",
        dotColor: "#10b981",
        children: [
          { id: "banking", name: "Banking", value: 7, allocation: "", dotColor: "#34d399" },
          { id: "trading", name: "Trading", value: 5, allocation: "", dotColor: "#34d399" },
        ],
      },
    ],
    rowKey: "id",
  },
  parameters: {
    docs: {
      description: {
        story: "Simple two-level hierarchy with minimal columns.",
      },
    },
  },
};

export const DeepHierarchy: Story = {
  args: {
    columns,
    data: [
      {
        id: "root",
        name: "Portfolio",
        value: 1000000,
        allocation: "100%",
        dotColor: "#000000",
        children: [
          {
            id: "level1-a",
            name: "Stocks",
            value: 500000,
            allocation: "50%",
            dotColor: "#2563eb",
            children: [
              {
                id: "level2-a1",
                name: "Indian",
                value: 300000,
                allocation: "30%",
                dotColor: "#3b82f6",
                children: [
                  { id: "level3-a1a", name: "Large Cap", value: 200000, allocation: "20%", dotColor: "#60a5fa" },
                  { id: "level3-a1b", name: "Mid Cap", value: 100000, allocation: "10%", dotColor: "#60a5fa" },
                ],
              },
              {
                id: "level2-a2",
                name: "International",
                value: 200000,
                allocation: "20%",
                dotColor: "#3b82f6",
              },
            ],
          },
          {
            id: "level1-b",
            name: "Bonds",
            value: 400000,
            allocation: "40%",
            dotColor: "#10b981",
          },
          {
            id: "level1-c",
            name: "Cash",
            value: 100000,
            allocation: "10%",
            dotColor: "#f59e0b",
          },
        ],
      },
    ],
    rowKey: "id",
    defaultExpandedIds: ["root", "level1-a"],
  },
  parameters: {
    docs: {
      description: {
        story: "ExpandableTable demonstrating deep hierarchical nesting (4 levels).",
      },
    },
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    rowKey: "id",
    emptyMessage: "No portfolio data available.",
  },
  parameters: {
    docs: {
      description: {
        story: "ExpandableTable with empty state.",
      },
    },
  },
};

export const SectorAllocation: Story = {
  args: {
    columns: [
      { id: "name", header: "Sector", width: "45%" },
      {
        id: "value",
        header: "Holdings",
        align: "right",
        width: "27.5%",
        cell: (row) => {
          const val = row.value as number;
          return `₹${val.toLocaleString("en-IN")}`;
        },
      },
      {
        id: "allocation",
        header: "%",
        align: "center",
        width: "27.5%",
      },
    ],
    data: [
      {
        id: "it",
        name: "Information Technology",
        value: 250000,
        allocation: "25%",
        dotColor: "#2563eb",
        children: [
          { id: "it-soft", name: "Software Services", value: 150000, allocation: "15%", dotColor: "#3b82f6" },
          { id: "it-hard", name: "IT Hardware", value: 100000, allocation: "10%", dotColor: "#3b82f6" },
        ],
      },
      {
        id: "finance",
        name: "Financials",
        value: 300000,
        allocation: "30%",
        dotColor: "#10b981",
        children: [
          { id: "fin-bank", name: "Banks", value: 200000, allocation: "20%", dotColor: "#34d399" },
          { id: "fin-other", name: "Other Financial", value: 100000, allocation: "10%", dotColor: "#34d399" },
        ],
      },
      {
        id: "cons",
        name: "Consumer",
        value: 200000,
        allocation: "20%",
        dotColor: "#f59e0b",
        children: [
          { id: "cons-disc", name: "Consumer Discretionary", value: 120000, allocation: "12%", dotColor: "#fbbf24" },
          { id: "cons-staple", name: "Consumer Staples", value: 80000, allocation: "8%", dotColor: "#fbbf24" },
        ],
      },
    ],
    rowKey: "id",
    defaultExpandedIds: ["it", "finance", "cons"],
  },
  parameters: {
    docs: {
      description: {
        story: "Sector-wise portfolio allocation with expandable sub-sectors.",
      },
    },
  },
};

export const FullyExpanded: Story = {
  args: {
    columns,
    data: portfolioData,
    rowKey: "id",
    defaultExpandedIds: ["equity", "large-cap", "mid-cap", "small-cap", "fixed-income", "govt-bonds", "corp-bonds", "alternatives"],
  },
  parameters: {
    docs: {
      description: {
        story: "ExpandableTable with all rows expanded by default.",
      },
    },
  },
};

export const InteractiveExpansion: Story = {
  args: {
    columns,
    data: portfolioData,
    rowKey: "id",
    defaultExpandedIds: [],
  },
  parameters: {
    docs: {
      description: {
        story: "ExpandableTable with no rows expanded by default. Users can expand/collapse manually.",
      },
    },
  },
};
