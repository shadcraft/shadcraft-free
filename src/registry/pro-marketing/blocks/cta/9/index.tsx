import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/ui/section-heading";

export function CTA9() {
  return (
    <section className="bg-primary py-12 text-primary-foreground lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 text-center">
          {/* Section Heading */}
          <SectionHeading alignment="center">
            <SectionHeadingTitle className="text-primary-foreground">
              Ready to Work Smarter with AI?
            </SectionHeadingTitle>
            <SectionHeadingBody className="text-primary-foreground/90">
              Start today and see how Acme Inc. helps you finish projects faster, with
              clarity and focus at every step.
            </SectionHeadingBody>
          </SectionHeading>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Learn More
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
