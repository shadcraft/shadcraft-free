import { Bolt, LucideProps } from "lucide-react";

import { cn } from "@/lib/utils";

export function PlaceholderLogo({
  className,
  onlyIcon = false,
  ...props
}: LucideProps & { onlyIcon?: boolean }) {
  if (onlyIcon) {
    return <Bolt className={cn("text-primary size-6 shrink-0", className)} {...props} />;
  }

  return (
    <div className="flex shrink-0 items-center gap-1">
      <Bolt className={cn("text-primary size-6 shrink-0", className)} {...props} />
      <span className="text-primary text-sm/5 font-semibold text-nowrap">Acme Inc.</span>
    </div>
  );
}
