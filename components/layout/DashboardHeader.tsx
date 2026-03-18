"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLogout } from "@/features/auth/hooks/useLogout";
import {
  ChevronDownIcon,
  LogOutIcon,
  CircleHelpIcon,
  UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BubbleAvatar } from "@/components/ui/bubble-avatar";

export default function DashboardHeader() {
  const { handleLogout } = useLogout();
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
    <header className="flex h-16 items-center justify-between border-b px-6 w-full sticky top-0 z-10">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="image" shape="pill">
                <BubbleAvatar size="sm" name="Rakesh Patel" />
                <span className="hidden sm:inline">Rakesh Patel (Self)</span>
                <ChevronDownIcon className="size-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2" sideOffset={12}>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/profile"
                  className="flex w-full items-center gap-2"
                >
                  <UserIcon className="size-4 text-gray-500" />
                  <span>My Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <CircleHelpIcon className="size-4 text-gray-500" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 text-destructive focus:text-destructive"
                onSelect={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                <LogOutIcon className="size-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Image
            src="/logo.svg"
            alt="ambit-logo"
            width={100}
            height={100}
            className="w-[112px] h-[62px]"
          />
        </div>
      </nav>
    </header>
  );
}
