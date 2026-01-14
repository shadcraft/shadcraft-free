import type { Registry } from "shadcn/schema";

export const hooks: Registry["items"] = [
  {
    name: "use-carousel",
    type: "registry:hook",
    dependencies: ["embla-carousel", "embla-carousel-react"],
    files: [
      {
        path: "hooks/use-carousel.ts",
        type: "registry:hook",
      },
    ],
    meta: {},
  },
  {
    name: "use-click-outside",
    type: "registry:hook",
    dependencies: [],
    files: [
      {
        path: "hooks/use-click-outside.ts",
        type: "registry:hook",
      },
    ],
    meta: {},
  },
  {
    name: "use-mobile",
    type: "registry:hook",
    dependencies: [],
    files: [
      {
        path: "hooks/use-mobile.ts",
        type: "registry:hook",
      },
    ],
    meta: {},
  },
];
