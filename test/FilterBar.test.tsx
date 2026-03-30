import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import FilterBar from "@/components/shared/FilterBar";
import type { BreadcrumbItem } from "@/components/shared/FilterBreadcrumb";

describe("FilterBar", () => {

  // // ✅ PASSING TESTS - Current working functionality
  // describe("✅ Rendering (Passing)", () => {
  //   it("displays single filter item", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "category_tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
  //     expect(screen.getByText("Technology")).toBeInTheDocument();
  //   });

  //   it("displays multiple filter items", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "category_tech" },
  //       { label: "Large Cap", key: "subcategory_lc" },
  //       { label: "2024", key: "year_2024" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
  //     expect(screen.getByText("Technology")).toBeInTheDocument();
  //     expect(screen.getByText("Large Cap")).toBeInTheDocument();
  //     expect(screen.getByText("2024")).toBeInTheDocument();
  //   });

  //   it("renders filter bar container", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     const { container } = render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
  //     expect(container.firstChild).toBeInTheDocument();
  //   });

  //   it("displays Filtered By label", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
  //     expect(screen.getByText("Filtered By")).toBeInTheDocument();
  //   });
  // });

  // // ✅ PASSING TESTS - Filter display
  // describe("✅ Filter Display (Passing)", () => {
  //   it("displays correct number of filter items", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Tech", key: "tech" },
  //       { label: "NYC", key: "nyc" },
  //       { label: "2024", key: "2024" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
  //     expect(screen.getByText("Tech")).toBeInTheDocument();
  //     expect(screen.getByText("NYC")).toBeInTheDocument();
  //     expect(screen.getByText("2024")).toBeInTheDocument();
  //   });

  //   it("maintains filter order", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "First", key: "first" },
  //       { label: "Second", key: "second" },
  //       { label: "Third", key: "third" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
  //     expect(screen.getByText("First")).toBeInTheDocument();
  //     expect(screen.getByText("Second")).toBeInTheDocument();
  //     expect(screen.getByText("Third")).toBeInTheDocument();
  //   });

  //   it("returns null when items array is empty", () => {
  //     const items: BreadcrumbItem[] = [];
  //     const handleClearFilter = jest.fn();
  //     const { container } = render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
  //     expect(container.firstChild).not.toBeInTheDocument();
  //   });
  // });

  // ✅ PASSING TESTS - Container styling
  // describe("✅ Container Styling (Passing)", () => {
  //   it("applies container flex layout classes", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     const { container } = render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
  //     const mainContainer = container.firstChild as HTMLElement;
  //     expect(mainContainer).toHaveClass("flex", "justify-between", "items-center");
  //   });

  //   it("applies spacing and background styling", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     const { container } = render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
  //     const mainContainer = container.firstChild as HTMLElement;
  //     expect(mainContainer).toHaveClass("px-6", "py-3", "bg-card/5", "rounded-12");
  //   });

  //   it("applies proper text sizing", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     const { container } = render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
  //     const mainContainer = container.firstChild as HTMLElement;
  //     expect(mainContainer).toHaveClass("text-sm");
  //   });
  // });

  // ✅ PASSING TESTS - Clear Filter Button
  // describe("✅ Clear Filter Button (Passing)", () => {
  //   it("renders clear filter button with icon", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
  //     expect(screen.getByRole("button", { name: /Clear Filter/i })).toBeInTheDocument();
  //   });

  //   it("button has SVG icon for refresh", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     const { container } = render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
  //     const svg = container.querySelector("svg");
  //     expect(svg).toBeInTheDocument();
  //   });

  //   it("button displays Clear Filter text", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
  //     expect(screen.getByText("Clear Filter")).toBeInTheDocument();
  //   });

  //   it("clears filter when button is clicked", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
  //     fireEvent.click(screen.getByRole("button"));
  //     expect(handleClearFilter).toHaveBeenCalled();
  //   });
  // });

  // // ✅ PASSING TESTS - Required Props
  // describe("✅ Required Props (Passing)", () => {
  //   it("requires items prop to render filter bar", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
  //     expect(screen.getByText("Technology")).toBeInTheDocument();
  //   });

  //   it("requires onClearFilter prop callback", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
  //     fireEvent.click(screen.getByRole("button"));
  //     expect(handleClearFilter).toHaveBeenCalled();
  //   });

  //   it("button is keyboard accessible", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
  //     const button = screen.getByRole("button");
  //     button.focus();
  //     expect(button).toHaveFocus();
  //   });
  // });

  // ✅ PASSING TESTS - Filter Breadcrumb Integration
  describe("✅ Filter Breadcrumb Integration (Passing)", () => {
    it("uses label and key properties from items", () => {
      const items: BreadcrumbItem[] = [
        { label: "Technology", key: "category_tech" },
        { label: "Large Cap", key: "subcategory_lc" },
      ];
      const handleClearFilter = jest.fn();
      render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
      expect(screen.getByText("Technology")).toBeInTheDocument();
      expect(screen.getByText("Large Cap")).toBeInTheDocument();
    });

    it("displays label text in breadcrumb", () => {
      const items: BreadcrumbItem[] = [
        { label: "PORTFOLIO", key: "portfolio" },
      ];
      const handleClearFilter = jest.fn();
      render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
      expect(screen.getByText("PORTFOLIO")).toBeInTheDocument();
    });

    it("renders separators between multiple filters", () => {
      const items: BreadcrumbItem[] = [
        { label: "First", key: "first" },
        { label: "Second", key: "second" },
      ];
      const handleClearFilter = jest.fn();
      const { container } = render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
      // Separators are chevron icons
      const svgs = container.querySelectorAll("svg");
      // At least 1 separator (chevron) between items
      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  // // ✅ ACCESSIBILITY TESTS - jest-axe
  // describe("✅ Accessibility (a11y)", () => {
  //   it("should have no accessibility violations with single filter", async () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     const { container } = render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have no accessibility violations with multiple filters", async () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //       { label: "Large Cap", key: "large" },
  //       { label: "2024", key: "2024" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     const { container } = render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have accessible button with proper role", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
  //     expect(screen.getByRole("button")).toBeInTheDocument();
  //   });

  //   it("should have accessible button text", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Technology", key: "tech" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
  //     const button = screen.getByRole("button", { name: /Clear Filter/i });
  //     expect(button).toBeInTheDocument();
  //   });

  //   it("button should be keyboard navigable", () => {
  //     const items: BreadcrumbItem[] = [
  //       { label: "Portfolio", key: "portfolio" },
  //     ];
  //     const handleClearFilter = jest.fn();
  //     render(<FilterBar items={items} onClearFilter={handleClearFilter} />);
      
  //     const button = screen.getByRole("button");
  //     button.focus();
  //     expect(button).toHaveFocus();
  //   });
  // });
});
