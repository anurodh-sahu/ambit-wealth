import axiosInstance from "@/lib/axios";
import type { AxiosRequestConfig } from "axios";

/**
 * Shared HTTP helper — all app API calls go through axios (no fetch).
 * Uses `lib/axios` defaults, credentials, refresh, and error interceptors.
 */
export async function apiRequest<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  const res = await axiosInstance.request<T>(config);
  return res.data;
}
