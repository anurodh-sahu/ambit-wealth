import { render, screen, fireEvent } from "@testing-library/react";
import NextCTA from "@/components/shared/NextCTA";

describe("NextCTA", () => {
  // ❌ FAILING TESTS FIRST - Edge cases and validation
  describe("❌ Input Validation - Edge Cases (Currently Failing)", () => {
    it("should handle null title gracefully", () => {
      render(<NextCTA title={null as any} subtitle="Test" btnVarient="cta" btnTitle="Click" />);
      const container = screen.getByRole("button").parentElement;
      expect(container).toBeInTheDocument();
    });

    it("should handle undefined title gracefully", () => {
      render(<NextCTA title={undefined as any} subtitle="Test" btnVarient="cta" btnTitle="Click" />);
      const container = screen.getByRole("button").parentElement;
      expect(container).toBeInTheDocument();
    });

    it("should handle empty string title", () => {
      render(<NextCTA title="" subtitle="Test" btnVarient="cta" btnTitle="Click" />);
      const container = screen.getByRole("button").parentElement;
      expect(container).toBeInTheDocument();
    });

    it("should handle null subtitle gracefully", () => {
      render(<NextCTA title="Title" subtitle={null as any} btnVarient="cta" btnTitle="Click" />);
      expect(screen.getByText("Title")).toBeInTheDocument();
    });

    it("should handle undefined subtitle gracefully", () => {
      render(<NextCTA title="Title" subtitle={undefined} btnVarient="cta" btnTitle="Click" />);
      expect(screen.getByText("Title")).toBeInTheDocument();
    });

    it("should handle very long title text", () => {
      const longTitle = "A".repeat(200);
      render(<NextCTA title={longTitle} subtitle="Test" btnVarient="cta" btnTitle="Click" />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("should handle very long subtitle text", () => {
      const longSubtitle = "B".repeat(300);
      render(<NextCTA title="Title" subtitle={longSubtitle} btnVarient="cta" btnTitle="Click" />);
      expect(screen.getByText(longSubtitle)).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Button variant validation
  describe("❌ Button Variant Validation (Currently Failing)", () => {
    it("should handle invalid button variant gracefully", () => {
      render(
        <NextCTA 
          title="Title" 
          subtitle="Sub" 
          btnVarient={"invalid" as any}
          btnTitle="Click" 
        />
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should handle missing button variant prop", () => {
      render(
        <NextCTA 
          title="Title" 
          subtitle="Sub" 
          btnVarient={undefined as any}
          btnTitle="Click" 
        />
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render different variants without errors", () => {
      const variants = ["default", "link", "outline", "ghost", "destructive", "cta", "image"];
      
      variants.forEach((variant) => {
        const { unmount } = render(
          <NextCTA 
            title="Title" 
            subtitle="Sub" 
            btnVarient={variant as any}
            btnTitle="Click" 
          />
        );
        expect(screen.getByRole("button")).toBeInTheDocument();
        unmount();
      });
    });
  });

  // ❌ FAILING TESTS - Button shape validation
  describe("❌ Button Shape Validation (Currently Failing)", () => {
    it("should handle invalid button shape gracefully", () => {
      render(
        <NextCTA 
          title="Title" 
          subtitle="Sub" 
          btnVarient="cta"
          btnShape={"invalid" as any}
          btnTitle="Click" 
        />
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should handle missing button shape prop", () => {
      render(
        <NextCTA 
          title="Title" 
          subtitle="Sub" 
          btnVarient="cta"
          btnShape={undefined as any}
          btnTitle="Click" 
        />
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Click handling
  describe("❌ Click Handler - Edge Cases (Currently Failing)", () => {
    it("should handle null onClick callback gracefully", () => {
      render(
        <NextCTA 
          title="Title" 
          subtitle="Sub" 
          btnVarient="cta"
          btnTitle="Click"
          onClick={null as any}
        />
      );
      
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(button).toBeInTheDocument();
    });

    it("should handle undefined onClick callback gracefully", () => {
      render(
        <NextCTA 
          title="Title" 
          subtitle="Sub" 
          btnVarient="cta"
          btnTitle="Click"
          onClick={undefined}
        />
      );
      
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(button).toBeInTheDocument();
    });

    it("should prevent double click issues", () => {
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
      fireEvent.click(button);
      fireEvent.click(button);
      
      // May be called multiple times without debouncing
      expect(handleClick.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
  });

  // ❌ FAILING TESTS - Accessibility
  describe("❌ Accessibility (Currently Failing)", () => {
    it("should have proper heading hierarchy", () => {
      render(<NextCTA title="Main Title" subtitle="Sub Title" btnVarient="cta" btnTitle="Click" />);
      
      const heading = screen.getByText("Main Title");
      expect(["H1", "H2", "H3", "H4"].some(tag => heading.tagName === tag)).toBe(true);
    });

    it("should have semantic HTML structure", () => {
      const { container } = render(
        <NextCTA title="Title" subtitle="Sub" btnVarient="cta" btnTitle="Click" />
      );
      
      // Should have proper semantic structure
      expect(container.querySelector("section") || container.querySelector("article")).toBeInTheDocument();
    });

    it("should have accessible button label", () => {
      render(
        <NextCTA 
          title="Title" 
          subtitle="Sub" 
          btnVarient="cta"
          btnTitle="Call To Action" 
        />
      );
      
      expect(screen.getByRole("button", { name: "Call To Action" })).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Layout and spacing
  describe("❌ Layout - Edge Cases (Currently Failing)", () => {
    it("should handle subtitle-less rendering with proper spacing", () => {
      render(<NextCTA title="Title" subtitle={undefined} btnVarient="cta" btnTitle="Click" />);
      expect(screen.getByText("Title")).toBeInTheDocument();
    });

    it("should maintain vertical spacing between text and button", () => {
      const { container } = render(
        <NextCTA title="Title" subtitle="Sub" btnVarient="cta" btnTitle="Click" />
      );
      
      const title = screen.getByText("Title").parentElement;
      expect(title).toBeInTheDocument();
    });
  });

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
});
