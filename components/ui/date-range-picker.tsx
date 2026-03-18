"use client";

import * as React from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
}: {
  value?: DateRangePickerValue;
  onChange?: (next: DateRangePickerValue) => void;
  className?: string;
  placeholder?: string;
  align?: React.ComponentProps<typeof PopoverContent>["align"];
  numberOfMonths?: number;
  inceptionDate?: Date;
  mode?: "popover" | "modal";
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
      ytd: () => ({
        from: new Date(today.getFullYear(), 0, 1),
        to: today,
      }),
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

  const TriggerButton = (
    <Button
      variant="outline"
      className={cn(
        "justify-start gap-2 text-left font-normal",
        !range?.from && "text-muted-foreground",
        className
      )}
      icon={<CalendarIcon className="size-4" />}
    >
      {label}
    </Button>
  );

  const Panel = (
    <div className={cn("w-[700px] overflow-hidden", "min-h-[350px]")}>
      <div className="flex">
        {/* LEFT PANEL */}
        <div className="w-52 border-r p-3 space-y-2">
          <Button
            variant={activePreset === "custom" ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => setActivePreset("custom")}
          >
            Custom Range
          </Button>

          <Button
            variant={activePreset === "mtd" ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => handlePreset("mtd")}
          >
            Month Till Date
          </Button>

          <Button
            variant={activePreset === "qtd" ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => handlePreset("qtd")}
          >
            Quarter Till Date
          </Button>

          <Button
            variant={activePreset === "ytd" ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => handlePreset("ytd")}
          >
            Year Till Date
          </Button>

          <Button
            variant={activePreset === "inception" ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => handlePreset("inception")}
          >
            Since Inception
          </Button>

          <Button
            variant="ghost"
            className="px-0 text-destructive justify-start !background-none hover:bg-transparent"
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
              setDraft(next);
              setActivePreset("custom");
            }}
            initialFocus
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between border-t p-3">
        <span className="text-sm text-muted-foreground">
          {range?.from ? format(range.from, "LLL dd, y") : "—"} -{" "}
          {range?.to ? format(range.to, "LLL dd, y") : "—"}
        </span>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setDraft(value);
              setActivePreset("custom");
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            size="sm"
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
        <DialogContent className="p-0">{Panel}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{TriggerButton}</PopoverTrigger>
      <PopoverContent
        align={align}
        className={cn("w-[700px] overflow-hidden p-0", "min-h-[350px]")}
      >
        {Panel}
      </PopoverContent>
    </Popover>
  );
}
