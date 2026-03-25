import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ChartWrapper({
  children,
  title,
  bgImage,
  borderRadius = "32px",
  isScale = true,
}: {
  children: React.ReactNode;
  title: string;
  bgImage?: string;
  borderRadius?: string;
  isScale: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden  max-h-[390px]  pt-6 pr-8 pb-8 pl-8",
        `rounded-[${borderRadius}]`
      )}
    >
      <Image
        src={bgImage || "/chart-bg.png"}
        alt="bg"
        fill
        className={cn(
          "bg-cover object-left bg-no-repeat",
          isScale && "scale-110 opacity-30"
        )}
      />

      <div className="relative z-10 flex flex-col items-start gap-[10px]">
        <div className="text-header text-left font-sans text-sm font-bold leading-[20px] tracking-normal uppercase">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}
