"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function ShadcraftBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      role="banner"
      aria-label="Announcement banner"
      className="bg-background text-foreground w-full border-b border-dashed py-2"
    >
      {/* Banner Container*/}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative flex items-center justify-between gap-4">
          {/* Banner Content */}
          <div className="flex w-full flex-1 flex-col items-start justify-between gap-5 md:flex-row md:items-center lg:gap-9">
            <span className="text-sm">
              <span>
                Explore our latest{" "}
                <Link
                  className="inline-flex items-center gap-1.5 font-medium underline underline-offset-2"
                  href="https://shadcraft.com/products/pro-react-shadcn-ui-kit"
                  target="_blank"
                  aria-label="Go to Shadcraft Pro React"
                >
                  Pro React
                </Link>{" "}
                shadcn/ui Kit.
              </span>{" "}
              <span className="font-medium">Plus it&apos;s Black Friday!</span>
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
