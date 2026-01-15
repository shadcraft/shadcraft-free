import { PlaceholderLogo } from "@/registry/pro-marketing/ui/placeholder-logo";

export function PlaceholderLogoDemo() {
  return (
    <div className="flex flex-col gap-12 p-5 lg:p-8">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Default</span>
        <PlaceholderLogo />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Only Icon</span>
        <PlaceholderLogo onlyIcon />
      </div>
    </div>
  );
}
