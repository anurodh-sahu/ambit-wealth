"use client";

import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import { formatMonth } from "@/lib/utils";
import { getChartColor } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ChartDataPoint {
  date: string; // Month label e.g. "Apr '25" — use "" for in-between weeks
  investedValue: number;
  marketValue: number;
}

interface LineChartProps {
  data: ChartDataPoint[];
  asOnDate?: string; // e.g. "22 - JAN '26"
}

// ── Dummy data ────────────────────────────────────────────────────────────────
const DEFAULT_DATA: ChartDataPoint[] = [
  { date: "Apr '25", investedValue: 19.7, marketValue: 20.7 },
  { date: "", investedValue: 20.5, marketValue: 21.5 },
  { date: "", investedValue: 22.0, marketValue: 23.0 },
  { date: "May '25", investedValue: 21.8, marketValue: 22.8 },
  { date: "", investedValue: 22.2, marketValue: 23.2 },
  { date: "", investedValue: 15.6, marketValue: 14.6 },
  { date: "", investedValue: 22.5, marketValue: 23.5 },
  { date: "Jun '25", investedValue: 22.2, marketValue: 23.2 },
  { date: "", investedValue: 22.8, marketValue: 23.8 },
];
const chartColor7 = getChartColor("--chart-7");
const chartColor8 = getChartColor("--chart-8");
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
        shadow: {
          color: "rgba(0,0,0,0.07)",
          offsetX: 0,
          offsetY: 4,
          opacity: 1,
          width: 12,
        },
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
        categories: data.map((d) => d.date),
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
        labels: {
          style: {
            color: "#bbb",
            fontSize: "12px",
            fontFamily: "Jost, Jost Fallback",
          },
          formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
            // Only render label when month name is non-empty
            return this.value !== "" ? String(formatMonth(this.value)) : "";
          },
        },
      },

      yAxis: {
        // min: 20, removed this so that it calculates automatically
        // max: 28,
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
          data: data.map((d) => d.investedValue / 1000000),
          color: chartColor7,
          lineWidth: 1.8,
        },
        {
          type: "line",
          name: "Market Value",
          data: data.map((d) => d.marketValue / 1000000),
          color: chartColor8,
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
    <div className="w-full p-6 p-6">
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
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
            PORTFOLIO MOVEMENT
          </span>
          <span
            style={{
              fontSize: 11,
              color: "#bbb",
              marginLeft: 8,
              letterSpacing: "0.05em",
            }}
          >
            AS ON {asOnDate}
          </span>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { color: chartColor7, label: "INVESTED VALUE" },
            { color: chartColor8, label: "MARKET VALUE" },
          ].map(({ color, label }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 7 }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: color,
                  opacity: 0.85,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#999",
                }}
              >
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
