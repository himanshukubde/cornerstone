import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-3 whitespace-nowrap font-semibold uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#455CB3] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[#1A237E] text-white hover:bg-[#121858]",
        secondary: "border border-white/70 text-white hover:bg-white hover:text-[#1A237E]",
        accent: "bg-[#455CB3] text-white hover:bg-[#374A96]",
        outline: "border border-[#1A237E] text-[#1A237E] hover:bg-[#1A237E] hover:text-white",
      },
      size: {
        default: "px-5 py-3 text-xs",
        lg: "min-h-[50px] px-6 text-[13px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
