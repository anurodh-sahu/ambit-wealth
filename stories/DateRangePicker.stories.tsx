import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/shared/DateRangePicker";

const meta: Meta<typeof DateRangePicker> = {
  title: "Shared/DateRangePicker",
  component: DateRangePicker,
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
    value: { control: false },
    onChange: { action: "dateRangeChanged" },
    className: { control: "text" },
    placeholder: { control: "text" },
    align: { control: "select", options: ["start", "center", "end"] },
    numberOfMonths: { control: { type: "number", min: 1, max: 3 } },
    inceptionDate: { control: false },
    mode: { control: "select", options: ["popover", "modal"] },
  },
  args: {
    placeholder: "Select date range",
    align: "start",
    numberOfMonths: 2,
    mode: "popover",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────────────────────────────────────
// 1. Default — popover mode with no initial value
// ─────────────────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: "Default (Popover)",
  args: {
    placeholder: "Select date range",
    mode: "popover",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Modal mode
// ─────────────────────────────────────────────────────────────────────────────
export const Modal: Story = {
  name: "Modal Mode",
  args: {
    placeholder: "Select date range",
    mode: "modal",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. With initial value
// ─────────────────────────────────────────────────────────────────────────────
export const WithInitialValue: Story = {
  name: "With Initial Value",
  args: {
    value: {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 31),
    },
    mode: "popover",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. With custom inception date
// ─────────────────────────────────────────────────────────────────────────────
export const WithInceptionDate: Story = {
  name: "With Custom Inception Date",
  args: {
    placeholder: "Select date range",
    inceptionDate: new Date(2020, 0, 15),
    mode: "popover",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Single month calendar
// ─────────────────────────────────────────────────────────────────────────────
export const SingleMonth: Story = {
  name: "Single Month Calendar",
  args: {
    placeholder: "Select date range",
    numberOfMonths: 1,
    mode: "popover",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Three months calendar
// ─────────────────────────────────────────────────────────────────────────────
export const ThreeMonths: Story = {
  name: "Three Months Calendar",
  args: {
    placeholder: "Select date range",
    numberOfMonths: 3,
    mode: "popover",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. Controlled mode — demonstrates state management
// ─────────────────────────────────────────────────────────────────────────────
export const Controlled: Story = {
  name: "Controlled (external state)",
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 15),
    });

    return (
      <div>
        <p style={{ color: "#555", fontSize: 12, marginBottom: 16 }}>
          Selected Range:{" "}
          <strong style={{ color: "#e53935" }}>
            {dateRange?.from ? dateRange.from.toLocaleDateString() : "—"} to{" "}
            {dateRange?.to ? dateRange.to.toLocaleDateString() : "—"}
          </strong>
        </p>
        <DateRangePicker {...args} value={dateRange} onChange={setDateRange} />
      </div>
    );
  },
  args: {
    mode: "popover",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Alignment variants
// ─────────────────────────────────────────────────────────────────────────────
export const AlignmentEnd: Story = {
  name: "Popover Aligned to End",
  args: {
    placeholder: "Select date range",
    align: "end",
    mode: "popover",
  },
};

export const AlignmentCenter: Story = {
  name: "Popover Aligned to Center",
  args: {
    placeholder: "Select date range",
    align: "center",
    mode: "popover",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. Custom placeholder
// ─────────────────────────────────────────────────────────────────────────────
export const CustomPlaceholder: Story = {
  name: "Custom Placeholder Text",
  args: {
    placeholder: "Choose your date range...",
    mode: "popover",
  },
};
