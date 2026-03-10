"use client";

import { useState, useEffect } from "react";
import { getHome } from "../services/home.service";

export function useHome() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  let isMounted = true;

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        email: "test@test.com",
        password: "test",
      });
      setLoading(true);
      const result = await getHome(queryParams.toString());
      if (isMounted) {
        setData(result);
      }
    } catch (err: unknown) {
      if (isMounted) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    loading,
    data,
    error,
    fetchData,
  };
}
