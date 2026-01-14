"use client";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { MarqueeProps as FastMarqueeProps } from "react-fast-marquee";
import FastMarquee from "react-fast-marquee";

import { cn } from "@/lib/utils";

const marqueeVariants = cva("relative max-h-screen w-full max-w-screen overflow-hidden", {
  variants: {
    fade: {
      none: "",
      horizontal: "mask-x-from-85%",
      left: "mask-l-from-85%",
      right: "mask-r-from-85%",
      vertical: "mask-y-from-85%",
      top: "mask-t-from-85%",
      bottom: "mask-b-from-85%",
    },
  },
  defaultVariants: {
    fade: "none",
  },
});

function Marquee({
  className,
  fade,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof marqueeVariants>) {
  return (
    <div
      data-slot="marquee"
      data-fade={fade}
      className={cn(marqueeVariants({ fade }), className)}
      {...props}
    />
  );
}

// Vertical direction (up/down) is experimental and might be buggy
// https://www.react-fast-marquee.com/documentation/#direction
type MarqueeContentProps = FastMarqueeProps;

function MarqueeContent({
  loop = 0,
  autoFill = true,
  pauseOnHover = false,
  direction = "left",
  ...props
}: MarqueeContentProps) {
  return (
    <FastMarquee
      data-slot="marquee-content"
      loop={loop}
      autoFill={autoFill}
      pauseOnHover={pauseOnHover}
      direction={direction}
      {...props}
    />
  );
}

function MarqueeItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="marquee-item"
      className={cn("mx-5 shrink-0 object-contain", className)}
      {...props}
    />
  );
}

export { Marquee, MarqueeContent, type MarqueeContentProps, MarqueeItem };
