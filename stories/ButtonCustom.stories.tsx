import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button-custom";
import { ChevronDown, Plus, Trash2, ExternalLink } from "lucide-react";

const meta = {
  title: "Components/UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
      description: "Button style variant",
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    asChild: {
      control: "boolean",
      description: "Render as child element using Radix Slot",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default variant stories
export const Default: Story = {
  args: {
    children: "Click me",
    variant: "default",
    size: "default",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
    size: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    size: "default",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
    size: "default",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
    size: "default",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
    size: "default",
  },
};

// Size variants with default variant
export const SizeXS: Story = {
  args: {
    children: "Extra Small",
    variant: "default",
    size: "xs",
  },
};

export const SizeSM: Story = {
  args: {
    children: "Small",
    variant: "default",
    size: "sm",
  },
};

export const SizeDefault: Story = {
  args: {
    children: "Default",
    variant: "default",
    size: "default",
  },
};

export const SizeLG: Story = {
  args: {
    children: "Large",
    variant: "default",
    size: "lg",
  },
};

// Icon button sizes
export const IconDefault: Story = {
  args: {
    variant: "default",
    size: "icon",
    children: <Plus />,
  },
};

export const IconXS: Story = {
  args: {
    variant: "default",
    size: "icon-xs",
    children: <Plus />,
  },
};

export const IconSM: Story = {
  args: {
    variant: "default",
    size: "icon-sm",
    children: <Plus />,
  },
};

export const IconLG: Story = {
  args: {
    variant: "default",
    size: "icon-lg",
    children: <Plus />,
  },
};

// Button with icon and text
export const WithIconStart: Story = {
  args: {
    children: (
      <>
        <Plus />
        Add Item
      </>
    ),
    variant: "default",
    size: "default",
  },
};

export const WithIconEnd: Story = {
  args: {
    children: (
      <>
        Expand
        <ChevronDown />
      </>
    ),
    variant: "default",
    size: "default",
  },
};

// Disabled states
export const DisabledDefault: Story = {
  args: {
    children: "Disabled",
    variant: "default",
    size: "default",
    disabled: true,
  },
};

export const DisabledOutline: Story = {
  args: {
    children: "Disabled Outline",
    variant: "outline",
    size: "default",
    disabled: true,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="xs">XS</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="icon-xs">
          <Plus />
        </Button>
        <Button size="icon-sm">
          <Plus />
        </Button>
        <Button size="icon">
          <Plus />
        </Button>
        <Button size="icon-lg">
          <Plus />
        </Button>
      </div>
    </div>
  ),
};

// Variant and size combinations
export const VariantSizeCombinations: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Default Variant - All Sizes</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="default" size="xs">
            XS
          </Button>
          <Button variant="default" size="sm">
            Small
          </Button>
          <Button variant="default" size="default">
            Default
          </Button>
          <Button variant="default" size="lg">
            Large
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Outline Variant - All Sizes</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="xs">
            XS
          </Button>
          <Button variant="outline" size="sm">
            Small
          </Button>
          <Button variant="outline" size="default">
            Default
          </Button>
          <Button variant="outline" size="lg">
            Large
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Ghost Variant - All Sizes</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="xs">
            XS
          </Button>
          <Button variant="ghost" size="sm">
            Small
          </Button>
          <Button variant="ghost" size="default">
            Default
          </Button>
          <Button variant="ghost" size="lg">
            Large
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Destructive Variant - All Sizes</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="destructive" size="xs">
            XS
          </Button>
          <Button variant="destructive" size="sm">
            Small
          </Button>
          <Button variant="destructive" size="default">
            Default
          </Button>
          <Button variant="destructive" size="lg">
            Large
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Real-world examples
export const FormActions: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="default">Save</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  ),
};

export const DeleteAction: Story = {
  render: () => (
    <Button variant="destructive" size="icon">
      <Trash2 />
    </Button>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <Button variant="default" disabled>
      Loading...
    </Button>
  ),
};

// Interactive playground
export const Playground: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
};
