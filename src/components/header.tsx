import Link from "next/link";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-(--header-height) w-full bg-background/90 backdrop-blur">
      <div className="container mx-auto size-full">
        <div className="flex size-full items-center justify-between gap-2 px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="Go to home page">
            <Logo />
            <span className="flex items-center gap-2 text-lg font-semibold lowercase sm:text-xl">
              shadcraft <span className="code-inline translate-y-px">free</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle size="icon" />

            <Button asChild className="gap-1.5">
              <Link
                href="https://shadcraft.com/products/pro-react-shadcn-ui-kit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Go to Shadcraft Pro React"
              >
                <span>
                  <span>Buy Pro </span>
                  <span className="hidden sm:inline">React</span>
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
