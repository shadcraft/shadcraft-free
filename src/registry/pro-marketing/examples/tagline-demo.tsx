import { Tagline } from "@/registry/pro-marketing/ui/tagline";

export function TaglineDemo() {
  return (
    <div className="flex flex-col items-center gap-12 p-5 lg:p-8">
      {TAGLINE_VARIANTS.map(({ variant, label }) => (
        <div key={variant} className="flex flex-col gap-2">
          <Tagline variant={variant}>{label}</Tagline>
        </div>
      ))}
    </div>
  );
}

const TAGLINE_VARIANTS = [
  {
    variant: "default",
    label: "Default variant",
  },
  {
    variant: "primary",
    label: "Primary variant",
  },
  {
    variant: "secondary",
    label: "Secondary variant",
  },
  {
    variant: "badge",
    label: "Badge variant",
  },
  {
    variant: "outline",
    label: "Outline variant",
  },
  {
    variant: "ghost",
    label: "Ghost variant",
  },
] as const;
