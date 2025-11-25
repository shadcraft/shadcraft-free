import { type Registry } from "shadcn/schema";

import { getNamespacedRegistryDependency } from "@/utils/registry";

export const examples: Registry["items"] = [
  {
    name: "avatar-stack-example",
    title: "Avatar Stack Example",
    type: "registry:example",
    registryDependencies: ["avatar", getNamespacedRegistryDependency("avatar-stack")],
    files: [
      {
        path: "examples/avatar-stack-example.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "heading-example",
    title: "Heading Example",
    type: "registry:example",
    registryDependencies: [getNamespacedRegistryDependency("heading")],
    files: [
      {
        path: "examples/heading-example.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "marquee-example",
    title: "Marquee Example",
    type: "registry:example",
    registryDependencies: [getNamespacedRegistryDependency("marquee")],
    files: [
      {
        path: "examples/marquee-example.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "page-heading-example",
    title: "Page Heading Example",
    type: "registry:example",
    registryDependencies: [getNamespacedRegistryDependency("page-heading")],
    files: [
      {
        path: "examples/page-heading-example.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "placeholder-logo-example",
    title: "Placeholder Logo Example",
    type: "registry:example",
    registryDependencies: [getNamespacedRegistryDependency("placeholder-logo")],
    files: [
      {
        path: "examples/placeholder-logo-example.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "profile-card-example",
    title: "Profile Card Example",
    type: "registry:example",
    registryDependencies: [getNamespacedRegistryDependency("profile-card")],
    files: [
      {
        path: "examples/profile-card-example.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "section-heading-example",
    title: "Section Heading Example",
    type: "registry:example",
    registryDependencies: [getNamespacedRegistryDependency("section-heading")],
    files: [
      {
        path: "examples/section-heading-example.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "star-rating-example",
    title: "Star Rating Example",
    type: "registry:example",
    registryDependencies: [getNamespacedRegistryDependency("star-rating")],
    files: [
      {
        path: "examples/star-rating-example.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
  {
    name: "tagline-example",
    title: "Tagline Example",
    type: "registry:example",
    registryDependencies: [getNamespacedRegistryDependency("tagline")],
    files: [
      {
        path: "examples/tagline-example.tsx",
        type: "registry:example",
      },
    ],
    meta: {},
  },
];
