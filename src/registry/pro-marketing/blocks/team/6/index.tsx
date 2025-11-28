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

export function Team6() {
  return (
    <section className="bg-muted py-12 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 lg:gap-16 lg:px-8">
        {/* Section Heading */}
        <SectionHeading alignment="center" className="mx-auto w-full max-w-3xl">
          <SectionHeadingContentType>Team</SectionHeadingContentType>
          <SectionHeadingTitle>Meet The People Behind Acme AI</SectionHeadingTitle>
          <SectionHeadingBody>
            We are a team of builders, designers, and problem-solvers dedicated to helping you work
            smarter every day.
          </SectionHeadingBody>
        </SectionHeading>

        {/* Team Members */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9">
          {teamMembersData.map((member) => (
            <ProfileCard
              key={member.name}
              variant="default"
              className="bg-background rounded-xl p-2"
            >
              <ProfileCardAvatar
                src={member.image}
                name={member.name}
                className="size-32 rounded-lg"
              />
              <ProfileCardDetails className="border-primary self-end-safe border-l-2 pl-2">
                <ProfileCardName>{member.name}</ProfileCardName>
                <ProfileCardBody>{member.title}</ProfileCardBody>
              </ProfileCardDetails>
            </ProfileCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const teamMembersData = [
  {
    name: "Sophie Tan",
    title: "Founder & CEO",
    image: "https://shadcraft-registry.vercel.app/assets/avatars/person-1.webp",
  },
  {
    name: "Liam Johnson",
    title: "Chief Technology Officer",
    image: "https://shadcraft-registry.vercel.app/assets/avatars/person-2.webp",
  },
  {
    name: "Ava Smith",
    title: "Head of Marketing",
    image: "https://shadcraft-registry.vercel.app/assets/avatars/person-3.webp",
  },
  {
    name: "Noah Brown",
    title: "Product Manager",
    image: "https://shadcraft-registry.vercel.app/assets/avatars/person-4.webp",
  },
  {
    name: "Emma Wilson",
    title: "Lead Designer",
    image: "https://shadcraft-registry.vercel.app/assets/avatars/person-5.webp",
  },
  {
    name: "Oliver Lee",
    title: "Data Analyst",
    image: "https://shadcraft-registry.vercel.app/assets/avatars/person-6.webp",
  },
];
