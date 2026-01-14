import { cn } from "@/lib/utils";

function PageHeading({
  className,
  alignment = "left",
  ...props
}: React.ComponentProps<"div"> & { alignment?: "left" | "center" | "right" }) {
  return (
    <div
      data-slot="page-heading"
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        alignment === "left" && "items-start text-left",
        alignment === "center" && "items-center text-center",
        alignment === "right" && "items-end text-right",
        className
      )}
      {...props}
    />
  );
}

function PageHeadingTagline({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-heading-tagline"
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-md border bg-background px-2 py-0.5 text-xs/4 font-medium whitespace-nowrap text-foreground [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 [&>svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

function PageHeadingTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="page-heading-title"
      className={cn(
        "scroll-m-20 text-5xl leading-none font-medium tracking-tight text-foreground lg:text-6xl",
        className
      )}
      {...props}
    />
  );
}

function PageHeadingDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="page-heading-description"
      className={cn("max-w-xl text-lg/7 font-normal text-muted-foreground", className)}
      {...props}
    />
  );
}

function PageHeadingActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-heading-actions"
      className={cn("flex w-full flex-col gap-2 sm:w-fit sm:flex-row", className)}
      {...props}
    />
  );
}

export {
  PageHeading,
  PageHeadingActions,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
};
