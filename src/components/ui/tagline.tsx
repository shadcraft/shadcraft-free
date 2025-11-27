import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const taglineVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 text-xs/4 font-medium whitespace-nowrap [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary:
          "bg-primary text-primary-foreground [a&]:hover:bg-primary/90 rounded-md px-2 py-0.5",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 rounded-md px-2 py-0.5",
        badge:
          "bg-background text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground rounded-full border px-2 py-0.5",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground rounded-md border bg-transparent px-2 py-0.5",
        ghost:
          "text-muted-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Tagline({
  className,
  variant,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof taglineVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="tagline"
      data-variant={variant}
      className={cn(taglineVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Tagline, taglineVariants };
