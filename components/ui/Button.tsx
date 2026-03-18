"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[8px] border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[#FB2C36] border-2 border-primary hover:border-2 hover:border-red-300 disabled:bg-red-200 disabled:text-white",

        outline:
          "border-2 border-gray-300 bg-gray-100 text-gray-900 hover:bg-transparent hover:border-2 hover:border-red-300 disabled:bg-gray-200",

        ghost:
          "bg-transparent text-foreground hover:bg-muted aria-expanded:bg-muted dark:hover:bg-muted/50",

        destructive:
          "border border-destructive bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",

        link: "border-2 border-red-100 bg-red-100 text-red-500 hover:bg-transparent hover:border-red-300 disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400",

        // Background-image button (expects `bgImage` prop)
        image:
          "relative overflow-hidden bg-transparent text-accent-foreground border-0 hover:text-white hover:bg-primary-p hover:before:opacity-60 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-cover before:bg-center before:bg-no-repeat before:[background-image:var(--button-bg-image)] before:opacity-100",
      },

      size: {
        default: "h-10 px-4 py-2",
        lg: "h-12 gap-1.5 px-5 py-3",
        sm: "h-8 px-3 text-xs",
        icon: "h-10 w-10",
      },

      shape: {
        default: "",
        pill: "rounded-full",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Background image URL used when `variant="image"` */
  bgImage?: string;
  isActive?: boolean;
  /** Optional icon element (e.g. `<CalendarIcon />`) */
  icon?: React.ReactNode;
  /** Icon placement relative to children */
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    size,
    shape,
    bgImage = "/button-bg.png",
    isActive = false,
    icon,
    iconPosition = "left",
    asChild = false,
    children,
    ...props
  },
  ref
) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(
        buttonVariants({ variant, size, shape }),
        variant === "image" &&
          isActive &&
          "text-white bg-primary-p before:opacity-60",
        className
      )}
      style={{
        ...props.style,
        ...(variant === "image" && bgImage
          ? ({
              ["--button-bg-image" as any]: `url(${bgImage})`,
            } as React.CSSProperties)
          : {}),
      }}
      {...props}
    >
      <div className="relative z-10 flex gap-[10px]">
        {!asChild && icon && iconPosition === "left" ? (
          <span className="inline-flex items-center">{icon}</span>
        ) : null}
        {children}
        {!asChild && icon && iconPosition === "right" ? (
          <span className="inline-flex items-center">{icon}</span>
        ) : null}
      </div>
    </Comp>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
