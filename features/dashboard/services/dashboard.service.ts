import { handleApiError } from "@/services/errorHandler";
import { LoginPayload, LoginResponse } from "../types";
import { apiFetch } from "@/services/api";
export async function getDashboard(
  queryParams: string
): Promise<LoginResponse> {
  try {
    const params = new URLSearchParams(queryParams);
    const res = await apiFetch(`/api/user`, {
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
