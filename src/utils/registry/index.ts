import { type RegistryItem } from "shadcn/schema";

import { PRODUCTION_REGISTRY_URL } from "@/config/registry";
import { registryCategories } from "@/lib/registry/blocks-categories";

export function formatComponentName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function groupBlocksByCategories(blocks: RegistryItem[]) {
  const blocksByCategories = registryCategories.map((category) => ({
    title: category.title,
    slug: category.slug,
    blocks: blocks.filter((block) => block.categories?.includes(category.slug)),
    amount: blocks.filter((block) => block.categories?.includes(category.slug)).length,
  }));

  return blocksByCategories;
}

export function getRegistryItemJsonUrl(name: string): string {
  return `${PRODUCTION_REGISTRY_URL}/${name}.json`;
}

/**
 * Returns a namespaced registry dependency.
 * This allows the shadcn CLI to resolve the dependency through the @shadcraft registry
 * entry in components.json.
 * @param name - Component/block name
 * @returns Namespaced registry key (e.g. "@shadcraft/avatar-stack")
 */
export function buildNamespacedRegistryDependency(name: string): string {
  return `@shadcraft/${name}`;
}

/**
 * Returns an array of namespaced registry dependencies.
 * @param names - Component/block names
 * @returns Array of namespaced registry keys (e.g. ["@shadcraft/avatar-stack", "@shadcraft/section-heading"])
 */
export function buildNamespacedRegistryDependencies(...names: string[]): string[] {
  return names.map((name) => buildNamespacedRegistryDependency(name));
}

/**
 * Returns an array of namespaced registry dependencies.
 * @param registryDeps - Registry dependencies
 * @returns Array of namespaced registry keys (e.g. ["@shadcraft/avatar-stack", "@shadcraft/section-heading"])
 */
export function filterNamespacedRegistryDependencies(registryDeps: string[] | undefined): string[] {
  if (!registryDeps || registryDeps.length === 0) return [];
  return registryDeps.filter((dep) => dep.startsWith("@shadcraft/"));
}

export function appendIndexToRegistryItem(item: RegistryItem): RegistryItem {
  const registryDependencies = item.registryDependencies || [];
  const indexUrl = getRegistryItemJsonUrl("index");
  return {
    ...item,
    registryDependencies: [...registryDependencies, indexUrl],
  };
}

export function withBundle(bundle: string) {
  return (item: RegistryItem): RegistryItem => ({
    ...item,
    meta: {
      ...item.meta,
      bundle,
    },
  });
}
