"use client";

import { useState } from "react";
import { validateLogin, ValidationErrors } from "@/features/auth/validation";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const { loading, handleLogin } = useLogin();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLogin(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    handleLogin(form);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full rounded-lg border border-border p-3"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full rounded-lg border border-border p-3"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <Button
        disabled={loading}
        className="w-full"
        //className="w-full rounded-lg bg-primary py-3 text-white disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Login"}
      </Button>
    </form>
  );
}
