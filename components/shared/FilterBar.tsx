"use client";
import { FilterBreadcrumb } from "@/components/shared/FilterBreadcrumb";
import { BreadcrumbItem } from "@/components/shared/FilterBreadcrumb";
import { RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FilterBar({
  items,
  onClearFilter,
}: {
  items: BreadcrumbItem[];
  onClearFilter: () => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="flex justify-between items-center px-6 py-3 text-sm bg-card/5 rounded-12">
      <div className="flex items-center gap-2">
        <FilterBreadcrumb items={items} label="Filtered By" />
      </div>
      <div className="flex items-center gap-[10px]">
        <Button
          variant="default"
          shape="pill"
          onClick={() => onClearFilter}
          className="uppercase"
        >
          <RefreshCcwIcon className="size-4" />
          Clear Filter
        </Button>
      </div>
    </div>
  );
}
