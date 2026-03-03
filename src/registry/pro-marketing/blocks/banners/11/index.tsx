"use client";

import { BadgeCheckIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function Banner11({
  isVisible = true,
  link = "#",
}: {
  isVisible?: boolean;
  link?: string;
}) {
  const [showBanner, setShowBanner] = useState(isVisible);

  if (!showBanner) {
    return;
  }

  return (
    <aside role="banner" aria-label="Promotional banner">
      <div className={"flex items-center justify-between border bg-primary/10 p-4"}>
        <div className={"flex items-start gap-4"}>
          <span className={"grid size-fit rounded-full bg-primary/10 p-2"}>
            <BadgeCheckIcon className={"fill-primary text-background"} />
          </span>
          <span>
            <h4 className={"font-semibold text-primary"}>New version available</h4>
            <p className={"text-muted-foreground"}>Check out all the new features!</p>
            <a href={link} className={"hover:underline md:hidden"}>
              Learn more
            </a>
          </span>
        </div>
        <div className={"flex items-center gap-4"}>
          <a href={link} className={"hidden md:block"}>
            <Button>Learn more</Button>
          </a>
          <Button variant={"ghost"} onClick={() => setShowBanner(false)}>
            <XIcon />
          </Button>
        </div>
      </div>
    </aside>
  );
}
