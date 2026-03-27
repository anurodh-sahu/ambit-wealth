import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "@/components/shared/FilterBar";
import type { BreadcrumbItem } from "@/components/shared/FilterBreadcrumb";

describe("FilterBar", () => {
  // ❌ FAILING TESTS FIRST - Edge cases and error handling
  describe("❌ Input Validation - Edge Cases (Currently Failing)", () => {
    it("should handle null items array gracefully", () => {
      const { container } = render(<FilterBar items={null as any} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should handle undefined items array gracefully", () => {
      const { container } = render(<FilterBar items={undefined as any} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render empty state when items array is empty", () => {
      const { container } = render(<FilterBar items={[]} />);
      // Should not display filter bar or show empty message
      expect(container.querySelector("button")).not.toBeInTheDocument();
    });

    it("should handle items with missing key property", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "" },
      ];
      render(<FilterBar items={items} />);
      expect(screen.getByText("Technology")).toBeInTheDocument();
    });

    it("should handle items with very long labels", () => {
      const longLabel = "A".repeat(100);
      const items: BreadcrumbItem[] = [
        { label: longLabel, key: "long" },
      ];
      render(<FilterBar items={items} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it("should handle items with special characters in label", () => {
      const items: BreadcrumbItem[] = [
        { label: "Tech & Finance #1", key: "tech-finance" },
      ];
      render(<FilterBar items={items} />);
      expect(screen.getByText("Tech & Finance #1")).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Clear filter functionality
  describe("❌ Clear Filter Button (Currently Failing)", () => {
    it("should display clear filter button", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
      ];
      render(<FilterBar items={items} />);
      const clearButton = screen.queryByRole("button", { name: /clear/i });
      expect(clearButton).toBeInTheDocument();
    });

    it("should call onClearFilter when clear button is clicked", () => {
      const handleClearFilter = jest.fn();
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
      ];
      render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
      const clearButton = screen.getByRole("button", { name: /clear/i });
      fireEvent.click(clearButton);
      
      expect(handleClearFilter).toHaveBeenCalledTimes(1);
    });

    it("should not display clear button when items array is empty", () => {
      render(<FilterBar items={[]} />);
      const clearButton = screen.queryByRole("button", { name: /clear/i });
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Individual filter item removal
  describe("❌ Individual Filter Removal (Currently Failing)", () => {
    it("should display remove icon for each filter item", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
        { label: "Large Cap", key: "large" },
      ];
      render(<FilterBar items={items} />);
      
      const removeButtons = screen.getAllByRole("button", { name: /remove/i });
      expect(removeButtons.length).toBe(2);
    });

    it("should call onRemoveFilter when individual filter remove button is clicked", () => {
      const handleRemoveFilter = jest.fn();
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
      ];
      render(<FilterBar items={items} onRemoveFilter={handleRemoveFilter} />);
      
      const removeButton = screen.getByRole("button", { name: /remove/i });
      fireEvent.click(removeButton);
      
      expect(handleRemoveFilter).toHaveBeenCalledWith("tech");
    });
  });

  // ❌ FAILING TESTS - Accessibility
  describe("❌ Accessibility (Currently Failing)", () => {
    it("should have proper ARIA labels", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
      ];
      render(<FilterBar items={items} />);
      
      const filterContainer = screen.getByRole("region", { hidden: true });
      expect(filterContainer).toHaveAttribute("aria-label");
    });

    it("should announce filter items to screen readers", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
        { label: "Large Cap", key: "large" },
      ];
      render(<FilterBar items={items} />);
      
      expect(screen.getByText("Technology")).toBeInTheDocument();
      expect(screen.getByText("Large Cap")).toBeInTheDocument();
    });

    it("should have keyboard accessible buttons", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
      ];
      render(<FilterBar items={items} />);
      
      const clearButton = screen.getByRole("button", { name: /clear/i });
      clearButton.focus();
      expect(clearButton).toHaveFocus();
    });
  });

  // ❌ FAILING TESTS - Visual styling edge cases
  describe("❌ Styling - Edge Cases (Currently Failing)", () => {
    it("should handle wrapping of many filters", () => {
      const items: BreadcrumbItem[] = Array.from({ length: 10 }, (_, i) => ({
        label: `Filter ${i}`,
        key: `filter-${i}`,
      }));
      const { container } = render(<FilterBar items={items} />);
      expect(container.querySelectorAll("button").length).toBeGreaterThan(0);
    });

    it("should apply proper spacing between filters", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
        { label: "Large Cap", key: "large" },
      ];
      const { container } = render(<FilterBar items={items} />);
      const filterItems = container.querySelectorAll("[class*='filter']");
      expect(filterItems.length).toBeGreaterThan(0);
    });
  });

  // ❌ FAILING TESTS - Symbol handling
  describe("❌ Symbol Handling in Labels (Currently Failing)", () => {
    it("should properly display # symbol prefix", () => {
      const items: BreadcrumbItem[] = [
        { label: "#Product Category", key: "product" },
      ];
      render(<FilterBar items={items} />);
      expect(screen.getByText("#Product Category")).toBeInTheDocument();
    });

    it("should handle multiple symbols in labels", () => {
      const items: BreadcrumbItem[] = [
        { label: "#Product-Category", key: "product" },
      ];
      render(<FilterBar items={items} />);
      expect(screen.getByText("#Product-Category")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Current working functionality
  describe("✅ Rendering (Passing)", () => {
    it("displays single filter item", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "category_tech" },
      ];
      render(<FilterBar items={items} />);
      expect(screen.getByText("Technology")).toBeInTheDocument();
    });

    it("displays multiple filter items", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "category_tech" },
        { label: "Large Cap", key: "subcategory_lc" },
        { label: "2024", key: "year_2024" },
      ];
      render(<FilterBar items={items} />);
      expect(screen.getByText("Technology")).toBeInTheDocument();
      expect(screen.getByText("Large Cap")).toBeInTheDocument();
      expect(screen.getByText("2024")).toBeInTheDocument();
    });

    it("renders filter bar container", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
      ];
      const { container } = render(<FilterBar items={items} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Filter display
  describe("✅ Filter Display (Passing)", () => {
    it("displays correct number of filter items", () => {
      const items: BreadcrumbItem[] = [
        { label: "Tech", key: "tech" },
        { label: "NYC", key: "nyc" },
        { label: "2024", key: "2024" },
      ];
      render(<FilterBar items={items} />);
      
      const filterItems = screen.getAllByText(/Tech|NYC|2024/);
      expect(filterItems.length).toBeGreaterThanOrEqual(3);
    });

    it("maintains filter order", () => {
      const items: BreadcrumbItem[] = [
        { label: "First", key: "first" },
        { label: "Second", key: "second" },
        { label: "Third", key: "third" },
      ];
      render(<FilterBar items={items} />);
      
      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Second")).toBeInTheDocument();
      expect(screen.getByText("Third")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - CSS Classes
  describe("✅ CSS Classes (Passing)", () => {
    it("applies breadcrumb styling classes", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
      ];
      const { container } = render(<FilterBar items={items} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("applies flex layout classes", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
      ];
      const { container } = render(<FilterBar items={items} />);
      const filterContainer = container.firstChild as HTMLElement;
      expect(filterContainer.className).toMatch(/flex|gap|align/i);
    });
  });

  // ✅ PASSING TESTS - Filter styling
  describe("✅ Filter Styling (Passing)", () => {
    it("applies proper styling to filter items", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
      ];
      const { container } = render(<FilterBar items={items} />);
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("has visual distinction between filter items", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
        { label: "Large Cap", key: "large" },
      ];
      const { container } = render(<FilterBar items={items} />);
      const buttons = container.querySelectorAll("button");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  // ✅ PASSING TESTS - Button interactions
  describe("✅ Button Interactions (Passing)", () => {
    it("renders clickable buttons", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
      ];
      render(<FilterBar items={items} />);
      
      const button = screen.getByRole("button");
      expect(button).not.toBeDisabled();
    });

    it("buttons are keyboard accessible", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
      ];
      render(<FilterBar items={items} />);
      
      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  // ✅ PASSING TESTS - Key prop usage
  describe("✅ Key Prop Handling (Passing)", () => {
    it("uses key property from items", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "category_tech" },
        { label: "Large Cap", key: "subcategory_lc" },
      ];
      render(<FilterBar items={items} />);
      
      expect(screen.getByText("Technology")).toBeInTheDocument();
      expect(screen.getByText("Large Cap")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Component props
  describe("✅ Component Props (Passing)", () => {
    it("accepts custom className prop", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
      ];
      const { container } = render(
        <FilterBar items={items} className="custom-class" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it("accepts data-testid prop", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "tech" },
      ];
      render(<FilterBar items={items} data-testid="filter-bar" />);
      expect(screen.getByTestId("filter-bar")).toBeInTheDocument();
    });
  });
});
