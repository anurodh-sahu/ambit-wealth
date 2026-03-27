"use client";

import { useState } from "react";
import LineStackChart from "@/components/shared/charts/line/LineStackChart";
import { KPICardProps } from "@/components/shared/KPICard";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import ChartWrapper from "@/components/shared/charts/ChartWrapper";
import KPICardGrid from "@/components/shared/KPICardGrid";
import ProgressCardGrid from "@/components/shared/ProgressCardGrid";
import DateFilterBar from "@/components/shared/DateFilterBar";
import WelcomeSection from "./WelcomeSection";
import TitleBar from "@/components/shared/TitleBar";

import ProgressCard from "@/components/shared/ProgressCard";
import NextCTA from "@/components/shared/NextCTA";
import { Mail, FileText, Phone, CreditCard, AlertCircle } from "lucide-react";
import { ProfileTabs } from "@/components/shared/ProfileTabs";


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
  const [activeProfileTab, setActiveProfileTab] = useState("personal");
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

      <div className="mt-10">
        <ProfileTabs
          activeTabId={activeProfileTab}
          mobileBreakpoint={640}
          onTabChange={setActiveProfileTab}
          tabs={[
            {
              fields: [
                {
                  icon: <Mail size={22} strokeWidth={1.5}/>,
                  label: 'E-mail',
                  value: 'sh*****@****.com'
                },
                {
                  icon: <FileText size={22} strokeWidth={1.5}/>,
                  label: 'PAN',
                  value: '*****161Q'
                },
                {
                  icon: <Phone size={22} strokeWidth={1.5}/>,
                  label: 'Mobile',
                  value: '+91 ***** *6353'
                }
              ],
              id: 'personal',
              label: 'PERSONAL'
            },
            {
              fields: [
                {
                  label: 'Demat ID',
                  value: '165668733571761386'
                },
                {
                  label: 'DP ID',
                  value: '11263739'
                },
                {
                  label: 'BO ID',
                  value: '11263739'
                },
                {
                  label: 'Depository Participant',
                  value: 'Ambit Broking LTD'
                }
              ],
              id: 'demat',
              label: 'DEMAT'
            },
            {
              fields: [
                {
                  icon: <CreditCard size={22} strokeWidth={1.5}/>,
                  label: 'Account Number',
                  value: '***** 3287872'
                },
                {
                  label: 'Bank',
                  value: 'HDFC Bank LTD'
                },
                {
                  label: 'Branch',
                  value: 'Kamala Mills Compound, Lower, Parel'
                }
              ],
              id: 'bank',
              label: 'BANK'
            }
          ]}
        />
      </div>


      <div className="mt-10">
        <NextCTA title="PORTFOLIO PERFORMANCE" subtitle="TRACK TOTAL RETURNS AND RISK OVER TIME. COMPARE WITH YOUR BENCHMARK." btnTitle="ANALYSE PERFORMANCE" btnVarient="cta" btnShape="default" onClick={function (): void {
          throw new Error("Function not implemented.");
        } } />
      </div>


    </div>
  );
}
