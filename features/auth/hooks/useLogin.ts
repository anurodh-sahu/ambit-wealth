"use client";

import { useAuth } from "@/store/features/auth/authHook";
import { LoginFormValues } from "../types";
import { useRouter } from "next/navigation";

export function useLogin() {
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const success = await login(values.email, values.password);

      // If your login returns boolean
      if (success) {
        router.replace("/dashboard/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    loading,
    handleLogin,
  };
}
