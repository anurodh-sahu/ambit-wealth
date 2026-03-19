import Link from "next/link";
import Image from "next/image";

export default function DashboardFooter() {
  return (
    <footer className=" h-[150px]  w-full gap-2 py-4 shrink-0 sticky z-15 bg-transparent bottom-0">
      <Image
        src="/footer-bg.png"
        alt="footer-bg"
        width={1000}
        height={100}
        className="w-full h-full object-cover absolute bottom-0 left-0"
      />
      <div className="px-6">
        {/* <div className="text-sm text-left">
        @ 2026 Ambit Wealth. All rights reserved.
      </div>
      <div className="text-sm w-full">Ambit Wealth advisory services</div>
      <div className="text-xs text-gray-500 w-full">
        Disclaimer: This is a demo website for educational purposes only. No
        financial advice is provided.
      </div> */}
      </div>
    </footer>
  );
}
