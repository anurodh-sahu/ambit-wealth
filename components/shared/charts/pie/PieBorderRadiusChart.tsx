"use client";

import { useState, useMemo } from "react";
import type { EChartsOption } from "echarts";
import EChartWrapper from "@/components/shared/charts/base/EChartWrapper";
import type { PieChartProps } from "@/components/shared/charts/types";

const COLORS = [
  "#5470c6",
  "#91cc75",
  "#fac858",
  "#ee6666",
  "#73c0de",
  "#3ba272",
  "#fc8452",
  "#9a60b4",
  "#ea7ccc",
];
const GRAY = "#d1d5db";

export default function PieBorderRadiusChart({
  data,
  height = 350,
}: PieChartProps) {
  const [selectedNames, setSelectedNames] = useState<Set<string>>(new Set());

  const toggleName = (name: string) => {
    setSelectedNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  // Color each item: if nothing is selected → all colored; otherwise only selected items are colored
  const coloredData = useMemo(
    () =>
      data.map((item, i) => ({
        ...item,
        itemStyle: {
          color:
            selectedNames.size === 0 || selectedNames.has(item.name)
              ? COLORS[i % COLORS.length]
              : GRAY,
        },
      })),
    [data, selectedNames]
  );

  const option: EChartsOption = useMemo(
    () => ({
      tooltip: { trigger: "item" },
      legend: { bottom: 0 },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
          },
          data: coloredData,
        },
      ],
    }),
    [coloredData]
  );

  // Click on a pie section — toggle that item in the selection set
  const handleClick = (params: any) => {
    toggleName(params.name);
  };

  // Click on a legend item — toggle that item (and keep all items visible)
  const handleLegendSelect = (params: any, chart: any) => {
    // Prevent ECharts from hiding the legend item
    const allVisible: Record<string, boolean> = {};
    Object.keys(params.selected).forEach((name) => {
      allVisible[name] = true;
    });
    chart.setOption({ legend: { selected: allVisible } });

    toggleName(params.name);
  };

  return (
    <EChartWrapper
      option={option}
      height={height}
      onClick={handleClick}
      onEvents={{ legendselectchanged: handleLegendSelect }}
    />
  );
}
