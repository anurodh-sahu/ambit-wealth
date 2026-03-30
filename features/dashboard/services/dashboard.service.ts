import { apiRequest } from "@/services/api";
import type { DashboardSummaryResponse } from "../types";

export async function getDashboard(
  queryParams: string,
  options?: { signal?: AbortSignal }
): Promise<DashboardSummaryResponse> {
  const qs = queryParams ? `?${queryParams}` : "";

  return apiRequest<DashboardSummaryResponse>({
    url: `/api/v1/dashboard/summary${qs}`,
    method: "GET",
    signal: options?.signal, // 🔥 pass signal here
  });
}
