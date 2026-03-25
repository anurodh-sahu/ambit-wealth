import type { Meta, StoryObj } from "@storybook/react";
import FilterBar from "@/components/shared/FilterBar";
import type { BreadcrumbItem } from "@/components/shared/FilterBreadcrumb";

const meta: Meta<typeof FilterBar> = {
  title: "Shared/FilterBar",
  component: FilterBar,
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
    items: { control: false },
    onClearFilter: { action: "clearFilterClicked" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data
const singleFilterItem: BreadcrumbItem[] = [
  { label: "Technology", key: "category_tech" },
];

const categoryAndSecurityFilter: BreadcrumbItem[] = [
  { label: "Technology", key: "category_tech" },
  { label: "Large Cap", key: "subcategory_lc" },
];

const multipleFilters: BreadcrumbItem[] = [
  { label: "Technology", key: "category_tech" },
  { label: "Large Cap", key: "subcategory_lc" },
  { label: "2024", key: "year_2024" },
];

const productCategoryFilter: BreadcrumbItem[] = [
  { label: "#Product Category", key: "product" },
];

const securityFilter: BreadcrumbItem[] = [
  { label: "#Security", key: "security" },
];

const complexFilters: BreadcrumbItem[] = [
  { label: "#Product Category", key: "product_cat" },
  { label: "#Security", key: "security_type" },
  { label: "Equity", key: "security_equity" },
];

// ─────────────────────────────────────────────────────────────────────────────
// 1. Default — single filter item
// ─────────────────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: "Single Filter",
  args: {
    items: singleFilterItem,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Two filters — category and security
// ─────────────────────────────────────────────────────────────────────────────
export const TwoFilters: Story = {
  name: "Two Filters (Category & Security)",
  args: {
    items: categoryAndSecurityFilter,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Multiple filters
// ─────────────────────────────────────────────────────────────────────────────
export const MultipleFilters: Story = {
  name: "Multiple Filters",
  args: {
    items: multipleFilters,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Product category filter (with # symbol)
// ─────────────────────────────────────────────────────────────────────────────
export const ProductCategoryFilter: Story = {
  name: "Product Category Filter",
  args: {
    items: productCategoryFilter,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Security filter (with # symbol)
// ─────────────────────────────────────────────────────────────────────────────
export const SecurityFilter: Story = {
  name: "Security Filter",
  args: {
    items: securityFilter,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Complex filters with multiple categories
// ─────────────────────────────────────────────────────────────────────────────
export const ComplexFilters: Story = {
  name: "Complex Filters",
  args: {
    items: complexFilters,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. Dashboard default filters (from Main.tsx usage)
// ─────────────────────────────────────────────────────────────────────────────
export const DashboardDefaultFilters: Story = {
  name: "Dashboard Filters",
  args: {
    items: [
      { label: "#Product Category", key: "category" },
      { label: "#Security", key: "subcategory" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Long filter labels
// ─────────────────────────────────────────────────────────────────────────────
export const LongFilterLabels: Story = {
  name: "Long Filter Labels",
  args: {
    items: [
      { label: "Emerging Markets - Technology Sector", key: "filter_1" },
      { label: "High Risk - Growth Focused", key: "filter_2" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. Many filters (stress test)
// ─────────────────────────────────────────────────────────────────────────────
export const ManyFilters: Story = {
  name: "Many Filters",
  args: {
    items: [
      { label: "Technology", key: "f1" },
      { label: "Large Cap", key: "f2" },
      { label: "2024", key: "f3" },
      { label: "Growth", key: "f4" },
      { label: "India", key: "f5" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. Empty state (won't render)
// ─────────────────────────────────────────────────────────────────────────────
export const EmptyState: Story = {
  name: "Empty State (No Filters)",
  args: {
    items: [],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. Short single-word filters
// ─────────────────────────────────────────────────────────────────────────────
export const ShortFilters: Story = {
  name: "Short Single-Word Filters",
  args: {
    items: [
      { label: "Tech", key: "tech" },
      { label: "NYSE", key: "nyse" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. Controlled mode with state demonstration
// ─────────────────────────────────────────────────────────────────────────────
export const Controlled: Story = {
  name: "Controlled (with Clear Action)",
  render: (args) => (
    <div>
      <p style={{ color: "#555", fontSize: 12, marginBottom: 16 }}>
        Click the "Clear Filter" button to reset filters.
      </p>
      <FilterBar
        {...args}
        onClearFilter={() => {
          alert("Filters cleared!");
        }}
      />
    </div>
  ),
  args: {
    items: [
      { label: "#Product Category", key: "category" },
      { label: "#Security", key: "subcategory" },
    ],
  },
};
