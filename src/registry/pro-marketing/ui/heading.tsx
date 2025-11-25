import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva("text-foreground scroll-m-20 font-semibold tracking-tight", {
  variants: {
    size: {
      "3xl": "text-5xl leading-none lg:text-7xl", // Recommended for H1
      "2xl": "text-4xl leading-none lg:text-5xl", // Recommended H2
      xl: "text-3xl/10 lg:text-4xl lg:leading-none", // Recommended for H2
      lg: "text-2xl/9 lg:text-3xl/10", // Recommended for H3
      md: "text-xl/8 lg:text-2xl/9", // Recommended for H4
      sm: "text-lg/7 lg:text-xl/8", // Recommended for H5
      xs: "text-base/6 lg:text-lg/7", // Recommended for H6
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "2xl",
    align: "left",
  },
});

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  asChild?: boolean;
} & React.ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6"> &
  VariantProps<typeof headingVariants>;

function Heading({ level = 2, size, align, className, asChild = false, ...props }: HeadingProps) {
  const Tag: React.ElementType = `h${level}`;
  const Comp = asChild ? Slot : Tag;

  const ARIAattrs = asChild ? { role: "heading", "aria-level": level } : {};
  return (
    <Comp
      data-slot="heading"
      className={cn(headingVariants({ size, align }), className)}
      {...ARIAattrs}
      {...props}
    />
  );
}

export { Heading };
