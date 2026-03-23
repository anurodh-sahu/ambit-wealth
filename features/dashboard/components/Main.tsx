import Image from "next/image";
import { ChevronUpIcon, Info } from "lucide-react";
import LineStackChart from "@/components/shared/charts/line/LineStackChart";
import FilterBar from "@/components/shared/FilterBar";
import KPICard from "@/components/shared/KPICard";
import { useHome } from "@/features/dashboard/hooks/useHome";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ChartWrapper from "@/components/shared/charts/ChartWrapper";
import ProgressCard from "@/components/shared/ProgressCard";
interface KPICardProps {
  tooltipTitle: string;
  tooltipContent: string;
  tooltipTriggerAriaLabel: string;
  value: string;
  trend: string;
}
const kpiData: KPICardProps[] = [
  {
    tooltipTitle: "Current Value",
    tooltipContent: "Add to library",
    tooltipTriggerAriaLabel: "More info about current value",
    value: "₹24.77 Cr",
    trend: "21%",
  },
  {
    tooltipTitle: "Invested Amount",
    tooltipContent: "Total amount invested so far",
    tooltipTriggerAriaLabel: "More info about invested amount",
    value: "₹18.50 Cr",
    trend: "12%",
  },
  {
    tooltipTitle: "Total Gains",
    tooltipContent: "Overall profit from investments",
    tooltipTriggerAriaLabel: "More info about total gains",
    value: "₹6.27 Cr",
    trend: "34%",
  },
  {
    tooltipTitle: "1Y Returns",
    tooltipContent: "Returns generated in last 1 year",
    tooltipTriggerAriaLabel: "More info about 1 year returns",
    value: "18.6%",
    trend: "5%",
  },
];
interface summaryCardProps {
  label: string;
  progress: number;
  value: number;
  trend: number;
  marketValue: number;
  investedAmount: number;
  isLoss?: boolean;
}
const summaryData: summaryCardProps[] = [
  {
    label: "Current Value",
    progress: 80,
    value: 240000000,
    trend: 21,
    marketValue: 20,
    investedAmount: 18.5,
    isLoss: false,
  },
  {
    label: "Invested Amount",
    progress: 70,
    value: 240000000,
    trend: 21,
    marketValue: 20,
    investedAmount: 18.5,
  },
  {
    label: "Total Gains",
    progress: 100,
    value: 240000000,
    trend: 21,
    marketValue: 20,
    investedAmount: 18.5,
  },
  {
    label: "1Y Returns",
    progress: 100,
    value: 240000000,
    trend: 21,
    marketValue: 20,
    investedAmount: 18.5,
  },
  {
    label: "Net Flow",
    progress: 100,
    value: 240000000,
    trend: 21,
    marketValue: 20,
    investedAmount: 18.5,
  },
  {
    label: "Net Flow",
    progress: 100,
    value: 240000000,
    trend: 21,
    marketValue: 20,
    investedAmount: 18.5,
    isLoss: false,
  },
];
export default function Main() {
  const { loading, data, error } = useHome();
  //if (loading) return <div>Loading...</div>;
  //if (error) return <div>Error: {error} </div>;
  //return <div>{data?.message}</div>;
  return (
    <div>
      <FilterBar
        items={[
          { label: "#Poduct Category", key: "category" },
          { label: "#Security", key: "subcategory" },
        ]}
        onClearFilter={() => {}}
      />
      <div className="grid grid-cols-3 gap-4">
        {summaryData.map((summary) => (
          <ProgressCard key={summary.label} {...summary} />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.tooltipTitle} {...kpi} />
        ))}
      </div>

      <ChartWrapper>
        <LineStackChart
          labels={[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]}
          series={[
            {
              name: "Series 1",
              type: "line",
              data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
            },
          ]}
        />
      </ChartWrapper>
    </div>
  );
}
