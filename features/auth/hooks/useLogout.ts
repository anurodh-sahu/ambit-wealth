"use client";

import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    
    // Clear cookie by setting it to expire in the past
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Redirect to login page
    router.push("/login");
  };

  return {
    handleLogout,
  };
}
