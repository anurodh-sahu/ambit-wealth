import type { Meta, StoryObj } from "@storybook/react";
import LineChart, { type ChartDataPoint } from "@/components/shared/highcharts/line/LineChart";

const meta: Meta<typeof LineChart> = {
  title: "Shared/Charts/LineChart",
  component: LineChart,
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
    asOnDate: { control: "text" },
  },
  args: {
    asOnDate: "22 - JAN '26",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────────────────────────────────────
// Mock data generators
// ─────────────────────────────────────────────────────────────────────────────

// Simple uptrend data
const generateUptrendData = (): ChartDataPoint[] => [
  { month: "Jan", investedValue: 18.5, marketValue: 19.5 },
  { month: "", investedValue: 18.8, marketValue: 19.8 },
  { month: "Feb", investedValue: 19.2, marketValue: 20.2 },
  { month: "", investedValue: 19.6, marketValue: 20.6 },
  { month: "Mar", investedValue: 20.0, marketValue: 21.0 },
  { month: "", investedValue: 20.4, marketValue: 21.4 },
  { month: "Apr", investedValue: 20.8, marketValue: 21.8 },
  { month: "", investedValue: 21.2, marketValue: 22.2 },
  { month: "May", investedValue: 21.6, marketValue: 22.6 },
];

// Downtrend data
const generateDowntrendData = (): ChartDataPoint[] => [
  { month: "Jan", investedValue: 22.0, marketValue: 23.0 },
  { month: "", investedValue: 21.8, marketValue: 22.8 },
  { month: "Feb", investedValue: 21.4, marketValue: 22.4 },
  { month: "", investedValue: 21.0, marketValue: 22.0 },
  { month: "Mar", investedValue: 20.6, marketValue: 21.6 },
  { month: "", investedValue: 20.2, marketValue: 21.2 },
  { month: "Apr", investedValue: 19.8, marketValue: 20.8 },
  { month: "", investedValue: 19.4, marketValue: 20.4 },
  { month: "May", investedValue: 19.0, marketValue: 20.0 },
];

// Volatile data with sharp movements
const generateVolatileData = (): ChartDataPoint[] => [
  { month: "Jan", investedValue: 20.0, marketValue: 21.0 },
  { month: "", investedValue: 20.5, marketValue: 21.5 },
  { month: "Feb", investedValue: 22.0, marketValue: 23.0 },
  { month: "", investedValue: 20.5, marketValue: 21.5 },
  { month: "Mar", investedValue: 19.0, marketValue: 20.0 },
  { month: "", investedValue: 21.5, marketValue: 22.5 },
  { month: "Apr", investedValue: 22.8, marketValue: 23.8 },
  { month: "", investedValue: 20.2, marketValue: 21.2 },
  { month: "May", investedValue: 21.5, marketValue: 22.5 },
];

// Stable data with minimal change
const generateStableData = (): ChartDataPoint[] => [
  { month: "Jan", investedValue: 20.0, marketValue: 21.0 },
  { month: "", investedValue: 20.1, marketValue: 21.1 },
  { month: "Feb", investedValue: 20.0, marketValue: 21.0 },
  { month: "", investedValue: 20.2, marketValue: 21.2 },
  { month: "Mar", investedValue: 20.0, marketValue: 21.0 },
  { month: "", investedValue: 20.1, marketValue: 21.1 },
  { month: "Apr", investedValue: 20.0, marketValue: 21.0 },
  { month: "", investedValue: 20.0, marketValue: 21.0 },
  { month: "May", investedValue: 20.1, marketValue: 21.1 },
];

// Data where market value significantly exceeds invested (gains scenario)
const generateGainsData = (): ChartDataPoint[] => [
  { month: "Jan", investedValue: 15.0, marketValue: 16.0 },
  { month: "", investedValue: 15.5, marketValue: 16.8 },
  { month: "Feb", investedValue: 15.0, marketValue: 17.2 },
  { month: "", investedValue: 15.5, marketValue: 17.8 },
  { month: "Mar", investedValue: 15.0, marketValue: 18.5 },
  { month: "", investedValue: 15.5, marketValue: 19.0 },
  { month: "Apr", investedValue: 15.0, marketValue: 19.8 },
  { month: "", investedValue: 15.5, marketValue: 20.5 },
  { month: "May", investedValue: 15.0, marketValue: 21.2 },
];

// Data where market value is close to invested (minimal gains/loss)
const generateMinimalGainsData = (): ChartDataPoint[] => [
  { month: "Jan", investedValue: 20.0, marketValue: 20.2 },
  { month: "", investedValue: 20.1, marketValue: 20.3 },
  { month: "Feb", investedValue: 20.0, marketValue: 20.1 },
  { month: "", investedValue: 20.1, marketValue: 20.2 },
  { month: "Mar", investedValue: 20.0, marketValue: 20.0 },
  { month: "", investedValue: 20.1, marketValue: 20.2 },
  { month: "Apr", investedValue: 20.0, marketValue: 20.1 },
  { month: "", investedValue: 20.1, marketValue: 20.3 },
  { month: "May", investedValue: 20.0, marketValue: 20.2 },
];

// V-shaped recovery (down then up)
const generateVShapedRecoveryData = (): ChartDataPoint[] => [
  { month: "Jan", investedValue: 22.0, marketValue: 23.0 },
  { month: "", investedValue: 21.5, marketValue: 22.5 },
  { month: "Feb", investedValue: 20.8, marketValue: 21.8 },
  { month: "", investedValue: 20.0, marketValue: 21.0 },
  { month: "Mar", investedValue: 19.5, marketValue: 20.5 },
  { month: "", investedValue: 20.2, marketValue: 21.2 },
  { month: "Apr", investedValue: 21.0, marketValue: 22.0 },
  { month: "", investedValue: 21.8, marketValue: 22.8 },
  { month: "May", investedValue: 22.5, marketValue: 23.5 },
];

// Inverted V (up then down)
const generateInvertedVData = (): ChartDataPoint[] => [
  { month: "Jan", investedValue: 19.0, marketValue: 20.0 },
  { month: "", investedValue: 19.8, marketValue: 20.8 },
  { month: "Feb", investedValue: 20.5, marketValue: 21.5 },
  { month: "", investedValue: 21.2, marketValue: 22.2 },
  { month: "Mar", investedValue: 22.0, marketValue: 23.0 },
  { month: "", investedValue: 21.2, marketValue: 22.2 },
  { month: "Apr", investedValue: 20.5, marketValue: 21.5 },
  { month: "", investedValue: 19.8, marketValue: 20.8 },
  { month: "May", investedValue: 19.0, marketValue: 20.0 },
];

// ─────────────────────────────────────────────────────────────────────────────
// 1. Default — with default data
// ─────────────────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: "Default (Full Data)",
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Uptrend scenario
// ─────────────────────────────────────────────────────────────────────────────
export const Uptrend: Story = {
  name: "Uptrend Scenario",
  args: {
    data: generateUptrendData(),
    asOnDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Downtrend scenario
// ─────────────────────────────────────────────────────────────────────────────
export const Downtrend: Story = {
  name: "Downtrend Scenario",
  args: {
    data: generateDowntrendData(),
    asOnDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Volatile market
// ─────────────────────────────────────────────────────────────────────────────
export const VolatileMarket: Story = {
  name: "Volatile Market",
  args: {
    data: generateVolatileData(),
    asOnDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Stable portfolio
// ─────────────────────────────────────────────────────────────────────────────
export const StablePortfolio: Story = {
  name: "Stable Portfolio",
  args: {
    data: generateStableData(),
    asOnDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Significant gains
// ─────────────────────────────────────────────────────────────────────────────
export const SignificantGains: Story = {
  name: "Significant Gains",
  args: {
    data: generateGainsData(),
    asOnDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. Minimal gains/loss
// ─────────────────────────────────────────────────────────────────────────────
export const MinimalGains: Story = {
  name: "Minimal Gains/Loss",
  args: {
    data: generateMinimalGainsData(),
    asOnDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. V-shaped recovery
// ─────────────────────────────────────────────────────────────────────────────
export const VShapedRecovery: Story = {
  name: "V-Shaped Recovery",
  args: {
    data: generateVShapedRecoveryData(),
    asOnDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. Inverted V (market correction)
// ─────────────────────────────────────────────────────────────────────────────
export const MarketCorrection: Story = {
  name: "Market Correction (Inverted V)",
  args: {
    data: generateInvertedVData(),
    asOnDate: "31 - MAY '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. Custom date - quarterly snapshot
// ─────────────────────────────────────────────────────────────────────────────
export const QuarterlySnapshot: Story = {
  name: "Quarterly Snapshot",
  args: {
    data: generateUptrendData(),
    asOnDate: "30 - JUN '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. Year-to-date view
// ─────────────────────────────────────────────────────────────────────────────
export const YearToDate: Story = {
  name: "Year-to-Date",
  args: {
    data: generateUptrendData(),
    asOnDate: "31 - DEC '25",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. Extended period with more data points
// ─────────────────────────────────────────────────────────────────────────────
export const ExtendedPeriod: Story = {
  name: "Extended Period (12 months)",
  args: {
    data: [
      { month: "Jan '25", investedValue: 19.0, marketValue: 20.0 },
      { month: "", investedValue: 19.3, marketValue: 20.3 },
      { month: "Feb '25", investedValue: 19.5, marketValue: 20.5 },
      { month: "", investedValue: 19.8, marketValue: 20.8 },
      { month: "Mar '25", investedValue: 20.0, marketValue: 21.0 },
      { month: "", investedValue: 20.3, marketValue: 21.3 },
      { month: "Apr '25", investedValue: 20.5, marketValue: 21.5 },
      { month: "", investedValue: 20.8, marketValue: 21.8 },
      { month: "May '25", investedValue: 21.0, marketValue: 22.0 },
      { month: "", investedValue: 21.3, marketValue: 22.3 },
      { month: "Jun '25", investedValue: 21.5, marketValue: 22.5 },
      { month: "", investedValue: 21.8, marketValue: 22.8 },
      { month: "Jul '25", investedValue: 22.0, marketValue: 23.0 },
      { month: "", investedValue: 22.2, marketValue: 23.2 },
      { month: "Aug '25", investedValue: 22.3, marketValue: 23.3 },
      { month: "", investedValue: 22.5, marketValue: 23.5 },
      { month: "Sep '25", investedValue: 22.6, marketValue: 23.6 },
      { month: "", investedValue: 22.8, marketValue: 23.8 },
      { month: "Oct '25", investedValue: 22.9, marketValue: 23.9 },
      { month: "", investedValue: 23.0, marketValue: 24.0 },
      { month: "Nov '25", investedValue: 23.1, marketValue: 24.1 },
      { month: "", investedValue: 23.2, marketValue: 24.2 },
      { month: "Dec '25", investedValue: 23.3, marketValue: 24.3 },
    ],
    asOnDate: "31 - DEC '25",
  },
};
