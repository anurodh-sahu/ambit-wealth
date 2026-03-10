"use client";

import type { EChartsOption } from "echarts";
import EChartWrapper from "@/components/shared/charts/base/EChartWrapper";
import type { PieChartProps } from "@/components/shared/charts/types";

export default function PieRoseChart({ data, height = 350 }: PieChartProps) {
  const option: EChartsOption = {
    tooltip: { trigger: "item" },
    legend: {
      bottom: 0,
      itemWidth: 12,
      itemHeight: 12,
      icon: "roundRect",
      orient: "vertical",
      left: "center",

      formatter: (name: string) => {
        const item = data.find((d) => d.name === name);
        if (!item) return name;

        return `{name|${name}}{value|${item.value}}`;
      },
      textStyle: {
        rich: {
          name: {
            width: 120,
            align: "left",
            fontSize: 12,
          },
          value: {
            width: 60,
            align: "right",
            fontSize: 12,
          },
        },
      },
    },
    series: [
      {
        center: ["50%", "45%"],
        labelLine: {
          show: false,
        },
        label: {
          show: false,
        },
        type: "pie",
        radius: ["20%", "80%"],
        roseType: "area",
        data,
      },
    ],
  };

  return <EChartWrapper option={option} height={height} />;
}
