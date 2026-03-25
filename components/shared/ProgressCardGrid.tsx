import ProgressCard, { ProgressCardProps } from "./ProgressCard";

export default function ProgressCardGrid({
  loading,
  skeletonCount,
  data,
}: {
  loading: boolean;
  skeletonCount: number;
  data: ProgressCardProps[];
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {loading
        ? Array.from({ length: skeletonCount }, (_, i) => (
            <ProgressCard key={i} loading />
          ))
        : (data ?? []).map((item, i) => (
            <ProgressCard
              loading={false}
              key={`progress-card-${i}`}
              {...item}
            />
          ))}
    </div>
  );
}
