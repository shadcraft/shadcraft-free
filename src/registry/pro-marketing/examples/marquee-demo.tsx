import { Marquee, MarqueeFade } from "@/registry/pro-marketing/ui/marquee";

export function MarqueeDemo() {
  return (
    <div className="flex flex-col items-center gap-6 overflow-hidden p-5 lg:p-8">
      <Marquee pauseOnHover>
        <MarqueeFade fade="horizontal" />
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square size-20 rounded-full bg-primary shadow"
          />
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover>
        <MarqueeFade fade="horizontal" />
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square size-20 rounded-full bg-primary shadow"
          />
        ))}
      </Marquee>
    </div>
  );
}
