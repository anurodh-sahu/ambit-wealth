"use client";
import PercentCurrencySwitcher from "@/components/shared/PercentCurrencySwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="px-6 py-3">
      <div className="flex justify-between items-center border-b border-black/10 ">
        <div className="ml-1 flex gap-6 text-sm uppercase leading-5 tracking-normal font-normal text-secondary-foreground [&>Link]:px-6 [&>Link]:py-2">
          <Link
            href="/portfolio/overview"
            className={
              pathname === "/portfolio/overview"
                ? "text-primary"
                : "hover:text-secondary-foreground"
            }
          >
            Overview
          </Link>
          <div className="text-secondary-foreground">|</div>
          <Link
            href="/portfolio/allocation"
            className={
              pathname === "/portfolio/allocation"
                ? "text-primary"
                : "hover:text-secondary-foreground"
            }
          >
            Allocation
          </Link>
          <div className="text-secondary-foreground">|</div>
          <Link
            href="/portfolio/performance"
            className={
              pathname === "/portfolio/performance"
                ? "text-primary"
                : "hover:text-secondary-foreground"
            }
          >
            Performance
          </Link>
          <div className="text-secondary-foreground">|</div>
          <Link
            href="/portfolio/benchmark"
            className={
              pathname === "/portfolio/benchmark"
                ? "text-primary"
                : "hover:text-foreground"
            }
          >
            Benchmark
          </Link>
        </div>
        <PercentCurrencySwitcher selectedMetricValue="percent" />
      </div>
      {children}
    </div>
  );
}
