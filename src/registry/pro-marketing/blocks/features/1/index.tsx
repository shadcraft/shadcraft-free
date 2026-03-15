"use client";

import { BarChart3Icon, SearchIcon, SparklesIcon, ZapIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  SectionHeading,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/ui/section-heading";

const features = [
  {
    icon: SearchIcon,
    type: "Discovery",
    title: "Instant Model Discovery",
    image: "https://free.shadcraft.com/logo-mark.svg",
    description:
      "Access the latest AI models from OpenAI, Anthropic, Google, xAI, Meta, and more—all in one place. New releases and versions appear automatically as soon as they launch.",
  },
  {
    icon: ZapIcon,
    type: "Comparison",
    title: "Real-Time Side-by-Side Testing",
    image: "https://free.shadcraft.com/logo-mark.svg",
    description:
      "Enter a single prompt and watch multiple models respond simultaneously. Instantly compare speed, style, accuracy, and creativity without switching tabs or apps.",
  },
  {
    icon: BarChart3Icon,
    type: "Benchmarks",
    title: "Objective Performance Metrics",
    image: "https://free.shadcraft.com/logo-mark.svg",
    description:
      "Dive into standardized benchmarks like MMLU, GPQA, HumanEval, and LiveCodeBench. See clear scores, rankings, and detailed breakdowns to make informed decisions.",
  },
  {
    icon: SparklesIcon,
    type: "Insights",
    title: "Deep Analysis & Context",
    image: "https://free.shadcraft.com/logo-mark.svg",
    description:
      "Get model-specific strengths, weaknesses, use-case recommendations, and cost analysis. Understand not just what performs best, but why and when to choose each model.",
  },
];

export default function Features1() {
  return (
    <section className={"flex py-14"}>
      <div className={"container mx-auto w-full"}>
        <SectionHeading alignment="center" className="mx-auto w-full max-w-3xl">
          <SectionHeadingTitle>Our Core Features</SectionHeadingTitle>
        </SectionHeading>
        <div
          className={
            "mx-auto mt-10 grid max-w-7xl gap-2 rounded-xl border bg-muted p-2 md:grid-cols-2"
          }
        >
          {features.map(({ icon: Icon, ...feature }, index, array) => (
            <div
              key={index}
              className={cn(
                "flex flex-col gap-8 rounded border bg-background p-6",
                index === 0 && "rounded-t-xl lg:rounded-ss-xl lg:rounded-se",
                index === 1 && "lg:rounded-se-xl",
                index === array.length - 2 && "lg:rounded-es-xl",
                index === array.length - 1 &&
                  "rounded-b-xl lg:rounded-ee-xl lg:rounded-es"
              )}
            >
              <div
                className={
                  "grid place-content-center rounded bg-muted py-10 sm:min-h-[300px]"
                }
              >
                <img src={feature.image} alt={"Placeholder"} className={"size-20"} />
              </div>
              <div className={"flex flex-col gap-4"}>
                <Badge>
                  <Icon size={16} />
                  <p>{feature.type}</p>
                </Badge>
                <h5 className={"font-medium text-primary"}>{feature.title}</h5>
                <p className={"text-muted-foreground"}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
