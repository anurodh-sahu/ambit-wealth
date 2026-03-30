import { cn, formatMoneyCr } from "@/lib/utils";
import Image from "next/image";
import { CardProgressBar, CardProgressBarSkeleton } from "./CardProgressBar";

export type ProgressCardProps =
  | { loading: true; isLoss?: boolean }
  | {
      loading?: false;
      assetClass: string;
      currentValue: number;
      progress: number;
      isLoss?: boolean;
      gainLoss: number;
      netFlow: number;
      changePercent: number;
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
          <CardProgressBarSkeleton isLoss={isLoss} />
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

  const {
    assetClass,
    currentValue,
    progress,
    gainLoss,
    netFlow,
    changePercent,
    isLoss = true,
  } = props;
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
            {assetClass}
          </span>
          <span className="text-black text-2xl font-normal leading-8 tracking-normal">
            {formatMoneyCr(currentValue)}
          </span>
        </div>

        <CardProgressBar progress={progress} isLoss={isLoss} />

        <div className="flex items-center justify-between">
          <span className=" text-xs font-light leading-4 tracking-normal">
            Net Flow
          </span>
          <span className="text-secondary-s text-xs font-normal leading-4 tracking-normal">
            {formatMoneyCr(netFlow)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className=" text-xs font-light leading-4 tracking-normal">
            Gains/Loss
          </span>
          <span className="text-accents-green text-xs font-normal leading-4 tracking-normal">
            {formatMoneyCr(gainLoss)} ({changePercent}%)
          </span>
        </div>
      </div>
    </div>
  );
}
