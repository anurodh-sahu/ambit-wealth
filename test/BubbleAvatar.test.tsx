import { render, screen } from "@testing-library/react";
import { BubbleAvatar } from "@/components/shared/BubbleAvatar";

describe("BubbleAvatar Component - BDD Tests", () => {
  describe("Initials Generation", () => {
    describe("Given a full name with first and last name", () => {
      it("When component renders, Then it should display initials from first and last name", () => {
        // Given
        const name = "John Doe";

        // When
        render(<BubbleAvatar name={name} />);

        // Then
        expect(screen.getByText("JD")).toBeInTheDocument();
      });
    });

    describe("Given a single name", () => {
      it("When component renders, Then it should display initial from the single name", () => {
        // Given
        const name = "Alice";

        // When
        render(<BubbleAvatar name={name} />);

        // Then
        expect(screen.getByText("A")).toBeInTheDocument();
      });
    });

    describe("Given a three-part name", () => {
      it("When component renders, Then it should display initials from first and last name only", () => {
        // Given
        const name = "Mary Jane Watson";

        // When
        render(<BubbleAvatar name={name} />);

        // Then
        expect(screen.getByText("MW")).toBeInTheDocument();
      });
    });

    describe("Given a name with extra spaces", () => {
      it("When component renders, Then it should handle extra spaces correctly", () => {
        // Given
        const name = "  Peter   Parker  ";

        // When
        render(<BubbleAvatar name={name} />);

        // Then
        expect(screen.getByText("PP")).toBeInTheDocument();
      });
    });

    describe("Given an empty name string", () => {
      it("When component renders, Then it should display empty string", () => {
        // Given
        const name = "";

        // When
        const { container } = render(<BubbleAvatar name={name} />);

        // Then
        const avatar = container.querySelector('[class*="rounded-full"]');
        expect(avatar?.textContent).toBe("");
      });
    });
  });

  describe("Size Variants", () => {
    describe("Given different size props", () => {
      it("When size is 'sm', Then it should have small size classes", () => {
        // Given & When
        const { container } = render(
          <BubbleAvatar name="John Doe" size="sm" />
        );
        const avatar = container.firstChild;

        // Then
        expect(avatar).toHaveClass("h-6", "w-6", "text-xs");
      });

      it("When size is 'md', Then it should have medium size classes", () => {
        // Given & When
        const { container } = render(
          <BubbleAvatar name="John Doe" size="md" />
        );
        const avatar = container.firstChild;

        // Then
        expect(avatar).toHaveClass("h-8", "w-8", "text-sm");
      });

      it("When size is 'lg', Then it should have large size classes", () => {
        // Given & When
        const { container } = render(
          <BubbleAvatar name="John Doe" size="lg" />
        );
        const avatar = container.firstChild;

        // Then
        expect(avatar).toHaveClass("h-10", "w-10", "text-base");
      });

      it("When size is 'xl', Then it should have extra large size classes", () => {
        // Given & When
        const { container } = render(
          <BubbleAvatar name="John Doe" size="xl" />
        );
        const avatar = container.firstChild;

        // Then
        expect(avatar).toHaveClass("h-14", "w-14", "text-lg");
      });
    });

    describe("Given no explicit size prop", () => {
      it("When component renders, Then it should use default 'md' size", () => {
        // Given & When
        const { container } = render(<BubbleAvatar name="John Doe" />);
        const avatar = container.firstChild;

        // Then
        expect(avatar).toHaveClass("h-8", "w-8", "text-sm");
      });
    });
  });

  describe("Styling and Appearance", () => {
    describe("Given a BubbleAvatar component", () => {
      it("When component renders, Then it should have secondary background color", () => {
        // Given & When
        const { container } = render(<BubbleAvatar name="John Doe" />);
        const avatar = container.firstChild;

        // Then
        expect(avatar).toHaveClass("bg-secondary", "text-secondary-foreground");
      });

      it("When component renders, Then it should have rounded-full class", () => {
        // Given & When
        const { container } = render(<BubbleAvatar name="John Doe" />);
        const avatar = container.firstChild;

        // Then
        expect(avatar).toHaveClass("rounded-full");
      });

      it("When component renders, Then it should be centered with flex", () => {
        // Given & When
        const { container } = render(<BubbleAvatar name="John Doe" />);
        const avatar = container.firstChild;

        // Then
        expect(avatar).toHaveClass("flex", "items-center", "justify-center");
      });
    });
  });

  describe("Custom Styling", () => {
    describe("Given a custom className prop", () => {
      it("When component renders with custom class, Then it should apply custom styles", () => {
        // Given & When
        const { container } = render(
          <BubbleAvatar name="John Doe" className="custom-class" />
        );
        const avatar = container.firstChild;

        // Then
        expect(avatar).toHaveClass("custom-class");
      });
    });
  });

  describe("HTML Attributes", () => {
    describe("Given HTML attributes", () => {
      it("When component renders with data attributes, Then it should support them", () => {
        // Given & When
        const { container } = render(
          <BubbleAvatar name="John Doe" data-testid="custom-avatar" />
        );

        // Then
        expect(screen.getByTestId("custom-avatar")).toBeInTheDocument();
      });

      it("When component renders with aria-label, Then it should support accessibility attributes", () => {
        // Given & When
        render(<BubbleAvatar name="John Doe" aria-label="User Avatar" />);

        // Then
        expect(screen.getByLabelText("User Avatar")).toBeInTheDocument();
      });
    });
  });
});
