"use client";

import { PricingCard } from "@/registry/pro-marketing/blocks/pricing/8/components/pricing-card";
import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingContentType,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/components/section-heading";

export function Pricing8() {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 lg:gap-16 lg:px-8">
        {/* Section Heading */}
        <SectionHeading alignment="center" className="mx-auto w-full max-w-3xl">
          <SectionHeadingContentType>Pricing</SectionHeadingContentType>
          <SectionHeadingTitle>Our Plans</SectionHeadingTitle>
          <SectionHeadingBody>
            Acme Inc. has a plan designed to help you move faster.
          </SectionHeadingBody>
        </SectionHeading>

        {/* Pricing Cards */}
        <div className="grid place-items-center items-stretch gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              features={plan.features}
              featured={plan.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individuals getting started",
    price: 15,
    features: [
      { label: "Up to 5 projects", tooltip: "You can create up to 5 projects" },
      { label: "Basic features", tooltip: "You can use basic features" },
      { label: "Email support", tooltip: "You can get email support" },
      { label: "5GB storage", tooltip: "You can store up to 5GB of data" },
    ],
    featured: false,
  },
  {
    name: "Professional",
    description: "Ideal for small teams",
    price: 35,
    features: [
      { label: "Unlimited projects", tooltip: "You can create unlimited projects" },
      { label: "Advanced features", tooltip: "You can use advanced features" },
      { label: "Priority support", tooltip: "You can get priority support" },
      { label: "50GB storage", tooltip: "You can store up to 50GB of data" },
      { label: "Team collaboration", tooltip: "You can collaborate with your team" },
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: 75,
    features: [
      { label: "Unlimited everything", tooltip: "You can use unlimited everything" },
      { label: "All features", tooltip: "You can use all features" },
      { label: "24/7 support", tooltip: "You can get 24/7 support" },
      { label: "Unlimited storage", tooltip: "You can store unlimited data" },
      { label: "Advanced security", tooltip: "You can use advanced security" },
      { label: "Custom integrations", tooltip: "You can integrate with your custom integrations" },
    ],
    featured: false,
  },
];
