import { cn, formatMoneyCr } from "@/lib/utils";
import Image from "next/image";
import { Progress as ProgressPrimitive } from "radix-ui";

export type ProgressCardProps =
  | { loading: true; isLoss?: boolean }
  | {
      loading?: false;
      label: string;
      value: number;
      progress: number;
      isLoss?: boolean;
    };

export default function ProgressCard(props: ProgressCardProps) {
  if (props.loading) {
    const isLoss = props.isLoss ?? true;
    return (
      <div className="flex flex-col relative p-4 rounded-[28px] overflow-hidden bg-gray-custom-200">
        <div className="absolute inset-0 bg-gray-custom-200/20" aria-hidden />
        <div className="relative z-10 flex flex-col gap-3">
          <div className="h-[20px] w-[120px] bg-gray-custom-300 rounded-md animate-pulse" />
          <div className="h-[36px] w-[160px] bg-gray-custom-300 rounded animate-pulse" />
          <div className={cn("relative w-full", !isLoss && "px-1")}>
            <div
              className={cn(
                "w-full rounded-full",
                isLoss
                  ? "h-[10px] bg-gray-custom-300"
                  : "h-1 bg-gray-custom-300"
              )}
            />
            <div
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-custom-400 animate-pulse",
                isLoss ? "h-1 mx-1 w-[40%]" : "h-[10px] w-[40%]"
              )}
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div className="h-[20px] w-[80px] bg-gray-custom-300 rounded animate-pulse" />
              <div className="h-[20px] w-[100px] bg-gray-custom-300 rounded animate-pulse" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-[20px] w-[100px] bg-gray-custom-300 rounded animate-pulse" />
              <div className="h-[20px] w-[120px] bg-gray-custom-300 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { label, value, progress, isLoss = true } = props;
  return (
    <div className="flex flex-col relative p-5 rounded-[28px] overflow-hidden">
      <Image
        src="/kpi-card-bg.png"
        alt=""
        width={100}
        height={100}
        aria-hidden
        className="pointer-events-none z-0 w-full h-full object-fit opacity-20 absolute top-0 left-0"
      />
      <div className="relative z-10 flex flex-col gap-[5px]">
        <div className="flex flex-col items-start justify-between">
          <span className="font-sans text-xs font-normal leading-4 tracking-normal text-foreground">
            {label}
          </span>
          <span className="text-black text-2xl font-normal leading-8 tracking-normal">
            {formatMoneyCr(value)}
          </span>
        </div>

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
        <div className="flex items-center justify-between">
          <span className=" text-xs font-light leading-4 tracking-normal">
            Net Flow
          </span>
          <span className="text-secondary-s text-xs font-normal leading-4 tracking-normal">
            {formatMoneyCr(value)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className=" text-xs font-light leading-4 tracking-normal">
            Gains/Loss
          </span>
          <span className="text-accents-green text-xs font-normal leading-4 tracking-normal">
            {formatMoneyCr(value)} ({progress}%)
          </span>
        </div>
      </div>
    </div>
  );
}
