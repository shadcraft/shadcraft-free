"use client";

import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { React as ReactLogo } from "@/components/logos/react";
import { Button } from "@/components/ui/button";

export function ShadcraftBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      role="banner"
      aria-label="Announcement banner"
      className="w-full border-b border-dashed bg-background py-2 text-foreground"
    >
      {/* Banner Container*/}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative flex items-center justify-between gap-4">
          {/* Banner Content */}
          <div className="flex w-full flex-1 items-center gap-2">
            <ReactLogo className="size-4 shrink-0 text-foreground" />
            <span className="text-sm">
              Explore the{" "}
              <Link
                className="group inline-flex items-center gap-0.5 font-semibold underline-offset-2 hover:underline"
                href="https://shadcraft.com/products/pro-react-shadcn-ui-kit"
                target="_blank"
                aria-label="Go to Shadcraft Pro React"
              >
                Pro React
                <ArrowUpRight className="size-3.5 transition-transform group-hover:rotate-45" />
              </Link>{" "}
              shadcn/ui kit
            </span>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-6"
            onClick={() => setIsVisible(false)}
          >
            <X className="size-3.5" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
