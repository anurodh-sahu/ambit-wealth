import { toast } from "sonner";
import { AppError } from "./errorHandler";
import { ErrorType } from "./errorTypes";

export const handleError = (error: AppError) => {
  switch (error.type) {
    case ErrorType.NETWORK:
      toast.error(error.message);
      break;

    case ErrorType.UNAUTHORIZED:
      //clearSession();
      window.location.href = "/login";
      break;

    case ErrorType.FORBIDDEN:
      toast.error(error.message);
      break;

    case ErrorType.SERVER:
      toast.error(error.message);
      break;

    case ErrorType.BUSINESS:
      toast.error(error.message);
      break;

    default:
      toast.error("Something unexpected happened");
  }

  // Optional: send to logging tool
  //logError(error);
};
