import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  wrapperClassName,
  error,
  ...props
}: React.ComponentProps<"input"> & {
  wrapperClassName?: string;
  icon?: React.ReactNode;
  error?: boolean
}) {
  return (
    <div
      className={cn(
        "flex gap-2 items-center shadow-xl border border-grey/50 bg-white transition-[border] [&:has(:focus-visible)]:border-purple flex w-full p-3 rounded-xl",
        error && "border-error",
        wrapperClassName
      )}
    >
      {props.icon && props.icon}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground text-sm placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-transparent transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 w-full",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
