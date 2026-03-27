"use client";

import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { Button } from "../ui/Button";
import ProfileMenu from "@/components/shared/ProfileMenu";
import { usePathname } from "next/navigation";

import NotificationDrawer from "@/components/shared/NotificationDrawer";

export default function DashboardHeader() {
  const pathname = usePathname();

  const navLinkClass = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(`${href}/`);
    return [
      "text-xs uppercase text-header",
      isActive ? "font-medium" : "font-normal",
    ].join(" ");
  };

  return (
    <div>
      <header className="flex  items-center justify-between border-b px-8 py-[9px] w-full sticky top-0 z-15 bg-white border-header/50">
        <nav className="flex flex-col gap-2 w-full leading-5 tracking-normal">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
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
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-6">
                <NotificationDrawer />
                <Button variant="image" shape="pill">
                  Athena
                </Button>
                <ProfileMenu />
              </div>
              <Logo />
            </div>
          </div>
        </nav>
      </header>
      <div className="h-[2px] w-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,1)_4%,rgba(0,0,0,0.5)_70%,transparent_100%)] blur-xs"></div>
    </div>
  );
}
