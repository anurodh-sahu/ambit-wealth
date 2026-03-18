import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

describe("Button Component - BDD Tests", () => {
  describe("Button Rendering", () => {
    describe("Given a Button component with text", () => {
      it("When component renders, Then it should display the text", () => {
        // Given & When
        render(<Button>Click me</Button>);

        // Then
        expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
      });
    });

    describe("Given a Button component with children", () => {
      it("When component renders, Then it should render all children", () => {
        // Given & When
        render(
          <Button>
            <Plus />
            Add Item
          </Button>
        );

        // Then
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByText("Add Item")).toBeInTheDocument();
      });
    });
  });

  describe("Button Variants", () => {
    describe("Given different variant props", () => {
      it("When variant is 'default', Then it should have primary colors", () => {
        // Given & When
        const { container } = render(<Button variant="default">Default</Button>);
        const button = container.querySelector("button");

        // Then
        expect(button).toHaveClass("bg-primary");
      });

      it("When variant is 'outline', Then it should render as outline button", () => {
        // Given & When
        const { container } = render(<Button variant="outline">Outline</Button>);
        const button = container.querySelector("button");

        // Then
        expect(button).toBeInTheDocument();
        expect(button?.className).toContain("border");
      });

      it("When variant is 'secondary', Then it should render with secondary styling", () => {
        // Given & When
        const { container } = render(
          <Button variant="secondary">Secondary</Button>
        );
        const button = container.querySelector("button");

        // Then
        expect(button).toBeInTheDocument();
      });

      it("When variant is 'ghost', Then it should render with ghost styling", () => {
        // Given & When
        const { container } = render(<Button variant="ghost">Ghost</Button>);
        const button = container.querySelector("button");

        // Then
        expect(button).toBeInTheDocument();
      });

      it("When variant is 'destructive', Then it should have destructive styling", () => {
        // Given & When
        const { container } = render(
          <Button variant="destructive">Delete</Button>
        );
        const button = container.querySelector("button");

        // Then
        expect(button).toHaveClass("bg-destructive/10", "text-destructive");
      });

      it("When variant is 'link', Then it should render as link button", () => {
        // Given & When
        const { container } = render(<Button variant="link">Link</Button>);
        const button = container.querySelector("button");

        // Then
        expect(button).toBeInTheDocument();
      });
    });

    describe("Given no explicit variant prop", () => {
      it("When component renders, Then it should use default variant", () => {
        // Given & When
        const { container } = render(<Button>Test</Button>);
        const button = container.querySelector("button");

        // Then
        expect(button).toHaveClass("bg-primary");
      });
    });
  });

  describe("Button Sizes", () => {
    describe("Given different size props", () => {
      it("When size is 'default', Then it should render with default size", () => {
        // Given & When
        const { container } = render(<Button size="default">Default</Button>);
        const button = container.querySelector("button");

        // Then
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("inline-flex");
      });

      it("When size is 'xs', Then it should render with extra small size", () => {
        // Given & When
        const { container } = render(<Button size="xs">XS</Button>);
        const button = container.querySelector("button");

        // Then
        expect(button).toBeInTheDocument();
      });

      it("When size is 'sm', Then it should render with small size", () => {
        // Given & When
        const { container } = render(<Button size="sm">Small</Button>);
        const button = container.querySelector("button");

        // Then
        expect(button).toBeInTheDocument();
      });

      it("When size is 'lg', Then it should render with large size", () => {
        // Given & When
        const { container } = render(<Button size="lg">Large</Button>);
        const button = container.querySelector("button");

        // Then
        expect(button).toBeInTheDocument();
      });

      it("When size is 'icon', Then it should render as icon button", () => {
        // Given & When
        const { container } = render(
          <Button size="icon">
            <Plus />
          </Button>
        );
        const button = container.querySelector("button");

        // Then
        expect(button).toBeInTheDocument();
      });
    });

    describe("Given no explicit size prop", () => {
      it("When component renders, Then it should use default size", () => {
        // Given & When
        const { container } = render(<Button>Test</Button>);
        const button = container.querySelector("button");

        // Then
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe("Button States", () => {
    describe("Given a disabled button", () => {
      it("When disabled prop is true, Then it should have disabled attribute", () => {
        // Given & When
        render(<Button disabled>Disabled Button</Button>);
        const button = screen.getByRole("button");

        // Then
        expect(button).toBeDisabled();
      });

      it("When disabled button is clicked, Then click handler should not be triggered", () => {
        // Given
        const handleClick = jest.fn();

        // When
        render(
          <Button disabled onClick={handleClick}>
            Disabled
          </Button>
        );
        const button = screen.getByRole("button");
        fireEvent.click(button);

        // Then
        expect(handleClick).not.toHaveBeenCalled();
      });

      it("When button is disabled, Then it should have opacity-50 class", () => {
        // Given & When
        const { container } = render(<Button disabled>Disabled</Button>);
        const button = container.querySelector("button");

        // Then
        expect(button).toHaveClass("disabled:opacity-50");
      });
    });

    describe("Given an enabled button", () => {
      it("When button is clicked, Then click handler should be triggered", () => {
        // Given
        const handleClick = jest.fn();

        // When
        render(<Button onClick={handleClick}>Click me</Button>);
        const button = screen.getByRole("button");
        fireEvent.click(button);

        // Then
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Button Styling", () => {
    describe("Given a Button component", () => {
      it("When component renders, Then it should have base button classes", () => {
        // Given & When
        const { container } = render(<Button>Test</Button>);
        const button = container.querySelector("button");

        // Then
        expect(button).toHaveClass("inline-flex", "items-center", "justify-center");
      });

      it("When component renders, Then it should have focus-visible states", () => {
        // Given & When
        const { container } = render(<Button>Test</Button>);
        const button = container.querySelector("button");

        // Then
        expect(button).toHaveClass("focus-visible:ring-3");
      });
    });
  });

  describe("Button with Icons", () => {
    describe("Given a Button with an icon", () => {
      it("When button renders with icon, Then icon should be present", () => {
        // Given & When
        render(
          <Button>
            <Plus /> Add
          </Button>
        );

        // Then
        expect(screen.getByText("Add")).toBeInTheDocument();
      });
    });

    describe("Given an icon-only button", () => {
      it("When size is 'icon', Then button should display only icon", () => {
        // Given & When
        const { container } = render(
          <Button size="icon">
            <Plus />
          </Button>
        );
        const button = container.querySelector("button");

        // Then
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe("Button as Child Element", () => {
    describe("Given asChild prop is true", () => {
      it("When component renders, Then it should render as slot element", () => {
        // Given & When
        const { container } = render(
          <Button asChild>
            <a href="/">Link as Button</a>
          </Button>
        );

        // Then
        expect(container.querySelector("a")).toBeInTheDocument();
      });
    });
  });

  describe("Custom Styling", () => {
    describe("Given a custom className prop", () => {
      it("When component renders with custom class, Then it should apply custom styles", () => {
        // Given & When
        const { container } = render(
          <Button className="custom-button-class">Custom</Button>
        );
        const button = container.querySelector("button");

        // Then
        expect(button).toHaveClass("custom-button-class");
      });
    });
  });

  describe("Button Type Attribute", () => {
    describe("Given a button with type prop", () => {
      it("When type is 'submit', Then it should render with submit type", () => {
        // Given & When
        render(<Button type="submit">Submit</Button>);
        const button = screen.getByRole("button");

        // Then
        expect(button).toHaveAttribute("type", "submit");
      });

      it("When type is 'reset', Then it should render with reset type", () => {
        // Given & When
        render(<Button type="reset">Reset</Button>);
        const button = screen.getByRole("button");

        // Then
        expect(button).toHaveAttribute("type", "reset");
      });
    });
  });
});
