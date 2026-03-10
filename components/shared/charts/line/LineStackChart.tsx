"use client";

import type { EChartsOption } from "echarts";
import EChartWrapper from "@/components/shared/charts/base/EChartWrapper";
import type { LineStackChartProps } from "@/components/shared/charts/types";

export default function LineStackChart({
  labels,
  series,
  height = 350,
}: LineStackChartProps) {
  const option: EChartsOption = {
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: labels,
    },
    yAxis: { type: "value" },
    series: series,
  };

  return <EChartWrapper option={option} height={height} />;
}
