"use client";

import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { usePathname } from "next/navigation";

import NotificationDrawer from "@/components/shared/NotificationDrawer";

export default function DashboardHeader() {
  const pathname = usePathname();

  const navLinkClass = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(`${href}/`);
    return [
      "text-sm font-medium hover:text-black uppercase",
      isActive
        ? "text-foreground border-b-2 border-primary pb-1"
        : "text-gray-600",
    ].join(" ");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b px-6 w-full sticky top-0 z-15 bg-white">
      <nav className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-1 items-center gap-9">
            <Link href="/dashboard" className={navLinkClass("/dashboard")}>
              Dashboard
            </Link>
            <Link href="/portfolio" className={navLinkClass("/portfolio")}>
              Portfolio
            </Link>
            <Link
              href="/transactions"
              className={navLinkClass("/transactions")}
            >
              Transactions
            </Link>
            <Link href="/reports" className={navLinkClass("/reports")}>
              Reports
            </Link>
          </div>
          <NotificationDrawer />

          <Logo />
        </div>
      </nav>
    </header>
  );
}
