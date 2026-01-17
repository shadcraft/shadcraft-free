import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import { DemoDisplay } from "@/components/demo-display";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { SITE_CONFIG } from "@/config/site";
import { getRegistryItem, getRegistryItems } from "@/lib/registry";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const ui = await getRegistryItems((item) => item.type === "registry:ui");
  return ui.map((item) => ({ name: item.name }));
};

export const generateMetadata = async ({
  params,
}: PageProps<"/ui/[name]">): Promise<Metadata> => {
  const { name } = await params;
  const itemData = await getCachedRegistryItem(name);
  const title = itemData?.title ?? name;
  const description = itemData?.description ?? `${title} component for shadcn/ui`;
  const url = `${SITE_CONFIG.url}/ui/${name}`;
  const ogImageUrl = `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: ogImageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      images: [{ url: ogImageUrl }],
    },
  };
};

export default async function Page({ params }: PageProps<"/ui/[name]">) {
  const { name } = await params;
  const item = await getCachedRegistryItem(name);

  if (!item) {
    return notFound();
  }

  return (
    <>
      <PageHeader>
        <div className="flex items-center gap-2">
          <span className="code-inline w-fit font-mono font-medium">{item.type}</span>
        </div>
        <PageHeaderHeading>{item.title}</PageHeaderHeading>
        {item.description && (
          <PageHeaderDescription>{item.description}</PageHeaderDescription>
        )}
      </PageHeader>

      <DemoDisplay key={item.name} name={item.name} />
    </>
  );
}

const getCachedRegistryItem = React.cache(async (name: string) => {
  return await getRegistryItem(name);
});
