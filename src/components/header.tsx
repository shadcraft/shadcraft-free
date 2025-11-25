import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { GitHub } from "@/components/logos/github";
import { XformerlyTwitter } from "@/components/logos/twitter";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 h-(--header-height) w-full border-b">
      <div className="container mx-auto size-full">
        <div className="flex size-full items-center justify-between gap-2 px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="Go to home page">
            <Logo />
            <span className="flex items-center gap-2 text-xl font-semibold lowercase">
              shadcraft <span className="code-inline">free</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="icon">
              <Link
                href="https://github.com/shadcraft/shadcraft-free"
                target="_blank"
                aria-label="Go to GitHub Repository"
              >
                <GitHub />
              </Link>
            </Button>

            <Button asChild variant="ghost" size="icon">
              <Link
                href="https://x.com/shadcraft_"
                target="_blank"
                aria-label="Go to Shadcraft Twitter"
              >
                <XformerlyTwitter />
              </Link>
            </Button>

            <ThemeToggle />

            <Button asChild className="gap-1.5">
              <Link
                href="https://shadcraft.com/products/pro-react-shadcn-ui-kit"
                target="_blank"
                aria-label="Go to Shadcraft Pro React"
              >
                Buy Pro React
                <ArrowUpRightIcon />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
