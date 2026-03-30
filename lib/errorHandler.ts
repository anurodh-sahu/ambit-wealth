import { ErrorType } from "./errorTypes";

export interface AppError {
  type: ErrorType;
  message: string;
  status?: number;
  data?: any;
}

export const parseError = (error: any): AppError => {
  // Network error
  if (!error.response) {
    return {
      type: ErrorType.NETWORK,
      message: "Network error. Please check your connection.",
    };
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      return {
        type: ErrorType.BUSINESS,
        message: data?.message || "Invalid request",
        status,
        data,
      };

    case 401:
      return {
        type: ErrorType.UNAUTHORIZED,
        message: "Session expired. Please login again.",
        status,
      };

    case 403:
      return {
        type: ErrorType.FORBIDDEN,
        message: "You do not have access.",
        status,
      };

    case 404:
      return {
        type: ErrorType.NOT_FOUND,
        message: "Resource not found.",
        status,
      };

    case 500:
    case 502:
    case 503:
    case 504:
      return {
        type: ErrorType.SERVER,
        message: "Something went wrong. Try again later.",
        status,
      };

    default:
      return {
        type: ErrorType.UNKNOWN,
        message: "Unexpected error occurred.",
        status,
      };
  }
};
