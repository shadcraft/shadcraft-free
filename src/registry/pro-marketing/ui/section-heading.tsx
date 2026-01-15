import * as React from "react";

import { cn } from "@/lib/utils";
import { Tagline } from "@/registry/pro-marketing/ui/tagline";

function SectionHeading({
  alignment = "left",
  className,
  ...props
}: React.ComponentProps<"div"> & { alignment?: "left" | "center" }) {
  return (
    <div
      data-slot="section-heading"
      data-alignment={alignment}
      className={cn(
        "group/section-heading flex flex-col gap-3",
        alignment === "left" && "items-start text-left",
        alignment === "center" && "items-center text-center",
        className
      )}
      {...props}
    />
  );
}

function SectionHeadingTagline({ ...props }: React.ComponentProps<typeof Tagline>) {
  return <Tagline variant="default" {...props} />;
}

function SectionHeadingTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="section-heading-title"
      className={cn(
        "scroll-m-20 text-4xl font-medium tracking-tight text-foreground lg:text-5xl",
        className
      )}
      {...props}
    />
  );
}

function SectionHeadingBody({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="section-heading-body"
      className={cn("max-w-2xl text-base font-normal text-pretty text-muted-foreground", className)}
      {...props}
    />
  );
}

function SectionHeadingActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-heading-actions"
      className={cn("flex w-full flex-col gap-2 sm:w-fit sm:flex-row", className)}
      {...props}
    />
  );
}

export {
  SectionHeading,
  SectionHeadingActions,
  SectionHeadingBody,
  SectionHeadingTagline,
  SectionHeadingTitle,
};
