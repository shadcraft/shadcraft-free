import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingContentType,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/components/section-heading";

export function Contact11() {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 lg:gap-16 lg:px-8">
        {/* Section Heading */}
        <SectionHeading alignment="center" className="mx-auto w-full max-w-xl">
          <SectionHeadingContentType>Support</SectionHeadingContentType>
          <SectionHeadingTitle>Need Help? We&apos;re Here to Help</SectionHeadingTitle>
          <SectionHeadingBody>
            Our support team is available to assist you with any questions or issues you may have.
          </SectionHeadingBody>
        </SectionHeading>

        {/* Contact Form */}
        <div className="mx-auto w-full max-w-xl">
          <form className="grid gap-4" aria-label="Contact form">
            <div className="grid w-full gap-2">
              <Label htmlFor="input-1">Label</Label>
              <Input id="input-1" placeholder="Placeholder text" />
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="input-2">Label</Label>
              <Input id="input-2" placeholder="Placeholder text" />
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="input-3">Label</Label>
              <Textarea id="input-3" placeholder="Content" className="h-32" />
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <span className="text-sm font-normal">
                You agree to our simple{" "}
                <a href="#" className="text-primary underline">
                  Privacy Policy
                </a>
              </span>
            </div>
            <Button type="submit" className="w-full">
              Send message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
