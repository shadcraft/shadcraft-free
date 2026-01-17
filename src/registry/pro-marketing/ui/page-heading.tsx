import { cn } from "@/lib/utils";
import { Tagline } from "@/registry/pro-marketing/ui/tagline";

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

function PageHeadingTagline({
  className,
  ...props
}: React.ComponentProps<typeof Tagline>) {
  return <Tagline variant="badge" {...props} />;
}

function PageHeadingTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="page-heading-title"
      className={cn(
        "scroll-m-20 text-5xl font-medium tracking-tight text-foreground lg:text-6xl",
        className
      )}
      {...props}
    />
  );
}

function PageHeadingBody({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="page-heading-body"
      className={cn("max-w-xl text-lg font-normal text-muted-foreground", className)}
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
  PageHeadingBody,
  PageHeadingTagline,
  PageHeadingTitle,
};
