import type { SeriesOption } from "echarts";
export interface AreaSeries {
  name: string;
  data: number[];
  gradientColors: {
    from: string;
    to: string;
  };
}

export interface AreaStackGradientChartProps {
  title?: string;
  labels: string[];
  series: AreaSeries[];
  height?: number | string;
}

// Treemap
export interface TreemapNode {
  name: string;
  value?: number;
  path?: string;
  children?: TreemapNode[];
}

export interface TreemapChartProps {
  data: TreemapNode[];
  height?: number | string;
  onPathChange?: (path: string[]) => void;
}

export interface TreemapChartRef {
  reset: () => void;
  navigateTo: (index: number) => void;
}

// Line
export interface LineTouchChartProps {
  labels: string[];
  data: number[];
  height?: number | string;
}

export interface LineStackChartProps {
  labels: string[];
  series: SeriesOption[];
  height?: number | string;
}

// Pie
export interface PieDataItem {
  name: string;
  value: number;
}

export interface PieChartProps {
  title?: string;
  data: PieDataItem[];
  height?: number | string;
}

// Bar
export interface BarSeries {
  name: string;
  data: number[];
}

export interface BarStackChartProps {
  labels: string[];
  series: BarSeries[];
  height?: number | string;
}
