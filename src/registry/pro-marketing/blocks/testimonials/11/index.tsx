import { Quote } from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  ProfileCard,
  ProfileCardAvatar,
  ProfileCardBody,
  ProfileCardDetails,
  ProfileCardName,
} from "@/registry/pro-marketing/components/profile-card";
import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingContentType,
  SectionHeadingTitle,
} from "@/registry/pro-marketing/components/section-heading";

export function Testimonial11() {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 lg:gap-16 lg:px-8">
        {/* Section Heading */}
        <SectionHeading alignment="center" className="mx-auto w-full max-w-3xl">
          <SectionHeadingContentType>Testimonials</SectionHeadingContentType>
          <SectionHeadingTitle>What Our Customers Say</SectionHeadingTitle>
          <SectionHeadingBody>
            Don&apos;t just take our word for it. See what teams are saying about Acme Inc.
          </SectionHeadingBody>
        </SectionHeading>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="group gap-4 p-6">
              <Quote className="size-4 rotate-180 text-muted-foreground transition-colors group-hover:text-foreground" />
              <blockquote className="text-base/6 font-normal text-pretty text-foreground lg:text-lg/7">
                {testimonial.quote}
              </blockquote>
              <Quote className="size-4 self-end text-muted-foreground transition-colors group-hover:text-foreground" />

              <ProfileCard className="mt-auto">
                <ProfileCardAvatar src={testimonial.imageSrc} name={testimonial.name} />
                <ProfileCardDetails>
                  <ProfileCardName>{testimonial.name}</ProfileCardName>
                  <ProfileCardBody>{testimonial.role}</ProfileCardBody>
                </ProfileCardDetails>
              </ProfileCard>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    id: 1,
    quote:
      "From onboarding to ongoing support, Acme Inc. has impressed us every step of the way. The tools are robust, yet easy to use.",
    name: "Paula Rodriguez",
    role: "Head of Operations",
    imageSrc: "https://shadcraft-free.vercel.app/assets/avatars/person-7.webp",
  },
  {
    id: 2,
    quote:
      "I love how seamlessly everything integrates. Our workflows are smoother and our clients have noticed the difference.",
    name: "Marcus Lee",
    role: "Client Success Manager",
    imageSrc: "https://shadcraft-free.vercel.app/assets/avatars/person-2.webp",
  },
  {
    id: 3,
    quote:
      "The constant updates and improvements show Acme Inc. truly cares about its users. Highly recommended for any growing company.",
    name: "Vivian Chen",
    role: "CTO",
    imageSrc: "https://shadcraft-free.vercel.app/assets/avatars/person-5.webp",
  },
  {
    id: 4,
    quote:
      "Acme Inc. made our project launches less stressful and more organized. The dashboard is a delight to work with each day.",
    name: "Sean O'Malley",
    role: "Project Coordinator",
    imageSrc: "https://shadcraft-free.vercel.app/assets/avatars/person-4.webp",
  },
  {
    id: 5,
    quote:
      "The feedback from our own customers has been overwhelmingly positive ever since we switched to Acme's platform.",
    name: "Linda Kim",
    role: "Customer Experience Lead",
    imageSrc: "https://shadcraft-free.vercel.app/assets/avatars/person-3.webp",
  },
  {
    id: 6,
    quote:
      "Powerful features, beautiful UI, and a support team that listens. I can't recommend Acme Inc. highly enough.",
    name: "Hanna Lee",
    role: "VP of Marketing",
    imageSrc: "https://shadcraft-free.vercel.app/assets/avatars/person-6.webp",
  },
];
