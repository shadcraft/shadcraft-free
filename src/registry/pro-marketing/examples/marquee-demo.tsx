import { Marquee, MarqueeContent, MarqueeItem } from "@/registry/pro-marketing/ui/marquee";

export function MarqueeDemo() {
  return (
    <div className="flex max-w-screen flex-col gap-12 p-5 lg:p-8">
      <Marquee>
        <MarqueeContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <MarqueeItem key={index}>
              <div className="size-20 rounded-full bg-primary" />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>

      <Marquee fade="horizontal">
        <MarqueeContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <MarqueeItem key={index}>
              <div className="size-16 rounded-full bg-primary" />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>

      <Marquee fade="horizontal">
        <MarqueeContent pauseOnHover speed={100}>
          {Array.from({ length: 5 }).map((_, index) => (
            <MarqueeItem key={index}>
              <div className="grid size-24 place-items-center rounded-full bg-primary font-mono text-xs font-medium text-primary-foreground">
                hover me
              </div>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
}
