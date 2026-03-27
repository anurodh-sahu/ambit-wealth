import { PercentIcon, IndianRupee } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function PercentCurrencySwitcher({
  selectedMetricValue,
  onMetricChange,
}: {
  selectedMetricValue: "percent" | "currency";
  onMetricChange?: (value: "percent" | "currency") => void;
}) {
  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        shape="pill"
        onClick={() => onMetricChange?.("percent")}
        className={cn(
          "uppercase",
          selectedMetricValue === "percent" && "text-primary"
        )}
      >
        <PercentIcon className="size-4" />
      </Button>
      <div className="w-px bg-seperator h-10"></div>
      <Button
        variant="ghost"
        shape="pill"
        onClick={() => onMetricChange?.("currency")}
        className={cn(
          "uppercase",
          selectedMetricValue === "currency" && "text-primary"
        )}
      >
        <IndianRupee className="size-4" />
      </Button>
    </div>
  );
}
