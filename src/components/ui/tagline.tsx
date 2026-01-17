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
          "rounded-md bg-primary px-2 py-0.5 text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "rounded-md bg-secondary px-2 py-0.5 text-secondary-foreground [a&]:hover:bg-secondary/90",
        badge:
          "rounded-full border bg-background px-2 py-0.5 text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        outline:
          "rounded-md border bg-transparent px-2 py-0.5 text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost:
          "bg-transparent text-muted-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
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
}: React.ComponentProps<"div"> &
  VariantProps<typeof taglineVariants> & { asChild?: boolean }) {
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
