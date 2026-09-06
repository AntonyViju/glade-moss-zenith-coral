import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "h-10 w-full rounded-md bg-subtle px-3 text-sm text-fg placeholder:text-faint shadow-card",
          "transition-[box-shadow] duration-150 ease-out",
          "focus:outline-none focus:shadow-card-hover",
          className,
        )}
        {...props}
      />
    );
  },
);
