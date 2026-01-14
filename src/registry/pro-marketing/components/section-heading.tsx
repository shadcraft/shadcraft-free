import * as React from "react";

import { cn } from "@/lib/utils";

function SectionHeading({
  alignment = "left",
  className,
  ...props
}: React.ComponentProps<"div"> & { alignment?: "left" | "center" | "right" }) {
  return (
    <div
      data-slot="section-heading"
      data-alignment={alignment}
      className={cn(
        "group/section-heading flex flex-col gap-3",
        alignment === "left" && "items-start text-left",
        alignment === "center" && "items-center text-center",
        alignment === "right" && "items-end text-right",
        className
      )}
      {...props}
    />
  );
}

function SectionHeadingContentType({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-heading-content-type"
      className={cn("font-sans text-base leading-6 font-medium text-foreground", className)}
      {...props}
    />
  );
}

function SectionHeadingTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="section-heading-title"
      className={cn(
        "scroll-m-20 text-4xl leading-none font-medium tracking-tight text-foreground lg:text-5xl",
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
      className={cn(
        "max-w-2xl text-base/6 font-normal text-pretty text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export { SectionHeading, SectionHeadingBody, SectionHeadingContentType, SectionHeadingTitle };
