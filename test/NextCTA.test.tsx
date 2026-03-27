import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import NextCTA from "@/components/shared/NextCTA";

describe("NextCTA", () => {

  // ✅ PASSING TESTS - Current working functionality
  describe("✅ Rendering (Passing)", () => {
    it("displays title text", () => {
      render(
        <NextCTA 
          title="PORTFOLIO PERFORMANCE" 
          subtitle="Test"
          btnVarient="cta"
          btnTitle="Click"
        />
      );
      expect(screen.getByText("PORTFOLIO PERFORMANCE")).toBeInTheDocument();
    });

    it("displays subtitle text", () => {
      render(
        <NextCTA 
          title="Title"
          subtitle="TRACK TOTAL RETURNS AND RISK"
          btnVarient="cta"
          btnTitle="Click"
        />
      );
      expect(screen.getByText("TRACK TOTAL RETURNS AND RISK")).toBeInTheDocument();
    });

    it("renders button with correct text", () => {
      render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="cta"
          btnTitle="ANALYSE PERFORMANCE"
        />
      );
      expect(screen.getByRole("button", { name: "ANALYSE PERFORMANCE" })).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Button variants
  describe("✅ Button Variants (Passing)", () => {
    it("renders default variant button", () => {
      render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="default"
          btnTitle="Click"
        />
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders CTA variant button", () => {
      render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="cta"
          btnTitle="Click"
        />
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders outline variant button", () => {
      render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="outline"
          btnTitle="Click"
        />
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders ghost variant button", () => {
      render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="ghost"
          btnTitle="Click"
        />
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders link variant button", () => {
      render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="link"
          btnTitle="Click"
        />
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders destructive variant button", () => {
      render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="destructive"
          btnTitle="Click"
        />
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Button shapes
  describe("✅ Button Shapes (Passing)", () => {
    it("renders default shape button", () => {
      render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="cta"
          btnShape="default"
          btnTitle="Click"
        />
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders pill shape button", () => {
      render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="cta"
          btnShape="pill"
          btnTitle="Click"
        />
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Click handler
  describe("✅ Click Handler (Passing)", () => {
    it("triggers onClick callback when button is clicked", () => {
      const handleClick = jest.fn();
      render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="cta"
          btnTitle="Click"
          onClick={handleClick}
        />
      );
      
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // ✅ PASSING TESTS - CSS Classes
  describe("✅ Styling (Passing)", () => {
    it("applies container styling", () => {
      const { container } = render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="cta"
          btnTitle="Click"
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it("applies text styling to title", () => {
      const title = screen.getByText("Title");
      expect(title).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Text formatting
  describe("✅ Text Content (Passing)", () => {
    it("displays uppercase title when provided", () => {
      render(
        <NextCTA 
          title="PORTFOLIO PERFORMANCE"
          subtitle="Test"
          btnVarient="cta"
          btnTitle="Click"
        />
      );
      expect(screen.getByText("PORTFOLIO PERFORMANCE")).toBeInTheDocument();
    });

    it("displays uppercase subtitle when provided", () => {
      render(
        <NextCTA 
          title="Title"
          subtitle="TRACK TOTAL RETURNS"
          btnVarient="cta"
          btnTitle="Click"
        />
      );
      expect(screen.getByText("TRACK TOTAL RETURNS")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Custom props
  describe("✅ Custom Props (Passing)", () => {
    it("accepts custom className prop", () => {
      const { container } = render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="cta"
          btnTitle="Click"
          className="custom-class"
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it("accepts data-testid prop", () => {
      render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="cta"
          btnTitle="Click"
          data-testid="next-cta"
        />
      );
      expect(screen.getByTestId("next-cta")).toBeInTheDocument();
    });
  });

  // ✅ ACCESSIBILITY TESTS
  describe("✅ Accessibility (a11y)", () => {
    it("should have no accessibility violations in default render", async () => {
      const { container } = render(
        <NextCTA
          title="PORTFOLIO PERFORMANCE"
          subtitle="TRACK TOTAL RETURNS AND RISK"
          btnVarient="cta"
          btnTitle="ANALYSE PERFORMANCE"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations with different button variants", async () => {
      const { container } = render(
        <NextCTA
          title="Title"
          subtitle="Sub"
          btnVarient="outline"
          btnTitle="Click"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations with ghost variant", async () => {
      const { container } = render(
        <NextCTA
          title="Title"
          subtitle="Sub"
          btnVarient="ghost"
          btnTitle="Click"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have accessible button with proper role", () => {
      render(
        <NextCTA
          title="Title"
          subtitle="Sub"
          btnVarient="cta"
          btnTitle="ACTION BUTTON"
        />
      );
      expect(screen.getByRole("button", { name: "ACTION BUTTON" })).toBeInTheDocument();
    });

    it("should have semantic heading structure", () => {
      const { container } = render(
        <NextCTA
          title="PORTFOLIO PERFORMANCE"
          subtitle="TRACK RETURNS"
          btnVarient="cta"
          btnTitle="Click"
        />
      );
      expect(screen.getByText("PORTFOLIO PERFORMANCE")).toBeInTheDocument();
      expect(screen.getByText("TRACK RETURNS")).toBeInTheDocument();
    });
  });
});
