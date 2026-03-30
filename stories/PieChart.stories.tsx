import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import PieChart, { type PieSlice } from "@/components/shared/highcharts/pie/PieChart";

const meta: Meta<typeof PieChart> = {
  title: "Shared/Charts/PieChart",
  component: PieChart,
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
    title: { control: "text" },
    data: { control: false },
    selectedName: { control: false },
    onSelect: { action: "sliceSelected" },
    tooltipSuffix: { control: "text" },
    collapseLegendAfter: { control: { type: "number", min: 3, max: 10 } },
    innerSize: { control: "text" },
  },
  args: {
    title: "Portfolio Allocation",
    tooltipSuffix: "%",
    collapseLegendAfter: 5,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────────────────────────────────────
// Mock data
// ─────────────────────────────────────────────────────────────────────────────

const allocationData: PieSlice[] = [
  { name: "Equity", value: 40, color: "#a89850" },
  { name: "Fixed Income", value: 30, color: "#4a8e6e" },
  { name: "Alternate", value: 20, color: "#5a9ba0" },
  { name: "Cash", value: 10, color: "#2e4e65" },
];

const assetClassData: PieSlice[] = [
  { name: "Stocks", value: 35, color: "#e53935" },
  { name: "Bonds", value: 25, color: "#1e88e5" },
  { name: "Real Estate", value: 20, color: "#ef6c00" },
  { name: "Commodities", value: 15, color: "#6a1b9a" },
  { name: "Cash", value: 5, color: "#00897b" },
];

const sectorData: PieSlice[] = [
  { name: "Technology", value: 28, color: "#1976d2" },
  { name: "Healthcare", value: 18, color: "#d32f2f" },
  { name: "Financials", value: 16, color: "#388e3c" },
  { name: "Industrials", value: 14, color: "#f57c00" },
  { name: "Energy", value: 12, color: "#7b1fa2" },
  { name: "Consumer", value: 8, color: "#00838f" },
  { name: "Utilities", value: 4, color: "#5e35b1" },
];

const evenDistributionData: PieSlice[] = [
  { name: "Segment A", value: 25, color: "#3498db" },
  { name: "Segment B", value: 25, color: "#2ecc71" },
  { name: "Segment C", value: 25, color: "#e74c3c" },
  { name: "Segment D", value: 25, color: "#f39c12" },
];

const skewedData: PieSlice[] = [
  { name: "Dominant", value: 60, color: "#c0392b" },
  { name: "Secondary", value: 25, color: "#3498db" },
  { name: "Tertiary", value: 10, color: "#2ecc71" },
  { name: "Minimal", value: 5, color: "#f39c12" },
];

const currencyData: PieSlice[] = [
  { name: "USD", value: 45, color: "#2196f3" },
  { name: "EUR", value: 25, color: "#4caf50" },
  { name: "GBP", value: 15, color: "#ff9800" },
  { name: "JPY", value: 10, color: "#9c27b0" },
  { name: "Other", value: 5, color: "#607d8b" },
];

const geographicData: PieSlice[] = [
  { name: "North America", value: 35, color: "#2196f3" },
  { name: "Europe", value: 25, color: "#f44336" },
  { name: "Asia Pacific", value: 20, color: "#4caf50" },
  { name: "Emerging Markets", value: 15, color: "#ff9800" },
  { name: "Rest of World", value: 5, color: "#9c27b0" },
];

const riskLevelData: PieSlice[] = [
  { name: "Low Risk", value: 30, color: "#4caf50" },
  { name: "Medium Risk", value: 40, color: "#ff9800" },
  { name: "High Risk", value: 20, color: "#f44336" },
  { name: "Very High Risk", value: 10, color: "#900000" },
];

const liquidityData: PieSlice[] = [
  { name: "Highly Liquid", value: 50, color: "#2196f3" },
  { name: "Liquid", value: 30, color: "#4caf50" },
  { name: "Semi-Liquid", value: 15, color: "#ff9800" },
  { name: "Illiquid", value: 5, color: "#f44336" },
];

// ─────────────────────────────────────────────────────────────────────────────
// 1. Default — standard portfolio allocation
// ─────────────────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: "Default (Portfolio Allocation)",
  args: {
    title: "Portfolio Allocation",
    data: allocationData,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Asset class distribution
// ─────────────────────────────────────────────────────────────────────────────
export const AssetClasses: Story = {
  name: "Asset Classes",
  args: {
    title: "Asset Class Distribution",
    data: assetClassData,
    tooltipSuffix: "%",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Sector allocation (many items with collapse)
// ─────────────────────────────────────────────────────────────────────────────
export const SectorAllocation: Story = {
  name: "Sector Allocation (Collapsible)",
  args: {
    title: "Sector Breakdown",
    data: sectorData,
    tooltipSuffix: "%",
    collapseLegendAfter: 5,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Even distribution
// ─────────────────────────────────────────────────────────────────────────────
export const EvenDistribution: Story = {
  name: "Even Distribution",
  args: {
    title: "Equally Weighted Portfolio",
    data: evenDistributionData,
    tooltipSuffix: "%",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Skewed distribution
// ─────────────────────────────────────────────────────────────────────────────
export const SkewedDistribution: Story = {
  name: "Skewed Distribution",
  args: {
    title: "Concentrated Allocation",
    data: skewedData,
    tooltipSuffix: "%",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Currency exposure
// ─────────────────────────────────────────────────────────────────────────────
export const CurrencyExposure: Story = {
  name: "Currency Exposure",
  args: {
    title: "Currency Distribution",
    data: currencyData,
    tooltipSuffix: "%",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. Geographic allocation
// ─────────────────────────────────────────────────────────────────────────────
export const GeographicAllocation: Story = {
  name: "Geographic Allocation",
  args: {
    title: "Regional Distribution",
    data: geographicData,
    tooltipSuffix: "%",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Risk level allocation
// ─────────────────────────────────────────────────────────────────────────────
export const RiskLevelAllocation: Story = {
  name: "Risk Level Distribution",
  args: {
    title: "Risk Profile",
    data: riskLevelData,
    tooltipSuffix: "%",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. Liquidity profile
// ─────────────────────────────────────────────────────────────────────────────
export const LiquidityProfile: Story = {
  name: "Liquidity Profile",
  args: {
    title: "Asset Liquidity",
    data: liquidityData,
    tooltipSuffix: "%",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. With values in currency (e.g., Crore)
// ─────────────────────────────────────────────────────────────────────────────
export const WithCurrencyValues: Story = {
  name: "With Currency Values",
  args: {
    title: "Portfolio Values",
    data: [
      { name: "Equity", value: 50, color: "#a89850" },
      { name: "Fixed Income", value: 30, color: "#4a8e6e" },
      { name: "Alternate", value: 15, color: "#5a9ba0" },
      { name: "Cash", value: 5, color: "#2e4e65" },
    ],
    tooltipSuffix: " Cr",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. Controlled mode with selection
// ─────────────────────────────────────────────────────────────────────────────
export const Controlled: Story = {
  name: "Controlled (with Selection)",
  render: (args) => {
    const [selectedName, setSelectedName] = useState<string | null>(null);
    return (
      <div>
        <p style={{ color: "#555", fontSize: 12, marginBottom: 16 }}>
          Selected: <strong style={{ color: "#e53935" }}>{selectedName || "None"}</strong>
        </p>
        <PieChart
          {...args}
          selectedName={selectedName}
          onSelect={setSelectedName}
        />
      </div>
    );
  },
  args: {
    title: "Interactive Portfolio Allocation",
    data: allocationData,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. Many items (7+ items triggering collapse)
// ─────────────────────────────────────────────────────────────────────────────
export const ManyItems: Story = {
  name: "Many Items (Collapsible Legend)",
  args: {
    title: "Detailed Sector Breakdown",
    data: sectorData,
    tooltipSuffix: "%",
    collapseLegendAfter: 4,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 13. Small dataset
// ─────────────────────────────────────────────────────────────────────────────
export const SmallDataset: Story = {
  name: "Small Dataset",
  args: {
    title: "Simple 2-Way Split",
    data: [
      { name: "Growth", value: 60, color: "#e74c3c" },
      { name: "Value", value: 40, color: "#3498db" },
    ],
    tooltipSuffix: "%",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 14. Per unit values (basis points or thousands)
// ─────────────────────────────────────────────────────────────────────────────
export const PerUnitValues: Story = {
  name: "Per Unit Values",
  args: {
    title: "Portfolio Composition",
    data: [
      { name: "Segment A", value: 125, color: "#3498db" },
      { name: "Segment B", value: 75, color: "#2ecc71" },
      { name: "Segment C", value: 40, color: "#e74c3c" },
      { name: "Segment D", value: 60, color: "#f39c12" },
    ],
    tooltipSuffix: " Units",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 15. Three-item pie
// ─────────────────────────────────────────────────────────────────────────────
export const ThreeItems: Story = {
  name: "Three-Item Distribution",
  args: {
    title: "Primary Allocation",
    data: [
      { name: "Stocks", value: 50, color: "#e53935" },
      { name: "Bonds", value: 35, color: "#1e88e5" },
      { name: "Cash", value: 15, color: "#43a047" },
    ],
    tooltipSuffix: "%",
  },
};

export const DonutStyle: Story = {
  name: "Donut Style",
  args: {
    title: "Portfolio Allocation (Donut)",
    data: allocationData,
    tooltipSuffix: "%",
    innerSize: "55%",
  },
};
