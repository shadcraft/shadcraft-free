import { Star } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type StarRatingProps = {
  value: number;
  max?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  orientation?: "vertical" | "horizontal";
  /**
   * Precision for partial stars. If set, the component will fill each star
   * proportionally (e.g., 3.2 -> 60% of the 4th star). Defaults to true.
   */
  allowPartial?: boolean;
  containerClassName?: string;
};

export function StarRating({
  value,
  max = 5,
  label,
  size = "lg",
  orientation = "vertical",
  allowPartial = true,
  className,
  containerClassName,
  ...props
}: StarRatingProps & Omit<React.ComponentProps<"div">, "children">) {
  const safeMax = Math.max(1, Math.floor(max));
  const clampedValue = Math.max(0, Math.min(value, safeMax));

  return (
    <div
      data-size={size}
      data-orientation={orientation}
      data-slot="star-rating"
      className={cn(
        "flex flex-col items-center gap-1.5",
        "data-[orientation=horizontal]:flex-row",
        "data-[size=lg]:[--star-size:calc(--spacing(5))] data-[size=md]:[--star-size:calc(--spacing(4))] data-[size=sm]:[--star-size:calc(--spacing(3))]",
        containerClassName
      )}
      aria-label={`${clampedValue} out of ${safeMax} stars`}
      role="img"
      {...props}
    >
      <div className={cn("flex items-center gap-0.5", className)}>
        {Array.from({ length: safeMax }).map((_, index) => {
          const starIndex = index + 1;
          const filledRatio = allowPartial
            ? Math.max(0, Math.min(1, clampedValue - index))
            : clampedValue >= starIndex
              ? 1
              : 0;

          return (
            <span key={index} className="relative inline-flex" aria-hidden="true">
              {/* Base (unfilled) star */}
              <Star className="size-(--star-size)" />
              {/* Filled overlay */}
              {filledRatio > 0 ? (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${filledRatio * 100}%` }}
                >
                  <Star fill="currentColor" className="size-(--star-size)" />
                </span>
              ) : null}
            </span>
          );
        })}
      </div>

      {label && (
        <span data-slot="star-rating-label" className="text-xs text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );
}
