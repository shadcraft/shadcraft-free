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
        "data-[variant=vertical]:flex-col data-[variant=vertical]:gap-3 data-[variant=vertical]:text-center",
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
      data-size={size}
      data-slot="profile-card-avatar"
      className={cn(
        "overflow-hidden",
        size === "sm" && "size-6",
        size === "default" && "size-10",
        size === "lg" && "size-24",
        className
      )}
      {...props}
    >
      <AvatarImage
        alt="Avatar"
        src={src}
        className="size-full rounded-none object-cover"
      />
      <AvatarFallback className="size-full rounded-none uppercase">
        {name?.slice(0, 2) || "ME"}
      </AvatarFallback>
    </Avatar>
  );
}

function ProfileCardDetails({
  className,
  children,
  name,
  body,
  ...props
}: React.ComponentProps<"div"> & { name: string; body?: string }) {
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
    >
      {children ?? (
        <>
          <p data-slot="details-name" className="text-sm font-semibold text-foreground">
            {name}
          </p>
          {body && (
            <span data-slot="details-body" className="text-xs text-muted-foreground">
              {body}
            </span>
          )}
        </>
      )}
    </div>
  );
}

export { ProfileCard, ProfileCardAvatar, ProfileCardDetails };
