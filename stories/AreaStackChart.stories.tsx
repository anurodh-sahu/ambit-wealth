import type { Meta, StoryObj } from "@storybook/react";
import AreaStackChart, { type AllocationDataPoint } from "@/components/shared/highcharts/area/AreaStackChart";

const meta: Meta<typeof AreaStackChart> = {
  title: "Shared/Charts/AreaStackChart",
  component: AreaStackChart,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f5f5f5" },
        { name: "dark", value: "#111" },
      ],
    },
    layout: "padded",
  },
  argTypes: {
    data: { control: false },
    fromDate: { control: "text" },
    toDate: { control: "text" },
  },
  args: {
    fromDate: "1 - APR '25",
    toDate: "22 - JAN '26",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────────────────────────────────────
// Mock data generators
// ─────────────────────────────────────────────────────────────────────────────

// Generate simple data for demonstration
const generateSimpleData = (): AllocationDataPoint[] => [
  { month: "Jan", cash: 15, fixedIncome: 20, equity: 35, alternate: 30 },
  { month: "", cash: 15, fixedIncome: 20, equity: 35, alternate: 30 },
  { month: "Feb", cash: 14, fixedIncome: 21, equity: 36, alternate: 29 },
  { month: "", cash: 14, fixedIncome: 21, equity: 36, alternate: 29 },
  { month: "Mar", cash: 12, fixedIncome: 22, equity: 38, alternate: 28 },
  { month: "", cash: 12, fixedIncome: 22, equity: 38, alternate: 28 },
  { month: "Apr", cash: 10, fixedIncome: 23, equity: 40, alternate: 27 },
  { month: "", cash: 10, fixedIncome: 23, equity: 40, alternate: 27 },
  { month: "May", cash: 10, fixedIncome: 22, equity: 42, alternate: 26 },
  { month: "", cash: 10, fixedIncome: 22, equity: 42, alternate: 26 },
];

// Stable allocation (low volatility)
const generateStableAllocation = (): AllocationDataPoint[] => [
  { month: "Jan", cash: 10, fixedIncome: 20, equity: 30, alternate: 40 },
  { month: "", cash: 10, fixedIncome: 20, equity: 30, alternate: 40 },
  { month: "Feb", cash: 10, fixedIncome: 20, equity: 30, alternate: 40 },
  { month: "", cash: 10, fixedIncome: 20, equity: 30, alternate: 40 },
  { month: "Mar", cash: 10, fixedIncome: 20, equity: 30, alternate: 40 },
  { month: "", cash: 10, fixedIncome: 20, equity: 30, alternate: 40 },
  { month: "Apr", cash: 10, fixedIncome: 20, equity: 30, alternate: 40 },
  { month: "", cash: 10, fixedIncome: 20, equity: 30, alternate: 40 },
  { month: "May", cash: 10, fixedIncome: 20, equity: 30, alternate: 40 },
  { month: "", cash: 10, fixedIncome: 20, equity: 30, alternate: 40 },
];

// Growth-focused allocation (high equity)
const generateGrowthAllocation = (): AllocationDataPoint[] => [
  { month: "Jan", cash: 5, fixedIncome: 10, equity: 55, alternate: 30 },
  { month: "", cash: 5, fixedIncome: 10, equity: 55, alternate: 30 },
  { month: "Feb", cash: 5, fixedIncome: 10, equity: 57, alternate: 28 },
  { month: "", cash: 5, fixedIncome: 10, equity: 57, alternate: 28 },
  { month: "Mar", cash: 5, fixedIncome: 9, equity: 59, alternate: 27 },
  { month: "", cash: 5, fixedIncome: 9, equity: 59, alternate: 27 },
  { month: "Apr", cash: 5, fixedIncome: 8, equity: 61, alternate: 26 },
  { month: "", cash: 5, fixedIncome: 8, equity: 61, alternate: 26 },
  { month: "May", cash: 5, fixedIncome: 7, equity: 63, alternate: 25 },
  { month: "", cash: 5, fixedIncome: 7, equity: 63, alternate: 25 },
];

// Conservative allocation (high fixed income)
const generateConservativeAllocation = (): AllocationDataPoint[] => [
  { month: "Jan", cash: 20, fixedIncome: 50, equity: 15, alternate: 15 },
  { month: "", cash: 20, fixedIncome: 50, equity: 15, alternate: 15 },
  { month: "Feb", cash: 20, fixedIncome: 50, equity: 15, alternate: 15 },
  { month: "", cash: 20, fixedIncome: 50, equity: 15, alternate: 15 },
  { month: "Mar", cash: 20, fixedIncome: 50, equity: 15, alternate: 15 },
  { month: "", cash: 20, fixedIncome: 50, equity: 15, alternate: 15 },
  { month: "Apr", cash: 20, fixedIncome: 50, equity: 15, alternate: 15 },
  { month: "", cash: 20, fixedIncome: 50, equity: 15, alternate: 15 },
  { month: "May", cash: 20, fixedIncome: 50, equity: 15, alternate: 15 },
  { month: "", cash: 20, fixedIncome: 50, equity: 15, alternate: 15 },
];

// Rebalancing with volatility
const generateRebalancingData = (): AllocationDataPoint[] => [
  { month: "Jan", cash: 10, fixedIncome: 30, equity: 35, alternate: 25 },
  { month: "", cash: 12, fixedIncome: 28, equity: 35, alternate: 25 },
  { month: "Feb", cash: 15, fixedIncome: 25, equity: 35, alternate: 25 },
  { month: "", cash: 18, fixedIncome: 22, equity: 35, alternate: 25 },
  { month: "Mar", cash: 20, fixedIncome: 20, equity: 35, alternate: 25 },
  { month: "", cash: 15, fixedIncome: 25, equity: 35, alternate: 25 },
  { month: "Apr", cash: 12, fixedIncome: 28, equity: 35, alternate: 25 },
  { month: "", cash: 10, fixedIncome: 30, equity: 35, alternate: 25 },
  { month: "May", cash: 8, fixedIncome: 32, equity: 35, alternate: 25 },
  { month: "", cash: 10, fixedIncome: 30, equity: 35, alternate: 25 },
];

// ─────────────────────────────────────────────────────────────────────────────
// 1. Default — with default data
// ─────────────────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: "Default (Full Data)",
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Simple data — minimal point count
// ─────────────────────────────────────────────────────────────────────────────
export const SimpleData: Story = {
  name: "Simple Data",
  args: {
    data: generateSimpleData(),
    fromDate: "1 - JAN '25",
    toDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Stable allocation — minimal variance
// ─────────────────────────────────────────────────────────────────────────────
export const StableAllocation: Story = {
  name: "Stable Allocation",
  args: {
    data: generateStableAllocation(),
    fromDate: "1 - JAN '25",
    toDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Growth-focused allocation — high equity
// ─────────────────────────────────────────────────────────────────────────────
export const GrowthAllocation: Story = {
  name: "Growth-Focused Allocation",
  args: {
    data: generateGrowthAllocation(),
    fromDate: "1 - JAN '25",
    toDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Conservative allocation — high fixed income
// ─────────────────────────────────────────────────────────────────────────────
export const ConservativeAllocation: Story = {
  name: "Conservative Allocation",
  args: {
    data: generateConservativeAllocation(),
    fromDate: "1 - JAN '25",
    toDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Rebalancing with volatility
// ─────────────────────────────────────────────────────────────────────────────
export const RebalancingScenario: Story = {
  name: "Rebalancing Scenario",
  args: {
    data: generateRebalancingData(),
    fromDate: "1 - JAN '25",
    toDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. Custom date range
// ─────────────────────────────────────────────────────────────────────────────
export const CustomDateRange: Story = {
  name: "Custom Date Range",
  args: {
    data: generateSimpleData(),
    fromDate: "15 - FEB '25",
    toDate: "20 - JUL '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Quarterly view
// ─────────────────────────────────────────────────────────────────────────────
export const QuarterlyView: Story = {
  name: "Quarterly View",
  args: {
    data: generateSimpleData(),
    fromDate: "1 - Q1 '25",
    toDate: "30 - Q2 '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. Year-to-date view
// ─────────────────────────────────────────────────────────────────────────────
export const YearToDateView: Story = {
  name: "Year-to-Date",
  args: {
    data: generateSimpleData(),
    fromDate: "1 - JAN '25",
    toDate: "TODAY",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. Cash-heavy allocation
// ─────────────────────────────────────────────────────────────────────────────
export const CashHeavyAllocation: Story = {
  name: "Cash-Heavy Allocation",
  args: {
    data: [
      { month: "Jan", cash: 50, fixedIncome: 25, equity: 15, alternate: 10 },
      { month: "", cash: 50, fixedIncome: 25, equity: 15, alternate: 10 },
      { month: "Feb", cash: 48, fixedIncome: 26, equity: 16, alternate: 10 },
      { month: "", cash: 48, fixedIncome: 26, equity: 16, alternate: 10 },
      { month: "Mar", cash: 45, fixedIncome: 28, equity: 17, alternate: 10 },
      { month: "", cash: 45, fixedIncome: 28, equity: 17, alternate: 10 },
      { month: "Apr", cash: 42, fixedIncome: 30, equity: 18, alternate: 10 },
      { month: "", cash: 42, fixedIncome: 30, equity: 18, alternate: 10 },
      { month: "May", cash: 40, fixedIncome: 32, equity: 18, alternate: 10 },
      { month: "", cash: 40, fixedIncome: 32, equity: 18, alternate: 10 },
    ],
    fromDate: "1 - JAN '25",
    toDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. Alternate-focused allocation
// ─────────────────────────────────────────────────────────────────────────────
export const AlternateAllocation: Story = {
  name: "Alternate-Focused Allocation",
  args: {
    data: [
      { month: "Jan", cash: 5, fixedIncome: 10, equity: 25, alternate: 60 },
      { month: "", cash: 5, fixedIncome: 10, equity: 25, alternate: 60 },
      { month: "Feb", cash: 5, fixedIncome: 10, equity: 24, alternate: 61 },
      { month: "", cash: 5, fixedIncome: 10, equity: 24, alternate: 61 },
      { month: "Mar", cash: 5, fixedIncome: 10, equity: 23, alternate: 62 },
      { month: "", cash: 5, fixedIncome: 10, equity: 23, alternate: 62 },
      { month: "Apr", cash: 5, fixedIncome: 10, equity: 22, alternate: 63 },
      { month: "", cash: 5, fixedIncome: 10, equity: 22, alternate: 63 },
      { month: "May", cash: 5, fixedIncome: 10, equity: 21, alternate: 64 },
      { month: "", cash: 5, fixedIncome: 10, equity: 21, alternate: 64 },
    ],
    fromDate: "1 - JAN '25",
    toDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. Balanced allocation with gradual shift
// ─────────────────────────────────────────────────────────────────────────────
export const BalancedWithShift: Story = {
  name: "Balanced with Gradual Shift",
  args: {
    data: [
      { month: "Jan", cash: 12, fixedIncome: 28, equity: 35, alternate: 25 },
      { month: "", cash: 12, fixedIncome: 28, equity: 35, alternate: 25 },
      { month: "Feb", cash: 11, fixedIncome: 27, equity: 36, alternate: 26 },
      { month: "", cash: 11, fixedIncome: 27, equity: 36, alternate: 26 },
      { month: "Mar", cash: 10, fixedIncome: 26, equity: 37, alternate: 27 },
      { month: "", cash: 10, fixedIncome: 26, equity: 37, alternate: 27 },
      { month: "Apr", cash: 9, fixedIncome: 25, equity: 38, alternate: 28 },
      { month: "", cash: 9, fixedIncome: 25, equity: 38, alternate: 28 },
      { month: "May", cash: 8, fixedIncome: 24, equity: 39, alternate: 29 },
      { month: "", cash: 8, fixedIncome: 24, equity: 39, alternate: 29 },
    ],
    fromDate: "1 - JAN '25",
    toDate: "31 - MAY '25",
  },
};
