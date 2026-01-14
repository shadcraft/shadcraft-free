import { Geist, Geist_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

export const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const fontVariables = cn(fontSans.variable, fontMono.variable);
