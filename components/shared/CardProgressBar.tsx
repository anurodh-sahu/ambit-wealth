"use client";

import { cn } from "@/lib/utils";
import { Progress as ProgressPrimitive } from "radix-ui";

export interface CardProgressBarProps {
  progress: number;
  isLoss?: boolean;
  loading?: boolean;
}

export function CardProgressBarSkeleton({ isLoss = true }: { isLoss?: boolean }) {
  return (
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
  );
}

export function CardProgressBar({ 
  progress, 
  isLoss = true,
  loading = false
}: CardProgressBarProps) {
  if (loading) {
    return <CardProgressBarSkeleton isLoss={isLoss} />;
  }

  return (
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
  );
}
