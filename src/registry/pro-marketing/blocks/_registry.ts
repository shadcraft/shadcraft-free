import type { Registry } from "shadcn/schema";

import {
  getNamespacedRegistryDependencies,
  getNamespacedRegistryDependency,
} from "@/utils/registry";

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
    registryDependencies: ["card", getNamespacedRegistryDependency("section-heading")],
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
      getNamespacedRegistryDependency("section-heading"),
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
    registryDependencies: ["button", getNamespacedRegistryDependency("section-heading")],
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
    registryDependencies: [
      "accordion",
      "separator",
      getNamespacedRegistryDependency("section-heading"),
    ],
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
    dependencies: ["react-icons"],
    registryDependencies: [
      "separator",
      getNamespacedRegistryDependency("placeholder-logo"),
    ],
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
    registryDependencies: [
      "button",
      "input",
      getNamespacedRegistryDependency("section-heading"),
    ],
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
    registryDependencies: [
      ...getNamespacedRegistryDependencies("section-heading", "profile-card"),
    ],
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
    registryDependencies: [
      "card",
      ...getNamespacedRegistryDependencies("section-heading", "profile-card"),
    ],
    files: [
      {
        path: "blocks/testimonials/11/index.tsx",
        type: "registry:component",
        target: "components/testimonials-11.tsx",
      },
    ],
    categories: ["testimonials"],
  },
  {
    name: "pricing-8",
    title: "Pricing 8",
    type: "registry:block",
    registryDependencies: [
      "card",
      "button",
      "tooltip",
      ...getNamespacedRegistryDependencies("section-heading"),
    ],
    files: [
      {
        path: "blocks/pricing/8/index.tsx",
        type: "registry:component",
        target: "components/pricing-8.tsx",
      },
    ],
    categories: ["pricing"],
  },
  {
    name: "top-navigation-5",
    title: "Top Navigation 5",
    type: "registry:block",
    registryDependencies: [
      "button",
      ...getNamespacedRegistryDependencies(
        "placeholder-logo",
        "use-click-outside",
        "use-mobile"
      ),
    ],
    files: [
      {
        path: "blocks/top-navigation/5/index.tsx",
        type: "registry:component",
        target: "components/top-navigation-5.tsx",
      },
    ],
    categories: ["top-navigation"],
  },
];
