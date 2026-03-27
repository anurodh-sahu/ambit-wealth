"use client";

import { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";

// ── Public types ──────────────────────────────────────────────────────────────
export interface PieSlice {
  name: string;
  value: number;
  color: string;
}

export interface PieChartProps {
  title: string;
  data: PieSlice[];
  /** Controlled: which slice name is currently selected (null = none) */
  selectedName?: string | null;
  /** Called when a slice is clicked. null means deselect. */
  onSelect?: (name: string | null) => void;
  /** Suffix shown in tooltip e.g. "%" or " Cr" */
  tooltipSuffix?: string;
  /** How many legend items before "N more" collapse */
  collapseLegendAfter?: number;
}

const COLLAPSE_AT = 5;

export default function PieChart({
  title,
  data,
  selectedName = null,
  onSelect,
  tooltipSuffix = "%",
  collapseLegendAfter = COLLAPSE_AT,
}: PieChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);
  const [showAll, setShowAll] = useState(false);

  const hasMore = data.length > collapseLegendAfter;
  const visibleItems = showAll ? data : data.slice(0, collapseLegendAfter);

  const buildSeriesData = (): Highcharts.PointOptionsObject[] =>
    data.map((d) => ({
      name: d.name,
      y: d.value,
      color: d.color,
      opacity: selectedName && selectedName !== d.name ? 0.3 : 1,
      sliced: selectedName === d.name,
    }));

  // Init once
  useEffect(() => {
    if (!containerRef.current) return;
    chartRef.current = Highcharts.chart(containerRef.current, {
      chart: {
        type: "pie",
        backgroundColor: "transparent",
        margin: [0, 0, 0, 0],
        spacing: [0, 0, 0, 0],
        animation: { duration: 300 },
      },
      title: { text: undefined },
      tooltip: {
        backgroundColor: "#fff",
        borderColor: "#e0e0e0",
        borderWidth: 1,
        style: { color: "#333", fontSize: "12px" },
        formatter(this: Highcharts.TooltipFormatterContextObject) {
          return `<b>${this.point.name}</b><br/>${this.y}${tooltipSuffix}`;
        },
        fontFamily: "Jost, Jost Fallback"
      },
      plotOptions: {
        pie: {
          // innerSize: "55%",
          size: "85%",
          center: ["40%", "50%"],
          dataLabels: { enabled: false },
          borderWidth: 0,
          allowPointSelect: false,
          states: { hover: { halo: { size: 5 }, brightness: 0.05 } },
          point: {
            events: {
              click(this: Highcharts.Point) {
                onSelect?.(this.name === selectedName ? null : this.name);
              },
            },
          },
        },
      },
      series: [{ type: "pie", data: buildSeriesData() }],
      credits: { enabled: false },
      legend: { enabled: false },
    });
    return () => { chartRef.current?.destroy(); chartRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update on data/selection change
  useEffect(() => {
    chartRef.current?.series[0]?.setData(buildSeriesData(), true, { duration: 250 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedName]);

  // Resize
  useEffect(() => {
    const fn = () => chartRef.current?.reflow();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Reset showAll when data shrinks
  useEffect(() => {
    if (data.length <= collapseLegendAfter) setShowAll(false);
  }, [data.length, collapseLegendAfter]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0, fontFamily: "Jost, Jost Fallback" }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#333", margin: "0 0 4px 4px", fontFamily: "Jost, Jost Fallback" }}>
        {title}
      </p>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Donut */}
        <div ref={containerRef} style={{ width: 130, height: 130, flexShrink: 0 }} />

        {/* Legend */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 11, paddingTop: 4 }}>
          {visibleItems.map((d) => (
            <button
              key={d.name}
              onClick={() => onSelect?.(d.name === selectedName ? null : d.name)}
              title={d.name}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "none", border: "none", cursor: onSelect ? "pointer" : "default",
                padding: "1px 0", textAlign: "left", width: "100%",
                opacity: selectedName && selectedName !== d.name ? 0.35 : 1,
                fontWeight: selectedName === d.name ? 700 : 400,
                transition: "opacity 0.2s",
                fontFamily: "Jost, Jost Fallback"
              }}
            >
              <span style={{
                width: 9, height: 9, borderRadius: "50%", background: d.color,
                flexShrink: 0, display: "inline-block",
                boxShadow: selectedName === d.name ? `0 0 0 2px white, 0 0 0 3.5px ${d.color}` : "none",
              }} />
              <span style={{ color: "#555", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "Jost, Jost Fallback" }}>
                {d.name}
              </span>
              <span style={{ color: "#999", marginLeft: "auto", paddingLeft: 8, flexShrink: 0, fontFamily: "Jost, Jost Fallback" }}>
                {d.value}{tooltipSuffix}
              </span>
            </button>
          ))}
          {hasMore && (
            <button
              onClick={() => setShowAll((p) => !p)}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                marginTop: 2, padding: "2px 0",
                background: "none", border: "none", cursor: "pointer",
                color: "#c0392b", fontWeight: 600, fontSize: 11,
                fontFamily: "Jost, Jost Fallback",
              }}
            >
              {showAll ? "▲ Show less" : `▼ ${data.length - collapseLegendAfter} more`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}