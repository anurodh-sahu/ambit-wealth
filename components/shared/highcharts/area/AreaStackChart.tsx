"use client";

import { useEffect, useRef } from "react";
import Highcharts from "highcharts";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface AllocationDataPoint {
  month: string;
  cash: number;
  fixedIncome: number;
  equity: number;
  alternate: number;
}

interface AreaStackChartProps {
  data?: AllocationDataPoint[];
  fromDate?: string;
  toDate?: string;
}

// ── Dummy data — Apr '25 to Jan '26 (weekly points) ──────────────────────────
const DEFAULT_DATA: AllocationDataPoint[] = [
  { month: "Apr '25", cash: 10, fixedIncome: 12, equity: 22, alternate: 56 },
  { month: "",        cash: 10, fixedIncome: 12, equity: 22, alternate: 56 },
  { month: "",        cash: 10, fixedIncome: 12, equity: 22, alternate: 56 },
  { month: "",        cash: 10, fixedIncome: 12, equity: 22, alternate: 56 },
  { month: "May '25", cash: 10, fixedIncome: 12, equity: 22, alternate: 56 },
  { month: "",        cash: 10, fixedIncome: 12, equity: 22, alternate: 56 },
  { month: "",        cash: 10, fixedIncome: 13, equity: 22, alternate: 55 },
  { month: "",        cash: 10, fixedIncome: 13, equity: 22, alternate: 55 },
  { month: "Jun '25", cash: 10, fixedIncome: 13, equity: 23, alternate: 54 },
  { month: "",        cash: 10, fixedIncome: 13, equity: 23, alternate: 54 },
  { month: "",        cash: 10, fixedIncome: 13, equity: 23, alternate: 54 },
  { month: "",        cash: 10, fixedIncome: 13, equity: 24, alternate: 53 },
  { month: "Jul '25", cash: 10, fixedIncome: 13, equity: 26, alternate: 51 },
  { month: "",        cash: 10, fixedIncome: 13, equity: 26, alternate: 51 },
  { month: "",        cash: 10, fixedIncome: 13, equity: 26, alternate: 51 },
  { month: "",        cash: 10, fixedIncome: 13, equity: 26, alternate: 51 },
  { month: "Aug '25", cash: 10, fixedIncome: 14, equity: 27, alternate: 49 },
  { month: "",        cash: 10, fixedIncome: 14, equity: 27, alternate: 49 },
  { month: "",        cash: 10, fixedIncome: 14, equity: 27, alternate: 49 },
  { month: "",        cash: 10, fixedIncome: 14, equity: 27, alternate: 49 },
  { month: "Sep '25", cash: 10, fixedIncome: 14, equity: 28, alternate: 48 },
  { month: "",        cash: 10, fixedIncome: 14, equity: 28, alternate: 48 },
  { month: "",        cash: 10, fixedIncome: 14, equity: 28, alternate: 48 },
  { month: "",        cash: 10, fixedIncome: 14, equity: 28, alternate: 48 },
  { month: "Oct '25", cash: 10, fixedIncome: 15, equity: 30, alternate: 45 },
  { month: "",        cash: 10, fixedIncome: 15, equity: 30, alternate: 45 },
  { month: "",        cash: 10, fixedIncome: 15, equity: 30, alternate: 45 },
  { month: "",        cash: 10, fixedIncome: 15, equity: 30, alternate: 45 },
  { month: "Nov '25", cash: 10, fixedIncome: 15, equity: 30, alternate: 45 },
  { month: "",        cash: 10, fixedIncome: 15, equity: 30, alternate: 45 },
  { month: "",        cash: 10, fixedIncome: 15, equity: 30, alternate: 45 },
  { month: "",        cash: 10, fixedIncome: 15, equity: 30, alternate: 45 },
  { month: "Dec '25", cash: 10, fixedIncome: 15, equity: 30, alternate: 45 },
  { month: "",        cash: 10, fixedIncome: 15, equity: 30, alternate: 45 },
  { month: "",        cash: 10, fixedIncome: 15, equity: 30, alternate: 45 },
  { month: "",        cash: 10, fixedIncome: 15, equity: 30, alternate: 45 },
  { month: "Jan '26", cash: 10, fixedIncome: 15, equity: 30, alternate: 45 },
];

// ── Gradient helper — top color fades to a lighter/transparent bottom ─────────
function makeGradient(
  topColor: string,
  bottomColor: string
): Highcharts.GradientColorObject {
  return {
    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    stops: [
      [0, topColor],
      [1, bottomColor],
    ],
  };
}

