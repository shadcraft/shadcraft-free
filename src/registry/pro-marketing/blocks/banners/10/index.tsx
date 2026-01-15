"use client";

import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function Banner10() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    // To make the banner fixed, add classes like `fixed top-0 inset-x-0 z-50` to the container element
    <aside
      role="banner"
      aria-label="Promotional banner"
      className="w-full bg-muted py-4 text-muted-foreground"
    >
      {/* Banner Container */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-row items-start justify-between gap-5 lg:items-center lg:gap-9">
          {/* Banner Content */}
          <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex items-start gap-1">
              <AlertCircle className="mt-1 size-4 shrink-0 text-foreground" />

              <p className="text-pretty">
                <span className="font-semibold">New from Acme Inc: </span>
                AI Productivity Suite.{" "}
                <a href="#" className="underline">
                  Check it out
                </a>
              </p>
            </div>
          </div>

          {/* Close Button */}
          <Button
            size="icon-sm"
            className="size-6 shrink-0 max-lg:-mt-1 max-lg:-mr-1"
            variant="ghost"
            onClick={() => setIsVisible(false)}
            aria-label="Close banner"
          >
            <X />
          </Button>
        </div>
      </div>
    </aside>
  );
}
