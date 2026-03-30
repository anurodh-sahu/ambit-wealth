import type { Meta, StoryObj } from "@storybook/react";
import { CardProgressBar, CardProgressBarSkeleton } from "@/components/shared/CardProgressBar";

const meta: Meta<typeof CardProgressBar> = {
  title: "Shared/CardProgressBar",
  component: CardProgressBar,
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
    progress: { control: { type: "number", min: 0, max: 100, step: 1 } },
    isLoss: { control: "boolean" },
    loading: { control: "boolean" },
  },
  args: {
    progress: 65,
    isLoss: true,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────────────────────────────────────
// 1. Default — Loss scenario with mid-range progress
// ─────────────────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: "Default (Loss - 65%)",
  args: {
    progress: 65,
    isLoss: true,
    loading: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Gain scenario — positive growth condition
// ─────────────────────────────────────────────────────────────────────────────
export const Gain: Story = {
  name: "Gain Scenario (85%)",
  args: {
    progress: 85,
    isLoss: false,
    loading: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Low progress with loss
// ─────────────────────────────────────────────────────────────────────────────
export const LowProgressLoss: Story = {
  name: "Low Progress - Loss (25%)",
  args: {
    progress: 25,
    isLoss: true,
    loading: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Low progress with gain
// ─────────────────────────────────────────────────────────────────────────────
export const LowProgressGain: Story = {
  name: "Low Progress - Gain (25%)",
  args: {
    progress: 25,
    isLoss: false,
    loading: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. High progress with loss
// ─────────────────────────────────────────────────────────────────────────────
export const HighProgressLoss: Story = {
  name: "High Progress - Loss (90%)",
  args: {
    progress: 90,
    isLoss: true,
    loading: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. High progress with gain
// ─────────────────────────────────────────────────────────────────────────────
export const HighProgressGain: Story = {
  name: "High Progress - Gain (95%)",
  args: {
    progress: 95,
    isLoss: false,
    loading: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. Minimal progress
// ─────────────────────────────────────────────────────────────────────────────
export const MinimalProgress: Story = {
  name: "Minimal Progress (5%)",
  args: {
    progress: 5,
    isLoss: true,
    loading: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Maximum progress
// ─────────────────────────────────────────────────────────────────────────────
export const MaximumProgress: Story = {
  name: "Maximum Progress (100%)",
  args: {
    progress: 100,
    isLoss: false,
    loading: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. Zero progress
// ─────────────────────────────────────────────────────────────────────────────
export const ZeroProgress: Story = {
  name: "Zero Progress (0%)",
  args: {
    progress: 0,
    isLoss: true,
    loading: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. Mid-range progress with loss
// ─────────────────────────────────────────────────────────────────────────────
export const MidProgressLoss: Story = {
  name: "Mid-range Progress - Loss (50%)",
  args: {
    progress: 50,
    isLoss: true,
    loading: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. Mid-range progress with gain
// ─────────────────────────────────────────────────────────────────────────────
export const MidProgressGain: Story = {
  name: "Mid-range Progress - Gain (50%)",
  args: {
    progress: 50,
    isLoss: false,
    loading: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. Loading state — Loss skeleton
// ─────────────────────────────────────────────────────────────────────────────
export const LoadingLoss: Story = {
  name: "Loading State - Loss",
  args: {
    progress: 0,
    isLoss: true,
    loading: true,
  },
  render: (args) => <CardProgressBarSkeleton isLoss={args.isLoss} />,
};

// ─────────────────────────────────────────────────────────────────────────────
// 13. Loading state — Gain skeleton
// ─────────────────────────────────────────────────────────────────────────────
export const LoadingGain: Story = {
  name: "Loading State - Gain",
  args: {
    progress: 0,
    isLoss: false,
    loading: true,
  },
  render: (args) => <CardProgressBarSkeleton isLoss={args.isLoss} />,
};
