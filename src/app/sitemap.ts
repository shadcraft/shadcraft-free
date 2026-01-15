import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config/site";
import { getRegistryItems } from "@/lib/registry";
import { registryCategories } from "@/lib/registry/blocks-categories";
import { isUiItem } from "@/utils/registry/filters";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = ["", "/ui", "/components", "/blocks"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
    })
  );

  // Block category routes
  const blockCategoryRoutes: MetadataRoute.Sitemap = registryCategories.map((category) => ({
    url: `${baseUrl}/blocks/${category.slug}`,
    lastModified: new Date().toISOString(),
  }));

  // UI component routes
  const uiItems = await getRegistryItems(isUiItem);
  const uiComponentRoutes: MetadataRoute.Sitemap = uiItems.map((item) => ({
    url: `${baseUrl}/ui/${item.name}`,
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes, ...blockCategoryRoutes, ...uiComponentRoutes];
}
