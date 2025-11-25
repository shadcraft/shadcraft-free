import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingContentType,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/components/section-heading";

export function SectionHeadingDemo() {
  return (
    <div className="flex w-full flex-col gap-12 p-5 lg:p-8">
      <SectionHeading>
        <SectionHeadingContentType>Pricing</SectionHeadingContentType>
        <SectionHeadingTitle>Simple Pricing, Smarter Work</SectionHeadingTitle>
        <SectionHeadingBody>
          Acme Inc. has a plan designed to help you move faster.
        </SectionHeadingBody>
      </SectionHeading>

      <SectionHeading alignment="center">
        <SectionHeadingContentType>Pricing</SectionHeadingContentType>
        <SectionHeadingTitle>Simple Pricing, Smarter Work</SectionHeadingTitle>
        <SectionHeadingBody>
          Acme Inc. has a plan designed to help you move faster.
        </SectionHeadingBody>
      </SectionHeading>

      <SectionHeading alignment="right">
        <SectionHeadingContentType>Pricing</SectionHeadingContentType>
        <SectionHeadingTitle>Simple Pricing, Smarter Work</SectionHeadingTitle>
        <SectionHeadingBody>
          Acme Inc. has a plan designed to help you move faster.
        </SectionHeadingBody>
      </SectionHeading>
    </div>
  );
}
