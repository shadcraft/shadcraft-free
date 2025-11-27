import { type Registry } from "shadcn/schema";

export const components: Registry["items"] = [
  {
    name: "page-heading",
    title: "Page Heading",
    type: "registry:component",
    description:
      "A component that acts as the text-focused version of a hero banner. This component combines a pre-heading label, an H1 heading, supporting description text, and call-to-action buttons.",
    files: [
      {
        path: "components/page-heading.tsx",
        type: "registry:component",
      },
    ],
    meta: {},
  },
  {
    name: "placeholder-logo",
    title: "Placeholder Logo",
    type: "registry:component",
    description:
      "A component for that can be replaced with your brand's main logo. This component ensures layouts stay consistent before brand assets are applied.",
    files: [
      {
        path: "components/placeholder-logo.tsx",
        type: "registry:component",
      },
    ],
    meta: {},
  },
  {
    name: "profile-card",
    title: "Profile Card",
    type: "registry:component",
    description:
      "An extension of the avatar component with more details on the individual. Good for blog posts etc.",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "components/profile-card.tsx",
        type: "registry:component",
      },
    ],
    meta: {},
  },
  {
    name: "section-heading",
    title: "Section Heading",
    type: "registry:component",
    description:
      "A component that standardizes heading typography and spacing. This component includes a pre-heading label, main heading, and body text in different layout variants.",
    files: [
      {
        path: "components/section-heading.tsx",
        type: "registry:component",
      },
    ],
    meta: {},
  },
  {
    name: "star-rating",
    title: "Star Rating",
    type: "registry:component",
    description:
      "A component that displays ratings with stars and an optional label. This component builds trust with visual feedback.",
    files: [
      {
        path: "components/star-rating.tsx",
        type: "registry:component",
      },
    ],
    meta: {},
  },
];
