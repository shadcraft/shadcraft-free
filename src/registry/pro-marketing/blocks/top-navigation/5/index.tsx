"use client";

import { Menu, X } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlaceholderLogo } from "@/registry/pro-marketing/components/placeholder-logo";
import { useClickOutside } from "@/registry/pro-marketing/hooks/use-click-outside";
import { useIsMobile } from "@/registry/pro-marketing/hooks/use-mobile";

// Defaults to Tailwind's md: breakpoint.
// Change to 1024 + use lg: classes for 1024px breakpoint or whatever breakpoint you want to use
const MOBILE_BREAKPOINT = 768;

export function TopNavigation5() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navigationContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  useClickOutside(navigationContainerRef, () => {
    if (isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  });

  return (
    // To make this a sticky navigation, you can add `sticky top-0 z-50` classes to the parent div
    <nav
      className="bg-background w-full py-5 transition-all ease-in-out md:py-3.5"
      role="navigation"
      aria-label="Website top navigation"
      ref={navigationContainerRef}
    >
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-x-5 px-5 md:flex-row lg:gap-x-9 lg:px-8">
        {/* Logo and Toggle Mobile Nav Button */}
        <div className="flex items-center justify-between">
          {/* Replace with actual logo */}
          <a href="/" aria-label="Go to home page">
            <PlaceholderLogo />
          </a>

          {/* Toggle Mobile Nav Button - Visible on screen sizes < 768px */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMenuOpen ? (
              <X className="animate-in zoom-in-50" />
            ) : (
              <Menu className="animate-in zoom-in-50" />
            )}
          </Button>
        </div>

        {/* Desktop Navigation - Visible on screen sizes ≥ 768px */}
        <div className="hidden flex-1 justify-between gap-4 md:flex md:items-center">
          <div className="mx-auto flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              // Replace with actual active link detection

              const isActive = item.href === "/pathname";
              return (
                // Replace with actual navigation link
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "hover:bg-accent/50 hover:text-accent-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <ActionButtons />
        </div>

        {/* Mobile Navigation - Visible on screen sizes < 768px */}
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out md:hidden",
            isMenuOpen
              ? "grid-rows-[1fr] pt-5 pb-1 opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0"
          )}
        >
          <div
            className="overflow-hidden"
            inert={!isMenuOpen || undefined}
            aria-hidden={!isMenuOpen}
          >
            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => {
                  // Replace with actual active link detection

                  const isActive = item.href === "/pathname";
                  return (
                    // Replace with actual navigation link
                    <a
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "hover:bg-accent/50 hover:text-accent-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive && "bg-accent text-accent-foreground"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <ActionButtons />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function ActionButtons() {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <Button variant="outline" className="w-full md:w-fit">
        Login
      </Button>
    </div>
  );
}

const NAV_ITEMS = [
  { label: "Products", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Company", href: "#" },
];
