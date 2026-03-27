import type { Meta, StoryObj } from "@storybook/react";
import ProgressCard from "@/components/shared/ProgressCard";

const meta: Meta<typeof ProgressCard> = {
  title: "Shared/ProgressCard",
  component: ProgressCard,
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
    label: { control: "text" },
    value: { control: { type: "number", min: 0, max: 500000000, step: 1000000 } },
    progress: { control: { type: "number", min: 0, max: 100, step: 1 } },
    isLoss: { control: "boolean" },
  },
  args: {
    label: "Current Value",
    value: 240000000,
    progress: 80,
    isLoss: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────────────────────────────────────
// 1. Default — Loss scenario with high progress
// ─────────────────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: "Default (Loss - High Progress)",
  args: {
    label: "Current Value",
    value: 240000000,
    progress: 80,
    isLoss: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Gain scenario — positive growth condition
// ─────────────────────────────────────────────────────────────────────────────
export const Gain: Story = {
  name: "Gain Scenario",
  args: {
    label: "Current Value",
    value: 240000000,
    progress: 80,
    isLoss: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Invested Amount
// ─────────────────────────────────────────────────────────────────────────────
export const InvestedAmount: Story = {
  name: "Invested Amount",
  args: {
    label: "Invested Amount",
    value: 185000000,
    progress: 70,
    isLoss: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Total Gains
// ─────────────────────────────────────────────────────────────────────────────
export const TotalGains: Story = {
  name: "Total Gains",
  args: {
    label: "Total Gains",
    value: 62700000,
    progress: 100,
    isLoss: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Low progress value
// ─────────────────────────────────────────────────────────────────────────────
export const LowProgress: Story = {
  name: "Low Progress",
  args: {
    label: "Portfolio Growth",
    value: 50000000,
    progress: 25,
    isLoss: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Very high progress
// ─────────────────────────────────────────────────────────────────────────────
export const VeryHighProgress: Story = {
  name: "Very High Progress",
  args: {
    label: "Returns",
    value: 300000000,
    progress: 95,
    isLoss: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. Minimal progress
// ─────────────────────────────────────────────────────────────────────────────
export const MinimalProgress: Story = {
  name: "Minimal Progress",
  args: {
    label: "Monthly Returns",
    value: 10000000,
    progress: 5,
    isLoss: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Large value display
// ─────────────────────────────────────────────────────────────────────────────
export const LargeValue: Story = {
  name: "Large Value",
  args: {
    label: "Total Portfolio",
    value: 500000000,
    progress: 85,
    isLoss: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. Small value display
// ─────────────────────────────────────────────────────────────────────────────
export const SmallValue: Story = {
  name: "Small Value",
  args: {
    label: "Quick Gains",
    value: 5000000,
    progress: 40,
    isLoss: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. Mid-range progress with loss
// ─────────────────────────────────────────────────────────────────────────────
export const MidProgressLoss: Story = {
  name: "Mid-range Progress (Loss)",
  args: {
    label: "Net Flow",
    value: 120000000,
    progress: 50,
    isLoss: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. Mid-range progress with gain
// ─────────────────────────────────────────────────────────────────────────────
export const MidProgressGain: Story = {
  name: "Mid-range Progress (Gain)",
  args: {
    label: "Net Flow",
    value: 120000000,
    progress: 50,
    isLoss: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. One Year Returns
// ─────────────────────────────────────────────────────────────────────────────
export const OneYearReturns: Story = {
  name: "1Y Returns",
  args: {
    label: "1Y Returns",
    value: 35000000,
    progress: 60,
    isLoss: false,
  },
};
