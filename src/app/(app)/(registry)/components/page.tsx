import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { SITE_CONFIG } from "@/config/site";
import { getRegistryItems } from "@/lib/registry";

export const metadata: Metadata = {
  title: "Components",
  description: "Browse our collection of free shadcn/ui components.",
  alternates: { canonical: `${SITE_CONFIG.url}/components` },
  openGraph: {
    title: "Components",
    description: "Browse our collection of free shadcn/ui components.",
    url: `${SITE_CONFIG.url}/components`,
  },
};

export default async function RegistryComponentsPage() {
  const items = await getRegistryItems((item) => item.type === "registry:component");

  return (
    <section className="flex flex-col gap-4">
      {items.map((item) => (
        <Item key={item.name} variant="muted" asChild className="group">
          <Link href={`/components/${item.name}`}>
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
            </ItemContent>

            <ItemActions>
              <ChevronRight className="opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </ItemActions>
          </Link>
        </Item>
      ))}
    </section>
  );
}
