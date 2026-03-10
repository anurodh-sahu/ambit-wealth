"use client";

import type { EChartsOption } from "echarts";
import EChartWrapper from "@/components/shared/charts/base/EChartWrapper";
import type { BarStackChartProps } from "@/components/shared/charts/types";

export default function BarStackVariationChart({
  labels,
  series,
  height = 350,
}: BarStackChartProps) {
  const option: EChartsOption = {
    tooltip: { trigger: "axis" },
    legend: { bottom: 0 },
    xAxis: { type: "category", data: labels },
    yAxis: { type: "value" },
    series: series.map((s) => ({
      name: s.name,
      type: "bar",
      stack: "variation",
      emphasis: { focus: "series" },
      data: s.data,
    })),
  };

  return <EChartWrapper option={option} height={height} />;
}
