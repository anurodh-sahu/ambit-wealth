import { render, screen } from "@testing-library/react";
import { BubbleAvatar } from "@/components/shared/BubbleAvatar";

describe("BubbleAvatar", () => {
  describe("Initials Generation", () => {
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

  describe("Size Variants", () => {
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

  describe("Styling", () => {
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

  describe("Attributes", () => {
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
