import type { RegistryItem } from "shadcn/schema";

export function getViewItemName(segments: readonly string[]): string {
  return segments[segments.length - 1] ?? "";
}

export function getViewSegmentsForItem(item: RegistryItem): string[] {
  const segments: string[] = [];
  const bundle = item.meta?.bundle as string | undefined;
  if (bundle) segments.push(bundle);

  if (item.type === "registry:block") {
    segments.push("blocks", item.name);
  } else if (item.type === "registry:example") {
    segments.push("examples", item.name);
  } else if (item.type === "registry:component" || item.type === "registry:ui") {
    // Use by the <DemoViewer> component to get the correct path for the demo
    // since we pass the `item` (of type "registry:component" or "registry:ui")
    segments.push("examples", `${item.name}-demo`);
  }

  return segments;
}

export function getViewPathForItem(item: RegistryItem): string {
  const segments = getViewSegmentsForItem(item);
  return `/view/${segments.join("/")}`;
}
