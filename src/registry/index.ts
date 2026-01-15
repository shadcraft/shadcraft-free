import type { Registry, RegistryItem } from "shadcn/schema";

import { REGISTRY_CONFIG } from "@/config/registry";
import { proMarketingRegistryItems } from "@/registry/pro-marketing/registry";

const DEFAULT: RegistryItem = {
  name: "index",
  type: "registry:style",
  dependencies: ["class-variance-authority", "lucide-react"],
  devDependencies: ["tw-animate-css"],
  css: {
    "@layer base": {
      button: {
        cursor: "pointer",
      },
    },
  },
};

export const registry = {
  name: "Shadcraft Free",
  homepage: REGISTRY_CONFIG.homepage,
  items: [DEFAULT, ...proMarketingRegistryItems],
} satisfies Registry;
