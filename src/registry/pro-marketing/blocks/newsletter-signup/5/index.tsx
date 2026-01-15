"use client";

import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/ui/section-heading";

export function NewsletterSignup5() {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-12 rounded-xl border bg-muted px-5 py-12 lg:flex-row lg:items-end lg:gap-16 lg:px-16 lg:py-20">
          {/* Section Heading */}
          <div className="flex-1">
            <SectionHeading>
              <SectionHeadingTitle>Stay in the loop</SectionHeadingTitle>
              <SectionHeadingBody className="text-balance">
                Get insights, product updates, and productivity tips straight to your inbox.
              </SectionHeadingBody>
            </SectionHeading>
          </div>

          {/* Newsletter Form */}
          <div className="flex max-w-md flex-col gap-2 lg:gap-3">
            <form className="flex flex-col gap-2 sm:flex-row">
              <Input placeholder="email@example.com" className="w-full" />
              <Button type="submit" aria-label="Subscribe to newsletter">
                <Mail /> Subscribe
              </Button>
            </form>

            {/* Privacy Policy */}
            <span className="text-center text-xs text-muted-foreground lg:text-right" role="note">
              We respect your privacy.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
