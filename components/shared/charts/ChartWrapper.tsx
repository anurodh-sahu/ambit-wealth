import Image from "next/image";

export default function ChartWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-20 relative rounded-[32px] overflow-hidden  max-h-[390px]">
      <Image
        src="/chart-bg.png"
        alt="bg"
        fill
        className="object-cover object-center scale-110 opacity-30"
      />

      <div className="relative z-10 ">{children}</div>
    </div>
  );
}
