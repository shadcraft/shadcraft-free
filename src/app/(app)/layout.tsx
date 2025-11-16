import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { SITE_CONFIG } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
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

export default function RootLayoutApp({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async crossOrigin="anonymous" src="https://tweakcn.com/live-preview.min.js" />
      </head>
      <ThemeProvider>
        <body className={`${fontVariables} overscroll-none antialiased`}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
