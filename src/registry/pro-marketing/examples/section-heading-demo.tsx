import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingTagline,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/ui/section-heading";

export function SectionHeadingDemo() {
  return (
    <div className="flex w-full flex-col gap-12 p-5 lg:p-8">
      <SectionHeading>
        <SectionHeadingTagline>Pricing</SectionHeadingTagline>
        <SectionHeadingTitle>Simple Pricing, Smarter Work</SectionHeadingTitle>
        <SectionHeadingBody>
          Acme Inc. has a plan designed to help you move faster.
        </SectionHeadingBody>
      </SectionHeading>

      <SectionHeading alignment="center">
        <SectionHeadingTagline>Pricing</SectionHeadingTagline>
        <SectionHeadingTitle>Simple Pricing, Smarter Work</SectionHeadingTitle>
        <SectionHeadingBody>
          Acme Inc. has a plan designed to help you move faster.
        </SectionHeadingBody>
      </SectionHeading>
    </div>
  );
}
