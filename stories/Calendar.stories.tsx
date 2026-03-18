import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

const meta = {
  title: "Components/UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    showOutsideDays: {
      control: "boolean",
      description: "Show days outside the current month",
    },
    captionLayout: {
      control: "select",
      options: ["label", "buttons"],
      description: "Caption layout style",
    },
    buttonVariant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
      description: "Button variant for navigation",
    },
    disabled: {
      control: "boolean",
      description: "Disable the calendar",
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default calendar
export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return <Calendar mode="single" selected={date} onSelect={setDate} />;
  },
};

// Calendar with outside days hidden
export const HideOutsideDays: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
      />
    );
  },
};

// Calendar with buttons caption layout
export const CaptionLayoutButtons: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="buttons"
      />
    );
  },
};

// Calendar with label caption layout
export const CaptionLayoutLabel: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="label"
      />
    );
  },
};

// Range selection
export const RangeSelection: Story = {
  render: () => {
    const [dates, setDates] = React.useState<
      | {
          from?: Date;
          to?: Date;
        }
      | undefined
    >();

    return (
      <Calendar
        mode="range"
        selected={dates}
        onSelect={setDates}
      />
    );
  },
};

// Multiple selection
export const MultipleSelection: Story = {
  render: () => {
    const [dates, setDates] = React.useState<Date[] | undefined>();

    return (
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
      />
    );
  },
};

// With different button variants
export const ButtonVariantGhost: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        buttonVariant="ghost"
      />
    );
  },
};

export const ButtonVariantOutline: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        buttonVariant="outline"
      />
    );
  },
};

// Playground
export const Playground: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={true}
        captionLayout="label"
      />
    );
  },
};
