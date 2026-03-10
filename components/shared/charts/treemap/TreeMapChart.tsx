"use client";

import { useRef, useMemo, forwardRef, useImperativeHandle } from "react";
import type { EChartsOption } from "echarts";
import EChartWrapper from "@/components/shared/charts/base/EChartWrapper";
import type {
  TreemapChartProps,
  TreemapChartRef,
} from "@/components/shared/charts/types";

const LEVEL_OPTION = [
  { itemStyle: { borderWidth: 0, gapWidth: 5 } },
  { itemStyle: { gapWidth: 1 } },
  {
    colorSaturation: [0.35, 0.5],
    itemStyle: { gapWidth: 1, borderColorSaturation: 0.6 },
  },
];

const TreemapChart = forwardRef<TreemapChartRef, TreemapChartProps>(
  function TreemapChart({ data, height = 650, onPathChange }, ref) {
    const chartInstanceRef = useRef<any>(null);
    // Path kept as ref — only the parent renders it, so no re-render needed here
    const pathRef = useRef<string[]>([]);

    const updatePath = (newPath: string[]) => {
      pathRef.current = newPath;
      onPathChange?.(newPath);
    };

    const option: EChartsOption = useMemo(
      () => ({
        tooltip: { trigger: "item" },
        series: [
          {
            name: "Disk Usage",
            type: "treemap",
            visibleMin: 50,
            breadcrumb: { show: false },
            upperLabel: { show: false },
            initialTreeDepth: 1,
            label: {
              show: true,
              overflow: "truncate",

              align: "center",

              formatter: "{name|{b}}\n\n{value|{c}}",

              padding: [30, 0, 0, 0], // push label downward

              rich: {
                name: {
                  align: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                },
                value: {
                  align: "center",
                  fontSize: 18,
                },
              },
            },

            itemStyle: { borderColor: "#fff" },
            data,
            leafDepth: 2,
            levels: LEVEL_OPTION,
          },
        ],
      }),
      [data]
    );

    const handleClick = (params: any) => {
      if (params.treePathInfo) {
        const newPath = params.treePathInfo
          .slice(2)
          .map((item: any) => item.name);
        updatePath(newPath);
      }
    };

    const handleReset = () => {
      const instance = chartInstanceRef.current;
      if (!instance) return;

      instance.setOption(option, true);
      updatePath([]);
    };

    const handleBreadcrumbClick = (index: number) => {
      const instance = chartInstanceRef.current;
      if (!instance) return;

      const seriesModel = instance.getModel().getSeriesByIndex(0);
      const viewRoot = seriesModel.getViewRoot();

      const nodes: any[] = [];
      let node = viewRoot;
      while (node) {
        nodes.unshift(node);
        node = node.parentNode;
      }

      const targetNode = nodes[index + 1];

      if (!targetNode) {
        instance.dispatchAction({
          type: "treemapZoomToNode",
          targetNodeId: null,
        });
        updatePath([]);
        return;
      }

      instance.dispatchAction({
        type: "treemapZoomToNode",
        targetNodeId: targetNode.getId(),
      });

      updatePath(pathRef.current.slice(0, index + 1));
    };

    const onChartReady = (instance: any) => {
      chartInstanceRef.current = instance;
    };

    useImperativeHandle(
      ref,
      () => ({
        reset: handleReset,
        navigateTo: handleBreadcrumbClick,
      }),
      [option]
    );

    return (
      <EChartWrapper
        option={option}
        height={height}
        onClick={handleClick}
        onChartReady={onChartReady}
      />
    );
  }
);

export default TreemapChart;
