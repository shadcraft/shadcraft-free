import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { getRegistryItems } from "@/lib/registry";
import { groupBlocksByCategories } from "@/utils/registry";

export default async function RegistryBlocksPage() {
  const items = await getRegistryItems((item) => item.type === "registry:block");
  const blockItemsByCategories = groupBlocksByCategories(items);

  const blockAmountDisplayText = (amount: number) => {
    if (amount === 0) return "No blocks yet";
    if (amount === 1) return "1 block";
    return `${amount} blocks`;
  };

  return (
    <section className="flex flex-col gap-4">
      {blockItemsByCategories.map((item) => (
        <Item key={item.slug} variant="muted" asChild className="group">
          <Link href={`/blocks/${item.slug}`}>
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <span className="border-l-2 pl-2">{blockAmountDisplayText(item.amount)}</span>
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
