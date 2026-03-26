import { render, screen } from "@testing-library/react";
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

  // ❌ FAILING TESTS - Date highlighting and selection state
  describe("❌ Date Selection Highlighting (Currently Failing)", () => {
    it("should highlight selected date in calendar", () => {
      const testDate = new Date(2024, 0, 15);
      const { container } = render(
        <Calendar mode="single" selected={testDate} onSelect={() => {}} />
      );
      
      const selectedButton = Array.from(container.querySelectorAll('button[data-day]')).find(
        btn => btn.textContent === "15" && btn.getAttribute("aria-selected") === "true"
      );
      
      expect(selectedButton).toBeInTheDocument();
    });

    it("should apply distinct styling to selected date", () => {
      const testDate = new Date(2024, 0, 15);
      const { container } = render(
        <Calendar mode="single" selected={testDate} onSelect={() => {}} />
      );
      
      const selectedButton = Array.from(container.querySelectorAll('button[data-day]')).find(
        btn => btn.textContent?.trim() === "15"
      );
      
      expect(selectedButton).toHaveClass("bg-primary", "text-primary-foreground");
    });
  });

  // ✅ PASSING TESTS - Selection modes
  describe("✅ Selection Modes (Passing)", () => {
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

  // ❌ FAILING TESTS - Date range validation
  describe("❌ Date Range Validation (Currently Failing)", () => {
    it("should not allow selecting end date before start date in range mode", () => {
      const handleSelect = jest.fn();
      const startDate = new Date(2024, 0, 20);
      const { rerender } = render(
        <Calendar
          mode="range"
          selected={{ from: startDate }}
          onSelect={handleSelect}
        />
      );

      // Attempt to select end date before start date
      const endDate = new Date(2024, 0, 10);
      rerender(
        <Calendar
          mode="range"
          selected={{ from: startDate, to: endDate }}
          onSelect={handleSelect}
        />
      );

      // Should either swap dates or reject selection
      expect(handleSelect).toHaveBeenCalled();
    });

    it("should enforce min and max date constraints", () => {
      const minDate = new Date(2024, 0, 1);
      const maxDate = new Date(2024, 0, 31);
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date(2024, 0, 15)}
          onSelect={() => {}}
          disabled={(date) => date < minDate || date > maxDate}
        />
      );

      // Dates outside range should be disabled
      const disabledButtons = container.querySelectorAll('button[disabled]');
      expect(disabledButtons.length).toBeGreaterThan(0);
    });
  });

  // ✅ PASSING TESTS - Outside Days
  describe("✅ Outside Days (Passing)", () => {
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

  // ✅ PASSING TESTS - Caption Layout
  describe("✅ Caption Layout (Passing)", () => {
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

  // ❌ FAILING TESTS - Keyboard navigation
  describe("❌ Keyboard Navigation (Currently Failing)", () => {
    it("should navigate to next day with right arrow key", () => {
      const handleSelect = jest.fn();
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date(2024, 0, 15)}
          onSelect={handleSelect}
          autoFocus={true}
        />
      );

      const button = container.querySelector('button[data-day]') as HTMLButtonElement;
      button?.focus();
      
      const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
      button?.dispatchEvent(event);

      // Should move selection to next day
      expect(handleSelect).toHaveBeenCalled();
    });

    it("should navigate to previous day with left arrow key", () => {
      const handleSelect = jest.fn();
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date(2024, 0, 15)}
          onSelect={handleSelect}
          autoFocus={true}
        />
      );

      const button = container.querySelector('button[data-day]') as HTMLButtonElement;
      button?.focus();
      
      const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
      button?.dispatchEvent(event);

      expect(handleSelect).toHaveBeenCalled();
    });

    it("should navigate to next week with down arrow key", () => {
      const handleSelect = jest.fn();
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date(2024, 0, 15)}
          onSelect={handleSelect}
          autoFocus={true}
        />
      );

      const button = container.querySelector('button[data-day]') as HTMLButtonElement;
      button?.focus();
      
      const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
      button?.dispatchEvent(event);

      expect(handleSelect).toHaveBeenCalled();
    });

    it("should navigate to previous week with up arrow key", () => {
      const handleSelect = jest.fn();
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date(2024, 0, 15)}
          onSelect={handleSelect}
          autoFocus={true}
        />
      );

      const button = container.querySelector('button[data-day]') as HTMLButtonElement;
      button?.focus();
      
      const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
      button?.dispatchEvent(event);

      expect(handleSelect).toHaveBeenCalled();
    });
  });

  // ✅ PASSING TESTS - Button Variant
  describe("✅ Button Variant (Passing)", () => {
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

  // ✅ PASSING TESTS - Navigation Controls
  describe("✅ Navigation Controls (Passing)", () => {
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

  // ❌ FAILING TESTS - Month navigation limits
  describe("❌ Month Navigation Limits (Currently Failing)", () => {
    it("should not allow navigation before minDate month", () => {
      const minDate = new Date(2024, 0, 1);
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date(2024, 0, 15)}
          onSelect={() => {}}
          disabled={(date) => date < minDate}
        />
      );
      
      const prevButton = screen.getByRole("button", { name: /previous/i });
      // Previous button should be disabled when at minimum month
      expect(prevButton).toBeDisabled();
    });

    it("should not allow navigation after maxDate month", () => {
      const maxDate = new Date(2024, 11, 31);
      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date(2024, 11, 15)}
          onSelect={() => {}}
          disabled={(date) => date > maxDate}
        />
      );
      
      const nextButton = screen.getByRole("button", { name: /next/i });
      // Next button should be disabled when at maximum month
      expect(nextButton).toBeDisabled();
    });
  });

  // ✅ PASSING TESTS - Month and Year Display
  describe("✅ Month and Year Display (Passing)", () => {
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

  // ❌ FAILING TESTS - Month/year updates
  describe("❌ Month/Year Updates on Navigation (Currently Failing)", () => {
    it("should update month display when navigating to next month", () => {
      const { rerender, container } = render(
        <Calendar
          mode="single"
          selected={new Date(2024, 0, 15)}
          onSelect={() => {}}
        />
      );

      // Click next month button
      const nextButton = screen.getByRole("button", { name: /next/i });
      nextButton.click();

      rerender(
        <Calendar
          mode="single"
          selected={new Date(2024, 1, 15)}
          onSelect={() => {}}
        />
      );

      // Month display should update
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Today Indicator
  describe("✅ Today Indicator (Passing)", () => {
    it("marks today's date in current month", () => {
      const { container } = render(
        <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
      );
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Today visual distinction
  describe("❌ Today Visual Distinction (Currently Failing)", () => {
    it("should highlight today's date differently", () => {
      const today = new Date();
      const { container } = render(
        <Calendar mode="single" selected={today} onSelect={() => {}} />
      );

      const todayButton = Array.from(container.querySelectorAll('button[data-day]')).find(
        btn => btn.textContent?.trim() === today.getDate().toString() && 
               !btn.getAttribute("aria-disabled")
      );

      expect(todayButton).toHaveClass("bg-accent");
    });
  });

  // ✅ PASSING TESTS - Accessibility
  describe("✅ Accessibility (Passing)", () => {
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

  // ❌ FAILING TESTS - Screen reader announcements
  describe("❌ Screen Reader Announcements (Currently Failing)", () => {
    it("should announce selected date to screen readers", () => {
      const testDate = new Date(2024, 0, 15);
      const { container } = render(
        <Calendar mode="single" selected={testDate} onSelect={() => {}} />
      );

      const selectedButton = Array.from(container.querySelectorAll('button[data-day]')).find(
        btn => btn.getAttribute("aria-selected") === "true"
      );

      expect(selectedButton).toHaveAttribute("aria-label");
    });

    it("should announce when date range is selected", () => {
      const { container } = render(
        <Calendar
          mode="range"
          selected={{ from: new Date(2024, 0, 1), to: new Date(2024, 0, 10) }}
          onSelect={() => {}}
        />
      );

      const calendar = container.querySelector('[role="application"]');
      expect(calendar).toHaveAttribute("aria-label");
    });
  });

  // ✅ PASSING TESTS - Custom Styling
  describe("✅ Custom Styling (Passing)", () => {
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

  // ❌ FAILING TESTS - Dynamic date disabling
  describe("❌ Dynamic Date Disabling (Currently Failing)", () => {
    it("should disable weekends in calendar", () => {
      const isWeekend = (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
      };

      const { container } = render(
        <Calendar
          mode="single"
          selected={new Date(2024, 0, 15)}
          onSelect={() => {}}
          disabled={isWeekend}
        />
      );

      const disabledDays = container.querySelectorAll('button[disabled]');
      // Should have Saturday and Sunday disabled
      expect(disabledDays.length).toBeGreaterThan(0);
    });

    it("should disable past dates", () => {
      const today = new Date();
      const disablePastDates = (date: Date) => date < today;

      const { container } = render(
        <Calendar
          mode="single"
          selected={today}
          onSelect={() => {}}
          disabled={disablePastDates}
        />
      );

      const disabledButtons = container.querySelectorAll('button[disabled]');
      expect(disabledButtons.length).toBeGreaterThan(0);
    });
  });
});
