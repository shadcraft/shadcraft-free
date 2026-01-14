import type { RegistryItem } from "shadcn/schema";

/**
 * Extract bundle name from registry item metadata.
 *
 * - For items that require a bundle (blocks, components, ui, examples),
 *   this will throw if the bundle is missing.
 * - For other items (hooks, libs, styles, index, etc.), this will log a
 *   warning and return null if the bundle is missing.
 */
export function getBundleFromItem(item: RegistryItem): string | null {
  const bundle = item.meta?.bundle;

  if (!bundle || typeof bundle !== "string") {
    const requiresBundle =
      item.type === "registry:block" ||
      item.type === "registry:component" ||
      item.type === "registry:ui" ||
      item.type === "registry:example";

    const message = `Registry item "${item.name}" (type: ${item.type}) is missing meta.bundle`;

    if (requiresBundle) {
      throw new Error(message);
    }

    // Global items (index, styles, hooks, etc.) are allowed to omit bundles,
    // but we still warn so they are easy to spot.
    console.warn(`⚠️ ${message} - using original paths`);
    return null;
  }

  return bundle;
}

/**
 * Build full file path with bundle prefix for registry structure.
 *
 * If the bundle is missing and not required for the given item type,
 * this will still root the path under src/registry but skip the bundle segment.
 */
export function getBundlePath(item: RegistryItem, filePath: string): string {
  const bundle = getBundleFromItem(item);

  // No bundle: still root under src/registry, just skip the bundle segment
  if (!bundle) {
    // If user already passed an absolute-ish src path, respect it
    if (filePath.startsWith("src/")) {
      return filePath;
    }
    return `src/registry/${filePath}`;
  }

  // Bundled items keep existing behavior
  return `src/registry/${bundle}/${filePath}`;
}

/**
 * Build import path with bundle prefix.
 *
 * If the bundle is missing and not required for the given item type,
 * this will fall back to the original file path.
 */
export function getBundleImportPath(item: RegistryItem, filePath: string): string {
  const bundle = getBundleFromItem(item);
  if (!bundle) return filePath;
  return `@/registry/${bundle}/${filePath}`;
}

/**
 * Remove bundle prefix from a path
 * @param path - Path that may contain bundle prefix (e.g., "src/registry/pro-marketing/ui/button.tsx")
 * @param bundle - Bundle name to remove
 * @returns Path without bundle prefix (e.g., "ui/button.tsx")
 */
export function removeBundlePrefix(path: string, bundle: string): string {
  // Remove src/registry/{bundle}/ prefix
  const prefixPattern = new RegExp(
    `^src/registry/${bundle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/`
  );
  return path.replace(prefixPattern, "");
}

/**
 * Check if a path contains a bundle prefix
 * @param path - Path to check
 * @param bundle - Bundle name
 * @returns True if path contains the bundle prefix
 */
export function hasBundlePrefix(path: string, bundle: string): boolean {
  const prefixPattern = new RegExp(
    `^src/registry/${bundle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/`
  );
  return prefixPattern.test(path);
}
