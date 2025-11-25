export type RegistryCategory = {
  title: string;
  description: string;
  slug: ProMarketingCategorySlug;
};

type ProMarketingCategorySlug =
  | "banners"
  | "benefits"
  | "blog-listings"
  | "careers"
  | "contact"
  | "cta"
  | "faqs"
  | "footers"
  | "headers"
  | "metrics"
  | "newsletter-signup"
  | "pricing"
  | "social-proof"
  | "team"
  | "testimonials"
  | "top-navigation";

const proMarketingCategories: RegistryCategory[] = [
  {
    title: "Banners",
    description:
      "shadcn/ui Banner blocks for promotions, updates, and cookie preferences. Choose from floating dialog banners that sit over content or full-bleed styles that span the page. Designed to capture attention without disrupting the flow of your site.",
    slug: "banners",
  },
  {
    title: "Benefits",
    description:
      "shadcn/ui Benefits blocks focus on outcomes, not Benefits. Help customers see exactly how your product improves their life or business. A proven section for driving conversions on marketing sites.",
    slug: "benefits",
  },
  {
    title: "Blog Listings",
    description:
      "shadcn/ui Blog Listings blocks that showcase articles in a clean, engaging format. Use them for dedicated blog index pages, at the bottom of marketing content, or on blog detail pages to keep readers exploring.",
    slug: "blog-listings",
  },
  {
    title: "Careers",
    description:
      "shadcn/ui Careers blocks help you highlight open roles and attract talent. Choose from card or table layouts and use imagery to showcase your culture and what it feels like to work at your company.",
    slug: "careers",
  },
  {
    title: "Contact",
    description:
      "shadcn/ui Contact blocks featuring forms and maps. Perfect for helping customers get in touch, with support for multiple office locations to make your business feel approachable and easy to reach.",
    slug: "contact",
  },
  {
    title: "CTA",
    description:
      "shadcn/ui CTA blocks designed to drive interaction. Pair strong copy with visuals to encourage signups, trials, or purchases at key points on your site.",
    slug: "cta",
  },
  {
    title: "FAQs",
    description:
      "shadcn/ui FAQ blocks give customers quick answers to common questions, reducing support requests and boosting trust. Each block includes a fallback CTA for when customers need to get in touch directly.",
    slug: "faqs",
  },
  {
    title: "Footers",
    description:
      "shadcn/ui Footers blocks that handle common layouts, from simple links to more advanced versions with newsletter signup. An effective place to capture subscribers while closing out your site.",
    slug: "footers",
  },
  {
    title: "Headers",
    description:
      "shadcn/ui Header blocks that combine striking visuals with headings and navigation. Designed to make a strong first impression, with options for image backgrounds and guidance on maintaining text contrast for accessibility.",
    slug: "headers",
  },
  {
    title: "Metrics",
    description:
      "shadcn/ui Metric blocks highlight key stats that build credibility. Perfect for showcasing customer numbers, performance results, or milestones in a simple, scannable way.",
    slug: "metrics",
  },
  {
    title: "Newsletter Signup",
    description:
      "shadcn/ui Newsletter Signup blocks designed to grow your subscriber base. Place them mid-page or at the bottom of landing and content pages to capture attention when interest is highest.",
    slug: "newsletter-signup",
  },
  {
    title: "Pricing",
    description:
      "shadcn/ui Pricing blocks that clearly communicate your plans and costs. Choose from simple single-tier layouts or detailed multi-tier options that highlight features side by side to support buying decisions.",
    slug: "pricing",
  },
  {
    title: "Social Proof",
    description:
      "shadcn/ui Social Proof blocks that showcase customer results and brand credibility. Use them to reinforce trust by demonstrating the impact your product has had for real users.",
    slug: "social-proof",
  },
  {
    title: "Team",
    description:
      "shadcn/ui Team blocks introduce the people behind your product or service. A humanising element for agencies and startups where relationships with customers are central.",
    slug: "team",
  },
  {
    title: "Testimonials",
    description:
      "shadcn/ui Team blocks introduce the people behind your product or service. A humanising element for agencies and startups where relationships with customers are central.",
    slug: "testimonials",
  },
  {
    title: "Top Navigation",
    description:
      "shadcn/ui Top Navigation blocks that anchor the top of your marketing site. Include your branding, links to key content, and clear calls to action. Options include dropdowns and flyout menus for easy navigation.",
    slug: "top-navigation",
  },
];

export const registryCategories: RegistryCategory[] = [...proMarketingCategories];
