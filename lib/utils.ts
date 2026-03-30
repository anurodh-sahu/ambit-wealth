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
