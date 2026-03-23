"use client";

import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface Props {
  option: EChartsOption;
  height?: number | string;
  onClick?: (params: any) => void;
  onChartReady?: (instance: any) => void;
  onEvents?: Record<string, (params: any, chart: any) => void>;
}

export default function EChartWrapper({
  option,
  height = 400,
  onClick,
  onChartReady,
  onEvents: extraEvents,
}: Props) {
  const events: Record<string, (params: any, chart: any) => void> = {
    ...extraEvents,
    ...(onClick ? { click: onClick } : {}),
  };
  const hasEvents = Object.keys(events).length > 0;

  return (
    <ReactECharts
      option={option}
      //style={{ height }}
      notMerge
      onEvents={hasEvents ? events : undefined}
      onChartReady={onChartReady}
    />
  );
}
