import * as React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarStackProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
  max?: number;
  size?: number;
  overlapRatio?: number;
  gapRatio?: number;
  mask?: boolean;
}

export function AvatarStack({
  children,
  className,
  orientation = "horizontal",
  max, // Max visible avatars before "+N"
  size = 32, // Avatar size in pixels
  overlapRatio = 0.2, // 20% of avatar size
  gapRatio = 0.15, // 15% of avatar size
  mask = true,
  ...props
}: AvatarStackProps) {
  const isHorizontal = orientation === "horizontal";

  const avatarItems = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Avatar
  );

  const avatarsCount = avatarItems.length;
  const showOverflow = max && avatarsCount > max;
  const overflowCount = showOverflow ? avatarsCount - max : 0;
  const visibleAvatars = showOverflow ? avatarItems.slice(0, max) : avatarItems;

  return (
    <div
      data-slot="avatar-stack"
      data-orientation={orientation}
      data-size={size}
      data-overlap-ratio={overlapRatio}
      data-gap-ratio={gapRatio}
      data-mask={mask}
      data-max={max}
      className={cn(
        "group flex items-center",
        isHorizontal ? "flex-row" : "flex-col",
        isHorizontal ? cn(`-space-x-[var(--overlap)]`) : cn(`-space-y-[var(--overlap)]`),
        className
      )}
      style={
        {
          "--overlap": `${overlapRatio * size}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      {visibleAvatars.map((child, index) => {
        return (
          <AvatarWrapper
            key={index}
            index={index}
            size={size}
            orientation={orientation}
            overlapRatio={overlapRatio}
            gapRatio={gapRatio}
            mask={mask}
          >
            {child}
          </AvatarWrapper>
        );
      })}

      {showOverflow && (
        <AvatarWrapper
          index={visibleAvatars.length}
          size={size}
          orientation={orientation}
          overlapRatio={overlapRatio}
          gapRatio={gapRatio}
          mask={mask}
        >
          <Avatar>
            <AvatarFallback className="text-xs font-medium text-muted-foreground">
              +{overflowCount}
            </AvatarFallback>
          </Avatar>
        </AvatarWrapper>
      )}
    </div>
  );
}

interface AvatarWrapperProps extends React.ComponentProps<"div"> {
  size: number;
  index: number;
  orientation: "horizontal" | "vertical";
  overlapRatio: number;
  gapRatio: number;
  mask: boolean;
}

function AvatarWrapper({
  children,
  size,
  index,
  orientation,
  overlapRatio,
  gapRatio,
  mask,
}: AvatarWrapperProps) {
  const isHorizontal = orientation === "horizontal";
  const isFirst = index === 0;

  // Only mask if there's actual overlap and not the first avatar
  const shouldMask = mask && overlapRatio > 0 && !isFirst;
  // The physical overlap distance in pixels
  const overlapPx = overlapRatio * size;

  // This creates a consistent visible gap regardless of overlap amount
  const gapWidth = size * gapRatio;

  // Geometric center of previous avatar
  const geometricCenter = overlapPx - size / 2;
  // Push mask inward by half the gap width to create the visible separation
  const maskOffset = Math.round(geometricCenter + gapWidth / 2);

  const maskImage = isHorizontal
    ? `radial-gradient(circle ${size / 2}px at ${maskOffset}px 50%, transparent 99%, black 100%)`
    : `radial-gradient(circle ${size / 2}px at 50% ${maskOffset}px, transparent 99%, black 100%)`;

  const style: React.CSSProperties = {
    width: size,
    height: size,
    ...(shouldMask && {
      maskImage,
      WebkitMaskImage: maskImage,
      maskSize: "cover",
      WebkitMaskSize: "cover",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
    }),
  };

  return (
    <div
      data-slot="avatar-wrapper"
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        "[&_[data-slot=avatar]]:size-full",
        "transform-gpu antialiased"
      )}
      style={style}
    >
      {children}
    </div>
  );
}
