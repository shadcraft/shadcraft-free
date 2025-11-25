import { Tagline } from "@/registry/pro-marketing/ui/tagline";

export default function TaglineExample() {
  return (
    <div className="flex flex-col gap-12 p-5 lg:p-8">
      {TAGLINE_VARIANTS.map(({ variant, label, description }) => (
        <div key={variant} className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Tagline variant={variant}>{label}</Tagline>
            <h1 className="text-foreground/25 text-5xl font-semibold tracking-tight lg:text-7xl">
              Example Heading
            </h1>
            <p className="text-muted-foreground/50 max-w-xl text-lg/7 font-normal">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const TAGLINE_VARIANTS = [
  {
    variant: "default",
    label: "Default variant",
    description: "No background color, base foreground text color, no border, no rounded corners.",
  },
  {
    variant: "primary",
    label: "Primary variant",
    description: "Primary text and background color, rounded corners, no border.",
  },
  {
    variant: "secondary",
    label: "Secondary variant",
    description: "Secondary text and background color, rounded corners, no border.",
  },
  {
    variant: "badge",
    label: "Badge variant",
    description: "Base foreground and background color, border, rounded full.",
  },
  {
    variant: "outline",
    label: "Outline variant",
    description: "Transparent background, base foreground text color, border, rounded corners.",
  },
  {
    variant: "ghost",
    label: "Ghost variant",
    description:
      "Transparent background, muted foreground text color, no border, no rounded corners.",
  },
] as const;
