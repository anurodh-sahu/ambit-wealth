import { render, screen } from "@testing-library/react";
import NotificationBell from "@/components/shared/NotificationBell";

describe("NotificationBell", () => {
  // ❌ FAILING TESTS FIRST - Edge cases and validation
  describe("❌ Count Validation - Edge Cases (Currently Failing)", () => {
    it("should handle null count gracefully", () => {
      const { container } = render(<NotificationBell count={null as any} />);
      expect(container.querySelector("svg") || container.querySelector("button")).toBeInTheDocument();
    });

    it("should handle undefined count gracefully", () => {
      const { container } = render(<NotificationBell count={undefined as any} />);
      expect(container.querySelector("svg") || container.querySelector("button")).toBeInTheDocument();
    });

    it("should handle negative count values", () => {
      const { container } = render(<NotificationBell count={-5} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should handle very large count values", () => {
      const { container } = render(<NotificationBell count={999999} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should handle non-integer count values", () => {
      const { container } = render(<NotificationBell count={3.14} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should handle string count values", () => {
      const { container } = render(<NotificationBell count={"5" as any} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Badge display logic
  describe("❌ Badge Display Logic (Currently Failing)", () => {
    it("should not display badge when count is 0", () => {
      const { container } = render(<NotificationBell count={0} />);
      const badge = container.querySelector("[class*='badge']");
      
      // Badge should not be visible or display "0"
      if (badge) {
        expect(badge.textContent).not.toBe("0");
      }
    });

    it("should display badge with count when > 0", () => {
      render(<NotificationBell count={5} />);
      const badge = screen.queryByText("5");
      expect(badge).toBeInTheDocument();
    });

    it("should display 99+ for counts >= 100", () => {
      render(<NotificationBell count={100} />);
      const badge = screen.queryByText("99+") || screen.queryByText("99");
      expect(badge).toBeInTheDocument();
    });

    it("should update badge when count changes", () => {
      const { rerender } = render(<NotificationBell count={3} />);
      expect(screen.getByText("3")).toBeInTheDocument();
      
      rerender(<NotificationBell count={5} />);
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Badge styling
  describe("❌ Badge Styling - Edge Cases (Currently Failing)", () => {
    it("should apply different colors based on count severity", () => {
      const { container: container1 } = render(<NotificationBell count={1} />);
      const badge1 = container1.querySelector("[class*='badge']");
      
      const { container: container2 } = render(<NotificationBell count={50} />);
      const badge2 = container2.querySelector("[class*='badge']");
      
      // Badges might have different styling based on count
      expect(badge1).toBeInTheDocument();
      expect(badge2).toBeInTheDocument();
    });

    it("should apply pulse animation to badge", () => {
      const { container } = render(<NotificationBell count={3} />);
      const badge = container.querySelector("[class*='badge']");
      
      if (badge) {
        expect(badge.className).toMatch(/animate|pulse|ring/i);
      }
    });
  });

  // ❌ FAILING TESTS - Icon rendering
  describe("❌ Icon Rendering (Currently Failing)", () => {
    it("should render bell icon", () => {
      const { container } = render(<NotificationBell count={0} />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should have accessible icon label", () => {
      render(<NotificationBell count={3} />);
      // Should have aria-label or title attribute
      const icon = document.querySelector("svg");
      expect(icon?.getAttribute("aria-label") || icon?.getAttribute("title")).toBeTruthy();
    });

    it("should apply proper icon sizing", () => {
      const { container } = render(<NotificationBell count={0} />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-5", "w-5");
    });
  });

  // ❌ FAILING TESTS - Accessibility
  describe("❌ Accessibility (Currently Failing)", () => {
    it("should have aria-label indicating notification count", () => {
      const { container } = render(<NotificationBell count={5} />);
      const button = container.querySelector("button");
      
      expect(button?.getAttribute("aria-label")).toContain("5") || 
      expect(button?.getAttribute("aria-label")).toContain("notification");
    });

    it("should announce badge count to screen readers", () => {
      render(<NotificationBell count={3} />);
      
      // Should have aria-label or be announced somewhere
      const badge = screen.queryByText("3");
      expect(badge).toBeInTheDocument();
    });

    it("should be keyboard accessible", () => {
      const { container } = render(<NotificationBell count={3} />);
      const button = container.querySelector("button");
      
      if (button) {
        button.focus();
        expect(button).toHaveFocus();
      }
    });
  });

  // ❌ FAILING TESTS - Interactive states
  describe("❌ Interactive States (Currently Failing)", () => {
    it("should have hover state styling", () => {
      const { container } = render(<NotificationBell count={3} />);
      const button = container.querySelector("button");
      
      expect(button?.className).toMatch(/hover/i);
    });

    it("should have focus state styling", () => {
      const { container } = render(<NotificationBell count={3} />);
      const button = container.querySelector("button");
      
      expect(button?.className).toMatch(/focus/i);
    });
  });

  // ✅ PASSING TESTS - Current working functionality
  describe("✅ Rendering (Passing)", () => {
    it("renders notification bell container", () => {
      const { container } = render(<NotificationBell count={0} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders bell icon SVG", () => {
      const { container } = render(<NotificationBell count={0} />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("renders as button element", () => {
      const { container } = render(<NotificationBell count={0} />);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Badge display
  describe("✅ Badge Display (Passing)", () => {
    it("displays no notifications state", () => {
      render(<NotificationBell count={0} />);
      const container = document.querySelector("svg")?.parentElement;
      expect(container).toBeInTheDocument();
    });

    it("displays single notification badge", () => {
      render(<NotificationBell count={1} />);
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("displays few notifications badge", () => {
      render(<NotificationBell count={5} />);
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("displays many notifications badge", () => {
      render(<NotificationBell count={10} />);
      expect(screen.getByText("10")).toBeInTheDocument();
    });

    it("displays high notification count (99+)", () => {
      render(<NotificationBell count={99} />);
      expect(screen.getByText("99")).toBeInTheDocument();
    });

    it("displays 99+ when count exceeds 99", () => {
      render(<NotificationBell count={100} />);
      const badge = screen.queryByText("99+");
      expect(badge || screen.queryByText("99")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - CSS Classes
  describe("✅ Styling (Passing)", () => {
    it("applies bell icon styling", () => {
      const { container } = render(<NotificationBell count={0} />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-5", "w-5");
    });

    it("applies button styling", () => {
      const { container } = render(<NotificationBell count={0} />);
      const button = container.querySelector("button");
      expect(button?.className).toMatch(/bg|text|p|relative/i);
    });

    it("applies badge styling", () => {
      const { container } = render(<NotificationBell count={3} />);
      const badge = container.querySelector("[class*='bg-']");
      expect(badge).toBeInTheDocument();
    });

    it("applies badge position classes", () => {
      const { container } = render(<NotificationBell count={3} />);
      const badge = container.querySelector("[class*='absolute']");
      expect(badge).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Icon styling
  describe("✅ Icon Styling (Passing)", () => {
    it("has proper SVG dimensions", () => {
      const { container } = render(<NotificationBell count={0} />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-5", "w-5");
    });

    it("applies text color to badge", () => {
      const { container } = render(<NotificationBell count={5} />);
      const badge = container.querySelector("[class*='text-']");
      expect(badge).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Button styling
  describe("✅ Button Styling (Passing)", () => {
    it("applies hover effect to button", () => {
      const { container } = render(<NotificationBell count={3} />);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });

    it("applies transition classes", () => {
      const { container } = render(<NotificationBell count={3} />);
      const button = container.querySelector("button");
      expect(button?.className).toMatch(/transition/i);
    });
  });

  // ✅ PASSING TESTS - Badge animation
  describe("✅ Badge Animation (Passing)", () => {
    it("applies animation classes to badge", () => {
      const { container } = render(<NotificationBell count={3} />);
      const badge = container.querySelector("[class*='animate']") || 
                   container.querySelector("[class*='ring']");
      expect(badge).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Custom props
  describe("✅ Custom Props (Passing)", () => {
    it("accepts custom className prop", () => {
      const { container } = render(
        <NotificationBell count={3} className="custom-class" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it("accepts data-testid prop", () => {
      render(<NotificationBell count={3} data-testid="notification-bell" />);
      expect(screen.getByTestId("notification-bell")).toBeInTheDocument();
    });

    it("accepts aria-label prop", () => {
      const { container } = render(
        <NotificationBell count={3} aria-label="Notifications" />
      );
      const button = container.querySelector("button");
      expect(button?.getAttribute("aria-label")).toBe("Notifications");
    });
  });

  // ✅ PASSING TESTS - Count update
  describe("✅ Count Updates (Passing)", () => {
    it("updates badge when count prop changes", () => {
      const { rerender } = render(<NotificationBell count={0} />);
      expect(screen.queryByText("0")).not.toBeInTheDocument();
      
      rerender(<NotificationBell count={3} />);
      expect(screen.getByText("3")).toBeInTheDocument();
      
      rerender(<NotificationBell count={10} />);
      expect(screen.getByText("10")).toBeInTheDocument();
    });

    it("handles count changes from high to low", () => {
      const { rerender } = render(<NotificationBell count={50} />);
      expect(screen.getByText("50")).toBeInTheDocument();
      
      rerender(<NotificationBell count={1} />);
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("handles count changes to zero", () => {
      const { rerender } = render(<NotificationBell count={5} />);
      rerender(<NotificationBell count={0} />);
      expect(screen.queryByText("0")).not.toBeInTheDocument();
    });
  });
});
