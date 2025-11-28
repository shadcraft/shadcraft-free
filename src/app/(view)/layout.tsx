import type { Metadata } from "next";

import { ScreenSizeIndicator } from "@/components/screen-size-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { SITE_CONFIG } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.title} View`,
    template: `%s | ${SITE_CONFIG.title} View`,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_BASE_URL!),
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: "Shadcraft", url: "https://shadcraft.com" }],
  creator: "Shadcraft",
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
    creator: "@shadcraft_",
  },
};

export default function RootLayoutView({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async crossOrigin="anonymous" src="https://tweakcn.com/live-preview.min.js" />
      </head>
      <body className={`${fontVariables} overscroll-none font-sans antialiased`}>
        <ThemeProvider storageKey="view-theme">
          {children}
          <ScreenSizeIndicator enabled showTooltip className="fixed bottom-2 left-2" />
          <ThemeToggle
            className="fixed right-2 bottom-2 border"
            variant="secondary"
            size="icon-sm"
          />
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
