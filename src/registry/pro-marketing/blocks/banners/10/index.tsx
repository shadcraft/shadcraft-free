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
      className="bg-secondary text-secondary-foreground w-full py-4"
    >
      {/* Banner Container */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-row items-center justify-between gap-5">
          {/* Banner Content */}
          <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="size-4" />

              <p className="text-base/6 font-normal text-pretty">
                <span className="font-semibold">Limited time offer: </span>
                Get 20% off your first month.{" "}
                <a href="#" className="underline">
                  Learn more
                </a>
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div className="shrink-0">
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={() => setIsVisible(false)}
              aria-label="Close banner"
            >
              <X />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
