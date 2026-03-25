import Image from "next/image";

export default function ChartWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="relative rounded-[32px] overflow-hidden  max-h-[390px]  pt-6 pr-8 pb-8 pl-8">
      <Image
        src="/chart-bg.png"
        alt="bg"
        fill
        className="object-cover object-center scale-110 opacity-30"
      />

      <div className="relative z-10 flex flex-col items-start gap-[10px]">
        <div className="text-header text-left font-sans text-sm font-bold leading-[20px] tracking-normal uppercase">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}
