"use client";

import { TooltipContent } from "@radix-ui/react-tooltip";
import { Check, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingTagline,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/ui/section-heading";

export function Pricing8() {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 lg:gap-16 lg:px-8">
        {/* Section Heading */}
        <SectionHeading alignment="center" className="mx-auto w-full max-w-3xl">
          <SectionHeadingTagline>Pricing</SectionHeadingTagline>
          <SectionHeadingTitle>Our Plans</SectionHeadingTitle>
          <SectionHeadingBody>
            Acme Inc. has a plan designed to help you move faster.
          </SectionHeadingBody>
        </SectionHeading>

        {/* Pricing Cards */}
        <div className="grid place-items-center items-stretch gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "w-full max-w-xl gap-4 border-2 py-5",
                plan.featured && "border-2 border-primary"
              )}
            >
              <CardHeader className="flex flex-col gap-2 px-5">
                <h3 className="text-lg font-medium text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 px-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl leading-none font-semibold text-foreground">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    /month
                  </span>
                </div>

                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span
                        className={cn(
                          "flex-1 text-sm text-muted-foreground",
                          plan.featured && "text-foreground"
                        )}
                      >
                        {feature.label}
                      </span>

                      {feature.tooltip && (
                        <Tooltip>
                          <TooltipTrigger aria-label="More information">
                            <Info className="size-4 text-muted-foreground opacity-70 hover:opacity-100" />
                          </TooltipTrigger>
                          <TooltipContent>{feature.tooltip}</TooltipContent>
                        </Tooltip>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="mt-auto px-5">
                <Button
                  size="lg"
                  variant={plan.featured ? "default" : "outline"}
                  className="mt-auto w-full"
                >
                  Get started
                </Button>
              </CardFooter>
            </Card>
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
      {
        label: "Custom integrations",
        tooltip: "You can integrate with your custom integrations",
      },
    ],
    featured: false,
  },
];
