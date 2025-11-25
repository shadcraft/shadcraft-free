import { Heading } from "@/registry/pro-marketing/ui/heading";

export function HeadingExample() {
  return (
    <div className="flex flex-col gap-12 p-5 lg:p-8">
      <Heading level={1} size={"3xl"}>
        Heading 1 <span className="text-muted-foreground">Main Title</span>
      </Heading>
      <Heading level={2} size={"2xl"}>
        Heading 2 <span className="text-muted-foreground">Section Title</span>
      </Heading>
      <Heading level={3} size={"lg"}>
        Heading 3 <span className="text-muted-foreground">Sub-section Title</span>
      </Heading>
      <Heading level={4} size={"md"}>
        Heading 4
      </Heading>
      <Heading level={5} size={"sm"}>
        Heading 5
      </Heading>
      <Heading level={6} size={"xs"}>
        Heading 6
      </Heading>
    </div>
  );
}
