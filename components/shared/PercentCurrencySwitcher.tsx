import { PercentIcon, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PercentCurrencySwitcher({
  selectedMetricValue,
}: {
  selectedMetricValue: "percent" | "currency";
}) {
  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        shape="pill"
        onClick={() => onClearFilter}
        className={cn(
          "uppercase",
          selectedMetricValue === "percent" && "text-primary"
        )}
      >
        <PercentIcon className="size-4" />
      </Button>
      <div className="w-px bg-seperator h-6"></div>
      <Button
        variant="ghost"
        shape="pill"
        onClick={() => onClearFilter}
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
