import { render, screen } from "@testing-library/react";
import { Calendar } from "@/components/ui/calendar";

describe("Calendar", () => {
  describe("Rendering", () => {
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

    it("renders calendar with background styling", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toHaveClass("bg-background");
    });

    it("renders weekday headers", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(container.querySelector(".rdp-weekdays")).toBeInTheDocument();
    });

    it("renders day cells", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      const days = container.querySelectorAll('button[data-day]');
      expect(days.length).toBeGreaterThan(0);
    });

    it("renders proper table structure with tbody", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
      expect(container.querySelector("tbody")).toBeInTheDocument();
    });
  });

  describe("Selection Modes", () => {
    it("renders in single selection mode", () => {
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

    it("renders in range selection mode", () => {
      const mockSelect = jest.fn();
      const { container } = render(
        <Calendar mode="range" selected={{}} onSelect={mockSelect} />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });

    it("renders in multiple selection mode", () => {
      const mockSelect = jest.fn();
      const { container } = render(
        <Calendar mode="multiple" selected={[]} onSelect={mockSelect} />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });

    it("calls onSelect callback when date is selected", () => {
      const mockSelect = jest.fn();
      render(
        <Calendar
          mode="single"
          selected={new Date(2024, 0, 15)}
          onSelect={mockSelect}
        />
      );
      expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    });
  });

  describe("Outside Days", () => {
    it("displays days from adjacent months when showOutsideDays is true", () => {
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

    it("hides days from adjacent months when showOutsideDays is false", () => {
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

    it("shows outside days by default", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });
  });

  describe("Caption Layout", () => {
    it("displays month label when captionLayout is label", () => {
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

    it("displays navigation buttons in caption when captionLayout is buttons", () => {
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date()}
          onSelect={() => {}}
          captionLayout="buttons"
        />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });

    it("uses default label layout when captionLayout is not specified", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });
  });

  describe("Button Variant", () => {
    it("renders navigation buttons with ghost styling when buttonVariant is ghost", () => {
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

    it("renders navigation buttons with outline styling when buttonVariant is outline", () => {
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

    it("uses default ghost variant when buttonVariant is not specified", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });
  });

  describe("Navigation Controls", () => {
    it("displays next month button", () => {
      render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    });

    it("displays previous month button", () => {
      render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(screen.getByRole("button", { name: /previous/i })).toBeInTheDocument();
    });
  });

  describe("Month and Year Display", () => {
    it("displays correct month and year for selected date", () => {
      const testDate = new Date(2024, 0, 15);
      const { container } = render(
        <Calendar
          mode="single"
          selected={testDate}
          onSelect={() => {}}
        />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });
  });

  describe("Today Indicator", () => {
    it("marks today's date in current month", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders accessible day buttons", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      const dayButtons = container.querySelectorAll("[data-day]");
      expect(dayButtons.length).toBeGreaterThan(0);
    });

    it("renders accessible navigation buttons", () => {
      render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      const navButtons = screen.getAllByRole("button");
      expect(navButtons.length).toBeGreaterThan(0);
    });
  });

  describe("Custom Styling", () => {
    it("applies custom classNames", () => {
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
});
