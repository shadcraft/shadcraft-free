"use client";

import { ArrowUpRight, Check, Copy, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { React as ReactLogo } from "@/components/logos/react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export function ShadcraftBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout: 2000,
  });

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
          <div className="flex w-full flex-1 items-center gap-2">
            <ReactLogo className="text-foreground size-4 shrink-0" />
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
              shadcn/ui kit.{" "}
              <span>
                <span className="font-semibold">40% off </span>
                with code{" "}
                <button
                  type="button"
                  className="group inline-flex items-center gap-1.5 font-mono font-semibold transition-opacity hover:opacity-80"
                  onClick={() => {
                    copyToClipboard("CYBERMONDAY25");
                  }}
                  aria-label="Copy promo code CYBERMONDAY25"
                >
                  <span>CYBERMONDAY25</span>
                  {isCopied ? (
                    <Check className="text-muted-foreground size-3.5 transition-opacity" />
                  ) : (
                    <Copy className="text-muted-foreground size-3.5 transition-opacity" />
                  )}
                </button>
              </span>
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
