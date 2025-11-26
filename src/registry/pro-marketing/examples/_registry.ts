import { type Registry } from "shadcn/schema";

import { buildNamespacedRegistryDependency } from "@/utils/registry";

export const examples: Registry["items"] = [
  {
    name: "avatar-stack-demo",
    title: "Avatar Stack Demo",
    type: "registry:example",
    registryDependencies: ["avatar", buildNamespacedRegistryDependency("avatar-stack")],
    files: [
      {
        path: "examples/avatar-stack-demo.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "heading-demo",
    title: "Heading Demo",
    type: "registry:example",
    registryDependencies: [buildNamespacedRegistryDependency("heading")],
    files: [
      {
        path: "examples/heading-demo.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "marquee-demo",
    title: "Marquee Demo",
    type: "registry:example",
    registryDependencies: [buildNamespacedRegistryDependency("marquee")],
    files: [
      {
        path: "examples/marquee-demo.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "page-heading-demo",
    title: "Page Heading Demo",
    type: "registry:example",
    registryDependencies: [buildNamespacedRegistryDependency("page-heading")],
    files: [
      {
        path: "examples/page-heading-demo.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "placeholder-logo-demo",
    title: "Placeholder Logo Demo",
    type: "registry:example",
    registryDependencies: [buildNamespacedRegistryDependency("placeholder-logo")],
    files: [
      {
        path: "examples/placeholder-logo-demo.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "profile-card-demo",
    title: "Profile Card Demo",
    type: "registry:example",
    registryDependencies: [buildNamespacedRegistryDependency("profile-card")],
    files: [
      {
        path: "examples/profile-card-demo.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "section-heading-demo",
    title: "Section Heading Demo",
    type: "registry:example",
    registryDependencies: [buildNamespacedRegistryDependency("section-heading")],
    files: [
      {
        path: "examples/section-heading-demo.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "star-rating-demo",
    title: "Star Rating Demo",
    type: "registry:example",
    registryDependencies: [buildNamespacedRegistryDependency("star-rating")],
    files: [
      {
        path: "examples/star-rating-demo.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "tagline-demo",
    title: "Tagline Demo",
    type: "registry:example",
    registryDependencies: [buildNamespacedRegistryDependency("tagline")],
    files: [
      {
        path: "examples/tagline-demo.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
];
