import { handleApiError } from "@/services/errorHandler";
import { LoginPayload, LoginResponse } from "../types";
import { apiFetch } from "@/services/api";
export async function getHome(queryParams: string): Promise<LoginResponse> {
  try {
    const params = new URLSearchParams(queryParams);
    const res = await apiFetch(`/api/dashboard/home?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify(payload),
    });

    return res.json();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}
