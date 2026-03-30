import axios, { AxiosRequestConfig } from "axios";
import { parseError } from "./errorHandler";
import { handleError } from "./handleError";
import { ErrorType } from "./errorTypes";
import { redirectToLogin } from "./authHandler";
import { API_CONTEXT_HEADERS } from "./apiContextHeaders";
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...API_CONTEXT_HEADERS,
  },
});
const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (!error.response) {
      const appError = {
        type: ErrorType.NETWORK,
        message: "Network error. Please check your internet connection.",
      };

      handleError(appError);
      return Promise.reject(appError);
    }
    // ❌ Skip refresh API itself
    if (originalRequest.url === "/refresh") {
      return Promise.reject(error);
    }

    // ✅ HANDLE TOKEN REFRESH
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(axiosInstance(originalRequest)),
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshClient.post("/refresh");

        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        if (typeof window !== "undefined") {
          redirectToLogin();
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // ❌ Skip UNAUTHORIZED here (already handled)
    if (error.response?.status === 401) {
      return Promise.reject(error);
    }

    // ✅ HANDLE OTHER ERRORS
    const appError = parseError(error);
    handleError(appError);

    return Promise.reject(appError);
  }
);

export default axiosInstance;
