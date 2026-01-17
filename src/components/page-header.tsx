import { cn } from "@/lib/utils";

function PageHeader({ className, children, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("container flex flex-col gap-2 pb-12 md:pb-16 xl:gap-4", className)}
      {...props}
    >
      {children}
    </section>
  );
}

function PageHeaderHeading({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "leading-tighter max-w-2xl text-5xl font-medium tracking-tight text-balance text-foreground lg:text-6xl lg:leading-[1.1]",
        className
      )}
      {...props}
    />
  );
}

function PageHeaderDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "max-w-3xl text-base text-balance text-muted-foreground md:text-lg",
        className
      )}
      {...props}
    />
  );
}

function PageHeaderActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex w-full flex-row items-center gap-2", className)}
      {...props}
    />
  );
}

export { PageHeader, PageHeaderActions, PageHeaderDescription, PageHeaderHeading };
