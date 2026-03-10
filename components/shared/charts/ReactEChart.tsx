"use client";

import dynamic from "next/dynamic";

export const ReactEChart = dynamic(() => import("echarts-for-react"), {
  ssr: false,
});
