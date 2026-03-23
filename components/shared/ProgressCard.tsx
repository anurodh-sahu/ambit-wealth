import { cn, formatMoneyCr } from "@/lib/utils";
import Image from "next/image";
import { Progress as ProgressPrimitive } from "radix-ui";

interface ProgressCardProps {
  label: string;
  value: number;
  progress: number;
  isLoss?: boolean;
}

export default function ProgressCard({
  label,
  value,
  progress,
  isLoss = true,
}: ProgressCardProps) {
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
      <div className="relative z-10 flex flex-col gap-3">
        <span className="text-sm font-light tracking-normal text-black/70">
          {label}
        </span>
        <span className="text-3xl font-normal tracking-normal leading-9 text-black">
          {formatMoneyCr(value)}
        </span>

        <div className={cn("relative w-full", !isLoss && "px-1")}>
          {/* Root */}
          <ProgressPrimitive.Root
            value={progress}
            max={100}
            aria-label="Portfolio progress"
            className={cn(
              "w-full rounded-full relative",
              isLoss ? "bg-white h-[10px]" : "bg-success h-1 z-10"
            )}
          />

          {/* Indicator wrapper */}
          <div
            className={cn(
              "absolute left-0 right-0 top-1/2 -translate-y-1/2",
              isLoss ? "h-1 mx-1" : "h-[10px]"
            )}
          >
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500 ease-out",
                isLoss ? "bg-red-500" : "bg-white"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span>Net Flow</span>
            <span>{formatMoneyCr(value)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Gains/Loss</span>
            <span>
              {formatMoneyCr(value)} ({progress}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
