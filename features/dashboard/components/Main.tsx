"use client";

import { useState } from "react";
import LineStackChart from "@/components/shared/charts/line/LineStackChart";
import FilterBar from "@/components/shared/FilterBar";
import { KPICardProps } from "@/components/shared/KPICard";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import ChartWrapper from "@/components/shared/charts/ChartWrapper";
import KPICardGrid from "@/components/shared/KPICardGrid";
import ProgressCardGrid from "@/components/shared/ProgressCardGrid";
import DateFilterBar from "@/components/shared/DateFilterBar";
import WelcomeSection from "./WelcomeSection";
import TitleBar from "@/components/shared/TitleBar";
import LineChart from "@/components/shared/highcharts/line/LineChart";
import PieChart from "@/components/shared/highcharts/pie/PieChart";
import ProgressCard, {
  ProgressCardProps,
} from "@/components/shared/ProgressCard";
import NextCTA from "@/components/shared/NextCTA";
import { Mail, FileText, Phone, CreditCard, AlertCircle } from "lucide-react";
import { ProfileTabs } from "@/components/shared/ProfileTabs";
import { getAssetClassColor, roundToTwoDecimals } from "@/lib/utils";
const skeletonCount = 6;
const kpiSkeletonCount = 4;
export default function Main() {
  const { isLoading, data, error } = useDashboard();
  const [activeProfileTab, setActiveProfileTab] = useState("personal");
  if (error) return <div>Error: {error} </div>;
  const totalPortfolioValue = data?.investmentSummary.reduce(
    (acc: number, item: ProgressCardProps) => acc + item.currentValue,
    0
  );
  const pieChartData = data?.investmentSummary.map((item) => ({
    color: getAssetClassColor(item.assetClass),
    name: item.assetClass,
    value: roundToTwoDecimals((item.currentValue * 100) / totalPortfolioValue),
  }));
  return (
    <div className="flex flex-col gap-[123px]">
      <div className="flex flex-col gap-3">
        <WelcomeSection
          userName={"Rakesh"}
          inceptionDate={new Date(2025, 3, 28)}
        />
        <FilterBar
          items={[
            { label: "#Poduct Category", key: "category" },
            { label: "#Security", key: "subcategory" },
          ]}
          onClearFilter={() => {}}
        />
        <DateFilterBar
          isDashboard={true}
          filterLabel="Profile Value"
          asOnDate={new Date(2026, 2, 22)}
          filterValue="₹24.77 Cr"
        />
        <KPICardGrid
          loading={isLoading}
          kpiSkeletonCount={kpiSkeletonCount}
          kpiData={data?.kpiCards ?? []}
        />
        <ChartWrapper>
          <LineChart
            asOnDate="22 - JAN '26"
            data={data?.portfolioMovement ?? []}
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
              <PieChart
                collapseLegendAfter={6}
                data={pieChartData ?? []}
                innerSize="55%"
                onSelect={() => {}}
                title="Portfolio Allocation"
                tooltipSuffix="%"
              />
            </ChartWrapper>
          </div>
          <div className="flex-1">
            <ProgressCardGrid
              loading={isLoading}
              skeletonCount={skeletonCount}
              data={data?.investmentSummary ?? []}
            />
          </div>
        </div>
      </div>

      {/* <div className="mt-10">
        <ProfileTabs
          activeTabId={activeProfileTab}
          mobileBreakpoint={640}
          onTabChange={setActiveProfileTab}
          tabs={[
            {
              fields: [
                {
                  icon: <Mail size={22} strokeWidth={1.5} />,
                  label: "E-mail",
                  value: "sh*****@****.com",
                },
                {
                  icon: <FileText size={22} strokeWidth={1.5} />,
                  label: "PAN",
                  value: "*****161Q",
                },
                {
                  icon: <Phone size={22} strokeWidth={1.5} />,
                  label: "Mobile",
                  value: "+91 ***** *6353",
                },
              ],
              id: "personal",
              label: "PERSONAL",
            },
            {
              fields: [
                {
                  label: "Demat ID",
                  value: "165668733571761386",
                },
                {
                  label: "DP ID",
                  value: "11263739",
                },
                {
                  label: "BO ID",
                  value: "11263739",
                },
                {
                  label: "Depository Participant",
                  value: "Ambit Broking LTD",
                },
              ],
              id: "demat",
              label: "DEMAT",
            },
            {
              fields: [
                {
                  icon: <CreditCard size={22} strokeWidth={1.5} />,
                  label: "Account Number",
                  value: "***** 3287872",
                },
                {
                  label: "Bank",
                  value: "HDFC Bank LTD",
                },
                {
                  label: "Branch",
                  value: "Kamala Mills Compound, Lower, Parel",
                },
              ],
              id: "bank",
              label: "BANK",
            },
          ]}
        />
      </div> */}
    </div>
  );
}
