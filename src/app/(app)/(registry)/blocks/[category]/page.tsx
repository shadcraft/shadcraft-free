import { notFound } from "next/navigation";

import { DemoDisplay } from "@/components/demo-display";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { getBlocksByCategories } from "@/lib/registry";
import { registryCategories } from "@/lib/registry/blocks-categories";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = async () => {
  return registryCategories.map((category) => ({ category: category.slug }));
};

export const generateMetadata = async ({ params }: PageProps<"/blocks/[category]">) => {
  const { category } = await params;
  const categoryData = registryCategories.find((c) => c.slug === category);
  const title = categoryData?.title ?? category;
  return { title };
};

export default async function Page({ params }: PageProps<"/blocks/[category]">) {
  const { category } = await params;
  const blocks = await getBlocksByCategories([category]);
  const categoryData = registryCategories.find((c) => c.slug === category);

  if (!categoryData) {
    return notFound();
  }

  return (
    <>
      <PageHeader>
        <span className="code-inline w-fit font-mono font-medium">registry:block</span>
        <PageHeaderHeading>{categoryData.title}</PageHeaderHeading>
        {categoryData.description && (
          <PageHeaderDescription>{categoryData.description}</PageHeaderDescription>
        )}
      </PageHeader>

      <div className="space-y-16">
        {blocks.length <= 0 ? (
          <div className="text-muted-foreground font-mono text-sm">
            No blocks found in this category
          </div>
        ) : (
          blocks.map((block) => <DemoDisplay key={block.name} name={block.name} showHeader />)
        )}
      </div>
    </>
  );
}
