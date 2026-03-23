"use client";

import { useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { usePortfolioFilters } from "@/features/dashboard/hooks/usePortfolioFilters";
import AreaStackGradientChart from "@/components/shared/charts/area/AreaStackGradientChat";
import BarStackNormalizationChart from "@/components/shared/charts/bar/BarStackNormalizationChart";
import TreemapChart from "@/components/shared/charts/treemap/TreeMapChart";
import LineTouchChart from "@/components/shared/charts/line/LineTouchChart";
import PieBorderRadiusChart from "@/components/shared/charts/pie/PieBorderRadiusChart";
import PieRoseChart from "@/components/shared/charts/pie/PieRoseChart";
import type { TreemapChartRef } from "@/components/shared/charts/types";
import LineStackChart from "@/components/shared/charts/line/LineStackChart";
// import ExpandableTable from "@/components/shared/table/ExpandableTable";
import { columns } from "@/components/shared/table/columns";
import DonutChart, { type DonutSlice } from "@/components/DonutChart";
import PortfolioTable from "@/components/shared/highcharts/table/portfoliotable";
import LineChart from "@/components/shared/highcharts/line/LineChart";
import AreaStackChart from "@/components/shared/highcharts/area/AreaStackChart";
const PieChart = dynamic(() => import("@/components/shared/highcharts/pie/PieChart"), { ssr: false });
import {
  SimpleTable,
  ExpandableTable,
  type ColumnDef,
  type ExpandableRow,
} from "@/components/shared/table";

interface PortfolioRow {
  id: string;
  name: string;
  cost: string;
  marketValue: string;
  income: string;
  gainLoss: string;
  irr: string;
}

const PORTFOLIO_COLUMNS: ColumnDef<PortfolioRow>[] = [
  { id: "name",        header: "SECURITY",      align: "left",  width: "220px" },
  { id: "cost",        header: "COST",          align: "right" },
  { id: "marketValue", header: "MARKET VALUE",  align: "right" },
  { id: "income",      header: "INCOME",        align: "right" },
  { id: "gainLoss",    header: "GAIN/LOSS",     align: "right" },
  { id: "irr",         header: "% IRR",         align: "right" },
];

const ALL_DATA: ExpandableRow<PortfolioRow>[] = [
  {
    id: "cash", name: "Cash", cost: "₹2.22 Cr", marketValue: "₹2.37 Cr",
    income: "₹0", gainLoss: "₹1.53 Cr", irr: "6.58%",
    dotColor: "#26c6a6",
    children: [
      {
        id: "cash-etf", name: "Cash ETF", cost: "₹126", marketValue: "₹126",
        income: "₹0", gainLoss: "₹0", irr: "0%",
        children: [
          { id: "nippon", name: "Nippon India ETF Liq...", cost: "₹63", marketValue: "₹63", income: "₹0", gainLoss: "₹0", irr: "0%" },
          { id: "india-etf", name: "India ETF Liquid Bees...", cost: "₹63", marketValue: "₹63", income: "₹0", gainLoss: "₹0", irr: "0%" },
        ],
      },
      {
        id: "cash-mf", name: "Cash MF", cost: "₹22.17 Cr", marketValue: "₹23.62 Cr",
        income: "₹0", gainLoss: "₹1.45 Cr", irr: "6.58%",
        children: [
          { id: "hdfc-overnight", name: "HDFC Overnight Fun...", cost: "₹15.5 Cr", marketValue: "₹11.81 Cr", income: "₹0", gainLoss: "₹0.72 Cr", irr: "6.58%" },
          { id: "overnight-direct", name: "Overnight Fund Direct...", cost: "₹15.5 Cr", marketValue: "₹11.81 Cr", income: "₹0", gainLoss: "₹0.72 Cr", irr: "6.58%" },
        ],
      },
    ],
  },
  {
    id: "fixed-income", name: "Fixed Income", cost: "₹38.27 Cr", marketValue: "₹44.04 Cr",
    income: "₹2.50 Cr", gainLoss: "₹8.27 Cr", irr: "11.5%",
    dotColor: "#2196f3",
    children: [
      {
        id: "fi-mf", name: "Fixed Income MF", cost: "₹0.34 Cr", marketValue: "₹0.35 Cr",
        income: "₹0", gainLoss: "₹0.96 Cr", irr: "11.5%",
        children: [
          { id: "hdfc-debt", name: "HDFC Short Term Debt", cost: "₹0.17 Cr", marketValue: "₹0.175 Cr", income: "₹0", gainLoss: "₹0.005 Cr", irr: "11.5%" },
        ],
      },
      {
        id: "high-yield", name: "High Yield AIF", cost: "₹16.98 Cr", marketValue: "₹18.66 Cr",
        income: "₹1.15 Cr", gainLoss: "₹0.28 Cr", irr: "11.5%",
        children: [
          { id: "edelweiss", name: "Edelweiss Alternative", cost: "₹9.34 Cr", marketValue: "₹10.26 Cr", income: "₹0.63 Cr", gainLoss: "₹0.15 Cr", irr: "11.5%" },
          { id: "kotak-special", name: "Kotak Special Situations", cost: "₹7.64 Cr", marketValue: "₹8.40 Cr", income: "₹0.52 Cr", gainLoss: "₹0.13 Cr", irr: "11.5%" },
        ],
      },
    ],
  },
  {
    id: "equity", name: "Equity", cost: "₹12.37 Cr", marketValue: "₹41.04 Cr",
    income: "₹0.28 Cr", gainLoss: "₹28.95 Cr", irr: "16%",
    dotColor: "#ff9800",
    children: [
      {
        id: "direct-equity", name: "Direct Equity", cost: "₹3.37 Cr", marketValue: "₹29.66 Cr",
        income: "₹0.28 Cr", gainLoss: "₹26.57 Cr", irr: "16%",
        children: [
          { id: "reliance", name: "Reliance Industries", cost: "₹1.01 Cr", marketValue: "₹8.90 Cr", income: "₹0.08 Cr", gainLoss: "₹7.89 Cr", irr: "16%" },
          { id: "hdfc-bank", name: "HDFC Bank", cost: "₹0.84 Cr", marketValue: "₹7.42 Cr", income: "₹0.10 Cr", gainLoss: "₹6.58 Cr", irr: "16%" },
        ],
      },
      {
        id: "eq-index", name: "Equity Index Fund", cost: "₹0.36 Cr", marketValue: "₹0.33 Cr",
        income: "₹0", gainLoss: "-₹0.03 Cr", irr: "16%",
        children: [
          { id: "uti-nifty", name: "UTI Nifty 50 Index Fund", cost: "₹0.22 Cr", marketValue: "₹0.20 Cr", income: "₹0", gainLoss: "-₹0.02 Cr", irr: "16%" },
        ],
      },
    ],
  },
  {
    id: "alternate", name: "Alternate", cost: "₹22.52 Cr", marketValue: "₹27.00 Cr",
    income: "₹0.55 Cr", gainLoss: "₹4.48 Cr", irr: "9%",
    dotColor: "#f5c842",
    children: [
      {
        id: "gold-etf", name: "Gold ETF", cost: "₹5.64 Cr", marketValue: "₹7.00 Cr",
        income: "₹0", gainLoss: "₹1.36 Cr", irr: "9%",
        children: [
          { id: "nippon-gold", name: "Nippon India Gold ETF", cost: "₹3.10 Cr", marketValue: "₹3.85 Cr", income: "₹0", gainLoss: "₹0.75 Cr", irr: "9%" },
          { id: "sbi-gold", name: "SBI Gold Fund", cost: "₹2.54 Cr", marketValue: "₹3.15 Cr", income: "₹0", gainLoss: "₹0.61 Cr", irr: "9%" },
        ],
      },
    ],
  },
];

const ASSET_SLICES = ALL_DATA.map((a) => ({
  name: a.name,
  value: parseFloat(a.marketValue.replace(/[₹,Cr\s]/g, "")) || 0,
  color: a.dotColor ?? "#aaa",
}));

function Divider() {
  return (
    <div
      style={{ width: 1, background: "#e8e8e8", alignSelf: "stretch", margin: "20px 0" }}
    />
  );
}

function Crumb({ label }: { label: string }) {
  return (
    <span style={{
      background: "#fff0ee", color: "#c0392b", fontWeight: 700,
      padding: "2px 10px", borderRadius: 4, fontSize: 12,
    }}>
      {label}
    </span>
  );
}


// ── Row type ──────────────────────────────────────────────────────────────────
interface BenchmarkRow {
  particulars: string;
  quarterTillDate: string;
  yearTillDate: string;
  sinceInception: string;
}
 
// ── Columns ───────────────────────────────────────────────────────────────────
const BENCHMARK_COLUMNS: ColumnDef<BenchmarkRow>[] = [
  { id: "particulars",     header: "PARTICULARS",         align: "left",  width: "220px" },
  { id: "quarterTillDate", header: "QUARTER (TILL DATE)", align: "right" },
  { id: "yearTillDate",    header: "YEAR (TILL DATE)",    align: "right" },
  { id: "sinceInception",  header: "SINCE INCEPTION",     align: "right" },
];
 
// ── Data ──────────────────────────────────────────────────────────────────────
const BENCHMARK_DATA: BenchmarkRow[] = [
  { particulars: "From Date",           quarterTillDate: "01/07/2025",  yearTillDate: "01/04/2025",   sinceInception: "28/03/2016" },
  { particulars: "Begin Value",         quarterTillDate: "₹254.20 Cr",  yearTillDate: "₹220.44 Cr",   sinceInception: "₹0" },
  { particulars: "Net Capital",         quarterTillDate: "₹0",          yearTillDate: "-₹4.10 Cr",    sinceInception: "₹184.00 Cr" },
  { particulars: "Realized Gain",       quarterTillDate: "₹0",          yearTillDate: "₹0",            sinceInception: "₹19.02 Cr" },
  { particulars: "Unrealized Gain",     quarterTillDate: "₹0.39 Cr",    yearTillDate: "₹34.50 Cr",    sinceInception: "₹101.44 Cr" },
  { particulars: "Gain Prior to Takeover", quarterTillDate: "₹0",       yearTillDate: "₹0",            sinceInception: "₹0" },
  { particulars: "Income Received",     quarterTillDate: "₹0",          yearTillDate: "₹3.75 Cr",     sinceInception: "₹6.34 Cr" },
  { particulars: "Accrued Income",      quarterTillDate: "₹0",          yearTillDate: "₹0",            sinceInception: "₹0" },
  { particulars: "End Value",           quarterTillDate: "₹0.31 Cr",    yearTillDate: "₹3.01 Cr",     sinceInception: "₹31.06 Cr" },
  { particulars: "Net Profit / Loss",   quarterTillDate: "₹0.39 Cr",    yearTillDate: "₹38.26 Cr",    sinceInception: "₹126.80 Cr" },
];


const BROWSER_DATA: DonutSlice[] = [
  { name: "Chrome",          value: 65.1, color: "#4285f4" },
  { name: "Safari",          value: 18.9, color: "#ff6b35" },
  { name: "Firefox",         value:  4.0, color: "#ff9500" },
  { name: "Edge",            value:  4.8, color: "#0078d4" },
  { name: "Samsung Internet",value:  2.8, color: "#1428a0" },
  { name: "Opera",           value:  2.4, color: "#ff1b2d" },
  { name: "Others",          value:  2.0, color: "#aaaaaa" },
];

const LAST_UPDATED: [string, string][] = [
  ["Cash", "2025-09-08"],
  ["Fixed Income", "2025-09-08"],
  ["Equity", "2025-09-08"],
  ["Alternative", "2025-09-08"],
  ["Commodity", "2025-09-08"],
];

const data = [
  {
    name: "Rakesh Patel",
    totalValue: "11.68%",
    current: "₹31 Cr",
    netFlow: "₹18.40 Cr",
    gainLoss: "₹12.68 Cr",
    xirr: "14%",
    children: [
      {
        name: "Cash",
        totalValue: "20%",
        current: "5.18 Cr",
        netFlow: "4.53",
        gainLoss: "0.64",
        xirr: "10%",
      },
      {
        name: "Equity",
        totalValue: "40%",
        current: "10.36 Cr",
        netFlow: "11.78",
        gainLoss: "1.42",
        xirr: "10.45%",
      },
    ],
  },
  {
    name: "Dilip",
    totalValue: "11.68%",
    current: "₹31 Cr",
    netFlow: "₹18.40 Cr",
    gainLoss: "₹12.68 Cr",
    xirr: "14%",
    children: [
      {
        name: "Cash",
        totalValue: "20%",
        current: "5.18 Cr",
        netFlow: "4.53",
        gainLoss: "0.64",
        xirr: "10%",
      },
      {
        name: "Equity",
        totalValue: "40%",
        current: "10.36 Cr",
        netFlow: "11.78",
        gainLoss: "1.42",
        xirr: "10.45%",
      },
    ],
  },
];

export default function UIComponentsPage() {

  const [selectedAsset,    setSelectedAsset]    = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct,  setSelectedProduct]  = useState<string | null>(null);

  const [metric, setMetric] = useState<"CRLIQ" | "Revenue">("CRLIQ");

  const treemapRef = useRef<TreemapChartRef>(null);
  const [treemapPath, setTreemapPath] = useState<string[]>([]);
  const [selectedBrowser, setSelectedBrowser] = useState<string | null>(null);
  // const {
  //   selectedAsset, selectedCategory, selectedProduct,
  //   handleSelectAsset, handleSelectCategory, handleSelectProduct,
  //   clearFilters,
  //   assetData, categoryData, productData, tableRows,
  // } = usePortfolioFilters();

    // ── Reset children when parent changes ──
  const handleSelectAsset = (name: string | null) => {
    setSelectedAsset(name);
    setSelectedCategory(null);
    setSelectedProduct(null);
  };
  const handleSelectCategory = (name: string | null) => {
    setSelectedCategory(name);
    setSelectedProduct(null);
  };
 
  // ── Derived pie data ──
  const activeAsset = useMemo(
    () => ALL_DATA.find((a) => a.name === selectedAsset),
    [selectedAsset]
  );
 
  const categorySlices = useMemo(() => {
    const source = activeAsset ? [activeAsset] : ALL_DATA;
    return source.flatMap((a) =>
      (a.children ?? []).map((c) => ({
        name: c.name,
        value: parseFloat(c.marketValue.replace(/[₹,Cr\s]/g, "")) || 0,
        color: a.dotColor ?? "#aaa",
      }))
    );
  }, [activeAsset]);
 
  const activeCategory = useMemo(
    () => (activeAsset?.children ?? []).find((c) => c.name === selectedCategory),
    [activeAsset, selectedCategory]
  );
 
  const productSlices = useMemo(() => {
    const source = activeCategory ? [activeCategory] : (activeAsset?.children ?? ALL_DATA.flatMap((a) => a.children ?? []));
    return source.flatMap((c) =>
      (c.children ?? []).map((p) => ({
        name: p.name,
        value: parseFloat(p.marketValue.replace(/[₹,Cr\s]/g, "")) || 0,
        color: "#26c6a6",
      }))
    );
  }, [activeAsset, activeCategory]);
 
  // ── Filtered table data ──
  // The table ONLY receives filtered data — it knows nothing about the filter logic
  const filteredTableData = useMemo<ExpandableRow<PortfolioRow>[]>(() => {
    if (selectedAsset) {
      const asset = ALL_DATA.find((a) => a.name === selectedAsset);
      if (!asset) return ALL_DATA;
 
      if (selectedCategory) {
        const cat = asset.children?.find((c) => c.name === selectedCategory);
        if (!cat) return [asset];
        return [{ ...asset, children: [cat] }];
      }
 
      return [asset];
    }
    return ALL_DATA;
  }, [selectedAsset, selectedCategory]);
 
  const hasFilter = selectedAsset || selectedCategory;

  // const hasFilter = selectedAsset !== null || selectedCategory !== null;

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-center">UI Components</h1>
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-lg font-bold text-center">Area Stack Gradient</h2>
          <AreaStackGradientChart
            title="Area Stack Gradient"
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            series={[
              {
                gradientColors: {
                  from: "rgb(128, 255, 165)",
                  to: "rgb(1, 191, 236)",
                },
                name: "Email",
                data: [120, 132, 101, 134, 90, 230, 210],
              },
              {
                gradientColors: {
                  from: "rgb(0, 221, 255)",
                  to: "rgb(77, 119, 255)",
                },
                name: "Affiliate",
                data: [220, 182, 191, 234, 290, 330, 310],
              },
            ]}
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-center">Custom Legend</h2>
          <div className="flex gap-2 justify-between items-center ml-[16px] mr-[19px]">
            <div className="text-lg font-bold">Area Stack Gradient</div>
            <div className="flex items-center gap-6 mb-4">
              {/* Dropdown Legend */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-500"></div>

                <select
                  value={metric}
                  onChange={(e) =>
                    setMetric(e.target.value as "CRLIQ" | "Revenue")
                  }
                  className="bg-transparent font-semibold"
                >
                  <option value="CRLIQ">CRLIQ</option>
                  <option value="Revenue">Revenue</option>
                </select>
              </div>

              {/* Static Legend */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-600"></div>
                <span className="font-semibold">IRR</span>
              </div>
            </div>
          </div>
          <AreaStackGradientChart
            //title="Area Stack Gradient"
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            series={[
              {
                gradientColors: {
                  from: "rgb(128, 255, 165)",
                  to: "rgb(1, 191, 236)",
                },
                name: "IRR",
                data: [120, 132, 101, 134, 90, 230, 210],
              },
              {
                gradientColors: {
                  from: "rgb(0, 221, 255)",
                  to: "rgb(77, 119, 255)",
                },
                name: metric === "CRLIQ" ? "CRLIQ" : "Revenue",
                data:
                  metric === "CRLIQ"
                    ? [120, 132, 101, 134, 90, 230, 210]
                    : [220, 182, 191, 234, 290, 330, 310],
              },
            ]}
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-center">Line Touch Tooltip</h2>
          <LineStackChart
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            series={[
              {
                name: "Email",
                type: "line",
                smooth: true,
                stack: "Total",
                data: [120, 132, 101, 134, 90, 230, 210],
              },
              {
                name: "Union Ads",
                type: "line",
                smooth: true,
                stack: "Total",
                data: [220, 182, 191, 234, 290, 330, 310],
              },
              {
                name: "Video Ads",
                type: "line",
                smooth: true,
                stack: "Total",
                data: [150, 232, 201, 154, 190, 330, 410],
              },
              {
                name: "Direct",
                type: "line",
                smooth: true,
                stack: "Total",
                data: [320, 332, 301, 334, 390, 330, 320],
              },
              {
                name: "Search Engine",
                type: "line",
                smooth: true,
                stack: "Total",
                data: [820, 932, 901, 934, 1290, 1330, 1320],
              },
            ]}
          />
        </div>
        <div>
          <PieRoseChart
            title="Pie Rose Type"
            data={[
              { name: "Email", value: 40 },
              { name: "Direct", value: 30 },
            ]}
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-center">Pie Border Radius</h2>
          <PieBorderRadiusChart
            data={[
              { value: 1048, name: "Desktop" },
              { value: 735, name: "Mobile" },
              { value: 580, name: "Tablet" },
            ]}
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-center">Bar Stack Variation</h2>
          <BarStackNormalizationChart
            labels={["Mon", "Tue", "Wed"]}
            series={[
              { name: "Apples", data: [10, 20, 30] },
              { name: "Oranges", data: [15, 25, 35] },
            ]}
          />
        </div>

        <div>
          <h2 className="text-lg font-bold text-center">Treemap</h2>

          {/* Breadcrumb + Reset (moved from TreemapChart) */}
          <div className="flex items-center gap-3 mb-2 justify-between">
            <div className="flex gap-2 text-sm">
              {treemapPath.map((item, index) => (
                <span
                  key={index}
                  className="cursor-pointer text-blue-500 hover:underline"
                  onClick={() => treemapRef.current?.navigateTo(index)}
                >
                  {item}
                  {index < treemapPath.length - 1 && " / "}
                </span>
              ))}
            </div>
            <button
              onClick={() => treemapRef.current?.reset()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
            >
              Reset
            </button>
          </div>

          <TreemapChart
            ref={treemapRef}
            onPathChange={setTreemapPath}
            height={200}
            data={[
              {
                value: 1503180,
                name: "Funds",
                path: "Speech",
                children: [
                  {
                    value: 502132,
                    name: "Cash",
                    path: "Speech/Voices/Agnes.SpeechVoice",
                    children: [
                      {
                        value: 100000,
                        name: "Agnes.SpeechVoice.Children.1",
                        path: "Speech/Voices/Agnes.SpeechVoice/Agnes.SpeechVoice.Children.1",
                        children: [
                          {
                            value: 100000,
                            name: "Agnes.SpeechVoice.Children.1.1",
                            path: "Speech/Voices/Agnes.SpeechVoice/Agnes.SpeechVoice.Children.1/Agnes.SpeechVoice.Children.1.1",
                            children: [
                              {
                                value: 100000,
                                name: "Agnes.SpeechVoice.Children.1.1.1",
                                path: "Speech/Voices/Agnes.SpeechVoice/Agnes.SpeechVoice.Children.1/Agnes.SpeechVoice.Children.1.1/Agnes.SpeechVoice.Children.1.1.1",
                              },
                            ],
                          },
                          {
                            value: 200000,
                            name: "Agnes.SpeechVoice.Children.1.2",
                            path: "Speech/Voices/Agnes.SpeechVoice/Agnes.SpeechVoice.Children.1/Agnes.SpeechVoice.Children.1.2",
                          },
                          {
                            value: 300000,
                            name: "Agnes.SpeechVoice.Children.1.3",
                            path: "Speech/Voices/Agnes.SpeechVoice/Agnes.SpeechVoice.Children.1/Agnes.SpeechVoice.Children.1.3",
                          },
                          {
                            value: 400000,
                            name: "Agnes.SpeechVoice.Children.1.4",
                            path: "Speech/Voices/Agnes.SpeechVoice/Agnes.SpeechVoice.Children.1/Agnes.SpeechVoice.Children.1.4",
                          },
                          {
                            value: 500000,
                            name: "Agnes.SpeechVoice.Children.1.5",
                            path: "Speech/Voices/Agnes.SpeechVoice/Agnes.SpeechVoice.Children.1/Agnes.SpeechVoice.Children.1.5",
                          },
                          {
                            value: 600000,
                            name: "Agnes.SpeechVoice.Children.1.6",
                            path: "Speech/Voices/Agnes.SpeechVoice/Agnes.SpeechVoice.Children.1/Agnes.SpeechVoice.Children.1.6",
                          },
                          {
                            value: 700000,
                            name: "Agnes.SpeechVoice.Children.1.7",
                            path: "Speech/Voices/Agnes.SpeechVoice/Agnes.SpeechVoice.Children.1/Agnes.SpeechVoice.Children.1.7",
                          },
                          {
                            value: 800000,
                            name: "Agnes.SpeechVoice.Children.1.8",
                            path: "Speech/Voices/Agnes.SpeechVoice/Agnes.SpeechVoice.Children.1/Agnes.SpeechVoice.Children.1.8",
                          },
                          {
                            value: 900000,
                            name: "Agnes.SpeechVoice.Children.1.9",
                            path: "Speech/Voices/Agnes.SpeechVoice/Agnes.SpeechVoice.Children.1/Agnes.SpeechVoice.Children.1.9",
                          },
                          {
                            value: 1000000,
                            name: "Agnes.SpeechVoice.Children.1.10",
                            path: "Speech/Voices/Agnes.SpeechVoice/Agnes.SpeechVoice.Children.1/Agnes.SpeechVoice.Children.1.10",
                          },
                        ],
                      },
                      {
                        value: 50000,
                        name: "Agnes.SpeechVoice.Children.2",
                        path: "Speech/Voices/Agnes.SpeechVoice/Agnes.SpeechVoice.Children.2",
                      },
                    ],
                  },
                  {
                    value: 212132,
                    name: "Fixed Income",
                    path: "Speech/Voices/Albert.SpeechVoice",
                    children: [
                      {
                        value: 100000,
                        name: "Agnes.SpeechVoice.Children.1",
                        path: "Speech/Voices/Albert.SpeechVoice/Agnes.SpeechVoice.Children.1",
                      },
                      {
                        value: 50000,
                        name: "Agnes.SpeechVoice.Children.2",
                        path: "Speech/Voices/Albert.SpeechVoice/Agnes.SpeechVoice.Children.2",
                      },
                    ],
                  },
                  {
                    value: 412132,
                    name: "Equity",
                    path: "Speech/Voices/Alex.SpeechVoice",
                  },
                ],
              },
            ]}
          />
        </div>
        {/* <div className="mb-10">
          <h2 className="text-lg font-bold text-center">Table</h2>
          <ExpandableTable data={data} columns={columns} />
        </div> */}





        <h1 style={{textAlign:"center", fontSize:"30px", fontWeight:"bolder"}}> ----High Charts----</h1>

        {/* <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          <PieChart
            title="Asset Class"
            data={assetData}
            selectedName={selectedAsset}
            onSelect={handleSelectAsset}
          />
 
          <Divider />
 
          <PieChart
            title="Product Category"
            data={categoryData}
            selectedName={selectedCategory}
            onSelect={handleSelectCategory}
          />
 
          <Divider />
 
          <PieChart
            title="Product"
            data={productData.slice(0, 8)}
            selectedName={selectedProduct}
            onSelect={handleSelectProduct}
          />
        </div> */}

        <div style={{ padding: "24px 32px", fontFamily: "Jost, Jost Fallback" }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "#555", marginBottom: 4 }}>
            INVESTMENT SUMMARY
            <span style={{ fontWeight: 400, color: "#aaa", marginLeft: 8, fontSize: 12 }}>
              AS ON 22 - JAN &apos;26
            </span>
          </h2>
    
          {/* Filter breadcrumb */}
          {hasFilter && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 12 }}>
              <span style={{ color: "#888" }}>FILTERED BY</span>
              {selectedAsset    && <Crumb label={selectedAsset} />}
              {selectedCategory && <><span style={{ color: "#ccc" }}>›</span><Crumb label={`#${selectedCategory}`} /></>}
              {selectedProduct  && <><span style={{ color: "#ccc" }}>›</span><Crumb label={`#${selectedProduct}`} /></>}
              <button
                onClick={() => { handleSelectAsset(null); }}
                style={{
                  marginLeft: "auto", padding: "5px 14px", borderRadius: 20,
                  background: "#c0392b", color: "#fff", border: "none",
                  fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em",
                }}
              >
                ↺ CLEAR FILTER
              </button>
            </div>
          )}
    
          {/* ── Three Pie Charts ── */}
          <div style={{ display: "flex", gap: 0, alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap" }}>
            <PieChart
              title="Asset Class"
              data={ASSET_SLICES}
              selectedName={selectedAsset}
              onSelect={handleSelectAsset}
              tooltipSuffix=" Cr"
            />
            <Divider />
            <PieChart
              title="Product Category"
              data={categorySlices}
              selectedName={selectedCategory}
              onSelect={handleSelectCategory}
              tooltipSuffix=" Cr"
            />
            <Divider />
            <PieChart
              title="Product"
              data={productSlices.slice(0, 8)}
              selectedName={selectedProduct}
              onSelect={setSelectedProduct}
              tooltipSuffix=" Cr"
            />
          </div>
    
          {/* ── Expandable Table ── */}
          {/* The table is 100% independent — it just gets columns + filtered data */}
          <div style={{ border: "1px solid #e8e8e8", borderRadius: 10, overflow: "hidden" }}>
            <ExpandableTable<PortfolioRow>
              columns={PORTFOLIO_COLUMNS}
              data={filteredTableData}
              rowKey="id"
              defaultExpandedIds={["cash", "fixed-income", "equity", "alternate"]}
            />
          </div>
        </div>
        <div
          style={{
            fontSize: 10,
            color: "#888",
            marginTop: 14,
            padding: "6px 10px",
            background: "#fafafa",
            borderRadius: 4,
            border: "1px solid #f0f0f0",
            fontFamily: "'Courier New', monospace",
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
              <span style={{ marginRight: 4 }}>⏱</span>
              Last updated:
              {LAST_UPDATED.map(([label, date], i) => (
                <span key={label}>
                  {i > 0 && " |"} {label} -{" "}
                  <span style={{ color: "#c0392b" }}>{date}</span>
                </span>
              ))}
        </div>
        {/* <div> */}
            {/* ── Holdings Table ─────────────────────────────────────────────── */}
            {/* <PortfolioTable rows={tableRows} /> */}
    
            {/* ── Clear Filters ──────────────────────────────────────────────── */}
           {/* {hasFilter && (
              <div style={{ marginTop: 12, textAlign: "center" }}>
                <button
                  onClick={clearFilters}
                  style={{
                    border: "1px solid #c0392b",
                    color: "#c0392b",
                    background: "#fff",
                    padding: "5px 16px",
                    borderRadius: 20,
                    cursor: "pointer",
                    fontSize: 11,
                    fontFamily: "Georgia, serif",
                    letterSpacing: 1,
                  }}
                >
                  ✕ Clear filters
                </button>
              </div>
            )}  */}
        {/* </div> */}

        <div>
          <PieChart
            title="Browsers"
            data={BROWSER_DATA}
            selectedName={selectedBrowser}
            onSelect={setSelectedBrowser}
            tooltipSuffix="%"
            collapseLegendAfter={5}     // 7 items → "2 more" button appears
          />
        </div>

        <div>
          <LineChart asOnDate="22 - JAN '26" />
        </div>
        <div>
          <AreaStackChart 
          fromDate="1 - APR '25"
          toDate="22 - JAN '26"
          />
        </div>
        <div style={{ padding: "24px 32px" }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "#555", marginBottom: 16 }}>
            BENCHMARK COMPARISON
          </h2>
    
          {/* SimpleTable — just pass columns + data, done */}
          <div style={{ border: "1px solid #e8e8e8", borderRadius: 10, overflow: "hidden" }}>
            <SimpleTable<BenchmarkRow>
              columns={BENCHMARK_COLUMNS}
              data={BENCHMARK_DATA}
              striped
            />
          </div>
        </div>
      </div>
    </div>
  );
}
