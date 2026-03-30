"use client";

import { useState, useEffect, useCallback } from "react";
import { getDashboard } from "@/features/dashboard/services/dashboard.service";
import { parseDashboardSummaryBody } from "@/features/dashboard/mapDashboardSummaryToCards";
import type { ProgressCardProps } from "@/components/shared/ProgressCard";

export function useDashboard(timeFilter = "1M") {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProgressCardProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    let isActive = true;

    try {
      setIsLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({ timeFilter }).toString();
      const result = await getDashboard(queryParams);

      if (!isActive) return;

      const parsed = parseDashboardSummaryBody(result);

      if (!parsed) {
        setError("Dashboard summary response was missing or invalid.");
        return;
      }

      setData(parsed);
    } catch (err: unknown) {
      if (!isActive) return;

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      if (isActive) {
        setIsLoading(false);
      }
    }

    return () => {
      isActive = false;
    };
  }, [timeFilter]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const queryParams = new URLSearchParams({ timeFilter }).toString();

        const result = await getDashboard(queryParams, {
          signal: controller.signal,
        });

        const parsed = parseDashboardSummaryBody(result);

        if (!parsed) {
          setError("Invalid response");
          return;
        }

        setData(parsed);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort(); // 🔥 cancels previous request
    };
  }, [timeFilter]);

  return {
    isLoading,
    data,
    error,
    fetchData,
  };
}
