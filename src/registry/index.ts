import { type RegistryItem, type Registry } from "shadcn/schema";

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
  homepage: "https://shadcraft-free.vercel.app", // TODO:
  items: [DEFAULT, ...proMarketingRegistryItems],
} satisfies Registry;
