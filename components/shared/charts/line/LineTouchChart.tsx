"use client";

import type { EChartsOption } from "echarts";
import EChartWrapper from "@/components/shared/charts/base/EChartWrapper";
import type { LineTouchChartProps } from "@/components/shared/charts/types";

export default function LineTouchChart({
  labels,
  data,
  height = 350,
}: LineTouchChartProps) {
  const option: EChartsOption = {
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: labels,
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "line",
        showSymbol: false,
        smooth: true,
        data,
      },
    ],
  };

  return <EChartWrapper option={option} height={height} />;
}
