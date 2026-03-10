import { ApiError } from "./errors";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiFetch(endpoint: string, init?: RequestInit) {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...init,
    credentials: "include",
  });

  // 🔐 If access token expired
  if (response.status === 401) {
    const refreshResponse = await fetch(`${API_BASE_URL}/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.ok) {
      // 🔁 Retry original request
      const retryResponse = await fetch(url, {
        ...init,
        credentials: "include",
      });

      if (!retryResponse.ok) {
        throw new ApiError(
          "Request failed after refresh",
          retryResponse.status
        );
      }

      return retryResponse;
    }

    // ❌ Refresh failed → session expired
    throw new ApiError("SESSION_EXPIRED", 401);
  }

  // ❌ Handle other errors
  if (!response.ok) {
    let errorData = null;

    try {
      errorData = await response.json();
    } catch {}

    throw new ApiError(
      errorData?.message || "API request failed",
      response.status,
      errorData
    );
  }

  return response;
}
