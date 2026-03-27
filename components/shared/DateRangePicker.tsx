"use client";

import * as React from "react";
import { format, isSameDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button-custom";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type DateRangePickerValue = DateRange | undefined;

export function DateRangePicker({
  value,
  onChange,
  className,
  placeholder = "Select date range",
  align = "start",
  numberOfMonths = 2,
  inceptionDate,
  mode = "popover",
  trigger,
}: {
  value?: DateRangePickerValue;
  onChange?: (next: DateRangePickerValue) => void;
  className?: string;
  placeholder?: string;
  align?: React.ComponentProps<typeof PopoverContent>["align"];
  numberOfMonths?: number;
  inceptionDate?: Date;
  mode?: "popover" | "modal";
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<DateRangePickerValue>(value);
  const [activePreset, setActivePreset] = React.useState<
    "custom" | "mtd" | "qtd" | "ytd" | "inception"
  >("custom");

  React.useEffect(() => {
    if (!open) setDraft(value);
  }, [open, value]);

  const today = React.useMemo(() => new Date(), []);
  const presets = React.useMemo(() => {
    return {
      mtd: () => ({
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        to: today,
      }),
      qtd: () => {
        const month = today.getMonth();
        const startMonth = Math.floor(month / 3) * 3;
        return {
          from: new Date(today.getFullYear(), startMonth, 1),
          to: today,
        };
      },
      ytd: () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        const fyStartYear = month < 3 ? year - 1 : year;

        return {
          from: new Date(fyStartYear, 3, 1),
          to: today,
        };
      },
      inception: () => ({
        from: inceptionDate ?? new Date(today.getFullYear(), 0, 1),
        to: today,
      }),
    } satisfies Record<string, () => DateRange>;
  }, [inceptionDate, today]);

  const range = draft;

  const label = React.useMemo(() => {
    if (range?.from && range?.to) {
      return `${format(range.from, "LLL dd, y")} - ${format(
        range.to,
        "LLL dd, y"
      )}`;
    }
    if (range?.from) {
      return format(range.from, "LLL dd, y");
    }
    return placeholder;
  }, [placeholder, range?.from, range?.to]);

  const handlePreset = (key: "mtd" | "qtd" | "ytd" | "inception") => {
    setDraft(presets[key]());
    setActivePreset(key);
  };

  const TriggerButton = trigger;

  const Panel = (
    <div className={cn("w-[full] overflow-hidden", "min-h-[350px]")}>
      <div className="flex justify-between w-full">
        {/* LEFT PANEL */}
        <div className="w-[160px] border-r p-3 space-y-2">
          <Button
            variant={"date_modal"}
            isActive={activePreset === "custom"}
            size="sm"
            className="w-full justify-start px-3 py-2 font-sans text-sm font-semibold leading-5 tracking-normal"
            onClick={() => setActivePreset("custom")}
          >
            Custom Range
          </Button>

          <Button
            variant={"date_modal"}
            className=""
            isActive={activePreset === "mtd"}
            onClick={() => handlePreset("mtd")}
          >
            Month Till Date
          </Button>

          <Button
            variant={"date_modal"}
            isActive={activePreset === "qtd"}
            className="w-full justify-start"
            onClick={() => handlePreset("qtd")}
          >
            Quarter Till Date
          </Button>

          <Button
            variant={"date_modal"}
            isActive={activePreset === "ytd"}
            className="w-full justify-start"
            onClick={() => handlePreset("ytd")}
          >
            Year Till Date
          </Button>

          <Button
            variant={"date_modal"}
            isActive={activePreset === "inception"}
            className="w-full justify-start"
            onClick={() => handlePreset("inception")}
          >
            Since Inception
          </Button>

          <Button
            variant="ghost"
            className="px-3 font-semibold text-primary-p justify-start !background-none hover:bg-transparent"
            onClick={() => {
              setDraft(undefined);
              setActivePreset("custom");
            }}
          >
            Reset
          </Button>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 p-3">
          <Calendar
            mode="range"
            numberOfMonths={numberOfMonths}
            selected={range}
            onSelect={(next) => {
              setDraft((prev) => {
                if (!next) return undefined;

                // In range mode, some flows return { from, to } with same day on first click.
                // Normalize first selection to only set `from`.
                const isFirstPick = !prev?.from || Boolean(prev?.to);
                if (
                  next.from &&
                  next.to &&
                  isSameDay(next.from, next.to) &&
                  isFirstPick
                ) {
                  return { from: next.from, to: undefined };
                }

                return next;
              });
              setActivePreset("custom");
            }}
            classNames={{}}
            initialFocus
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-6">
        {range?.from && range?.to ? (
          <span className="text-sm text-muted-foreground">
            {range?.from ? format(range.from, "LLL dd, y") : "—"} -{" "}
            {range?.to ? format(range.to, "LLL dd, y") : "—"}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground"></span>
        )}

        <div className="flex gap-2">
          <Button
            variant="cancel"
            onClick={() => {
              setDraft(value);
              setActivePreset("custom");
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={!range?.from || !range?.to}
            onClick={() => {
              onChange?.(draft);
              setOpen(false);
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );

  if (mode === "modal") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
        <DialogContent className="flex !w-[850px] flex-col items-start py-6 px-[32px] rounded-lg border border-dialog-border bg-dialog-background shadow-xs [&>button]:hidden">
          <DialogTitle className="m-0 p-0"></DialogTitle>
          {Panel}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{TriggerButton}</PopoverTrigger>
      <PopoverContent align={align} className={cn("overflow-hidden p-0", "")}>
        {Panel}
      </PopoverContent>
    </Popover>
  );
}
