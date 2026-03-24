// import { FilterBreadcrumb } from "@/components/shared/FilterBreadcrumb";
// import { BreadcrumbItem } from "@/components/shared/FilterBreadcrumb";
import Image from "next/image";
import { RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NextCTA({
  title,
  subtitle,
  btnVarient = "default",
  btnShape,
  btnTitle,
  onClick,
}: {
  title: string;
  subtitle?: string;
  btnVarient?: "default" | "link" | "outline" | "ghost" | "destructive" | "cta" | "image";
  btnShape?: "default" | "pill";
  btnTitle?: string;
  onClick: () => void;
}) {
//   if (items.length === 0) return null;
  return (
        <div className="mt-20 relative rounded-[26px] overflow-hidden  max-h-[390px]">
          <Image
            src="/chart-bg.png"
            alt="bg"
            fill
            className="object-cover object-center scale-110 opacity-30"
          />
            <div className="relative z-10 ">
                <div className="flex justify-between items-center px-6 py-6 text-sm bg-card/5 rounded-12">
                    <div className="flex flex-col items-left gap-2">
                        <span className="text-black font-normal">{title}</span>
                        <span className="text-dark font-normal">{subtitle}</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <Button
                        variant={btnVarient}
                        shape={btnShape}
                        onClick={() => onClick}
                        className="uppercase"
                        >
                        {btnTitle}
                        </Button>
                    </div>
                </div>
            </div>
        </div>

  );
}
