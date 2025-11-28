import { CheckCircle2, LifeBuoy, RefreshCcw, Rocket, Scale, ShieldCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingContentType,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/components/section-heading";

export function Benefits13() {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 lg:gap-16 lg:px-8">
        {/* Section Heading */}
        <SectionHeading alignment="center" className="mx-auto w-full max-w-3xl">
          <SectionHeadingContentType>Benefits</SectionHeadingContentType>
          <SectionHeadingTitle>Why Choose Acme Inc.</SectionHeadingTitle>
          <SectionHeadingBody>
            Discover the key advantages that make Acme Inc. the right choice for your team.
          </SectionHeadingBody>
        </SectionHeading>

        {/* Benefits Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="group p-6">
              <div className="flex flex-col gap-4">
                <div className="bg-primary/10 group-hover:bg-primary/20 grid size-10 place-items-center rounded-full transition-colors">
                  <benefit.icon className="text-primary size-5 shrink-0" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-foreground text-lg/7 font-medium">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm/5 font-normal">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  {
    icon: CheckCircle2,
    title: "Easy to Use",
    description:
      "Get started in minutes with an intuitive interface designed for teams of all sizes.",
  },
  {
    icon: Rocket,
    title: "Powerful Features",
    description: "Access advanced tools and capabilities that help you work smarter and faster.",
  },
  {
    icon: LifeBuoy,
    title: "Reliable Support",
    description:
      "Get help when you need it with responsive customer support and comprehensive documentation.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security and privacy controls.",
  },
  {
    icon: Scale,
    title: "Scalable Solution",
    description: "Grow your team without limits with flexible plans that adapt to your needs.",
  },
  {
    icon: RefreshCcw,
    title: "Regular Updates",
    description: "Benefit from continuous improvements and new features released regularly.",
  },
];
