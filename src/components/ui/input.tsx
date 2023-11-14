import * as React from "react";
import { cn } from "~/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  "flex rounded-md border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none text-sm focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full",
  {
    variants: {
      size: {
        default: "h-9 px-3 py-1",
        large: "h-12 px-3 py-[14px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
