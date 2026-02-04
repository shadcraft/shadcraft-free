import { cn } from "@/lib/utils";

interface MarqueeProps extends React.ComponentProps<"div"> {
  /**
   * Direction of the animation
   * @default "horizontal"
   */
  direction?: "horizontal" | "vertical";
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
}

function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  direction = "horizontal",
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      role="marquee"
      data-slot="marquee"
      data-direction={direction}
      data-reverse={reverse}
      data-pause-on-hover={pauseOnHover}
      data-repeat={repeat}
      className={cn(
        "group flex w-full min-w-0 gap-(--gap) overflow-hidden [--duration:20s] [--gap:1.25rem]",
        direction === "horizontal" ? "flex-row" : "flex-col",
        "has-data-[fade='left']:mask-l-from-80%",
        "has-data-[fade='right']:mask-r-from-80%",
        "has-data-[fade='top']:mask-t-from-80%",
        "has-data-[fade='bottom']:mask-b-from-80%",
        "has-data-[fade='vertical']:mask-y-from-80%",
        "has-data-[fade='horizontal']:mask-x-from-80%",
        className
      )}
      {...props}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            data-slot={`marquee-repeat-${i + 1}`}
            className={cn("flex min-w-0 shrink-0 justify-around gap-(--gap)", {
              "animate-marquee flex-row": direction === "horizontal",
              "animate-marquee-vertical flex-col": direction === "vertical",
              "group-hover:paused": pauseOnHover,
              "direction-[reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

function MarqueeFade({
  fade,
}: {
  fade: "left" | "right" | "top" | "bottom" | "horizontal" | "vertical";
}) {
  return (
    <div
      data-slot="marquee-fade"
      data-fade={fade}
      className="hidden"
      aria-hidden="true"
    />
  );
}

export { Marquee, MarqueeFade };
