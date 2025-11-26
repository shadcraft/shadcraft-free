import { notFound } from "next/navigation";
import React from "react";

import { DemoDisplay } from "@/components/demo-display";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { getRegistryItem, getRegistryItems } from "@/lib/registry";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const ui = await getRegistryItems((item) => item.type === "registry:ui");
  return ui.map((item) => ({ name: item.name }));
};

export const generateMetadata = async ({ params }: PageProps<"/ui/[name]">) => {
  const { name } = await params;
  const itemData = await getCachedRegistryItem(name);
  const title = itemData?.title ?? name;
  return { title };
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
        {item.description && <PageHeaderDescription>{item.description}</PageHeaderDescription>}
      </PageHeader>

      <DemoDisplay key={item.name} name={item.name} />
    </>
  );
}

const getCachedRegistryItem = React.cache(async (name: string) => {
  return await getRegistryItem(name);
});
