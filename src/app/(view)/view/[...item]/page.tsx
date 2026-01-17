import { notFound } from "next/navigation";
import React from "react";

import {
  getRegistryItem,
  getRegistryItems,
  getRegistryRenderComponent,
} from "@/lib/registry";
import { cn } from "@/lib/utils";
import { getViewItemName, getViewSegmentsForItem } from "@/utils/registry/view";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const allowedItemTypes = ["registry:example", "registry:block"];
  const registryItems = await getRegistryItems((item) =>
    allowedItemTypes.includes(item.type)
  );
  const params = registryItems.map((item) => ({ item: getViewSegmentsForItem(item) }));
  return params;
};

export const generateMetadata = async ({ params }: PageProps<"/view/[...item]">) => {
  const { item } = await params;
  const name = getViewItemName(item);
  const itemData = await getCachedRegistryItem(name);
  const title = itemData?.title ?? name;
  return { title };
};

export default async function ViewPage({ params }: PageProps<"/view/[...item]">) {
  // Item is an array that contains the segments of the item path
  const { item } = await params;
  const name = getViewItemName(item);
  const itemData = await getCachedRegistryItem(name);

  if (!itemData) {
    return notFound();
  }

  const RenderComponent = getRegistryRenderComponent(name);

  if (!RenderComponent) {
    return notFound();
  }

  const isBlock = itemData.type === "registry:block";

  return (
    <main
      className={cn(
        !isBlock && "flex size-full min-h-svh items-center justify-center",
        itemData.meta?.containerClassName
      )}
    >
      {/* eslint-disable-next-line react-hooks/static-components */}
      <RenderComponent />
    </main>
  );
}

const getCachedRegistryItem = React.cache(async (name: string) => {
  return await getRegistryItem(name);
});
