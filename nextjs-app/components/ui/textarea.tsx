import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "shadow-xl border border-grey/50 bg-white transition-[border] [&:has(:focus-visible)]:border-purple flex w-full p-3 rounded-xl text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
