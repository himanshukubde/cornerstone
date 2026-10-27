import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Exact RGP Contact Button Style (Sharp crisp rectangular box, bold tracking, generous padding)
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-bold uppercase tracking-[2px] transition-all duration-200 select-none cursor-pointer rounded-none border-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[#1A237E] text-white hover:bg-[#121858] shadow-md",
        secondary:
          "border border-white/60 bg-transparent text-white hover:bg-white hover:text-[#1A237E]",
        outline:
          "border border-[#1A237E] text-[#1A237E] bg-transparent hover:bg-[#1A237E] hover:text-white",
        ghost:
          "text-[#1A237E] hover:bg-[#1A237E]/10",
      },
      size: {
        sm: "min-h-[38px] px-6 py-2 text-[11px]",
        default: "min-h-[42px] px-8 py-2.5 text-[12px]",
        lg: "min-h-[44px] px-11 py-3 text-[12px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
