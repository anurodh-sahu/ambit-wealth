"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { BubbleAvatar } from "@/components/shared/BubbleAvatar";
import { ChevronDownIcon } from "lucide-react";
import { UserIcon } from "lucide-react";
import { CircleHelpIcon } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { usePathname } from "next/navigation";

export default function ProfileMenu() {
  const { handleLogout } = useLogout();

  return (
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
  );
}
