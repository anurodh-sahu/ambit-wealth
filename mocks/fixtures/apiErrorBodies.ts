/** Bodies for non-2xx MSW responses (WireMock mapping JSON is not a valid API body). */
export const errorUnauthorizedBody = {
  status: "ERROR",
  error: {
    code: "UNAUTHORIZED",
    message: "Invalid or expired token",
  },
} as const;

export const transactionNotFoundBody = {
  status: "ERROR",
  error: {
    code: "NOT_FOUND",
    message: "Transaction not found",
  },
} as const;
