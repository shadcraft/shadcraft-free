import { type Registry } from "shadcn/schema";

export const ui: Registry["items"] = [
  {
    name: "avatar-stack",
    title: "Avatar Stack",
    type: "registry:ui",
    description: "A component that stacks and overlaps a list of avatars.",
    files: [
      {
        path: "ui/avatar-stack.tsx",
        type: "registry:ui",
      },
    ],
    meta: {},
  },
  {
    name: "marquee",
    title: "Marquee",
    type: "registry:ui",
    description:
      "A component that displays a list of items in a horizontal or vertical scrolling motion.",
    dependencies: ["react-fast-marquee"],
    files: [
      {
        path: "ui/marquee.tsx",
        type: "registry:ui",
      },
    ],
    meta: {},
  },
  {
    name: "tagline",
    title: "Tagline",
    type: "registry:ui",
    description: "A component that displays a tagline with different variants.",
    files: [
      {
        path: "ui/tagline.tsx",
        type: "registry:ui",
      },
    ],
    meta: {},
  },
];
