import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 rounded-sm label whitespace-nowrap transition-[background-color,color,border-color,transform] duration-300 ease-editorial disabled:pointer-events-none disabled:opacity-40 select-none",
  {
    variants: {
      variant: {
        solid: "bg-brand text-brand-foreground hover:bg-brand-soft active:scale-[0.985]",
        outline:
          "border border-border-strong text-foreground hover:border-brand hover:text-brand active:scale-[0.985]",
        ghost: "text-muted-foreground hover:text-foreground",
        light: "bg-foreground text-background hover:bg-brand hover:text-brand-foreground",
        quiet: "bg-surface-2 text-foreground hover:bg-brand hover:text-brand-foreground",
      },
      size: {
        sm: "h-10 px-4 text-[0.625rem]",
        md: "h-12 px-6",
        lg: "h-14 px-8",
        xl: "h-16 px-10",
        icon: "h-11 w-11 px-0",
      },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "solid", size: "md", block: false },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, block, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, block }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
