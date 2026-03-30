/** Sent on API calls; MSW handlers expect these (e.g. dashboard summary requires clientId). */
export const API_CONTEXT_HEADERS: Record<string, string> = {
  clientId: "CL1001",
  profileId: "P1001",
  profileType: "SELF",
};
