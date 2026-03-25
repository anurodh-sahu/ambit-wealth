"use client";
import { cn } from "@/lib/utils";
import PercentCurrencySwitcher from "@/components/shared/PercentCurrencySwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react/jsx-runtime";
const navLinks = [
  {
    href: "/portfolio/overview",
    label: "Overview",
  },
  {
    href: "/portfolio/allocation",
    label: "Allocation",
  },
  {
    href: "/portfolio/performance",
    label: "Performance",
  },
  {
    href: "/portfolio/benchmark",
    label: "Benchmark",
  },
];
export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="px-6 ">
      <div className="flex justify-between items-center border-b border-black/10 ">
        <div className="ml-1 flex items-center gap-6 text-sm uppercase leading-5 tracking-normal font-normal text-secondary-foreground [&>Link]:px-6 [&>Link]:py-2">
          {navLinks.map((link, index) => (
            <Fragment key={link.href}>
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-6 py-[14px]",
                  pathname === link.href
                    ? "text-primary"
                    : "hover:text-secondary-foreground"
                )}
              >
                {link.label}
              </Link>
              {index !== navLinks.length - 1 && (
                <div className="text-secondary-foreground">|</div>
              )}
            </Fragment>
          ))}
        </div>
        <PercentCurrencySwitcher selectedMetricValue="percent" />
      </div>
      {children}
    </div>
  );
}
