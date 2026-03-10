"use client";

import { useRef, useState } from "react";
import AreaStackGradientChart from "@/components/shared/charts/area/AreaStackGradientChat";
import BarStackNormalizationChart from "@/components/shared/charts/bar/BarStackNormalizationChart";
import TreemapChart from "@/components/shared/charts/treemap/TreeMapChart";
import LineTouchChart from "@/components/shared/charts/line/LineTouchChart";
import PieBorderRadiusChart from "@/components/shared/charts/pie/PieBorderRadiusChart";
import PieRoseChart from "@/components/shared/charts/pie/PieRoseChart";
import type { TreemapChartRef } from "@/components/shared/charts/types";
import LineStackChart from "@/components/shared/charts/line/LineStackChart";
import ExpandableTable from "@/components/shared/table/ExpandableTable";
import { columns } from "@/components/shared/table/columns";
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
  const [metric, setMetric] = useState<"CRLIQ" | "Revenue">("CRLIQ");

  const treemapRef = useRef<TreemapChartRef>(null);
  const [treemapPath, setTreemapPath] = useState<string[]>([]);
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
        <div className="mb-10">
          <h2 className="text-lg font-bold text-center">Table</h2>
          <ExpandableTable data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
}
