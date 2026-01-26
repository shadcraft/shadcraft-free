import {
  BrainIcon,
  ChartAreaIcon,
  ClipboardListIcon,
  PaletteIcon,
  RocketIcon,
  SearchIcon,
  ShieldIcon,
  ZapIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/ui/section-heading";

const category = [
  {
    icon: RocketIcon,
    title: "Getting Started",
    link: "#",
    description:
      "Learn how to set up your account and navigate the comparison tool quickly.",
  },
  {
    icon: ChartAreaIcon,
    title: "Comparing Models",
    link: "#",
    description:
      "Side-by-side performance metrics, benchmarks, and real-world use cases for each AI model.",
  },
  {
    icon: ZapIcon,
    title: "Speed & Latency",
    link: "#",
    description:
      "Understand response times, token throughput, and how models perform under load.",
  },
  {
    icon: BrainIcon,
    title: "Reasoning & Accuracy",
    link: "#",
    description:
      "Compare logical reasoning, math skills, coding ability, and factual accuracy across models.",
  },
  {
    icon: PaletteIcon,
    title: "Creative Tasks",
    link: "#",
    description:
      "Evaluate writing style, image generation prompts, humor, and creative output quality.",
  },
  {
    icon: ShieldIcon,
    title: "Safety & Alignment",
    link: "#",
    description:
      "Review content moderation, refusal rates, bias handling, and ethical considerations.",
  },
];
const articles = [
  {
    question: "How do I create an account and get started?",
    answer:
      'Signing up is quick and free. Click the "Sign Up" button in the top right, choose to register with email, Google, or X (Twitter). Once logged in, you’ll have full access to compare models, run custom prompts, and view detailed benchmarks.',
  },
  {
    question: "How do I compare different AI models?",
    answer:
      "Choose up to four models from the dropdown menus at the top of the comparison page. You can then enter a single prompt to see side-by-side responses, or browse pre-built benchmark tests like reasoning, coding, math, and creative writing.",
  },
  {
    question: "Can I test models with my own custom prompts?",
    answer:
      "Yes! In the main comparison view, type your prompt into the input box at the bottom and hit Enter. All selected models will respond simultaneously, allowing you to instantly compare style, accuracy, speed, and creativity.",
  },
  {
    question: "What do the benchmark scores mean?",
    answer:
      "Benchmarks are standardized tests (e.g., MMLU for knowledge, GSM8K for math, HumanEval for coding) run across models. Higher percentages indicate better performance on that specific task. We show both raw scores and relative rankings for easy comparison.",
  },
  {
    question: "How often are the models and benchmarks updated?",
    answer:
      'We update model versions and add new benchmarks as soon as they become available. Leaderboards reflect the latest public releases from providers like OpenAI, Anthropic, Google, xAI, Meta, and others. Check the "Last updated" date on each benchmark page.',
  },
];

export default function Help1() {
  return (
    <section className={"flex py-14"}>
      <div className={"container mx-auto"}>
        <div className={"mx-auto max-w-3xl space-y-4 text-center"}>
          <SectionHeading alignment="center" className="mx-auto w-full max-w-3xl">
            <SectionHeadingTitle>How can we help you?</SectionHeadingTitle>
            <SectionHeadingBody>
              Search for answers about product comparison, specs and orders.
            </SectionHeadingBody>
          </SectionHeading>
          <div className={"mt-12 flex items-center gap-3"}>
            <SearchIcon className={"text-primary"} />
            <Input />
            <Button>Search</Button>
          </div>
        </div>
        <div className={"mt-10"}>
          <h3 className={"font-bold"}>Browse by category</h3>
          <div
            className={"mx-auto mt-10 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3"}
          >
            {category.map(({ icon: Icon, ...item }, index) => (
              <a
                href={item.link}
                key={index}
                className={cn(
                  "grid gap-2 border p-4 transition-colors hover:border-primary"
                )}
              >
                <span className={"w-fit bg-primary/10 p-4"}>
                  <Icon className={"text-primary"} />
                </span>
                <h5 className={"mt-4 font-bold text-primary"}>{item.title}</h5>
                <p>{item.description}</p>
              </a>
            ))}
          </div>
        </div>
        <div className={"mt-10"}>
          <h3 className={"font-bold"}>Popular articles</h3>
          <div
            className={
              "mx-auto mt-10 grid max-w-7xl gap-1 rounded border bg-muted dark:bg-transparent"
            }
          >
            {articles.map((article, index) => (
              <Accordion
                key={index}
                type="multiple"
                className={cn("px-4", index !== 0 && "border-t")}
              >
                <AccordionItem value={index.toString()}>
                  <AccordionTrigger>
                    <span className={"flex items-center gap-2"}>
                      <ClipboardListIcon />
                      {article.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>{article.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
          <div
            className={
              "mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 space-y-4 border bg-muted p-8 text-center lg:flex-row lg:text-start dark:bg-transparent"
            }
          >
            <span>
              <h6 className={"font-semibold text-primary"}>Still need help?</h6>
              <p className={"text-muted-foreground"}>
                Our support team is available 24/7 to assist you with any questions.
              </p>
            </span>
            <span className={"space-x-4"}>
              <a href="#">
                <Button>Start Live Chat</Button>
              </a>
              <a href="#">
                <Button variant={"outline"}>Email Us</Button>
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
