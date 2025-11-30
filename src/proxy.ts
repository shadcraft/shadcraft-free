import { captureRegistryEvent } from "@wandry/analytics-sdk";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getRegistryItem } from "@/lib/registry";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/r/") && pathname.endsWith(".json")) {
    const name = pathname.slice("/r/".length).replace(/\.json$/, "");

    try {
      const item = await getRegistryItem(name);
      if (!item) return NextResponse.next();

      if (process.env.NODE_ENV === "production") {
        captureRegistryEvent(request, process.env.WANDRY_REGISTRY_TOKEN!);
      }
    } catch {
      console.error(`[proxy.ts]: Error getting registry item ${name}`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/r/:path*"],
};
