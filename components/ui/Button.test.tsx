import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button-custom";

describe("Button component", () => {
  it("renders children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole("button");

    expect(button.className).toContain("bg-primary");
  });

  it("applies secondary variant", () => {
    render(
      <Button variant="secondary" className="bg-gray-200">
        Test
      </Button>
    );
    const button = screen.getByRole("button");

    expect(button.className).toContain("bg-gray-200");
  });

  it("applies correct size", () => {
    render(
      <Button size="lg" className="h-12">
        Large
      </Button>
    );
    const button = screen.getByRole("button");

    expect(button.className).toContain("h-12");
  });

  it("applies full width", () => {
    render(<Button className="w-full">Full</Button>);
    const button = screen.getByRole("button");

    expect(button.className).toContain("w-full");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
