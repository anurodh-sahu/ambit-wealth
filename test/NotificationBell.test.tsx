import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { NotificationBell } from "@/components/shared/NotificationBell";

describe("NotificationBell", () => {

  // // ✅ PASSING TESTS - Current working functionality
  // describe("✅ Rendering (Passing)", () => {
  //   it("renders notification bell container", () => {
  //     const { container } = render(<NotificationBell count={0} />);
  //     expect(container.firstChild).toBeInTheDocument();
  //   });

  //   it("renders bell icon SVG", () => {
  //     const { container } = render(<NotificationBell count={0} />);
  //     const svg = container.querySelector("svg");
  //     expect(svg).toBeInTheDocument();
  //   });

  //   it("renders as button element", () => {
  //     const { container } = render(<NotificationBell count={0} />);
  //     const button = container.querySelector("button");
  //     expect(button).toBeInTheDocument();
  //   });
  // });

  describe("NotificationBell", () => {

    // // ✅ PASSING TESTS - Rendering and visibility
    // describe("✅ Rendering (Passing)", () => {
    //   it("renders notification bell container", () => {
    //     const { container } = render(<NotificationBell count={0} />);
    //     const bellContainer = container.firstChild;
    //     expect(bellContainer).toBeInTheDocument();
    //     expect(bellContainer).toHaveClass("relative", "inline-flex", "items-center", "justify-center");
    //   });

    //   it("renders bell icon SVG", () => {
    //     const { container } = render(<NotificationBell count={0} />);
    //     const svg = container.querySelector("svg");
    //     expect(svg).toBeInTheDocument();
    //   });

    //   it("renders bell icon with correct styling", () => {
    //     const { container } = render(<NotificationBell count={0} />);
    //     const icon = container.querySelector("svg");
    //     expect(icon).toHaveClass("w-6", "h-6", "text-gray-700");
    //   });
    // });

    // ✅ PASSING TESTS - Badge visibility based on count
    describe("✅ Badge Visibility (Passing)", () => {
      it("does not render badge when count is zero", () => {
        const { container } = render(<NotificationBell count={0} />);
        const badge = container.querySelector("span");
        expect(badge).not.toBeInTheDocument();
      });

      it("renders badge span when count is greater than zero", () => {
        const { container } = render(<NotificationBell count={1} />);
        const badge = container.querySelector("span");
        expect(badge).toBeInTheDocument();
      });

      it("renders badge span for high count values", () => {
        const { container } = render(<NotificationBell count={99} />);
        const badge = container.querySelector("span");
        expect(badge).toBeInTheDocument();
      });

      it("renders badge span for counts exceeding 99", () => {
        const { container } = render(<NotificationBell count={100} />);
        const badge = container.querySelector("span");
        expect(badge).toBeInTheDocument();
      });
    });

    // ✅ PASSING TESTS - Badge styling
    describe("✅ Badge Styling (Passing)", () => {
      it("applies correct positioning classes to badge", () => {
        const { container } = render(<NotificationBell count={5} />);
        const badge = container.querySelector("span");
        expect(badge).toHaveClass("absolute", "-top-1", "right-0");
      });

      it("applies flex layout classes to badge", () => {
        const { container } = render(<NotificationBell count={5} />);
        const badge = container.querySelector("span");
        expect(badge).toHaveClass("flex", "items-center", "justify-center");
      });

      it("applies size classes to badge", () => {
        const { container } = render(<NotificationBell count={5} />);
        const badge = container.querySelector("span");
        expect(badge).toHaveClass("w-2", "h-2", "px-1");
      });

      it("applies color classes to badge", () => {
        const { container } = render(<NotificationBell count={5} />);
        const badge = container.querySelector("span");
        expect(badge).toHaveClass("text-white", "bg-primary", "rounded-full");
      });
    });

    // ✅ PASSING TESTS - Count prop updates
    describe("✅ Count Updates (Passing)", () => {
      it("shows badge when count changes from 0 to positive", () => {
        const { container, rerender } = render(<NotificationBell count={0} />);
        expect(container.querySelector("span")).not.toBeInTheDocument();
        
        rerender(<NotificationBell count={3} />);
        expect(container.querySelector("span")).toBeInTheDocument();
      });

      it("hides badge when count changes from positive to 0", () => {
        const { container, rerender } = render(<NotificationBell count={5} />);
        expect(container.querySelector("span")).toBeInTheDocument();
        
        rerender(<NotificationBell count={0} />);
        expect(container.querySelector("span")).not.toBeInTheDocument();
      });

      it("maintains badge visibility across count changes", () => {
        const { container, rerender } = render(<NotificationBell count={1} />);
        const initialBadge = container.querySelector("span");
        expect(initialBadge).toBeInTheDocument();
        
        rerender(<NotificationBell count={10} />);
        const updatedBadge = container.querySelector("span");
        expect(updatedBadge).toBeInTheDocument();
        
        rerender(<NotificationBell count={50} />);
        const finalBadge = container.querySelector("span");
        expect(finalBadge).toBeInTheDocument();
      });
    });

    // // ✅ ACCESSIBILITY TESTS - jest-axe
    // describe("✅ Accessibility (a11y)", () => {
    //   it("should have no accessibility violations with zero notifications", async () => {
    //     const { container } = render(<NotificationBell count={0} />);
    //     const results = await axe(container);
    //     expect(results).toHaveNoViolations();
    //   });

    //   it("should have no accessibility violations with notifications", async () => {
    //     const { container } = render(<NotificationBell count={5} />);
    //     const results = await axe(container);
    //     expect(results).toHaveNoViolations();
    //   });

    //   it("should have no accessibility violations with high count", async () => {
    //     const { container } = render(<NotificationBell count={99} />);
    //     const results = await axe(container);
    //     expect(results).toHaveNoViolations();
    //   });

    //   it("should maintain accessibility across re-renders", async () => {
    //     const { container, rerender } = render(<NotificationBell count={0} />);
    //     let results = await axe(container);
    //     expect(results).toHaveNoViolations();

    //     rerender(<NotificationBell count={10} />);
    //     results = await axe(container);
    //     expect(results).toHaveNoViolations();
    //   });

    //   it("should have proper semantic structure", () => {
    //     const { container } = render(<NotificationBell count={5} />);
    //     const bellContainer = container.firstChild;
    //     expect(bellContainer).toHaveClass("relative", "inline-flex");
    //     expect(container.querySelector("svg")).toBeInTheDocument();
    //   });
    // });
  })
})
