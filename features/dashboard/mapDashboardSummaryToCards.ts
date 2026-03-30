import type { ProgressCardProps } from "@/components/shared/ProgressCard";
import type {
  DashboardSummaryResponse,
  DashboardInvestmentSummaryItem,
} from "./types";

function toProgressCard(item: DashboardInvestmentSummaryItem): ProgressCardProps {
  return {
    label: item.assetClass,
    value: item.gainLoss,
    progress: item.changePercent,
    isLoss: item.gainLoss < 0,
  };
}

export function mapDashboardSummaryToCards(
  res: DashboardSummaryResponse
): ProgressCardProps[] {
  return res.investmentSummary.map(toProgressCard);
}

export function parseDashboardSummaryBody(
  body: unknown
): DashboardSummaryResponse | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  if (o["status"] !== "SUCCESS" || !Array.isArray(o["investmentSummary"])) return null;
  return o as unknown as DashboardSummaryResponse;
}
