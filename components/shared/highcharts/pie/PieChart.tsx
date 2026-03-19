"use client";

import { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import type { ChartSlice } from "@/types/portfolio";

interface PieChartProps {
  title: string;
  data: ChartSlice[];
  selectedName: string | null;
  onSelect: (name: string | null) => void;
}

// How many items to show before collapsing
const LEGEND_COLLAPSE_THRESHOLD = 5;

export default function PieChart({ title, data, selectedName, onSelect }: PieChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);
  const [showAll, setShowAll] = useState(false);

  const hasMore = data.length > LEGEND_COLLAPSE_THRESHOLD;
  const visibleItems = showAll ? data : data.slice(0, LEGEND_COLLAPSE_THRESHOLD);
  const hiddenCount = data.length - LEGEND_COLLAPSE_THRESHOLD;

  // ── Build Highcharts point objects ────────────────────────────────────────
  const buildSeriesData = (): Highcharts.PointOptionsObject[] =>
    data.map((d) => ({
      name: d.name,
      y: d.value,
      color: d.color,
      opacity: selectedName && selectedName !== d.name ? 0.35 : 1,
      sliced: selectedName === d.name,
    }));

  // ── Init chart once ───────────────────────────────────────────────────────
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
        style: { color: "#333", fontSize: "12px", fontFamily: "Georgia, serif" },
        pointFormat: "<b>{point.name}</b><br/>{point.y}%",
      },
      plotOptions: {
        pie: {
        //   innerSize: "55%",
          size: "80%",
          center: ["38%", "50%"],
          dataLabels: { enabled: false },
          borderWidth: 0,
          allowPointSelect: false,
          states: {
            hover: { halo: { size: 6 }, brightness: 0.05 },
          },
          point: {
            events: {
              click(this: Highcharts.Point) {
                onSelect(this.name === selectedName ? null : this.name);
              },
            },
          },
        },
      },
      series: [{ type: "pie", data: buildSeriesData() }],
      credits: { enabled: false },
      legend: { enabled: false },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Update slices when data or selection changes ───────────────────────────
  useEffect(() => {
    const series = chartRef.current?.series[0];
    if (!series) return;
    series.setData(buildSeriesData(), true, { duration: 300 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedName]);

  // ── Window resize ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => chartRef.current?.reflow();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset expanded state when data shrinks below threshold (e.g. on filter change)
  useEffect(() => {
    if (data.length <= LEGEND_COLLAPSE_THRESHOLD) setShowAll(false);
  }, [data.length]);

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      {/* Section title */}
      <p
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 13,
          fontWeight: 600,
          color: "#333",
          marginBottom: 4,
          paddingLeft: 8,
          margin: "0 0 4px 0",
        }}
      >
        {title}
      </p>

      {/* Chart + Legend row */}
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Donut */}
        <div ref={containerRef} style={{ width: 140, height: 140, flexShrink: 0 }} />

        {/* Legend list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            fontFamily: "'Courier New', monospace",
            fontSize: 11,
            // When expanded with many items, scroll rather than overflow the layout
            maxHeight: showAll ? 200 : "none",
            overflowY: showAll && data.length > 8 ? "auto" : "visible",
            paddingRight: 2,
          }}
        >
          {visibleItems.map((d) => (
            <LegendItem
              key={d.name}
              slice={d}
              isSelected={selectedName === d.name}
              isDimmed={!!selectedName && selectedName !== d.name}
              onSelect={onSelect}
            />
          ))}

          {/* ── More / Less toggle ── */}
          {hasMore && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginTop: 4,
                padding: "2px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#c0392b",
                fontWeight: 600,
                fontSize: 11,
                fontFamily: "'Courier New', monospace",
                width: "fit-content",
              }}
            >
              {showAll ? (
                <>
                  <Arrow direction="up" /> Show less
                </>
              ) : (
                <>
                  <Arrow direction="down" /> {hiddenCount} more
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Legend Item ───────────────────────────────────────────────────────────────
interface LegendItemProps {
  slice: ChartSlice;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: (name: string | null) => void;
}

function LegendItem({ slice, isSelected, isDimmed, onSelect }: LegendItemProps) {
  return (
    <button
      onClick={() => onSelect(isSelected ? null : slice.name)}
      title={slice.name} // Native tooltip for truncated names
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "1px 0",
        textAlign: "left",
        width: "100%",
        opacity: isDimmed ? 0.4 : 1,
        fontWeight: isSelected ? 700 : 400,
        transition: "opacity 0.2s",
      }}
    >
      {/* Colored dot — ring highlight when selected */}
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: slice.color,
          flexShrink: 0,
          display: "inline-block",
          boxShadow: isSelected ? `0 0 0 2px white, 0 0 0 3.5px ${slice.color}` : "none",
          transition: "box-shadow 0.2s",
        }}
      />

      {/* Name — truncated, full name on hover via title on parent button */}
      <span
        style={{
          color: "#444",
          maxWidth: 120,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: 11,
        }}
      >
        {slice.name}
      </span>

      {/* Percentage */}
      <span
        style={{
          color: "#888",
          marginLeft: "auto",
          paddingLeft: 8,
          flexShrink: 0,
          fontSize: 11,
        }}
      >
        {slice.value}%
      </span>
    </button>
  );
}

// ── Tiny arrow icon ───────────────────────────────────────────────────────────
function Arrow({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      style={{ transform: direction === "up" ? "rotate(180deg)" : "none", flexShrink: 0 }}
    >
      <path d="M0 2 L4 6 L8 2" stroke="#c0392b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}