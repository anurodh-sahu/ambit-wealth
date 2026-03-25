import LineStackChart from "@/components/shared/charts/line/LineStackChart";
import { KPICardProps } from "@/components/shared/KPICard";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import ChartWrapper from "@/components/shared/charts/ChartWrapper";
import KPICardGrid from "@/components/shared/KPICardGrid";
import ProgressCardGrid from "@/components/shared/ProgressCardGrid";
import DateFilterBar from "@/components/shared/DateFilterBar";
import WelcomeSection from "./WelcomeSection";
import TitleBar from "@/components/shared/TitleBar";

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
    <div className="flex flex-col gap-[123px]">
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

        <KPICardGrid
          loading={loading}
          kpiSkeletonCount={kpiSkeletonCount}
          kpiData={kpiData}
        />
        <ChartWrapper title="Portfolio Movement" isScale={true}>
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
      <div className="flex flex-col gap-4">
        <TitleBar
          filterLabel="INVESTMENT SUMMARY"
          asOnDate={new Date(2026, 2, 22)}
          filterValue="₹24.77 Cr"
        />
        <div className="flex  gap-4">
          <div className="w-[295px] h-[360px]">
            <ChartWrapper
              title=""
              bgImage="/side-chart-bg.png"
              borderRadius="16px"
              isScale={false}
            >
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
          <div className="flex-1">
            <ProgressCardGrid
              loading={loading}
              skeletonCount={skeletonCount}
              data={data ?? []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
