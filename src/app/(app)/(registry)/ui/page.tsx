import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { getRegistryItems } from "@/lib/registry";

export default async function RegistryUIPage() {
  const items = await getRegistryItems((item) => item.type === "registry:ui");

  return (
    <section className="flex flex-col gap-4">
      {items.map((item) => (
        <Item key={item.name} variant="muted" asChild className="group">
          <Link href={`/ui/${item.name}`}>
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
