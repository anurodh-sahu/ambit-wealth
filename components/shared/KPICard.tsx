import Image from "next/image";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Info } from "lucide-react";
import { ChevronUpIcon } from "lucide-react";
export default function KPICard({
  tooltipTriggerAriaLabel,
  tooltipContent,
  tooltipTitle,
  value,
  trend,
}: {
  value: string;
  trend: string;
  tooltipTitle: string;
  tooltipContent: string;
  tooltipTriggerAriaLabel: string;
}) {
  return (
    <div className="flex flex-col relative p-4 rounded-[28px] overflow-hidden">
      <Image
        src="/kpi-card-bg.png"
        alt=""
        width={100}
        height={100}
        aria-hidden
        className="pointer-events-none z-0 w-full h-full object-fit opacity-20 absolute top-0 left-0"
      />
      <div className="relative z-10 flex flex-col">
        <div className="text-base font-light tracking-normal leading-6 text-black flex items-center gap-2">
          <span className="uppercase">{tooltipTitle}</span>{" "}
          <div className="w-6 h-6 flex items-center justify-center rounded-lg border border-gray-300">
            <Tooltip>
              <TooltipTrigger
                type="button"
                className="inline-flex size-full items-center justify-center rounded-md border-0 bg-transparent p-0 text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="More info about current value"
              >
                <Info className="w-4 h-4 text-gray-600" strokeWidth={2} />
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={6}>
                <p>{tooltipContent}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-4xl font-normal tracking-normal leading-10 text-black">
            {value}
          </span>
          <span className="flex items-center gap-1 font-medium text-success text-lg tracking-normal leading-7">
            <ChevronUpIcon />
            <span>{trend}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
