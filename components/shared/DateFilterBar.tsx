import { Button } from "@/components/ui/button";
import { DateRangePicker } from "./DateRangePicker";
import { CalendarIcon } from "lucide-react";
export default function DateFilterBar({
  isDashboard = false,
  filterLabel,
  asOnDate,
}: {
  isDashboard: boolean;
  filterLabel: string;
  filterValue: string;
  asOnDate: Date;
}) {
  return (
    <div className="flex justify-between items-center text-sm ">
      {isDashboard ? (
        <div className="flex items-center justify-center gap-2 uppercase text-center text-header font-sans text-lg  leading-7 tracking-normal">
          <span className="font-semibold">{filterLabel}</span>{" "}
          <span className="font-normal">
            As On {asOnDate.toLocaleDateString()}
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 uppercase text-center text-header font-sans text-lg  leading-7 tracking-normal">
          <span className="font-semibold">{filterLabel}</span>{" "}
          <span className="font-normal">
            as on 22 - {asOnDate.toLocaleDateString()}
          </span>
        </div>
      )}
      <div className="flex items-center gap-[10px]">
        <Button
          variant="image"
          shape="pill"
          size="sm"
          //onClick={() => onClearFilter}
          className="uppercase"
        >
          Since Inception
        </Button>
        <Button
          variant="image"
          shape="pill"
          size="sm"
          //onClick={() => onClearFilter}
          className="uppercase"
        >
          Year (Till Date)
        </Button>
        <DateRangePicker
          mode="modal"
          trigger={
            <Button
              variant="image"
              shape="pill"
              size="sm"
              //onClick={() => onClearFilter}
              className="uppercase"
            >
              <CalendarIcon className="w-4 h-4" />
              Custom Range
            </Button>
          }
          //value={value}
          //onChange={onChange}
          className="w-full"
          placeholder="Select date range"
          align="start"
          numberOfMonths={2}
          inceptionDate={new Date(2025, 1, 5)}
        />
      </div>
    </div>
  );
}
