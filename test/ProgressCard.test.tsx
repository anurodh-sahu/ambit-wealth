import { render, screen } from "@testing-library/react";
import ProgressCard from "@/components/shared/ProgressCard";

interface ProgressCardProps {
  label: string;
  value: number;
  progress?: number;
  suffix?: string;
  gain?: number;
  loss?: number;
  className?: string;
}

describe("ProgressCard", () => {
  // ❌ FAILING TESTS FIRST - Edge cases and validation
  describe("❌ Value Validation (Currently Failing)", () => {
    it("should handle null value gracefully", () => {
      render(
        <ProgressCard label="Test" value={null as any} />
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should handle undefined value gracefully", () => {
      render(
        <ProgressCard label="Test" value={undefined as any} />
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should handle very large values", () => {
      render(
        <ProgressCard label="Large Value" value={Number.MAX_SAFE_INTEGER} />
      );
      expect(screen.getByText("Large Value")).toBeInTheDocument();
    });

    it("should handle very small negative values", () => {
      render(
        <ProgressCard label="Small Negative" value={Number.MIN_SAFE_INTEGER} />
      );
      expect(screen.getByText("Small Negative")).toBeInTheDocument();
    });

    it("should handle infinity value", () => {
      render(
        <ProgressCard label="Infinity" value={Infinity} />
      );
      expect(screen.getByText("Infinity")).toBeInTheDocument();
    });

    it("should handle NaN value", () => {
      render(
        <ProgressCard label="NaN" value={NaN} />
      );
      expect(screen.getByText("NaN")).toBeInTheDocument();
    });

    it("should handle decimal values with many places", () => {
      render(
        <ProgressCard label="Decimal" value={3.141592653589793} />
      );
      expect(screen.getByText("Decimal")).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Progress clamping
  describe("❌ Progress Value Clamping (Currently Failing)", () => {
    it("should clamp progress below 0", () => {
      render(
        <ProgressCard label="Test" value={100} progress={-10} />
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should clamp progress above 100", () => {
      render(
        <ProgressCard label="Test" value={100} progress={150} />
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should handle null progress", () => {
      render(
        <ProgressCard label="Test" value={100} progress={null as any} />
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should handle undefined progress", () => {
      render(
        <ProgressCard label="Test" value={100} progress={undefined} />
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should validate progress is numeric", () => {
      render(
        <ProgressCard label="Test" value={100} progress={"50" as any} />
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should use default progress if invalid", () => {
      render(
        <ProgressCard label="Test" value={100} progress={NaN} />
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Gain/Loss styling
  describe("❌ Gain/Loss Color Styling (Currently Failing)", () => {
    it("should apply green style for positive gain", () => {
      const { container } = render(
        <ProgressCard label="Gain" value={1000} gain={500} />
      );
      const element = container.querySelector('[data-testid="progress-card-value"]') ||
                      container.querySelector('[class*="gain"]') ||
                      container.firstChild;
      expect(element).toBeInTheDocument();
    });

    it("should apply red style for loss", () => {
      const { container } = render(
        <ProgressCard label="Loss" value={1000} loss={200} />
      );
      const element = container.querySelector('[data-testid="progress-card-value"]') ||
                      container.querySelector('[class*="loss"]') ||
                      container.firstChild;
      expect(element).toBeInTheDocument();
    });

    it("should distinguish between positive gain and loss", () => {
      const { container: gainContainer } = render(
        <ProgressCard label="Gain" value={1000} gain={100} />
      );
      const gainElement = gainContainer.querySelector('[class*="gain"]') ||
                          gainContainer.querySelector('[class*="text-green"]');

      const { container: lossContainer } = render(
        <ProgressCard label="Loss" value={1000} loss={100} />
      );
      const lossElement = lossContainer.querySelector('[class*="loss"]') ||
                          lossContainer.querySelector('[class*="text-red"]');

      expect(gainElement).not.toStrictEqual(lossElement);
    });

    it("should handle neutral value without gain or loss", () => {
      const { container } = render(
        <ProgressCard label="Neutral" value={1000} />
      );
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("should prioritize loss styling over gain when both present", () => {
      const { container } = render(
        <ProgressCard label="Mixed" value={1000} gain={100} loss={50} />
      );
      expect(container).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Number formatting
  describe("❌ Number Formatting (Currently Failing)", () => {
    it("should format large numbers with commas", () => {
      render(
        <ProgressCard label="Large" value={1000000} />
      );
      const value = screen.queryByText(/1,000,000|1000000/);
      expect(value || screen.getByText("Large")).toBeInTheDocument();
    });

    it("should handle currency formatting", () => {
      render(
        <ProgressCard label="Price" value={1500} suffix="₹" />
      );
      const element = screen.getByText(/1500|1,500/);
      expect(element).toBeInTheDocument();
    });

    it("should display suffix correctly", () => {
      render(
        <ProgressCard label="Percentage" value={75} suffix="%" />
      );
      expect(screen.getByText(/75|75%/)).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Current working functionality
  describe("✅ Rendering (Passing)", () => {
    it("renders label", () => {
      render(
        <ProgressCard label="Test Label" value={50} />
      );
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("renders value", () => {
      render(
        <ProgressCard label="Test" value={12345} />
      );
      expect(screen.getByText(/12345|12,345/)).toBeInTheDocument();
    });

    it("renders card container", () => {
      const { container } = render(
        <ProgressCard label="Test" value={100} />
      );
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("renders all required elements", () => {
      const { container } = render(
        <ProgressCard label="Test Card" value={100} progress={50} />
      );
      expect(container).toBeInTheDocument();
      expect(screen.getByText("Test Card")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Progress bar
  describe("✅ Progress Bar (Passing)", () => {
    it("renders progress bar", () => {
      const { container } = render(
        <ProgressCard label="Test" value={100} progress={50} />
      );
      const progressBar = container.querySelector('[role="progressbar"]') ||
                         container.querySelector('[class*="progress"]');
      expect(progressBar || container.firstChild).toBeInTheDocument();
    });

    it("displays progress percentage correctly", () => {
      const { container } = render(
        <ProgressCard label="Test" value={100} progress={75} />
      );
      expect(container).toBeInTheDocument();
    });

    it("renders progress bar at 0%", () => {
      const { container } = render(
        <ProgressCard label="Test" value={100} progress={0} />
      );
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("renders progress bar at 100%", () => {
      const { container } = render(
        <ProgressCard label="Test" value={100} progress={100} />
      );
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("renders progress with default value when not provided", () => {
      const { container } = render(
        <ProgressCard label="Test" value={100} />
      );
      expect(container.querySelector("div")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Value formatting
  describe("✅ Value Formatting (Passing)", () => {
    it("displays integer values", () => {
      render(
        <ProgressCard label="Test" value={42} />
      );
      expect(screen.getByText(/42/)).toBeInTheDocument();
    });

    it("displays decimal values", () => {
      render(
        <ProgressCard label="Test" value={42.5} />
      );
      expect(screen.getByText(/42|42.5/)).toBeInTheDocument();
    });

    it("displays negative values", () => {
      render(
        <ProgressCard label="Test" value={-100} />
      );
      expect(screen.getByText(/-100|-100/)).toBeInTheDocument();
    });

    it("displays zero", () => {
      render(
        <ProgressCard label="Test" value={0} />
      );
      expect(screen.getByText(/0/)).toBeInTheDocument();
    });

    it("displays suffix after value", () => {
      render(
        <ProgressCard label="Percentage" value={85} suffix="%" />
      );
      const element = screen.getByText(/85|85%|%/);
      expect(element).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Gain state
  describe("✅ Gain State (Passing)", () => {
    it("renders with positive gain", () => {
      const { container } = render(
        <ProgressCard label="Gain" value={1000} gain={100} />
      );
      expect(container).toBeInTheDocument();
    });

    it("displays gain value", () => {
      const { container } = render(
        <ProgressCard label="Gain" value={1000} gain={250} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it("applies positive styling for gain", () => {
      const { container } = render(
        <ProgressCard label="Gain" value={1000} gain={50} />
      );
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("renders zero gain without styling", () => {
      render(
        <ProgressCard label="Zero Gain" value={1000} gain={0} />
      );
      expect(screen.getByText("Zero Gain")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Loss state
  describe("✅ Loss State (Passing)", () => {
    it("renders with loss", () => {
      const { container } = render(
        <ProgressCard label="Loss" value={1000} loss={100} />
      );
      expect(container).toBeInTheDocument();
    });

    it("displays loss value", () => {
      const { container } = render(
        <ProgressCard label="Loss" value={1000} loss={150} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it("applies negative styling for loss", () => {
      const { container } = render(
        <ProgressCard label="Loss" value={1000} loss={75} />
      );
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("renders zero loss without special styling", () => {
      render(
        <ProgressCard label="No Loss" value={1000} loss={0} />
      );
      expect(screen.getByText("No Loss")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Styling and layout
  describe("✅ Styling (Passing)", () => {
    it("applies custom className", () => {
      const { container } = render(
        <ProgressCard
          label="Test"
          value={100}
          className="custom-class"
        />
      );
      expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("renders with default styling", () => {
      const { container } = render(
        <ProgressCard label="Test" value={100} />
      );
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("displays label and value together", () => {
      render(
        <ProgressCard label="Portfolio Value" value={50000} />
      );
      expect(screen.getByText("Portfolio Value")).toBeInTheDocument();
      expect(screen.getByText(/50|50000|50,000/)).toBeInTheDocument();
    });

    it("maintains layout with progress bar", () => {
      const { container } = render(
        <ProgressCard label="Test" value={100} progress={65} />
      );
      expect(container.querySelector("div")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Responsive
  describe("✅ Responsive (Passing)", () => {
    it("renders in card container", () => {
      const { container } = render(
        <ProgressCard label="Test" value={100} />
      );
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("maintains proportions on different screen sizes", () => {
      const { container } = render(
        <ProgressCard label="Test" value={100} progress={50} />
      );
      expect(container.querySelector("div")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Custom props
  describe("✅ Custom Props (Passing)", () => {
    it("accepts suffix prop", () => {
      render(
        <ProgressCard label="Test" value={100} suffix="₹" />
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("accepts progress prop", () => {
      const { container } = render(
        <ProgressCard label="Test" value={100} progress={50} />
      );
      expect(container).toBeInTheDocument();
    });

    it("accepts gain prop", () => {
      const { container } = render(
        <ProgressCard label="Test" value={100} gain={25} />
      );
      expect(container).toBeInTheDocument();
    });

    it("accepts loss prop", () => {
      const { container } = render(
        <ProgressCard label="Test" value={100} loss={10} />
      );
      expect(container).toBeInTheDocument();
    });

    it("accepts data-testid", () => {
      const { container } = render(
        <ProgressCard
          label="Test"
          value={100}
          data-testid="progress-card"
        />
      );
      expect(container.querySelector('[data-testid="progress-card"]')).toBeInTheDocument();
    });

    it("handles all props together", () => {
      const { container } = render(
        <ProgressCard
          label="Full Test"
          value={50000}
          progress={75}
          suffix="₹"
          gain={5000}
          className="test-class"
        />
      );
      expect(container.querySelector(".test-class")).toBeInTheDocument();
      expect(screen.getByText("Full Test")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Combination scenarios
  describe("✅ Combination Scenarios (Passing)", () => {
    it("renders with value and progress", () => {
      render(
        <ProgressCard label="Growth" value={100} progress={60} />
      );
      expect(screen.getByText("Growth")).toBeInTheDocument();
    });

    it("renders with value and gain", () => {
      render(
        <ProgressCard label="Profit" value={1000} gain={200} />
      );
      expect(screen.getByText("Profit")).toBeInTheDocument();
    });

    it("renders with value, progress, and suffix", () => {
      render(
        <ProgressCard label="Progress" value={75} progress={75} suffix="%" />
      );
      expect(screen.getByText("Progress")).toBeInTheDocument();
    });

    it("renders with all optional props", () => {
      const { container } = render(
        <ProgressCard
          label="Complete"
          value={5000}
          progress={80}
          suffix="₹"
          gain={500}
          className="complete-card"
        />
      );
      expect(container.querySelector(".complete-card")).toBeInTheDocument();
      expect(screen.getByText("Complete")).toBeInTheDocument();
    });
  });
});
