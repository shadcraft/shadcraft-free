import type { Registry } from "shadcn/schema";

import { blocks } from "@/registry/pro-marketing/blocks/_registry";
import { components } from "@/registry/pro-marketing/components/_registry";
import { examples } from "@/registry/pro-marketing/examples/_registry";
import { hooks } from "@/registry/pro-marketing/hooks/_registry";
import { ui } from "@/registry/pro-marketing/ui/_registry";
import { appendIndexToRegistryItem, withBundle } from "@/utils/registry";

// Safe guard to append the "pro-marketing" bundle to all items in the /pro-marketing registry
const appendProMarketingBundleToItem = withBundle("pro-marketing");

export const proMarketingRegistryItems: Registry["items"] = [
  ...ui.map(appendIndexToRegistryItem),
  ...components.map(appendIndexToRegistryItem),
  ...blocks.map(appendIndexToRegistryItem),
  ...examples,
  ...hooks,
].map(appendProMarketingBundleToItem);
