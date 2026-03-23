"use client";

import { useEffect, useRef } from "react";
import Highcharts from "highcharts";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ChartDataPoint {
  month: string;       // Month label e.g. "Apr '25" — use "" for in-between weeks
  investedValue: number;
  marketValue: number;
}

interface LineChartProps {
  data: ChartDataPoint[];
  asOnDate?: string;   // e.g. "22 - JAN '26"
}

// ── Dummy data ────────────────────────────────────────────────────────────────
const DEFAULT_DATA: ChartDataPoint[] = [
  { month: "Apr '25",  investedValue: 19.7, marketValue: 20.7 },
  { month: "",         investedValue: 20.5, marketValue: 21.5 },
  { month: "",         investedValue: 21.4, marketValue: 22.4 },
  { month: "",         investedValue: 22.0, marketValue: 23.0 },
  { month: "May '25",  investedValue: 21.8, marketValue: 22.8 },
  { month: "",         investedValue: 22.2, marketValue: 23.2 },
  { month: "",         investedValue: 21.6, marketValue: 22.6 },
  { month: "",         investedValue: 22.5, marketValue: 23.5 },
  { month: "Jun '25",  investedValue: 22.2, marketValue: 23.2 },
  { month: "",         investedValue: 22.8, marketValue: 23.8 },
  { month: "",         investedValue: 23.0, marketValue: 24.0 },
  { month: "",         investedValue: 22.6, marketValue: 23.6 },
  { month: "Jul '25",  investedValue: 25.2, marketValue: 26.2 },
  { month: "",         investedValue: 22.8, marketValue: 23.8 },
  { month: "",         investedValue: 22.5, marketValue: 23.5 },
  { month: "",         investedValue: 22.4, marketValue: 23.4 },
  { month: "Aug '25",  investedValue: 23.0, marketValue: 24.0 },
  { month: "",         investedValue: 23.2, marketValue: 24.2 },
  { month: "",         investedValue: 22.8, marketValue: 23.8 },
  { month: "",         investedValue: 22.9, marketValue: 23.9 },
  { month: "Sep '25",  investedValue: 20.8, marketValue: 20.8 },
  { month: "",         investedValue: 21.2, marketValue: 21.2 },
  { month: "",         investedValue: 20.6, marketValue: 21.6 },
  { month: "",         investedValue: 20.9, marketValue: 21.9 },
  { month: "Oct '25",  investedValue: 21.3, marketValue: 22.3 },
  { month: "",         investedValue: 24.5, marketValue: 25.5 },
  { month: "",         investedValue: 23.8, marketValue: 24.8 },
  { month: "",         investedValue: 23.2, marketValue: 24.2 },
  { month: "Nov '25",  investedValue: 23.0, marketValue: 24.0 },
  { month: "",         investedValue: 23.4, marketValue: 24.4 },
  { month: "",         investedValue: 22.8, marketValue: 23.8 },
  { month: "",         investedValue: 23.1, marketValue: 24.1 },
  { month: "Dec '25",  investedValue: 23.2, marketValue: 24.2 },
  { month: "",         investedValue: 22.9, marketValue: 23.9 },
  { month: "",         investedValue: 23.1, marketValue: 24.1 },
  { month: "",         investedValue: 23.0, marketValue: 24.0 },
  { month: "Jan '26",  investedValue: 23.2, marketValue: 24.2 },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function LineChart({
  data = DEFAULT_DATA,
  asOnDate = "22 - JAN '26",
}: LineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    chartRef.current = Highcharts.chart(containerRef.current, {
      chart: {
        type: "line",
        backgroundColor: "transparent",
        spacing: [10, 10, 16, 10],
        animation: { duration: 600 },
        style: { fontFamily: "Jost, Jost Fallback" },
      },

      title: { text: undefined },
      legend: { enabled: false }, // custom legend rendered in JSX below

      tooltip: {
        shared: true,
        backgroundColor: "#fff",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 8,
        shadow: { color: "rgba(0,0,0,0.07)", offsetX: 0, offsetY: 4, opacity: 1, width: 12 },
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
          const rows = (this.points ?? [])
            .map(
              (p) => `
              <div style="display:flex;align-items:center;gap:8px;margin:2px 0">
                <span style="display:inline-block;width:20px;height:2px;background:${p.color};border-radius:2px;flex-shrink:0"></span>
                <span style="font-size:11px;color:#888">${p.series.name}</span>
                <span style="font-size:12px;font-weight:700;color:#222;margin-left:auto;padding-left:16px">₹${p.y} Cr</span>
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
          style: { color: "#bbb", fontSize: "12px", fontFamily: "Jost, Jost Fallback" },
          formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
            // Only render label when month name is non-empty
            return this.value !== "" ? String(this.value) : "";
          },
        },
      },

      yAxis: {
        min: 20,
        max: 28,
        tickInterval: 2,
        lineWidth: 0,
        tickWidth: 0,
        title: { text: null },
        gridLineColor: "rgba(0,0,0,0.06)",
        labels: {
          style: { color: "#bbb", fontSize: "11px" },
          format: "{value} Cr",
        },
      },

      plotOptions: {
        line: {
          marker: { enabled: false },
          lineWidth: 2,
          states: {
            hover: { lineWidth: 2.5, halo: { size: 0 } },
          },
        },
      },

      series: [
        {
          type: "line",
          name: "Invested Value",
          data: data.map((d) => d.investedValue),
          color: "#5b8fc9",
          lineWidth: 1.8,
        },
        {
          type: "line",
          name: "Market Value",
          data: data.map((d) => d.marketValue),
          color: "#2eac80",
          lineWidth: 2,
        },
      ],

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
        borderRadius: 16,
        border: "1px solid rgba(210,210,205,0.7)",
        padding: "20px 24px",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#555" }}>
            PORTFOLIO MOVEMENT
          </span>
          <span style={{ fontSize: 11, color: "#bbb", marginLeft: 8, letterSpacing: "0.05em" }}>
            AS ON {asOnDate}
          </span>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { color: "#5b8fc9", label: "INVESTED VALUE" },
            { color: "#2eac80", label: "MARKET VALUE" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 14, height: 14,
                  borderRadius: 3,
                  background: color,
                  opacity: 0.85,
                }}
              />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#999" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Highcharts renders here */}
      <div ref={containerRef} style={{ width: "100%", height: 300 }} />
    </div>
  );
}