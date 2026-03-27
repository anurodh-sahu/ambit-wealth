import type { Meta, StoryObj } from "@storybook/react";
import SimpleTable from "@/components/shared/table/SimpleTable";
import type { ColumnDef } from "@/components/shared/table/types";

interface TestRow {
  id: string;
  name: string;
  value: number;
  status: string;
}

const meta = {
  title: "Components/Tables/SimpleTable",
  component: SimpleTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SimpleTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Fixtures ────────────────────────────────────────────────────────────────
const sampleData: TestRow[] = [
  { id: "1", name: "Apple Inc.", value: 150.25, status: "Active" },
  { id: "2", name: "Microsoft Corp.", value: 380.50, status: "Active" },
  { id: "3", name: "Amazon.com Inc.", value: 170.75, status: "Inactive" },
  { id: "4", name: "Google LLC", value: 140.30, status: "Active" },
  { id: "5", name: "Meta Platforms", value: 320.80, status: "Pending" },
];

const columns: ColumnDef<TestRow>[] = [
  { id: "name", header: "Company Name" },
  { id: "value", header: "Stock Price", align: "right" },
  { id: "status", header: "Status", align: "center" },
];

// ── Stories ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    columns,
    data: sampleData,
  },
};

export const Striped: Story = {
  args: {
    columns,
    data: sampleData,
    striped: true,
  },
  parameters: {
    docs: {
      description: {
        story: "SimpleTable with alternating row colors for better readability.",
      },
    },
  },
};

export const WithCustomFormatting: Story = {
  args: {
    columns: [
      { id: "name", header: "Company" },
      {
        id: "value",
        header: "Stock Price",
        align: "right",
        cell: (row) => `$${(row.value as number).toFixed(2)}`,
      },
      {
        id: "status",
        header: "Status",
        align: "center",
        cell: (row) => {
          const status = row.status as string;
          const colors: Record<string, string> = {
            Active: "✓ Active",
            Inactive: "✗ Inactive",
            Pending: "⏳ Pending",
          };
          return colors[status] || status;
        },
      },
    ],
    data: sampleData,
  },
  parameters: {
    docs: {
      description: {
        story: "SimpleTable with custom cell formatters for better data presentation.",
      },
    },
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: "No companies found.",
  },
  parameters: {
    docs: {
      description: {
        story: "SimpleTable with empty state and custom message.",
      },
    },
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: "No data available. Please try again later.",
  },
};

export const PortfolioHoldings: Story = {
  args: {
    columns: [
      { id: "name", header: "Security Name", width: "40%" },
      {
        id: "value",
        header: "Current Value",
        align: "right",
        width: "30%",
        cell: (row) => {
          const val = row.value as number;
          return `₹${val.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
        },
      },
      {
        id: "status",
        header: "Action",
        align: "center",
        width: "30%",
        cell: (row) => {
          const status = row.status as string;
          const actionButtons: Record<string, string> = {
            Active: "Sell",
            Inactive: "Buy",
            Pending: "Pending",
          };
          return actionButtons[status] || "—";
        },
      },
    ],
    data: [
      { id: "1", name: "HDFC Bank Limited", value: 52840.50, status: "Active" },
      { id: "2", name: "Infosys Limited", value: 38250.75, status: "Active" },
      { id: "3", name: "ICICI Bank Limited", value: 28940.25, status: "Active" },
      { id: "4", name: "Wipro Limited", value: 15620.00, status: "Inactive" },
    ],
    striped: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Portfolio holdings with custom formatting and striped rows.",
      },
    },
  },
};

export const LargeDataset: Story = {
  args: {
    columns: [
      { id: "name", header: "Item", width: "50%" },
      { id: "value", header: "Amount", align: "right", width: "25%" },
      { id: "status", header: "Status", align: "center", width: "25%" },
    ],
    data: Array.from({ length: 25 }, (_, i) => ({
      id: String(i + 1),
      name: `Item ${i + 1}`,
      value: Math.floor(Math.random() * 10000),
      status: ["Active", "Inactive", "Pending"][Math.floor(Math.random() * 3)],
    })),
    striped: true,
  },
  parameters: {
    docs: {
      description: {
        story: "SimpleTable with a larger dataset demonstrating scrolling capability.",
      },
    },
  },
};

export const WithNegativeValues: Story = {
  args: {
    columns: [
      { id: "name", header: "Transaction" },
      {
        id: "value",
        header: "Amount",
        align: "right",
        cell: (row) => {
          const val = row.value as number;
          return `₹${val.toLocaleString("en-IN")}`;
        },
      },
      { id: "status", header: "Type" },
    ],
    data: [
      { id: "1", name: "Dividend Income", value: 500, status: "Credit" },
      { id: "2", name: "Commission Fee", value: -50, status: "Debit" },
      { id: "3", name: "Mutual Fund Purchase", value: -2500, status: "Debit" },
      { id: "4", name: "Interest Earned", value: 125, status: "Credit" },
    ],
    striped: true,
  },
  parameters: {
    docs: {
      description: {
        story: "SimpleTable displaying financial transactions with negative values shown in red.",
      },
    },
  },
};

export const CompactLayout: Story = {
  args: {
    columns: [
      { id: "name", header: "Name", width: "60%" },
      { id: "value", header: "Value", align: "right", width: "40%" },
    ],
    data: sampleData.slice(0, 3),
  },
  parameters: {
    docs: {
      description: {
        story: "Compact SimpleTable with minimal columns.",
      },
    },
  },
};
