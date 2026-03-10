"use client";

import type { EChartsOption } from "echarts";
import type { AreaStackGradientChartProps } from "@/components/shared/charts/types";
import EChartWrapper from "@/components/shared/charts/base/EChartWrapper";

import * as echarts from "echarts";
import { useState } from "react";

export default function AreaStackGradientChart({
  title,
  labels,
  series,
  height = 350,
}: AreaStackGradientChartProps) {
  const option: EChartsOption = {
    grid: {
      top: 20, // reduce this value
      left: 40,
      right: 20,
      bottom: 40,
    },
    title: {
      text: title || "",
      left: "12%", // 🔥 Left align
      top: 15,
      textStyle: {
        fontSize: 16,
        fontWeight: 600,
      },
    },
    tooltip: { trigger: "axis" },
    // legend: {
    //   orient: "horizontal",
    //   top: 15, // 🔥 Move to top
    //   right: "10%", // 🔥 Align right
    //   itemWidth: 12,
    //   itemHeight: 12,
    //   icon: "roundRect",
    //   itemGap: 20,
    //   textStyle: {
    //     fontSize: 12,
    //     color: "#666",
    //   },
    // },
    media: [
      // 📱 Mobile breakpoint
      {
        query: {
          maxWidth: 600,
        },
        option: {
          title: {
            left: "center",
            top: 10,
          },
          legend: {
            orient: "horizontal",
            top: 40,
            left: "center",
          },
        },
      },
    ],
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: labels,
    },
    yAxis: {
      type: "value",
    },
    legend: {
      show: false,
    },
    series: series.map((s) => ({
      legend: {
        show: true,
      },
      name: s.name,
      type: "line",
      stack: "Total",
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: s.gradientColors.from },
          { offset: 1, color: s.gradientColors.to },
        ]),
      },
      emphasis: { focus: "series" },
      data: s.data,
    })),
  };

  return (
    <>
      <EChartWrapper option={option} height={height} />
    </>
  );
}
