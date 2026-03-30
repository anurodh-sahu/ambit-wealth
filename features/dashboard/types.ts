export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface DashboardKpiCards {
  currentValue: number;
  netFlow: number;
  changePercent: number;
  gainLoss: number;
  isProfit: boolean;
  xirr: number;
}

export interface DashboardPortfolioMovementItem {
  date: string;
  investedValue: number;
  marketValue: number;
}

export interface DashboardInvestmentSummaryItem {
  assetClass: string;
  currentValue?: number;
  netFlow: number;
  gainLoss: number;
  lastUpdated: string;
  changePercent: number;
}

/** Shape of `GET /api/v1/dashboard/summary` response. */
export interface DashboardSummaryResponse {
  status: string;
  asOnDate: string;
  timeFilter: string;
  currency?: string;
  kpiCards: DashboardKpiCards;
  portfolioMovement: DashboardPortfolioMovementItem[];
  investmentSummary: DashboardInvestmentSummaryItem[];
}
