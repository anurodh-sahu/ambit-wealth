"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomePage() {
  const pathname = usePathname();
  return (
    <div className="p-6">
      <div className="ml-1 flex gap-6 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        <Link
          href="/portfolio"
          className={
            pathname === "/portfolio" ? "text-primary" : "hover:text-foreground"
          }
        >
          Overview
        </Link>
        <span className="text-gray-300">|</span>
        <Link
          href="/portfolio/allocation"
          className={
            pathname.startsWith("/portfolio/allocation")
              ? "text-primary"
              : "hover:text-foreground"
          }
        >
          Allocation
        </Link>
        <span className="text-gray-300">|</span>
        <Link
          href="/portfolio/performance"
          className={
            pathname.startsWith("/portfolio/performance")
              ? "text-primary"
              : "hover:text-foreground"
          }
        >
          Performance
        </Link>
        <span className="text-gray-300">|</span>
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
      <h1>Dashboard</h1>
    </div>
  );
}
