import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingContentType,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/components/section-heading";

export function Faqs4() {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 lg:gap-16 lg:px-8">
        {/* Section Heading */}
        <SectionHeading alignment="center" className="mx-auto w-full max-w-3xl">
          <SectionHeadingContentType>Support</SectionHeadingContentType>
          <SectionHeadingTitle>Questions?</SectionHeadingTitle>
          <SectionHeadingBody>We&apos;ve got the answers.</SectionHeadingBody>
        </SectionHeading>

        {/* FAQs Accordion */}
        <div className="mx-auto w-full max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question} className="border-none!">
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground max-w-lg text-pretty">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Separator />

        {/* Contact CTA */}
        <div className="mx-auto text-center">
          <p className="text-muted-foreground text-base/6 font-normal">
            Still have questions? We&apos;re here to help.{" "}
            <a href="#" className="text-primary underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "What is Acme Inc.?",
    answer:
      "Acme Inc. is a productivity platform designed to help teams work smarter and faster. It provides tools for collaboration, project management, and workflow optimization.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy. Sign up for a free account, complete the onboarding process, and you'll be ready to use Acme Inc. in minutes.",
  },
  {
    question: "What are the pricing plans?",
    answer:
      "We offer flexible pricing plans to suit teams of all sizes. Visit our pricing page to see detailed information about each plan and choose the one that fits your needs.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, we offer a free trial period so you can explore all features before committing to a paid plan. No credit card required.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. You can cancel your subscription at any time from your account settings. There are no long-term contracts or cancellation fees.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes, we provide customer support via email and chat. Premium plans include priority support with faster response times.",
  },
];
