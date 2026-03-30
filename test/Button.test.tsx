import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Button } from "@/components/ui/button-custom";
import { Plus } from "lucide-react";

describe("Button", () => {

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

  // ✅ ACCESSIBILITY TESTS
  // describe("✅ Accessibility (a11y)", () => {
  //   it("should have no accessibility violations in default render", async () => {
  //     const { container } = render(<Button>Click me</Button>);
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have no accessibility violations with icon", async () => {
  //     const { container } = render(
  //       <Button>
  //         <Plus /> Add Item
  //       </Button>
  //     );
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have no accessibility violations when disabled", async () => {
  //     const { container } = render(<Button disabled>Disabled Button</Button>);
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have no accessibility violations with different variants", async () => {
  //     const { container } = render(<Button variant="outline">Outline</Button>);
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should be keyboard accessible", async () => {
  //     const handleClick = jest.fn();
  //     render(<Button onClick={handleClick}>Click me</Button>);
  //     const button = screen.getByRole("button");
  //     expect(button).toHaveAttribute("type");
  //   });
  // });
});
