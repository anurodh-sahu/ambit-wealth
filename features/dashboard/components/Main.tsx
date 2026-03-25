import Image from "next/image";
import { ChevronUpIcon, Info } from "lucide-react";
import LineStackChart from "@/components/shared/charts/line/LineStackChart";
import FilterBar from "@/components/shared/FilterBar";
import KPICard, { KPICardProps } from "@/components/shared/KPICard";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ChartWrapper from "@/components/shared/charts/ChartWrapper";
import ProgressCard from "@/components/shared/ProgressCard";
import KPICardGrid from "@/components/shared/KPICardGrid";
import ProgressCardGrid from "@/components/shared/ProgressCardGrid";
import DateFilterBar from "@/components/shared/DateFilterBar";
import WelcomeSection from "./WelcomeSection";

const kpiData: KPICardProps[] = [
  {
    tooltipTitle: "Cash",
    tooltipContent: "Add to library",
    tooltipTriggerAriaLabel: "More info about current value",
    value: "₹24.77 Cr",
    trend: "21%",
  },
  {
    tooltipTitle: "Fixed Income",
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
const skeletonCount = 6;
const kpiSkeletonCount = 4;
export default function Main() {
  const { loading, data, error } = useDashboard();
  if (error) return <div>Error: {error} </div>;
  return (
    <div className="flex flex-col gap-3">
      <WelcomeSection
        userName={"Rakesh"}
        inceptionDate={new Date(2025, 3, 28)}
      />
      {/* <FilterBar
        items={[
          { label: "#Poduct Category", key: "category" },
          { label: "#Security", key: "subcategory" },
        ]}
        onClearFilter={() => {}}
      /> */}
      <DateFilterBar
        isDashboard={true}
        filterLabel="Profile Value"
        asOnDate={new Date(2026, 2, 22)}
        filterValue="₹24.77 Cr"
      />
      <div className="grid grid-cols-3 gap-4">
        {/* {loading
          ? Array.from({ length: skeletonCount }, (_, i) => (
              <ProgressCard key={i} loading />
            ))
          : (data ?? []).map((item, i) => (
              <ProgressCard
                key={`${item.label}-${i}`}
                loading={false}
                label={item.label}
                value={item.value}
                progress={item.progress}
                isLoss={item.isLoss}
              />
            ))} */}
      </div>
      <KPICardGrid
        loading={loading}
        kpiSkeletonCount={kpiSkeletonCount}
        kpiData={kpiData}
      />
      <ChartWrapper title="Portfolio Movement">
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
      <DateFilterBar
        isDashboard={true}
        filterLabel="Profile Value"
        asOnDate={new Date(2026, 2, 22)}
        filterValue="₹24.77 Cr"
      />
      <div className="flex  gap-4">
        <div className="w-[200px]">Hi</div>
        <div className="flex-1">
          <ProgressCardGrid
            loading={loading}
            skeletonCount={skeletonCount}
            data={data ?? []}
          />
        </div>
      </div>
    </div>
  );
}
