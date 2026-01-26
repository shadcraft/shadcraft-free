/**
 * Root-level 404 page.
 *
 * This file must define its own <html> and <body> because:
 * 1. The app uses two separate root layouts: (app) and (view), each with their
 *    own ThemeProvider and independent theme state (different storageKeys).
 * 2. Route groups like (app) and (view) don't catch unknown routes - requests
 *    to invalid paths (e.g. /random) fall through to the root level.
 * 3. Without a root layout.tsx, this not-found.tsx has no parent layout, so it
 *    must be self-contained with its own html shell, styles, fonts, and ThemeProvider.
 *
 * Trade-off: No header/footer here, but the page is fully themed and functional.
 */

import "@/styles/globals.css";

import Link from "next/link";

import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { fontVariables } from "@/lib/fonts";

export default function NotFound() {
  const title = "Sorry, we couldn't find that page :-(";
  const description =
    "Message us if you're trying to find something you can't. You can also use the search features above.";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} overscroll-none`}>
        <ThemeProvider>
          <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-20">
            <PageHeader>
              <PageHeaderHeading>{title}</PageHeaderHeading>
              <PageHeaderDescription>{description}</PageHeaderDescription>
              <PageHeaderActions className="flex w-fit flex-col gap-2 sm:flex-row">
                <Button asChild>
                  <Link href="/">Go home</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link
                    href="https://x.com/shadcraft_"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Message on X
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link
                    href="https://discord.com/invite/tzgMKeqG3s"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Message on Discord
                  </Link>
                </Button>
              </PageHeaderActions>
            </PageHeader>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
