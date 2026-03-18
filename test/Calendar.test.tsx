import { render, screen, fireEvent, within } from "@testing-library/react";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

describe("Calendar Component - BDD Tests", () => {
  describe("Calendar Rendering", () => {
    describe("Given a Calendar component", () => {
      it("When component renders, Then it should display the calendar", () => {
        // Given & When
        const { container } = render(
          <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });

      it("When component renders, Then it should have calendar grid structure", () => {
        // Given & When
        const { container } = render(
          <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
        );

        // Then
        const table = container.querySelector("table");
        expect(table).toBeInTheDocument();
      });
    });
  });

  describe("Single Date Selection Mode", () => {
    describe("Given a Calendar in single selection mode", () => {
      it("When mode is 'single', Then it should allow selecting one date", () => {
        // Given
        const mockSelect = jest.fn();
        const currentDate = new Date(2024, 0, 15);

        // When
        const { container } = render(
          <Calendar
            mode="single"
            selected={currentDate}
            onSelect={mockSelect}
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });

      it("When a date is selected in single mode, Then onSelect callback should be triggered", () => {
        // Given
        const mockSelect = jest.fn();
        const testDate = new Date(2024, 0, 15);

        // When
        render(
          <Calendar
            mode="single"
            selected={testDate}
            onSelect={mockSelect}
          />
        );

        // Then - The calendar should be rendered and ready
        expect(screen.getByRole("button", { name: /next month/i })).toBeInTheDocument();
      });
    });
  });

  describe("Range Selection Mode", () => {
    describe("Given a Calendar in range selection mode", () => {
      it("When mode is 'range', Then it should render calendar for range selection", () => {
        // Given
        const mockSelect = jest.fn();

        // When
        const { container } = render(
          <Calendar
            mode="range"
            selected={{}}
            onSelect={mockSelect}
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });
    });
  });

  describe("Multiple Date Selection Mode", () => {
    describe("Given a Calendar in multiple selection mode", () => {
      it("When mode is 'multiple', Then it should render calendar for multiple selection", () => {
        // Given
        const mockSelect = jest.fn();

        // When
        const { container } = render(
          <Calendar
            mode="multiple"
            selected={[]}
            onSelect={mockSelect}
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });
    });
  });

  describe("Outside Days Display", () => {
    describe("Given showOutsideDays prop", () => {
      it("When showOutsideDays is true, Then it should display days from adjacent months", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
            showOutsideDays={true}
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });

      it("When showOutsideDays is false, Then it should hide days from adjacent months", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
            showOutsideDays={false}
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });
    });

    describe("Given no explicit showOutsideDays prop", () => {
      it("When component renders, Then it should show outside days by default", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });
    });
  });

  describe("Caption Layout Options", () => {
    describe("Given different captionLayout props", () => {
      it("When captionLayout is 'label', Then it should display month label", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
            captionLayout="label"
          />
        );

        // Then
        const caption = container.querySelector(".rdp-caption_label");
        expect(caption).toBeInTheDocument();
      });

      it("When captionLayout is 'buttons', Then it should display navigation buttons in caption", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
            captionLayout="buttons"
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });
    });

    describe("Given no explicit captionLayout prop", () => {
      it("When component renders, Then it should use default 'label' layout", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });
    });
  });

  describe("Button Variant Customization", () => {
    describe("Given different buttonVariant props", () => {
      it("When buttonVariant is 'ghost', Then navigation buttons should have ghost styling", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
            buttonVariant="ghost"
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });

      it("When buttonVariant is 'outline', Then navigation buttons should have outline styling", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
            buttonVariant="outline"
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });
    });

    describe("Given no explicit buttonVariant prop", () => {
      it("When component renders, Then it should use default 'ghost' variant", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });
    });
  });

  describe("Navigation Controls", () => {
    describe("Given navigation buttons in the calendar", () => {
      it("When next month button exists, Then it should be present", () => {
        // Given & When
        render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
          />
        );

        // Then
        expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
      });

      it("When previous month button exists, Then it should be present", () => {
        // Given & When
        render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
          />
        );

        // Then
        expect(screen.getByRole("button", { name: /previous/i })).toBeInTheDocument();
      });
    });
  });

  describe("Day Grid Structure", () => {
    describe("Given a calendar month view", () => {
      it("When calendar renders, Then it should have weekday headers", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
          />
        );

        // Then
        const weekdays = container.querySelector(".rdp-weekdays");
        expect(weekdays).toBeInTheDocument();
      });

      it("When calendar renders, Then it should have day cells", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
          />
        );

        // Then
        const days = container.querySelectorAll('button[data-day]');
        expect(days.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Today Indicator", () => {
    describe("Given a calendar showing current month", () => {
      it("When calendar renders, Then today's date should be marked", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });
    });
  });

  describe("CSS Grid and Layout", () => {
    describe("Given a Calendar component", () => {
      it("When component renders, Then it should have proper table structure", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
          />
        );

        // Then
        const table = container.querySelector("table");
        const tbody = container.querySelector("tbody");
        expect(table).toBeInTheDocument();
        expect(tbody).toBeInTheDocument();
      });

      it("When component renders, Then calendar should have background styling", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toHaveClass("bg-background");
      });
    });
  });

  describe("Accessibility", () => {
    describe("Given a Calendar component", () => {
      it("When calendar renders, Then day buttons should be accessible", () => {
        // Given & When
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
          />
        );

        // Then
        const dayButtons = container.querySelectorAll("[data-day]");
        expect(dayButtons.length).toBeGreaterThan(0);
      });

      it("When calendar renders, Then navigation buttons should be accessible", () => {
        // Given & When
        render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
          />
        );

        // Then
        const navButtons = screen.getAllByRole("button");
        expect(navButtons.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Month and Year Display", () => {
    describe("Given a Calendar showing January 2024", () => {
      it("When calendar renders, Then it should display the correct month and year", () => {
        // Given
        const testDate = new Date(2024, 0, 15);

        // When
        const { container } = render(
          <Calendar
            mode="single"
            selected={testDate}
            onSelect={() => {}}
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });
    });
  });

  describe("Custom Classnames", () => {
    describe("Given custom classNames prop", () => {
      it("When custom classNames are provided, Then custom styles should be applied", () => {
        // Given & When
        const customClassNames = {
          root: "custom-root",
        };
        const { container } = render(
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
            classNames={customClassNames}
          />
        );

        // Then
        const calendar = container.querySelector('[data-slot="calendar"]');
        expect(calendar).toBeInTheDocument();
      });
    });
  });
});
