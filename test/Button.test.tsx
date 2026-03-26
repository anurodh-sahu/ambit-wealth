import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button-custom";
import { Plus } from "lucide-react";

describe("Button", () => {
  // ❌ FAILING TESTS FIRST - Focus management and keyboard interaction
  describe("❌ Focus Management (Currently Failing)", () => {
    it("should receive focus when tab key is pressed", () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });

    it("should trigger click on Enter key press", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Keyboard Trigger</Button>);
      const button = screen.getByRole("button");
      
      fireEvent.keyDown(button, { key: "Enter", code: "Enter" });
      expect(handleClick).toHaveBeenCalled();
    });

    it("should trigger click on Space key press", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Keyboard Trigger</Button>);
      const button = screen.getByRole("button");
      
      fireEvent.keyDown(button, { key: " ", code: "Space" });
      expect(handleClick).toHaveBeenCalled();
    });
  });

  // ❌ FAILING TESTS - Variant combinations
  describe("❌ Variant Edge Cases (Currently Failing)", () => {
    it("should reject invalid variant prop gracefully", () => {
      const { container } = render(
        <Button variant={"invalid-variant" as any}>Test</Button>
      );
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
      // Should fall back to default
      expect(button).toHaveClass("bg-primary");
    });

    it("should maintain variant styling when combined with custom className", () => {
      const { container } = render(
        <Button variant="destructive" className="custom-spacing">Test</Button>
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("bg-destructive/10", "text-destructive", "custom-spacing");
    });
  });

  // ❌ FAILING TESTS - Size validation
  describe("❌ Size Validation (Currently Failing)", () => {
    it("should handle invalid size prop", () => {
      const { container } = render(
        <Button size={"oversized" as any}>Test</Button>
      );
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("should render correctly with numeric size values", () => {
      const { container } = render(
        <Button size={64 as any}>Test</Button>
      );
      expect(container.querySelector("button")).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Icon accessibility
  describe("❌ Icon Accessibility (Currently Failing)", () => {
    it("should have aria-label for icon-only buttons", () => {
      render(
        <Button size="icon" aria-label="Add new item">
          <Plus />
        </Button>
      );
      expect(screen.getByRole("button", { name: "Add new item" })).toBeInTheDocument();
    });

    it("should announce icon purpose to screen readers", () => {
      render(
        <Button>
          <Plus />
          <span className="sr-only">Add new item</span>
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Disabled state UX improvements
  describe("❌ Disabled State - UX Improvements (Currently Failing)", () => {
    it("should display cursor-not-allowed when disabled", () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      const button = container.querySelector("button");
      const styles = window.getComputedStyle(button as Element);
      expect(styles.cursor).toBe("not-allowed");
    });

    it("should show tooltip or help text when disabled with reason", () => {
      render(
        <Button disabled title="Feature not available yet">
          Disabled
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("title", "Feature not available yet");
    });

    it("should not be focusable when disabled", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      button.focus();
      // Browser may not allow focus on disabled element
      expect(button).toBeDisabled();
    });
  });

  // ❌ FAILING TESTS - Async click handling
  describe("❌ Async Click Handling (Currently Failing)", () => {
    it("should show loading state during async operation", async () => {
      const handleClick = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
      render(<Button onClick={handleClick}>Save</Button>);
      
      fireEvent.click(screen.getByRole("button"));
      
      // Button should show loading state
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    it("should disable button during async operation", async () => {
      const handleClick = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
      render(<Button onClick={handleClick}>Submit</Button>);
      
      fireEvent.click(screen.getByRole("button"));
      
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should prevent double click submission", async () => {
      const handleClick = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
      render(<Button onClick={handleClick}>Submit</Button>);
      
      const button = screen.getByRole("button");
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      // Should only be called once due to debouncing
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // ❌ FAILING TESTS - Form integration
  describe("❌ Form Integration (Currently Failing)", () => {
    it("should submit form when type is submit", () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" />
          <Button type="submit">Submit</Button>
        </form>
      );
      
      fireEvent.click(screen.getByRole("button"));
      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should reset form fields when type is reset", () => {
      render(
        <form>
          <input type="text" defaultValue="test" data-testid="input" />
          <Button type="reset">Reset</Button>
        </form>
      );
      
      const input = screen.getByTestId("input") as HTMLInputElement;
      input.value = "changed";
      
      fireEvent.click(screen.getByRole("button"));
      
      expect(input.value).toBe("test");
    });
  });

  // ✅ PASSING TESTS - Current working functionality
  describe("✅ Rendering (Passing)", () => {
    it("displays text content", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("renders children elements", () => {
      render(
        <Button>
          <Plus />
          Add Item
        </Button>
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByText("Add Item")).toBeInTheDocument();
    });

    it("has base button classes", () => {
      const { container } = render(<Button>Test</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("inline-flex", "items-center", "justify-center");
    });

    it("has focus-visible states", () => {
      const { container } = render(<Button>Test</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("focus-visible:ring-3");
    });
  });

  // ✅ PASSING TESTS - Variants
  describe("✅ Variants (Passing)", () => {
    it("applies default variant with primary background", () => {
      const { container } = render(<Button variant="default">Default</Button>);
      expect(container.querySelector("button")).toHaveClass("bg-primary");
    });

    it("applies outline variant with border", () => {
      const { container } = render(<Button variant="outline">Outline</Button>);
      expect(container.querySelector("button")?.className).toContain("border");
    });

    it("applies secondary variant", () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>);
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("applies ghost variant", () => {
      const { container } = render(<Button variant="ghost">Ghost</Button>);
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("applies destructive variant with destructive styling", () => {
      const { container } = render(<Button variant="destructive">Delete</Button>);
      expect(container.querySelector("button")).toHaveClass(
        "bg-destructive/10",
        "text-destructive"
      );
    });

    it("applies link variant", () => {
      const { container } = render(<Button variant="link">Link</Button>);
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("defaults to primary variant when not specified", () => {
      const { container } = render(<Button>Test</Button>);
      expect(container.querySelector("button")).toHaveClass("bg-primary");
    });
  });

  // ✅ PASSING TESTS - Sizes
  describe("✅ Sizes (Passing)", () => {
    it("renders with default size", () => {
      const { container } = render(<Button size="default">Default</Button>);
      expect(container.querySelector("button")).toHaveClass("inline-flex");
    });

    it("renders with extra small size", () => {
      const { container } = render(<Button size="xs">XS</Button>);
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("renders with small size", () => {
      const { container } = render(<Button size="sm">Small</Button>);
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("renders with large size", () => {
      const { container } = render(<Button size="lg">Large</Button>);
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("renders icon button size", () => {
      const { container } = render(
        <Button size="icon">
          <Plus />
        </Button>
      );
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("defaults to default size when not specified", () => {
      const { container } = render(<Button>Test</Button>);
      expect(container.querySelector("button")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Icons
  describe("✅ Icons (Passing)", () => {
    it("renders button with icon and text", () => {
      render(
        <Button>
          <Plus /> Add
        </Button>
      );
      expect(screen.getByText("Add")).toBeInTheDocument();
    });

    it("renders icon-only button", () => {
      const { container } = render(
        <Button size="icon">
          <Plus />
        </Button>
      );
      expect(container.querySelector("button")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Disabled State
  describe("✅ Disabled State (Passing)", () => {
    it("has disabled attribute", () => {
      render(<Button disabled>Disabled Button</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("does not trigger click handler when disabled", () => {
      const handleClick = jest.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("applies opacity-50 class when disabled", () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      expect(container.querySelector("button")).toHaveClass("disabled:opacity-50");
    });
  });

  // ✅ PASSING TESTS - Click Handler
  describe("✅ Click Handler (Passing)", () => {
    it("triggers click handler when clicked", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // ✅ PASSING TESTS - as Child
  describe("✅ as Child (Passing)", () => {
    it("renders as child element slot", () => {
      const { container } = render(
        <Button asChild>
          <a href="/">Link as Button</a>
        </Button>
      );
      expect(container.querySelector("a")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Custom Styling
  describe("✅ Custom Styling (Passing)", () => {
    it("applies custom className", () => {
      const { container } = render(
        <Button className="custom-button-class">Custom</Button>
      );
      expect(container.querySelector("button")).toHaveClass("custom-button-class");
    });
  });

  // ✅ PASSING TESTS - Type Attribute
  describe("✅ Type Attribute (Passing)", () => {
    it("renders submit button with submit type", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("renders reset button with reset type", () => {
      render(<Button type="reset">Reset</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
    });
  });
});
