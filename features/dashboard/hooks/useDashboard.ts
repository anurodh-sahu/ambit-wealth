"use client";

import { useState, useEffect, useRef } from "react";
// import { getDashboard } from "@/features/dashboard/services/dashboard.service";

export type DashboardSummaryCard = {
  label: string;
  progress: number;
  value: number;
  trend: number;
  marketValue: number;
  investedAmount: number;
  isLoss?: boolean;
};

export function useDashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DashboardSummaryCard[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Temporary mock — keep loading true until this resolves (do not setLoading in finally before await)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Fix me: replace with real API
      // const queryParams = new URLSearchParams({ email: "...", password: "..." });
      // const result = await getDashboard(queryParams.toString());

      setData([
        {
          label: "Current Value",
          progress: 80,
          value: 240000000,
          trend: 21,
          marketValue: 20,
          investedAmount: 18.5,
          isLoss: false,
        },
        {
          label: "Invested Amount",
          progress: 70,
          value: 240000000,
          trend: 21,
          marketValue: 20,
          investedAmount: 18.5,
        },
        {
          label: "Total Gains",
          progress: 100,
          value: 240000000,
          trend: 21,
          marketValue: 20,
          investedAmount: 18.5,
        },
        {
          label: "1Y Returns",
          progress: 100,
          value: 240000000,
          trend: 21,
          marketValue: 20,
          investedAmount: 18.5,
        },
        {
          label: "Net Flow",
          progress: 100,
          value: 220000000,
          trend: 21,
          marketValue: 20,
          investedAmount: 18.5,
        },
        {
          label: "Net Flow",
          progress: 100,
          value: 240000000,
          trend: 21,
          marketValue: 20,
          investedAmount: 18.5,
          isLoss: false,
        },
      ]);
      // if (result) setData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();

    return () => {
      setData(null);
      setError(null);
      setLoading(false);
    };
  }, []);

  return {
    loading,
    data,
    error,
    fetchData,
  };
}
