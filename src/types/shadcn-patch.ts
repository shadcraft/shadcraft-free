import type { RegistryItem } from "shadcn/schema";

export type RegistryItemFile = NonNullable<RegistryItem["files"]>[number];
