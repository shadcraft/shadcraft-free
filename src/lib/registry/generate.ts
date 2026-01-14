import path from "path";
import type { RegistryItem } from "shadcn/schema";

import type { RegistryItemFile } from "@/types/shadcn-patch";
import { getBundleFromItem, removeBundlePrefix } from "@/utils/registry/bundle";

/**
 * Clean up paths in a registry item by removing bundle prefixes
 * @param item - Registry item with bundle-prefixed paths
 * @param bundle - Bundle name
 * @returns Registry item with cleaned paths
 */
export function cleanupItemPaths(item: RegistryItem, bundle: string): RegistryItem {
  if (!item.files) {
    return item;
  }

  // Build a mapping of source paths to target paths for this item
  const pathMappings = new Map<string, string>();

  item.files.forEach((file) => {
    if (typeof file === "object" && file.path && file.target) {
      // Map the source registry path to the target path
      const sourcePath = removeBundlePrefix(file.path, bundle);
      pathMappings.set(sourcePath, file.target);
    }
  });

  const cleanedFiles = item.files.map((file) => {
    if (typeof file === "object" && file.path) {
      // Remove bundle prefix and normalize UI paths
      const cleanPath = cleanFilePath(file.path, bundle);

      const cleanedFile = {
        ...file,
        path: cleanPath,
      };

      // Clean up imports in the content field using the path mappings
      if (cleanedFile.content) {
        cleanedFile.content = rewriteItemImports(cleanedFile.content, bundle, pathMappings);
      }

      return cleanedFile;
    }
    return file;
  });

  return {
    ...item,
    files: cleanedFiles,
  };
}

/**
 * Rewrite imports in content to remove bundle-specific paths
 * @param content - File content with imports
 * @param bundle - Bundle name
 * @param pathMappings - Map of source paths to target paths
 * @returns Content with rewritten imports
 */
export function rewriteItemImports(
  content: string,
  bundle: string,
  pathMappings: Map<string, string>
): string {
  // Sort mappings by path length (longest first) to handle more specific paths first
  const sortedMappings = Array.from(pathMappings.entries()).sort(([a], [b]) => b.length - a.length);

  // Handle block-specific imports using the exact path mappings
  sortedMappings.forEach(([sourcePath, targetPath]) => {
    if (sourcePath.startsWith("blocks/")) {
      // Remove the file extension from sourcePath to match import statements
      const sourcePathNoExt = sourcePath.replace(/\.(tsx?|jsx?)$/, "");

      // Extract the directory from the target path (removing filename)
      const targetPathNoExt = targetPath.replace(/\.(tsx?|jsx?)$/, "");

      // Create regex to match this specific import path
      const escapedPath = sourcePathNoExt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const escapedBundle = bundle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const importRegex = new RegExp(`@\\/registry\\/${escapedBundle}\\/${escapedPath}`, "g");

      content = content.replace(importRegex, `@/${targetPathNoExt}`);
    }
  });

  const escapedBundle = bundle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Rewrite imports from @/registry/{bundle}/examples/... to @/components/examples/...
  content = content.replace(
    new RegExp(`@\\/registry\\/${escapedBundle}\\/examples\\/`, "g"),
    "@/components/examples/"
  );

  // Finally, apply the same generic import fixer used in dev so behavior matches
  // getFileContent() in src/lib/registry/index.ts.
  content = fixImports(content);

  return content;
}

export function fixImports(content: string) {
  const regex = /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g;

  const replacement = (match: string, _path: string, type: string, component: string) => {
    if (type.endsWith("components")) {
      return `@/components/${component}`;
    } else if (type.endsWith("ui")) {
      return `@/components/ui/${component}`;
    } else if (type.endsWith("hooks")) {
      return `@/hooks/${component}`;
    } else if (type.endsWith("lib")) {
      return `@/lib/${component}`;
    }

    return match;
  };

  return content.replace(regex, replacement);
}

/**
 * Clean a single file path by removing bundle prefix and normalizing UI paths
 * @param filePath - Path to clean
 * @param bundle - Bundle name (optional)
 * @returns Cleaned path
 */
export function cleanFilePath(filePath: string, bundle?: string): string {
  let cleanPath = bundle ? removeBundlePrefix(filePath, bundle) : filePath;

  // For UI components, prepend with components/
  if (cleanPath.startsWith("ui/")) {
    cleanPath = "components/" + cleanPath;
  }

  return cleanPath;
}

/**
 * Process a registry item for output (clean paths and imports)
 * @param item - Registry item to process
 * @returns Processed registry item ready for JSON output
 * @throws Error if bundle is required but missing
 */
export function processRegistryItemForOutput(item: RegistryItem): RegistryItem {
  const bundle = getBundleFromItem(item);

  // Global items (hooks, styles, index, etc.) are allowed to omit meta.bundle.
  // In that case we simply return the item without bundle-based path cleanup.
  if (!bundle) {
    return item;
  }

  return cleanupItemPaths(item, bundle);
}

export function getFileTarget(file: RegistryItemFile) {
  let target = file.target;

  if (!target || target === "") {
    // Normalize path separators to forward slashes for cross-platform compatibility
    const normalizedPath = file.path.replace(/\\/g, "/");
    const fileName = normalizedPath.split("/").pop();
    if (
      file.type === "registry:block" ||
      file.type === "registry:component" ||
      file.type === "registry:example"
    ) {
      target = `components/${fileName}`;
    }

    if (file.type === "registry:ui") {
      target = `components/ui/${fileName}`;
    }

    if (file.type === "registry:hook") {
      target = `hooks/${fileName}`;
    }

    if (file.type === "registry:lib") {
      target = `lib/${fileName}`;
    }
  }

  return target ?? "";
}

export function fixFilePaths(files: RegistryItemFile[]): RegistryItemFile[] {
  if (files.length === 0) {
    return [];
  }

  // Resolve all paths relative to the first file's directory.
  const firstFilePath = files[0].path;
  const firstFilePathDir = path.dirname(firstFilePath);

  return files.map((file) => {
    return {
      ...file,
      path: path.relative(firstFilePathDir, file.path),
      target: getFileTarget(file),
    };
  });
}
