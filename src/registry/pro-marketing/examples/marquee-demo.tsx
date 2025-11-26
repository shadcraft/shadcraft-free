import { Marquee, MarqueeContent, MarqueeItem } from "@/registry/pro-marketing/ui/marquee";

export function MarqueeDemo() {
  return (
    <div className="flex max-w-screen flex-col gap-12 py-5 lg:py-8">
      <Marquee>
        <MarqueeContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <MarqueeItem key={index}>
              <div className="bg-primary size-20 rounded-full" />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>

      <Marquee fade="horizontal">
        <MarqueeContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <MarqueeItem key={index}>
              <div className="bg-primary size-16 rounded-full" />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>

      <Marquee fade="horizontal">
        <MarqueeContent pauseOnHover speed={100}>
          {Array.from({ length: 5 }).map((_, index) => (
            <MarqueeItem key={index}>
              <div className="bg-primary text-primary-foreground grid size-24 place-items-center rounded-full font-mono text-xs font-medium">
                hover me
              </div>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
}
