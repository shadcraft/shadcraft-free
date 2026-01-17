import { ArrowUpRight, Construction } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DemoDisplay } from "@/components/demo-display";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SITE_CONFIG } from "@/config/site";
import { getBlocksByCategories } from "@/lib/registry";
import { registryCategories } from "@/lib/registry/blocks-categories";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = async () => {
  return registryCategories.map((category) => ({ category: category.slug }));
};

export const generateMetadata = async ({
  params,
}: PageProps<"/blocks/[category]">): Promise<Metadata> => {
  const { category } = await params;
  const categoryData = registryCategories.find((c) => c.slug === category);
  const title = categoryData?.title ?? category;
  const description = categoryData?.description ?? `${title} blocks for shadcn/ui`;
  const url = `${SITE_CONFIG.url}/blocks/${category}`;
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
        <span className="code-inline">registry:block</span>
        <PageHeaderHeading>{categoryData.title}</PageHeaderHeading>
        {categoryData.description && (
          <PageHeaderDescription>{categoryData.description}</PageHeaderDescription>
        )}
      </PageHeader>

      <div className="space-y-16">
        {blocks.length <= 0 ? (
          <Empty className="rounded-t-3xl bg-linear-to-b from-muted to-transparent">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Construction />
              </EmptyMedia>
              <EmptyTitle>Blocks Under Construction</EmptyTitle>
              <EmptyDescription>
                These blocks are still under construction. Check back soon!
                <br />
                In the meantime, you can view the{" "}
                <span className="font-medium">Shadcraft Pro React </span>Kit to see the
                available Pro Blocks.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild size="sm" className="gap-1.5">
                <Link
                  href="https://shadcraft.com/products/pro-react-shadcn-ui-kit"
                  target="_blank"
                  aria-label="Go to Shadcraft Pro React"
                >
                  View Pro Blocks Kit
                  <ArrowUpRight />
                </Link>
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          blocks.map((block) => (
            <DemoDisplay key={block.name} name={block.name} showHeader />
          ))
        )}
      </div>
    </>
  );
}
