import type { Meta, StoryObj } from "@storybook/react";
import NextCTA from "@/components/shared/NextCTA";

const meta: Meta<typeof NextCTA> = {
  title: "Shared/NextCTA",
  component: NextCTA,
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
    subtitle: { control: "text" },
    btnVarient: {
      control: "select",
      options: ["default", "link", "outline", "ghost", "destructive", "cta", "image"],
    },
    btnShape: { control: "select", options: ["default", "pill"] },
    btnTitle: { control: "text" },
    onClick: { action: "buttonClicked" },
  },
  args: {
    title: "PORTFOLIO PERFORMANCE",
    subtitle: "TRACK TOTAL RETURNS AND RISK OVER TIME. COMPARE WITH YOUR BENCHMARK.",
    btnVarient: "cta",
    btnShape: "default",
    btnTitle: "ANALYSE PERFORMANCE",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────────────────────────────────────
// 1. Default — CTA variant with rounded shape
// ─────────────────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: "Default (CTA Variant)",
  args: {
    title: "PORTFOLIO PERFORMANCE",
    subtitle: "TRACK TOTAL RETURNS AND RISK OVER TIME. COMPARE WITH YOUR BENCHMARK.",
    btnVarient: "cta",
    btnShape: "default",
    btnTitle: "ANALYSE PERFORMANCE",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Pill shaped button
// ─────────────────────────────────────────────────────────────────────────────
export const PillButton: Story = {
  name: "Pill Shaped Button",
  args: {
    title: "PORTFOLIO PERFORMANCE",
    subtitle: "TRACK TOTAL RETURNS AND RISK OVER TIME. COMPARE WITH YOUR BENCHMARK.",
    btnVarient: "cta",
    btnShape: "pill",
    btnTitle: "ANALYSE PERFORMANCE",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Primary/Default button variant
// ─────────────────────────────────────────────────────────────────────────────
export const PrimaryVariant: Story = {
  name: "Primary Button Variant",
  args: {
    title: "GET STARTED",
    subtitle: "BEGIN YOUR INVESTMENT JOURNEY TODAY WITH EXPERT GUIDANCE.",
    btnVarient: "default",
    btnShape: "default",
    btnTitle: "START NOW",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Outline button variant
// ─────────────────────────────────────────────────────────────────────────────
export const OutlineVariant: Story = {
  name: "Outline Button Variant",
  args: {
    title: "EXPLORE MORE",
    subtitle: "DISCOVER ADDITIONAL INVESTMENT OPPORTUNITIES.",
    btnVarient: "outline",
    btnShape: "default",
    btnTitle: "EXPLORE",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Ghost button variant
// ─────────────────────────────────────────────────────────────────────────────
export const GhostVariant: Story = {
  name: "Ghost Button Variant",
  args: {
    title: "LEARN MORE",
    subtitle: "UNDERSTAND HOW TO MAXIMIZE YOUR RETURNS.",
    btnVarient: "ghost",
    btnShape: "default",
    btnTitle: "LEARN",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Link button variant
// ─────────────────────────────────────────────────────────────────────────────
export const LinkVariant: Story = {
  name: "Link Button Variant",
  args: {
    title: "QUICK LINKS",
    subtitle: "ACCESS FREQUENTLY USED FEATURES.",
    btnVarient: "link",
    btnShape: "default",
    btnTitle: "QUICK ACCESS",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. Without subtitle
// ─────────────────────────────────────────────────────────────────────────────
export const WithoutSubtitle: Story = {
  name: "Without Subtitle",
  args: {
    title: "READY TO INVEST?",
    subtitle: undefined,
    btnVarient: "cta",
    btnShape: "default",
    btnTitle: "GET STARTED",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Long title and subtitle
// ─────────────────────────────────────────────────────────────────────────────
export const LongContent: Story = {
  name: "Long Title and Subtitle",
  args: {
    title: "COMPREHENSIVE PORTFOLIO ANALYSIS AND PERFORMANCE TRACKING",
    subtitle: "EVALUATE YOUR INVESTMENT PERFORMANCE AGAINST MARKET BENCHMARKS AND HISTORICAL TRENDS. GAIN INSIGHTS TO MAKE INFORMED DECISIONS.",
    btnVarient: "cta",
    btnShape: "default",
    btnTitle: "VIEW ANALYSIS",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. Pill button with different variants
// ─────────────────────────────────────────────────────────────────────────────
export const PillPrimaryVariant: Story = {
  name: "Pill-shaped Primary Button",
  args: {
    title: "SPECIAL OFFER",
    subtitle: "LIMITED TIME INVESTMENT OPPORTUNITY FOR YOU.",
    btnVarient: "default",
    btnShape: "pill",
    btnTitle: "CLAIM OFFER",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. Destructive variant
// ─────────────────────────────────────────────────────────────────────────────
export const DestructiveVariant: Story = {
  name: "Destructive Button Variant",
  args: {
    title: "RISK WARNING",
    subtitle: "UNDERSTAND THE POTENTIAL RISKS ASSOCIATED WITH YOUR PORTFOLIO.",
    btnVarient: "destructive",
    btnShape: "default",
    btnTitle: "VIEW RISKS",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. Image variant (background image button)
// ─────────────────────────────────────────────────────────────────────────────
export const ImageVariant: Story = {
  name: "Image Button Variant",
  args: {
    title: "FEATURED INSIGHTS",
    subtitle: "EXPLORE LATEST MARKET NEWS AND INVESTMENT TRENDS.",
    btnVarient: "image",
    btnShape: "default",
    btnTitle: "DISCOVER",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. Minimal content
// ─────────────────────────────────────────────────────────────────────────────
export const MinimalContent: Story = {
  name: "Minimal Content",
  args: {
    title: "NEW FEATURES",
    subtitle: undefined,
    btnVarient: "cta",
    btnShape: "pill",
    btnTitle: "TRY NOW",
  },
};
