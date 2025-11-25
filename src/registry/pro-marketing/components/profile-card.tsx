import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function ProfileCard({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "horizontal" | "vertical";
}) {
  return (
    <div
      data-variant={variant}
      data-slot="profile-card"
      className={cn(
        "group/profile-card flex flex-row items-center gap-2",
        variant === "vertical" && "flex-col gap-3 text-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ProfileCardAvatar({
  className,
  size = "default",
  src,
  name,
  ...props
}: Omit<React.ComponentProps<typeof Avatar>, "children"> & {
  size?: "default" | "sm" | "lg";
  src: string;
  name?: string;
}) {
  return (
    <Avatar
      className={cn(
        size === "default" && "size-10",
        size === "sm" && "size-6",
        size === "lg" && "size-24",
        className
      )}
      {...props}
    >
      <AvatarImage alt="Avatar" src={src} className="size-full object-cover" />
      <AvatarFallback className="uppercase">{name?.slice(0, 2) || "ME"}</AvatarFallback>
    </Avatar>
  );
}

function ProfileCardDetails({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-card-details"
      className={cn(
        "flex flex-col",
        "group-data-[variant=horizontal]/profile-card:w-full group-data-[variant=horizontal]/profile-card:flex-row group-data-[variant=horizontal]/profile-card:items-center group-data-[variant=horizontal]/profile-card:justify-between group-data-[variant=horizontal]/profile-card:gap-4",
        "group-data-[variant=vertical]/profile-card:flex-col",
        className
      )}
      {...props}
    />
  );
}

function ProfileCardName({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-foreground text-sm leading-5 font-semibold", className)} {...props} />
  );
}

function ProfileCardBody({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("text-muted-foreground text-xs leading-4 font-normal", className)}
      {...props}
    />
  );
}

export { ProfileCard, ProfileCardAvatar, ProfileCardBody, ProfileCardDetails, ProfileCardName };
