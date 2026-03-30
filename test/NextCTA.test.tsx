import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import NextCTA from "@/components/shared/NextCTA";

describe("NextCTA", () => {

  // // ✅ PASSING TESTS - Current working functionality
  // describe("✅ Rendering (Passing)", () => {
  //   it("displays title text", () => {
  //     render(
  //       <NextCTA 
  //         title="PORTFOLIO PERFORMANCE" 
  //         subtitle="Test"
  //         btnVarient="cta"
  //         btnTitle="Click"
  //       />
  //     );
  //     expect(screen.getByText("PORTFOLIO PERFORMANCE")).toBeInTheDocument();
  //   });

  //   it("displays subtitle text", () => {
  //     render(
  //       <NextCTA 
  //         title="Title"
  //         subtitle="TRACK TOTAL RETURNS AND RISK"
  //         btnVarient="cta"
  //         btnTitle="Click"
  //       />
  //     );
  //     expect(screen.getByText("TRACK TOTAL RETURNS AND RISK")).toBeInTheDocument();
  //   });

  //   it("renders button with correct text", () => {
  //     render(
  //       <NextCTA 
  //         title="Title"
  //         subtitle="Sub"
  //         btnVarient="cta"
  //         btnTitle="ANALYSE PERFORMANCE"
  //       />
  //     );
  //     expect(screen.getByRole("button", { name: "ANALYSE PERFORMANCE" })).toBeInTheDocument();
  //   });
  // });

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
      expect(handleClick).toHaveBeenCalled();
    });

    it("passes correct onClick handler to button", () => {
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
      
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // ✅ PASSING TESTS - Styling and structure
  describe("✅ Styling (Passing)", () => {
    it("applies container styling", () => {
      const handleClick = jest.fn();
      const { container } = render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="cta"
          btnTitle="Click"
          onClick={handleClick}
        />
      );
      const mainContainer = container.querySelector("div.mt-20");
      expect(mainContainer).toHaveClass("rounded-[26px]", "overflow-hidden", "max-h-[390px]");
    });

    it("applies text styling to title and subtitle", () => {
      const handleClick = jest.fn();
      render(
        <NextCTA 
          title="PORTFOLIO PERFORMANCE"
          subtitle="TRACK RETURNS"
          btnVarient="cta"
          btnTitle="Click"
          onClick={handleClick}
        />
      );
      expect(screen.getByText("PORTFOLIO PERFORMANCE")).toBeInTheDocument();
      expect(screen.getByText("TRACK RETURNS")).toBeInTheDocument();
    });

    it("wraps title in span with correct classes", () => {
      const handleClick = jest.fn();
      const { container } = render(
        <NextCTA 
          title="Title"
          subtitle="Sub"
          btnVarient="cta"
          btnTitle="Click"
          onClick={handleClick}
        />
      );
      const titleSpan = container.querySelector("span.text-black.font-normal");
      expect(titleSpan).toBeInTheDocument();
      expect(titleSpan).toHaveTextContent("Title");
    });
  });

  // ✅ PASSING TESTS - Text formatting
  // describe("✅ Text Content (Passing)", () => {
  //   it("displays uppercase title when provided", () => {
  //     render(
  //       <NextCTA 
  //         title="PORTFOLIO PERFORMANCE"
  //         subtitle="Test"
  //         btnVarient="cta"
  //         btnTitle="Click"
  //       />
  //     );
  //     expect(screen.getByText("PORTFOLIO PERFORMANCE")).toBeInTheDocument();
  //   });

  //   it("displays uppercase subtitle when provided", () => {
  //     render(
  //       <NextCTA 
  //         title="Title"
  //         subtitle="TRACK TOTAL RETURNS"
  //         btnVarient="cta"
  //         btnTitle="Click"
  //       />
  //     );
  //     expect(screen.getByText("TRACK TOTAL RETURNS")).toBeInTheDocument();
  //   });
  // });

  // ✅ PASSING TESTS - Required props
  describe("✅ Required Props (Passing)", () => {
    it("requires title prop and renders it", () => {
      const handleClick = jest.fn();
      render(
        <NextCTA 
          title="REQUIRED TITLE"
          subtitle="Sub"
          btnVarient="cta"
          btnTitle="Click"
          onClick={handleClick}
        />
      );
      expect(screen.getByText("REQUIRED TITLE")).toBeInTheDocument();
    });

    it("requires onClick prop and calls it on button click", () => {
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
      expect(handleClick).toHaveBeenCalled();
    });

    it("renders with optional subtitle", () => {
      const handleClick = jest.fn();
      render(
        <NextCTA 
          title="Title"
          subtitle="Optional subtitle"
          btnVarient="cta"
          btnTitle="Click"
          onClick={handleClick}
        />
      );
      expect(screen.getByText("Optional subtitle")).toBeInTheDocument();
    });
  });

  // // ✅ ACCESSIBILITY TESTS - jest-axe
  // describe("✅ Accessibility (a11y)", () => {
  //   it("should have no accessibility violations in default render", async () => {
  //     const handleClick = jest.fn();
  //     const { container } = render(
  //       <NextCTA
  //         title="PORTFOLIO PERFORMANCE"
  //         subtitle="TRACK TOTAL RETURNS AND RISK"
  //         btnVarient="cta"
  //         btnTitle="ANALYSE PERFORMANCE"
  //         onClick={handleClick}
  //       />
  //     );
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have no accessibility violations with different button variants", async () => {
  //     const handleClick = jest.fn();
  //     const { container } = render(
  //       <NextCTA
  //         title="Title"
  //         subtitle="Sub"
  //         btnVarient="outline"
  //         btnTitle="Click"
  //         onClick={handleClick}
  //       />
  //     );
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have no accessibility violations with ghost variant", async () => {
  //     const handleClick = jest.fn();
  //     const { container } = render(
  //       <NextCTA
  //         title="Title"
  //         subtitle="Sub"
  //         btnVarient="ghost"
  //         btnTitle="Click"
  //         onClick={handleClick}
  //       />
  //     );
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have accessible button with proper role", () => {
  //     const handleClick = jest.fn();
  //     render(
  //       <NextCTA
  //         title="Title"
  //         subtitle="Sub"
  //         btnVarient="cta"
  //         btnTitle="ACTION BUTTON"
  //         onClick={handleClick}
  //       />
  //     );
  //     expect(screen.getByRole("button", { name: /ACTION BUTTON/i })).toBeInTheDocument();
  //   });

  //   it("should have semantic content structure", () => {
  //     const handleClick = jest.fn();
  //     render(
  //       <NextCTA
  //         title="PORTFOLIO PERFORMANCE"
  //         subtitle="TRACK RETURNS"
  //         btnVarient="cta"
  //         btnTitle="Click"
  //         onClick={handleClick}
  //       />
  //     );
  //     expect(screen.getByText("PORTFOLIO PERFORMANCE")).toBeInTheDocument();
  //     expect(screen.getByText("TRACK RETURNS")).toBeInTheDocument();
  //     expect(screen.getByRole("button")).toBeInTheDocument();
  //   });
  // });
});
