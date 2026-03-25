import KPICard from "./KPICard";
import type { KPICardProps } from "./KPICard";
type KPICardGridProps = {
  loading: boolean;
  kpiSkeletonCount: number;
  kpiData: KPICardProps[];
};

export default function KPICardGrid({
  loading,
  kpiSkeletonCount,
  kpiData,
}: KPICardGridProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {loading
        ? Array.from({ length: kpiSkeletonCount }, (_, i) => (
            <KPICard key={i} loading />
          ))
        : kpiData.map((kpi, i) => (
            <KPICard loading={false} key={`kpi-card-${i}`} {...kpi} />
          ))}
    </div>
  );
}
