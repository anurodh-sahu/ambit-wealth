import { render, screen } from "@testing-library/react";
import { BubbleAvatar } from "@/components/shared/BubbleAvatar";

describe("BubbleAvatar", () => {
  // ❌ FAILING TESTS FIRST - Edge cases and error handling (not yet implemented)
  describe("❌ Initials Generation - Edge Cases (Currently Failing)", () => {
    it("should handle null name gracefully", () => {
      const { container } = render(<BubbleAvatar name={null as any} />);
      expect(container.querySelector('[class*="rounded-full"]')).toBeInTheDocument();
    });

    it("should handle undefined name gracefully", () => {
      const { container } = render(<BubbleAvatar name={undefined as any} />);
      expect(container.querySelector('[class*="rounded-full"]')).toBeInTheDocument();
    });

    it("should display fallback avatar when name contains only numbers", () => {
      render(<BubbleAvatar name="12345" />);
      // Should handle gracefully instead of showing "11"
      expect(screen.queryByText("11")).not.toBeInTheDocument();
    });

    it("should generate consistent color for same name across renders", () => {
      const { rerender } = render(<BubbleAvatar name="John Doe" />);
      const color1 = document.querySelector('[class*="rounded-full"]')?.className;
      
      rerender(<BubbleAvatar name="John Doe" />);
      const color2 = document.querySelector('[class*="rounded-full"]')?.className;
      
      expect(color1).toBe(color2);
    });

    it("should NOT display initials if name contains only special characters", () => {
      render(<BubbleAvatar name="@#$%" />);
      expect(screen.queryByText("@@")).not.toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Invalid size prop handling
  describe("❌ Size Variants - Edge Cases (Currently Failing)", () => {
    it("should fall back to default size when invalid size prop is provided", () => {
      const { container } = render(
        <BubbleAvatar name="John Doe" size={"invalid" as any} />
      );
      // Should default to md
      expect(container.firstChild).toHaveClass("h-8", "w-8", "text-sm");
    });

    it("should handle numeric size values gracefully", () => {
      const { container } = render(
        <BubbleAvatar name="John Doe" size={48 as any} />
      );
      expect(container.querySelector('[class*="rounded-full"]')).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Color theming
  describe("❌ Styling - Color Variants (Currently Failing)", () => {
    it("should apply different background colors based on name hash", () => {
      const { rerender, container: container1 } = render(
        <BubbleAvatar name="Alice Smith" />
      );
      const color1 = getComputedStyle(container1.firstChild as Element).backgroundColor;

      rerender(<BubbleAvatar name="Bob Johnson" />);
      const container2 = document.querySelector('[class*="rounded-full"]');
      const color2 = getComputedStyle(container2 as Element).backgroundColor;

      // Different names should likely have different colors
      expect(color1).not.toBe(color2);
    });

    it("should support custom background color prop", () => {
      const { container } = render(
        <BubbleAvatar name="John Doe" bgColor="bg-primary" />
      );
      expect(container.firstChild).toHaveClass("bg-primary");
    });
  });

  // ❌ FAILING TESTS - Accessibility improvements
  describe("❌ Accessibility (Currently Failing)", () => {
    it("should announce initials to screen readers automatically", () => {
      render(<BubbleAvatar name="John Doe" />);
      const avatar = screen.getByRole("img", { hidden: true });
      expect(avatar).toHaveAttribute("aria-label");
      expect(avatar.getAttribute("aria-label")).toContain("JD");
    });

    it("should have proper role attribute", () => {
      const { container } = render(<BubbleAvatar name="John Doe" />);
      expect(container.firstChild).toHaveAttribute("role", "img");
    });

    it("should provide helpful aria-description", () => {
      render(
        <BubbleAvatar
          name="John Doe"
          aria-description="Avatar for John Doe"
        />
      );
      const avatar = document.querySelector('[aria-description]');
      expect(avatar).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Current working functionality
  describe("✅ Initials Generation (Passing)", () => {
    it("generates initials from first and last name", () => {
      render(<BubbleAvatar name="John Doe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("generates initial from single name", () => {
      render(<BubbleAvatar name="Alice" />);
      expect(screen.getByText("A")).toBeInTheDocument();
    });

    it("generates initials from first and last name in three-part name", () => {
      render(<BubbleAvatar name="Mary Jane Watson" />);
      expect(screen.getByText("MW")).toBeInTheDocument();
    });

    it("handles names with extra spaces", () => {
      render(<BubbleAvatar name="  Peter   Parker  " />);
      expect(screen.getByText("PP")).toBeInTheDocument();
    });

    it("renders empty string for empty name", () => {
      const { container } = render(<BubbleAvatar name="" />);
      const avatar = container.querySelector('[class*="rounded-full"]');
      expect(avatar?.textContent).toBe("");
    });
  });

  // ✅ PASSING TESTS - Size variants
  describe("✅ Size Variants (Passing)", () => {
    it("applies small size classes when size is sm", () => {
      const { container } = render(
        <BubbleAvatar name="John Doe" size="sm" />
      );
      expect(container.firstChild).toHaveClass("h-6", "w-6", "text-xs");
    });

    it("applies medium size classes when size is md", () => {
      const { container } = render(
        <BubbleAvatar name="John Doe" size="md" />
      );
      expect(container.firstChild).toHaveClass("h-8", "w-8", "text-sm");
    });

    it("applies large size classes when size is lg", () => {
      const { container } = render(
        <BubbleAvatar name="John Doe" size="lg" />
      );
      expect(container.firstChild).toHaveClass("h-10", "w-10", "text-base");
    });

    it("applies extra large size classes when size is xl", () => {
      const { container } = render(
        <BubbleAvatar name="John Doe" size="xl" />
      );
      expect(container.firstChild).toHaveClass("h-14", "w-14", "text-lg");
    });

    it("uses default md size when size prop is not provided", () => {
      const { container } = render(<BubbleAvatar name="John Doe" />);
      expect(container.firstChild).toHaveClass("h-8", "w-8", "text-sm");
    });
  });

  // ✅ PASSING TESTS - Styling
  describe("✅ Styling (Passing)", () => {
    it("applies secondary background and text color", () => {
      const { container } = render(<BubbleAvatar name="John Doe" />);
      expect(container.firstChild).toHaveClass(
        "bg-secondary",
        "text-secondary-foreground"
      );
    });

    it("applies rounded-full class", () => {
      const { container } = render(<BubbleAvatar name="John Doe" />);
      expect(container.firstChild).toHaveClass("rounded-full");
    });

    it("applies flex centering classes", () => {
      const { container } = render(<BubbleAvatar name="John Doe" />);
      expect(container.firstChild).toHaveClass(
        "flex",
        "items-center",
        "justify-center"
      );
    });

    it("applies custom className", () => {
      const { container } = render(
        <BubbleAvatar name="John Doe" className="custom-class" />
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  // ✅ PASSING TESTS - HTML attributes
  describe("✅ HTML Attributes (Passing)", () => {
    it("supports data-testid attribute", () => {
      render(
        <BubbleAvatar name="John Doe" data-testid="custom-avatar" />
      );
      expect(screen.getByTestId("custom-avatar")).toBeInTheDocument();
    });

    it("supports aria-label for accessibility", () => {
      render(<BubbleAvatar name="John Doe" aria-label="User Avatar" />);
      expect(screen.getByLabelText("User Avatar")).toBeInTheDocument();
    });
  });
});
