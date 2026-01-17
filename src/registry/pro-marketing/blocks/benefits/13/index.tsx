import {
  ArrowBigUpDash,
  ChartSpline,
  Database,
  IterationCcw,
  Users,
  Workflow,
} from "lucide-react";

import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingTagline,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/ui/section-heading";

export function Benefits13() {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 lg:gap-16 lg:px-8">
        {/* Section Heading */}
        <SectionHeading alignment="center" className="mx-auto w-full max-w-3xl">
          <SectionHeadingTagline>Benefits</SectionHeadingTagline>
          <SectionHeadingTitle>Why Choose Acme Inc.</SectionHeadingTitle>
          <SectionHeadingBody>
            Discover the key advantages that make Acme Inc. the right choice for your
            team.
          </SectionHeadingBody>
        </SectionHeading>

        {/* Benefits Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
          {benefitsData.map((benefit) => (
            <div
              key={benefit.title}
              className="group flex flex-col gap-4 rounded-xl border bg-card p-6"
            >
              <div className="grid size-11 shrink-0 place-items-center rounded-full border bg-muted">
                <benefit.icon className="size-4 shrink-0 text-primary" />
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-lg font-normal text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefitsData = [
  {
    icon: ArrowBigUpDash,
    title: "Intelligent Prioritization",
    description:
      "Know exactly what to work on next with AI that understands your goals and context. Prioritize smarter with Acme Inc.",
  },
  {
    icon: IterationCcw,
    title: "Effortless Integration",
    description:
      "Acme Inc. connects seamlessly with the tools your team already uses, so there's no steep learning curve or disruption.",
  },
  {
    icon: Database,
    title: "Clear Decision Support",
    description:
      "When projects stall, it's rarely because of lack of effort, it's lack of clarity. Acme Inc. provides AI-driven insights.",
  },
  {
    icon: ChartSpline,
    title: "Smarter Analytics",
    description:
      "Turn data into clarity with AI-powered insights that help you act faster and more confidently.",
  },
  {
    icon: Workflow,
    title: "Seamless Workflow",
    description:
      "Stay in the zone without constant context switching across apps and tools.",
  },
  {
    icon: Users,
    title: "Team Alignment",
    description:
      "Keep everyone on the same page with a single source of truth for projects and decisions.",
  },
];
