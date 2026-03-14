import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(function Input(
  { className, type = "text", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-input bg-background/80 px-4 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    />
  );
});
