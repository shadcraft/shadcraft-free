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
    name: "contact-11",
    title: "Contact 11",
    type: "registry:block",
    registryDependencies: [
      "button",
      "label",
      "input",
      "textarea",
      "checkbox",
      getRegistryItemJsonUrl("section-heading"),
    ],
    files: [
      {
        path: "blocks/contact/11/index.tsx",
        type: "registry:component",
        target: "components/contact-11.tsx",
      },
    ],
    categories: ["contact"],
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
    title: "FAQs 4",
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
    name: "newsletter-signup-5",
    title: "Newsletter Signup 5",
    type: "registry:block",
    registryDependencies: ["button", "input", getRegistryItemJsonUrl("section-heading")],
    files: [
      {
        path: "blocks/newsletter-signup/5/index.tsx",
        type: "registry:component",
        target: "components/newsletter-signup-5.tsx",
      },
    ],
    categories: ["newsletter-signup"],
  },
  {
    name: "team-6",
    title: "Team 6",
    type: "registry:block",
    registryDependencies: [...getRegistryItemsJsonUrls("section-heading", "profile-card")],
    files: [
      {
        path: "blocks/team/6/index.tsx",
        type: "registry:component",
        target: "components/team-6.tsx",
      },
    ],
    categories: ["team"],
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
