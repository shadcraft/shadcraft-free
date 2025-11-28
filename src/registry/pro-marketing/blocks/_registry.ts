import { getRegistryItemJsonUrl, getRegistryItemsJsonUrls } from "@/utils/registry";
import { type Registry } from "shadcn/schema";

export const blocks: Registry["items"] = [
  {
    name: "banner-10",
    title: "Banner 10",
    type: "registry:block",
    registryDependencies: ["button"],
    files: [
      {
        path: "blocks/banners/10/index.tsx",
        type: "registry:component",
        target: "components/banner-10.tsx",
      },
    ],
    categories: ["banners"],
  },
  {
    name: "benefits-13",
    title: "Benefits 13",
    type: "registry:block",
    registryDependencies: ["card", getRegistryItemJsonUrl("section-heading")],
    files: [
      {
        path: "blocks/benefits/13/index.tsx",
        type: "registry:component",
        target: "components/benefits-13.tsx",
      },
    ],
    categories: ["benefits"],
  },
  {
    name: "cta-9",
    title: "CTA 9",
    type: "registry:block",
    registryDependencies: ["button", getRegistryItemJsonUrl("section-heading")],
    files: [
      {
        path: "blocks/cta/9/index.tsx",
        type: "registry:component",
        target: "components/cta-9.tsx",
      },
    ],
    categories: ["cta"],
  },
  {
    name: "faqs-4",
    title: "CTA 9",
    type: "registry:block",
    registryDependencies: ["accordion", "separator", getRegistryItemJsonUrl("section-heading")],
    files: [
      {
        path: "blocks/faqs/4/index.tsx",
        type: "registry:component",
        target: "components/faqs-4.tsx",
      },
    ],
    categories: ["faqs"],
  },
  {
    name: "footer-4",
    title: "Footer 4",
    type: "registry:block",
    registryDependencies: ["separator", getRegistryItemJsonUrl("placeholder-logo")],
    files: [
      {
        path: "blocks/footers/4/index.tsx",
        type: "registry:component",
        target: "components/footer-4.tsx",
      },
    ],
    categories: ["footers"],
    meta: {
      containerClassName: "min-h-svh content-end",
    },
  },
  {
    name: "testimonials-11",
    title: "Testimonials 11",
    type: "registry:block",
    registryDependencies: ["card", ...getRegistryItemsJsonUrls("section-heading", "profile-card")],
    files: [
      {
        path: "blocks/testimonials/11/index.tsx",
        type: "registry:component",
        target: "components/testimonials-11.tsx",
      },
    ],
    categories: ["testimonials"],
  },
];
