import { ChevronRight } from "lucide-react";
export type BreadcrumbItem = {
  label: string;
  key?: string;
};

type Props = {
  items: BreadcrumbItem[];
  label?: string;
};

export const FilterBreadcrumb = ({ items, label }: Props) => {
  return (
    <div className="flex items-center flex-wrap text-sm gap-2 uppercase">
      {label && (
        <div className="text-sm text-contrast font-normal">{label}</div>
      )}
      {items.map((item, index) => {
        return (
          <>
            {index !== 0 && (
              <span className="text-primary">
                <ChevronRight className="size-4" />
              </span>
            )}
            <div
              key={item.key || item.label}
              className="flex items-center text-primary font-medium"
            >
              {/* Separator */}

              <span>{item.label}</span>
            </div>
          </>
        );
      })}
    </div>
  );
};
