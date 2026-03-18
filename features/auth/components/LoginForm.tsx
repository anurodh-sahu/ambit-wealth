"use client";

import { useState } from "react";
import { validateLogin, ValidationErrors } from "@/features/auth/validation";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { Button } from "@/components/ui/button";
import InputWrapper from "./InputWrapper";
import ForgotLink from "./ForgotLink";
import LoginLabel from "./LoginLabel";
import LoginInput from "./LoginInput";

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
    <div className="space-y-[10px] w-full max-w-[320px]">
      <header className="space-y-1">
        <h1 className="text-2xl font-light">Login to your account</h1>
        <p className="text-sm font-regular">
          Welcome back! Please enter your details.
        </p>
      </header>
      <form onSubmit={onSubmit} className="space-y-[18px]">
        <div className="space-y-3">
          <LoginLabel>Login ID</LoginLabel>
          <InputWrapper>
            <LoginInput
              type="text"
              placeholder="Input ID"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <ForgotLink href="#" children="Forgot Login ID?" />
          </InputWrapper>
        </div>

        <div className="space-y-3">
          <LoginLabel>Password</LoginLabel>
          <InputWrapper>
            <LoginInput
              type="password"
              placeholder="Input Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <ForgotLink href="#" children="Forgot Password?" />
          </InputWrapper>
        </div>

        <Button
          disabled={loading}
          className="w-full rounded-full uppercase font-semibold text-md"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
