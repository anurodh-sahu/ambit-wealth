import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoneyCr = (value: number) => {
  if (value == null || isNaN(value)) return "₹0 Cr";

  const crore = value / 10000000;

  return `₹${crore.toFixed(2)} Cr`;
};
