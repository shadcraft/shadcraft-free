"use client";

import { ChevronRightIcon, TriangleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/ui/section-heading";

const pricing = [
  {
    type: "Starter",
    cost: "$49/mo",
    description: "Perfect for individuals or small teams testing AI model comparisons.",
    includes: {
      title: "Everything in Free, plus:",
      items: [
        "Compare up to 3 models at once",
        "Run unlimited custom prompts",
        "Access to basic benchmarks (MMLU, GSM8K)",
        "Export results as CSV",
        "Email support",
      ],
    },
    contactDescription: "Start 14-day free trial",
    link: "#",
  },
  {
    type: "Pro",
    cost: "$149/mo",
    description:
      "Ideal for power users, researchers, and developers who need deeper insights.",
    includes: {
      title: "Everything in Starter, plus:",
      items: [
        "Compare up to 6 models simultaneously",
        "Side-by-side latency & speed testing",
        "Save and organize unlimited comparisons",
        "API access (limited rate)",
        "Priority email & chat support",
      ],
    },
    contactDescription: "Start 14-day free trial",
    link: "#",
  },
  {
    type: "Enterprise",
    cost: "Custom",
    description:
      "For teams and organizations needing scale, security, and dedicated support.",
    includes: {
      title: "Everything in Pro, plus:",
      items: [
        "Unlimited model comparisons",
        "Custom benchmark creation",
        "On-premise or private deployment options",
        "SSO & advanced user management",
        "Dedicated account manager",
        "SLA and premium support",
      ],
    },
    contactDescription: "Contact sales",
    link: "#",
  },
];

export default function Pricing9() {
  return (
    <section className={"flex py-14"}>
      <div className={"container mx-auto"}>
        <SectionHeading alignment="center" className="mx-auto w-full max-w-3xl">
          <SectionHeadingTitle>Flexible Pricing Plans</SectionHeadingTitle>
          <SectionHeadingBody>
            Acme Inc. has a plan designed to help you move faster.
          </SectionHeadingBody>
        </SectionHeading>
        <div
          className={
            "mx-auto mt-10 grid max-w-7xl gap-2 rounded-xl border bg-muted p-2 lg:grid-cols-3"
          }
        >
          {pricing.map((pricingItem, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col gap-8 rounded border bg-background p-6",
                index === 0 && "rounded-t-xl lg:rounded-s-xl lg:rounded-tr",
                index === pricing.length - 1 &&
                  "rounded-b-xl lg:rounded-e-xl lg:rounded-bl"
              )}
            >
              <div className={"space-y-6"}>
                <p>{pricingItem.type}</p>
                <h2 className={"text-4xl font-bold text-primary"}>{pricingItem.cost}</h2>
                <p className={"text-muted-foreground"}>{pricingItem.description}</p>
              </div>
              {/*<div ></div>*/}
              <div className={"flex-1 border-t pt-8"}>
                <h5 className={"font-semibold"}>{pricingItem.includes.title}</h5>
                <ul className={"mt-4 space-y-4"}>
                  {pricingItem.includes.items.map((item, itemIndex) => (
                    <li key={itemIndex} className={"flex items-start gap-2"}>
                      <TriangleIcon className={"size-4 rotate-90"} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={pricingItem.link}
                className={
                  "mt-10 flex justify-between border-b pb-3 text-muted-foreground transition-colors hover:border-b-foreground hover:text-foreground"
                }
              >
                <p>{pricingItem.contactDescription}</p>
                <ChevronRightIcon />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
