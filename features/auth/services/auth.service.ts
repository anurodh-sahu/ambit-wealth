import { apiFetch } from "@/services/api";
import { LoginPayload, LoginResponse } from "../types";

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const res = await apiFetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}
