import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[120px] w-full rounded-2xl border border-input bg-background/80 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    />
  );
});
