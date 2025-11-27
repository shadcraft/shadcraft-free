import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { registry } from "@/registry";

// TODO: Add analytics

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/r/") && pathname.endsWith(".json")) {
    const name = pathname.slice("/r/".length).replace(/\.json$/, "");
    try {
      const item = registry.items.find((item) => item.name === name);
      if (!item) return NextResponse.next();

      if (process.env.NODE_ENV === "production") {
      }
    } catch {}
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/r/:path*"],
};
