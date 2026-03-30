import { http, HttpResponse } from "msw";

import {
  dashboardSummary1m,
  dashboardSummary1y,
  dashboardSummaryEmpty,
  dashboardSummaryInvalidDateRange,
  dashboardSummaryLoss,
} from "./fixtures/dashboardSummaryBodies";

import portfolioSummaryDefault from "./fixtures/portfolio-summary-default.json";
import portfolioSummaryVip from "./fixtures/portfolio-summary-vip.json";
import portfolioOverviewDefault from "./fixtures/portfolio-overview.json";
import portfolioAllocationDefault from "./fixtures/portfolio-allocation.json";
import portfolioPerformanceDefault from "./fixtures/portfolio-performance.json";
import portfolioBenchmarkDefault from "./fixtures/portfolio-benchmark.json";
import {
  errorUnauthorizedBody,
  transactionNotFoundBody,
} from "./fixtures/apiErrorBodies";

import {
  transactionsList1m,
  transactionsList3m,
  transactionsList6m,
  transactionsList1y,
  transactionsListAll,
  transactionsListEmpty,
  transactionsListLargePage1,
} from "./fixtures/transactionsListBodies";
import { transactionsDetailDefault } from "./fixtures/transactionsDetailBodies";

const asStatus = (body: any, status: number) =>
  HttpResponse.json(body, { status });

/** Any-host pattern so handlers match when axios uses NEXT_PUBLIC_API_BASE_URL ≠ app origin. */
const apiPath = (pathname: string) =>
  pathname.startsWith("/") ? `*${pathname}` : pathname;

export const handlers = [
  // =========================
  // DASHBOARD
  // =========================
  http.get(apiPath("/api/v1/dashboard/summary"), ({ request }) => {
    const url = new URL(request.url);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    if (startDate && endDate && startDate > endDate) {
      return asStatus(dashboardSummaryInvalidDateRange, 400);
    }

    if (url.searchParams.get("scenario") === "loss") {
      return HttpResponse.json(dashboardSummaryLoss);
    }

    const rawTimeFilter = url.searchParams.get("timeFilter");
    if (rawTimeFilter === null) {
      return HttpResponse.json(dashboardSummaryEmpty);
    }

    const timeFilter = rawTimeFilter.toUpperCase();
    const fixtures: Record<string, typeof dashboardSummary1m> = {
      "1M": dashboardSummary1m,
      "1Y": dashboardSummary1y,
    };
    const body = fixtures[timeFilter] ?? dashboardSummary1m;
    return HttpResponse.json(body);
  }),

  // =========================
  // PORTFOLIO
  // =========================
  http.get(apiPath("/api/v1/portfolio/summary"), ({ request }) => {
    const clientId = request.headers.get("clientId");

    // Unauthorized
    const auth = request.headers.get("Authorization");
    if (auth === "Bearer invalid-token")
      return asStatus(errorUnauthorizedBody, 401);

    if (clientId === "VIP1001") return HttpResponse.json(portfolioSummaryVip);
    return HttpResponse.json(portfolioSummaryDefault);
  }),

  http.get(apiPath("/api/v1/portfolio/overview"), () =>
    HttpResponse.json(portfolioOverviewDefault)
  ),

  http.get(apiPath("/api/v1/portfolio/allocation"), () =>
    HttpResponse.json(portfolioAllocationDefault)
  ),

  http.get(apiPath("/api/v1/portfolio/performance"), () =>
    HttpResponse.json(portfolioPerformanceDefault)
  ),

  http.get(apiPath("/api/v1/portfolio/benchmark"), () =>
    HttpResponse.json(portfolioBenchmarkDefault)
  ),

  // =========================
  // TRANSACTIONS
  // =========================
  http.get(apiPath("/api/v1/transactions"), ({ request }) => {
    const url = new URL(request.url);
    const timeFilter = url.searchParams.get("timeFilter");
    const page = Number(url.searchParams.get("page") || 1);
    const size = Number(url.searchParams.get("size") || 15);

    const clientId = request.headers.get("clientId");

    // Empty
    if (clientId === "EMPTY001")
      return HttpResponse.json(transactionsListEmpty);
    if (page === 1 && size >= 100)
      return HttpResponse.json(transactionsListLargePage1);

    const tf = (timeFilter || "all").toLowerCase();
    const txMap: Record<string, unknown> = {
      "1m": transactionsList1m,
      "3m": transactionsList3m,
      "6m": transactionsList6m,
      "1y": transactionsList1y,
      all: transactionsListAll,
    };
    return HttpResponse.json(txMap[tf] ?? transactionsListAll);
  }),

  http.get(apiPath("/api/v1/transactions/:id"), ({ params }) => {
    const { id } = params;

    if (id === "TXN-NOT-FOUND") return asStatus(transactionNotFoundBody, 404);
    return HttpResponse.json({
      ...transactionsDetailDefault,
      transactionId: id,
    });
  }),

  // =========================
  // REPORTS
  // =========================
  http.get("/api/v1/reports", () => HttpResponse.json(reportsListDefault)),

  http.get("/api/v1/reports/:menuId/criteria", ({ params }) =>
    HttpResponse.json({
      ...reportsCriteriaDefault,
      menuId: params.menuId,
    })
  ),

  http.post(apiPath("/api/v1/reports/:menuId/execute"), ({ params }) =>
    HttpResponse.json({
      ...reportsExecuteDefault,
      menuId: params.menuId,
    })
  ),

  http.get("/api/v1/reports/download/:jobId", ({ params }) => {
    if (params.jobId === "JOB-NOT-FOUND")
      return asStatus(reportsDownloadNotFound, 404);

    return HttpResponse.json({
      ...reportsDownloadDefault,
      jobId: params.jobId,
    });
  }),

  // =========================
  // PROFILES
  // =========================
  http.get(apiPath("/api/v1/profiles"), () =>
    HttpResponse.json(profilesGetDefault)
  ),

  http.post(apiPath("/api/v1/profiles/active"), () =>
    HttpResponse.json(profilesActiveDefault)
  ),

  http.get(apiPath("/api/v1/profile/personal"), () =>
    HttpResponse.json(profilePersonalDefault)
  ),

  // =========================
  // ANALYTICS
  // =========================
  http.get(apiPath("/api/v1/analytics/dashboard"), ({ request }) => {
    const fault = request.headers.get("x-fault");

    if (fault === "500") return asStatus(errorServer, 500);

    return HttpResponse.json(analyticsDashboardDefault);
  }),

  // =========================
  // NOTIFICATIONS
  // =========================
  http.get(apiPath("/api/v1/notifications"), () =>
    HttpResponse.json(notificationsGetDefault)
  ),

  http.put("/api/v1/notifications/:id/read", ({ params }) =>
    HttpResponse.json({
      ...notificationsReadDefault,
      id: params.id,
    })
  ),

  http.get(apiPath("/api/v1/notifications/unread"), () =>
    HttpResponse.json(notificationsUnreadDefault)
  ),
];
