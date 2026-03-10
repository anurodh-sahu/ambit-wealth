"use client";

import Link from "next/link";
import { useLogout } from "@/features/auth/hooks/useLogout";

export default function DashboardHeader() {
  const { handleLogout } = useLogout();

  return (
    <header className="flex h-16 items-center justify-between border-b px-6 w-full">
      <h1 className="text-lg font-semibold">My App</h1>

      <nav className="flex items-center gap-6">
        <Link
          href="/dashboard/home"
          className="text-sm font-medium text-gray-600 hover:text-black"
        >
          Home
        </Link>

        <Link
          href="/dashboard/profile"
          className="text-sm font-medium text-gray-600 hover:text-black"
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-500 hover:text-red-600"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
