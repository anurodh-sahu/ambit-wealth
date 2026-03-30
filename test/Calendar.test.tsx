import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Calendar } from "@/components/ui/calendar";

describe("Calendar", () => {
  // ✅ PASSING TESTS - Current working functionality
  describe("✅ Rendering (Passing)", () => {
    it("displays calendar component", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });

    it("renders calendar grid structure with table", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("renders calendar element with proper root classes", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      const calendar = container.querySelector('[data-slot="calendar"]');
      expect(calendar).toHaveClass("w-fit", "rdp-root");
    });

    it("renders weekday headers", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(container.querySelector(".rdp-weekdays")).toBeInTheDocument();
    });

    it("renders day buttons with data-day attribute", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      const days = container.querySelectorAll('[data-day]');
      expect(days.length).toBeGreaterThan(0);
    });

    it("renders proper table structure with thead and tbody", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
      expect(container.querySelector("thead")).toBeInTheDocument();
      expect(container.querySelector("tbody")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Selection modes
  describe("✅ Selection Modes (Passing)", () => {
    it("supports single selection mode", () => {
      const mockSelect = jest.fn();
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date(2024, 0, 15)}
          onSelect={mockSelect}
        />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });

    it("supports range selection mode", () => {
      const mockSelect = jest.fn();
      const { container } = render(
        <Calendar mode="range" selected={{}} onSelect={mockSelect} />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });

    it("supports multiple selection mode", () => {
      const mockSelect = jest.fn();
      const { container } = render(
        <Calendar mode="multiple" selected={[]} onSelect={mockSelect} />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Optional Props
  describe("✅ Optional Props (Passing)", () => {
    it("renders with showOutsideDays enabled", () => {
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date()}
          onSelect={() => {}}
          showOutsideDays={true}
        />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });

    it("renders with showOutsideDays disabled", () => {
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date()}
          onSelect={() => {}}
          showOutsideDays={false}
        />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });

    it("renders with captionLayout as label", () => {
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date()}
          onSelect={() => {}}
          captionLayout="label"
        />
      );
      expect(container.querySelector(".rdp-caption_label")).toBeInTheDocument();
    });

    it("renders with buttonVariant as ghost", () => {
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date()}
          onSelect={() => {}}
          buttonVariant="ghost"
        />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });

    it("renders with buttonVariant as outline", () => {
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date()}
          onSelect={() => {}}
          buttonVariant="outline"
        />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });

    it("accepts custom classNames", () => {
      const customClassNames = { root: "custom-root" };
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date()}
          onSelect={() => {}}
          classNames={customClassNames}
        />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Navigation and interactions
  describe("✅ Navigation (Passing)", () => {
    it("renders navigation buttons", () => {
      render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      const navButtons = screen.getAllByRole("button");
      expect(navButtons.length).toBeGreaterThan(0);
    });

    it("has next and previous month buttons", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(container.querySelector(".rdp-button_next")).toBeInTheDocument();
      expect(container.querySelector(".rdp-button_previous")).toBeInTheDocument();
    });
  });

  // // ✅ ACCESSIBILITY TESTS - jest-axe
  // describe("✅ Accessibility (a11y)", () => {
  //   it("should have no accessibility violations in single mode", async () => {
  //     const { container } = render(
  //       <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
  //     );
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have no accessibility violations in range mode", async () => {
  //     const { container } = render(
  //       <Calendar mode="range" selected={{}} onSelect={() => {}} />
  //     );
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have no accessibility violations in multiple mode", async () => {
  //     const { container } = render(
  //       <Calendar mode="multiple" selected={[]} onSelect={() => {}} />
  //     );
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have accessible day buttons with data attributes", () => {
  //     const { container } = render(
  //       <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
  //     );
  //     const dayButtons = container.querySelectorAll("[data-day]");
  //     expect(dayButtons.length).toBeGreaterThan(0);
  //   });

  //   it("should have accessible navigation buttons", () => {
  //     render(
  //       <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
  //     );
  //     const navButtons = screen.getAllByRole("button");
  //     expect(navButtons.length).toBeGreaterThan(0);
  //   });

  //   it("should have proper table structure for screen readers", () => {
  //     const { container } = render(
  //       <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
  //     );
  //     const table = container.querySelector("table");
  //     const thead = container.querySelector("thead");
  //     const tbody = container.querySelector("tbody");
      
  //     expect(table).toBeInTheDocument();
  //     expect(thead).toBeInTheDocument();
  //     expect(tbody).toBeInTheDocument();
  //   });

  //   it("should render weekday headers for accessibility", () => {
  //     const { container } = render(
  //       <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
  //     );
  //     expect(container.querySelector(".rdp-weekdays")).toBeInTheDocument();
  //   });
  // });
});
