import type { Registry } from "shadcn/schema";

import { getNamespacedRegistryDependency } from "@/utils/registry";

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
  },
  {
    name: "page-heading",
    title: "Page Heading",
    type: "registry:ui",
    description:
      "A component that acts as the text-focused version of a hero banner. This component combines a pre-heading label, an H1 heading, supporting description text, and call-to-action buttons.",
    registryDependencies: [getNamespacedRegistryDependency("tagline")],
    files: [
      {
        path: "ui/page-heading.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "placeholder-logo",
    title: "Placeholder Logo",
    type: "registry:ui",
    description:
      "A component for that can be replaced with your brand's main logo. This component ensures layouts stay consistent before brand assets are applied.",
    files: [
      {
        path: "ui/placeholder-logo.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "profile-card",
    title: "Profile Card",
    type: "registry:ui",
    description:
      "An extension of the avatar component with more details on the individual. Good for blog posts etc.",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "ui/profile-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "section-heading",
    title: "Section Heading",
    type: "registry:ui",
    description:
      "A component that standardizes heading typography and spacing. This component includes a pre-heading label, main heading, and body text in different layout variants.",
    registryDependencies: [getNamespacedRegistryDependency("tagline")],
    files: [
      {
        path: "ui/section-heading.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "star-rating",
    title: "Star Rating",
    type: "registry:ui",
    description:
      "A component that displays ratings with stars and an optional label. This component builds trust with visual feedback.",
    files: [
      {
        path: "ui/star-rating.tsx",
        type: "registry:ui",
      },
    ],
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
  },
];
