import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingTagline,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/ui/section-heading";

export function Contact11() {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 lg:gap-16 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto w-full max-w-md">
          <SectionHeading alignment="center">
            <SectionHeadingTagline>Support</SectionHeadingTagline>
            <SectionHeadingTitle>Need Help? We&apos;re Here to Help</SectionHeadingTitle>
            <SectionHeadingBody>
              Our support team is available to assist you with any questions or issues you
              may have.
            </SectionHeadingBody>
          </SectionHeading>
        </div>

        {/* Contact Form */}
        <div className="mx-auto w-full max-w-md">
          <form className="flex flex-col gap-4" aria-label="Contact form">
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="input-1">Name</Label>
              <Input id="input-1" placeholder="Joe Smith" />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="input-2">Email</Label>
              <Input id="input-2" placeholder="joe@example.com" />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="input-3">Message</Label>
              <Textarea
                id="input-3"
                placeholder="Hi, this is my message"
                className="h-32"
              />
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
