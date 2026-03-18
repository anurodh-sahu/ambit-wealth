import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "flex items-center justify-center rounded-full font-medium shrink-0 select-none",
  {
    variants: {
      size: {
        sm: "h-6 w-6 text-xs",
        md: "h-8 w-8 text-sm",
        lg: "h-10 w-10 text-base",
        xl: "h-14 w-14 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function getInitials(name: string) {
  if (!name) return "";

  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 1) {
    return parts[0][0]?.toUpperCase();
  }

  return parts[0][0]?.toUpperCase() + parts[parts.length - 1][0]?.toUpperCase();
}

export interface BubbleAvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  name: string;
}

export function BubbleAvatar({
  name,
  size,
  className,
  ...props
}: BubbleAvatarProps) {
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        avatarVariants({ size }),
        "bg-secondary text-secondary-foreground",
        className
      )}
      {...props}
    >
      {initials}
    </div>
  );
}
