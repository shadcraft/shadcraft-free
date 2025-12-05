import { Play, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  PageHeading,
  PageHeadingActions,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/registry/pro-marketing/components/page-heading";
import { AvatarStack } from "@/registry/pro-marketing/ui/avatar-stack";

export function PageHeadingDemo() {
  return (
    <div className="flex flex-col gap-8 px-5 py-12 lg:px-8 lg:py-20">
      {/* Section holding the Page Heading */}
      <PageHeading alignment="center">
        <PageHeadingTagline>New features released</PageHeadingTagline>
        <PageHeadingTitle>Make Better Decisions, With Ease</PageHeadingTitle>
        <PageHeadingDescription>
          Acme Inc&apos;s personal AI helps you cut through the noise, speed up delivery, and stay
          focused without switching contexts.
        </PageHeadingDescription>
        <PageHeadingActions>
          <Button>Get Started</Button>
          <Button variant="outline">
            <Play /> Watch Demo
          </Button>
        </PageHeadingActions>

        {/* Extra content - can be anything you want */}
        <div className="flex flex-col items-center gap-2 pt-5 lg:pt-9">
          <AvatarStack>
            {avatars.map((avatar) => (
              <Avatar key={avatar}>
                <AvatarImage src={avatar} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            ))}
          </AvatarStack>
          <span className="text-muted-foreground text-xs/4">Loved by 4200+ professionals</span>
        </div>
      </PageHeading>

      <PageHeading>
        <PageHeadingTagline>New features released</PageHeadingTagline>
        <PageHeadingTitle>Make Better Decisions, With Ease</PageHeadingTitle>
        <PageHeadingDescription>
          Acme Inc&apos;s personal AI helps you cut through the noise, speed up delivery, and stay
          focused without switching contexts.
        </PageHeadingDescription>
        <PageHeadingActions>
          <Button>Get Started</Button>
          <Button variant="outline">
            <Play /> Watch Demo
          </Button>
        </PageHeadingActions>

        {/* Extra content - can be anything you want */}
        <div className="flex flex-col gap-2 pt-5 lg:pt-9">
          <AvatarStack>
            {avatars.map((avatar) => (
              <Avatar key={avatar}>
                <AvatarImage src={avatar} />
              </Avatar>
            ))}
          </AvatarStack>
          <span className="text-muted-foreground text-xs/4">Loved by 4200+ professionals</span>
        </div>
      </PageHeading>
    </div>
  );
}

const avatars = [
  "https://shadcraft-free.vercel.app/assets/avatars/person-3.webp",
  "https://shadcraft-free.vercel.app/assets/avatars/person-1.webp",
  "https://shadcraft-free.vercel.app/assets/avatars/person-6.webp",
  "https://shadcraft-free.vercel.app/assets/avatars/person-5.webp",
  "https://shadcraft-free.vercel.app/assets/avatars/person-4.webp",
  "https://shadcraft-free.vercel.app/assets/avatars/person-2.webp",
];
