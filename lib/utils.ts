import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoneyCr = (value: number) => {
  if (value == null || isNaN(value)) return "₹0 Cr";

  const crore = value / 10000000;

  return `₹${crore.toFixed(2)} Cr`;
};

export const formatMonth = (date: Date) => {
  return format(date, "MMM ''yy");
};

export const formatDate = (date: Date) => {
  return format(date, "dd MMM yyyy");
};

export const formatDateWithYear = (date: Date) => {
  return format(date, "dd MMM yyyy");
};

export const getAssetClassColor = (assetClass: string) => {
  const styles = getComputedStyle(document.documentElement);

  const map: Record<string, string> = {
    Cash: styles.getPropertyValue("--chart-1").trim() || "#ef4444",
    "Fixed Income": styles.getPropertyValue("--chart-2").trim(),
    Equity: styles.getPropertyValue("--chart-3").trim(),
    Alternate: styles.getPropertyValue("--chart-4").trim(),
    Commodities: styles.getPropertyValue("--chart-5").trim(),
    International: styles.getPropertyValue("--chart-6").trim(),
  };

  return map[assetClass] || "#f00";
};

export const roundToTwoDecimals = (value: number) => {
  return Math.round(value * 100) / 100;
};

export const getChartColor = (varName: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