// ── Series config ─────────────────────────────────────────────────────────────
const SERIES_CONFIG = [
  {
    key: "alternate" as keyof AllocationDataPoint,
    name: "Alternate",
    lineColor: "#5a9ba0",
    gradient: makeGradient("rgba(100, 180, 178, 0.90)", "rgba(143, 210, 208, 0.45)"),
  },
  {
    key: "equity" as keyof AllocationDataPoint,
    name: "Equity",
    lineColor: "#a89850",
    gradient: makeGradient("rgba(200, 188, 130, 0.90)", "rgba(225, 215, 170, 0.45)"),
  },
  {
    key: "fixedIncome" as keyof AllocationDataPoint,
    name: "Fixed Income",
    lineColor: "#4a8e6e",
    gradient: makeGradient("rgba(100, 168, 138, 0.90)", "rgba(150, 200, 175, 0.45)"),
  },
  {
    key: "cash" as keyof AllocationDataPoint,
    name: "Cash",
    lineColor: "#2e4e65",
    gradient: makeGradient("rgba(80, 115, 145, 0.922)", "rgba(90, 120, 148, 0.50)"),
  },
];

// Legend rendered in JSX (same order as image: Cash, Fixed Income, Equity, Alternate)
const LEGEND_ORDER = ["Cash", "Fixed Income", "Equity", "Alternate"];
const LEGEND_COLORS: Record<string, string> = {
  Cash:           "#2e4e65",
  "Fixed Income": "#4a8e6e",
  Equity:         "#a89850",
  Alternate:      "#5a9ba0",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AreaStackChart({
  data = DEFAULT_DATA,
  fromDate = "1 - APR '25",
  toDate = "22 - JAN '26",
}: AreaStackChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    chartRef.current = Highcharts.chart(containerRef.current, {
      chart: {
        type: "area",
        backgroundColor: "transparent",
        spacing: [10, 10, 10, 10],
        animation: { duration: 700 },
        style: { fontFamily: "Jost, Jost Fallback" },
      },

      title: { text: undefined },
      legend: { enabled: false }, // custom legend in JSX

      tooltip: {
        shared: true,
        backgroundColor: "#fff",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 8,
        useHTML: true,
        style: { fontFamily: "Jost, Jost Fallback" },
        crosshairs: {
          color: "rgba(0,0,0,0.08)",
          dashStyle: "Dash",
          width: 1,
        } as Highcharts.TooltipCrosshairsObject,
        formatter(this: Highcharts.TooltipFormatterContextObject) {
          const label = this.x
            ? `<div style="font-size:10px;color:#aaa;margin-bottom:6px">${this.x}</div>`
            : "";
          // Reverse so tooltip order matches visual stacking (top series first)
          const rows = [...(this.points ?? [])]
            .reverse()
            .map(
              (p) => `
              <div style="display:flex;align-items:center;gap:8px;margin:2px 0">
                <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${p.color};flex-shrink:0"></span>
                <span style="font-size:11px;color:#666">${p.series.name}</span>
                <span style="font-size:12px;font-weight:700;color:#222;margin-left:auto;padding-left:16px">${p.y}%</span>
              </div>`
            )
            .join("");
          return `<div style="padding:4px 6px;min-width:180px">${label}${rows}</div>`;
        },
      },

      xAxis: {
        categories: data.map((d) => d.month),
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
        labels: {
          style: { color: "#bbb", fontSize: "11px" },
          formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
            return this.value !== "" ? String(this.value) : "";
          },
        },
      },

      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 20,
        lineWidth: 0,
        tickWidth: 0,
        title: { text: null },
        gridLineColor: "rgba(0,0,0,0.06)",
        labels: {
          style: { color: "#bbb", fontSize: "11px" },
          format: "{value}%",
        },
      },

      plotOptions: {
        area: {
          stacking: "normal",   // standard stack (values add up to 100)
          lineWidth: 1.5,
          marker: { enabled: false },
          states: { hover: { lineWidth: 2 } },
        },
      },

      series: SERIES_CONFIG.map((s) => ({
        type: "area" as const,
        name: s.name,
        data: data.map((d) => d[s.key] as number),
        color: s.lineColor,      // line stroke color
        lineColor: s.lineColor,
        fillColor: s.gradient,   // gradient fill for the area
        lineWidth: 1.5,
      })),

      credits: { enabled: false },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [data]);

  useEffect(() => {
    const handleResize = () => chartRef.current?.reflow();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(10px)",
        borderRadius: 16,
        border: "1px solid rgba(210,210,205,0.6)",
        padding: "20px 24px",
      }}
    >
      {/* ── Header row ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#555",
            }}
          >
            ALLOCATION HISTORY
          </span>
          <span style={{ fontSize: 11, color: "#bbb", marginLeft: 8 }}>
            FOR {fromDate} TILL {toDate}
          </span>
        </div>

        {/* ── Legend ── */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {LEGEND_ORDER.map((name) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: LEGEND_COLORS[name],
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#888",
                }}
              >
                {name.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Highcharts renders here ── */}
      <div ref={containerRef} style={{ width: "100%", height: 320 }} />
    </div>
  );
}