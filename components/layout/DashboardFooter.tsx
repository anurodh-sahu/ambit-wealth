import Link from "next/link";

export default function DashboardFooter() {
  return (
    <footer className="flex flex-col items-start justify-center border-t px-6 w-full gap-2 py-4 shrink-0">
      <div className="text-sm text-left">
        @ 2026 Ambit Wealth. All rights reserved.
      </div>
      <div className="text-sm w-full">Ambit Wealth advisory services</div>
      <div className="text-xs text-gray-500 w-full">
        Disclaimer: This is a demo website for educational purposes only. No
        financial advice is provided.
      </div>
    </footer>
  );
}
