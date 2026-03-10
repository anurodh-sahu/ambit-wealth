import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",

        // Sizes
        size === "sm" && "h-8 px-3 text-sm",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-12 px-6 text-base",

        // Variants
        variant === "primary" &&
          "bg-primary text-white hover:bg-primary/80 focus:ring-primary",
        variant === "secondary" &&
          "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
        variant === "outline" && "border border-gray-300 hover:bg-gray-100",
        variant === "danger" &&
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",

        // Full width
        fullWidth ? "inline-flex" : "flex",
        fullWidth && "w-full",

        // Disabled
        disabled && "opacity-50 cursor-not-allowed",

        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}
