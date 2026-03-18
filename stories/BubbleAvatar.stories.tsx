import type { Meta, StoryObj } from "@storybook/react";
import { BubbleAvatar } from "@/components/shared/BubbleAvatar";

const meta = {
  title: "Components/UI/BubbleAvatar",
  component: BubbleAvatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "The name to display as initials in the avatar",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size variant of the avatar",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof BubbleAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    name: "John Doe",
    size: "md",
  },
};

// Size variants
export const SmallSize: Story = {
  args: {
    name: "Jane Smith",
    size: "sm",
  },
};

export const MediumSize: Story = {
  args: {
    name: "Alex Johnson",
    size: "md",
  },
};

export const LargeSize: Story = {
  args: {
    name: "Sarah Williams",
    size: "lg",
  },
};

export const ExtraLargeSize: Story = {
  args: {
    name: "Mike Anderson",
    size: "xl",
  },
};

// Different name formats
export const SingleName: Story = {
  args: {
    name: "Alice",
    size: "md",
  },
};

export const FullName: Story = {
  args: {
    name: "Robert Christopher",
    size: "md",
  },
};

export const ThreePartName: Story = {
  args: {
    name: "Mary Jane Watson",
    size: "md",
  },
};

export const WithExtraSpaces: Story = {
  args: {
    name: "  Peter   Parker  ",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "Handles extra spaces in names correctly",
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <BubbleAvatar name="John Doe" size="sm" />
        <span className="text-xs text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BubbleAvatar name="Jane Smith" size="md" />
        <span className="text-xs text-muted-foreground">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BubbleAvatar name="Bob Johnson" size="lg" />
        <span className="text-xs text-muted-foreground">Large</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BubbleAvatar name="Sarah Lee" size="xl" />
        <span className="text-xs text-muted-foreground">Extra Large</span>
      </div>
    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  args: {
    name: "John Doe",
    size: "md",
  },
};
