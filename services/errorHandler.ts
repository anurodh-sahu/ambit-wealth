import { ApiError } from "./errors";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function handleApiError(error: unknown, router?: AppRouterInstance) {
  if (error instanceof ApiError) {
    // 🔐 Session expired
    if (error.status === 401) {
      if (router) {
        router.push("/login");
      } else {
        window.location.href = "/login";
      }
      return;
    }

    // 🔥 Other API errors
    console.error("API Error:", error.message);
    return;
  }

  console.error("Unknown Error:", error);
}
