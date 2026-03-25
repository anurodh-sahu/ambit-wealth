"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PercentCurrencySwitcher from "@/components/shared/PercentCurrencySwitcher";

export default function ProfilePage() {
  const pathname = usePathname();
  return (
    <div className="px-6 py-3">
      <div className="flex justify-between items-center border-b border-black/10 ">
        <div className="ml-1 flex gap-6 text-sm uppercase leading-5 tracking-normal font-normal text-secondary-foreground [&>Link]:px-6 [&>Link]:py-2">
          <Link
            href="/portfolio"
            className={
              pathname === "/portfolio"
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
              pathname.startsWith("/portfolio/allocation")
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
              pathname.startsWith("/portfolio/performance")
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
              pathname.startsWith("/portfolio/benchmark")
                ? "text-primary"
                : "hover:text-foreground"
            }
          >
            Benchmark
          </Link>
        </div>
        <PercentCurrencySwitcher selectedMetricValue="percent" />
      </div>
      <h1>Dashboard</h1>
    </div>
  );
}
