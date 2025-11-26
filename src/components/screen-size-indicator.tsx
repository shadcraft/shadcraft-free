"use client";

import { MoveHorizontal, MoveVertical } from "lucide-react";
import * as React from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function ScreenSizeIndicator({
  enabled = process.env.NODE_ENV === "development",
  showTooltip = false,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  enabled?: boolean;
  showTooltip?: boolean;
}) {
  const [screenSize, setScreenSize] = React.useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  if (!enabled) {
    return null;
  }

  if (showTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <BreakpointIndicator className={className} {...props} />
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-1 font-mono">
          <span className="flex items-center gap-0.5">
            <MoveHorizontal className="text-muted-foreground size-3" /> {screenSize.width}px
          </span>
          <span className="flex items-center gap-0.5">
            <MoveVertical className="text-muted-foreground size-3" /> {screenSize.height}px
          </span>
        </TooltipContent>
      </Tooltip>
    );
  }

  return <BreakpointIndicator className={className} {...props} />;
}

function BreakpointIndicator({
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children">) {
  return (
    <div
      data-breakpoint-indicator=""
      className={cn(
        "bg-secondary text-secondary-foreground z-50 flex size-8 items-center justify-center rounded-md border p-2 font-mono text-xs",
        className
      )}
      {...props}
    >
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}
