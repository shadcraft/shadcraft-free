import { RegistryItem } from "shadcn/schema";

export function isUiItem(item: RegistryItem): boolean {
  return item.type === "registry:ui";
}

export function isComponentItem(item: RegistryItem): boolean {
  return item.type === "registry:component";
}

export function isBlockItem(item: RegistryItem): boolean {
  return item.type === "registry:block";
}

export function isExampleItem(item: RegistryItem): boolean {
  return item.type === "registry:example";
}

export function isBlockFromCategories(item: RegistryItem, categories: string[]): boolean {
  const matchesCategories = item.categories?.some((category) => categories.includes(category));
  return item.type === "registry:block" && !!matchesCategories;
}
