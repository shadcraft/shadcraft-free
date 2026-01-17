import "@/styles/globals.css";

import type { Metadata } from "next";

import { ScreenSizeIndicator } from "@/components/screen-size-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { SITE_CONFIG } from "@/config/site";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.title} View`,
    template: `%s | ${SITE_CONFIG.title} View`,
  },
  metadataBase: new URL(SITE_CONFIG.url),
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,

  authors: [{ name: SITE_CONFIG.creator.general, url: "https://shadcraft.com" }],
  creator: SITE_CONFIG.creator.general,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_BASE_URL,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [`${process.env.NEXT_PUBLIC_APP_BASE_URL}/opengraph-image.png`],
    creator: SITE_CONFIG.creator.twitter,
  },
};

export default function RootLayoutView({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body className={`${fontVariables} antialiased`}>
        <ThemeProvider storageKey="view-theme">
          {children}
          <ScreenSizeIndicator
            enabled
            showTooltip
            className="fixed bottom-2 left-2 bg-secondary"
          />
          <ThemeToggle
            size="icon-sm"
            variant="secondary"
            className="fixed right-2 bottom-2 border"
          />
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
