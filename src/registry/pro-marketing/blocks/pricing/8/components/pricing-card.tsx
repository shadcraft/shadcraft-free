import { Check, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  description: string;
  price: number;
  features: {
    label: string;
    tooltip: string;
  }[];
  featured?: boolean;
}

export function PricingCard({
  name,
  description,
  price,
  features,
  featured = false,
}: PricingCardProps) {
  return (
    <Card
      className={cn("w-full max-w-xl gap-4 border-2 py-5", featured && "border-2 border-primary")}
    >
      <CardHeader className="flex flex-col gap-2 px-5">
        <h3 className="text-lg/7 font-medium text-foreground">{name}</h3>
        <p className="text-sm/5 font-normal text-muted-foreground">{description}</p>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 px-5">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl leading-none font-semibold text-foreground">${price}</span>
          <span className="text-base/6 font-normal text-muted-foreground">/month</span>
        </div>

        <ul className="flex flex-col gap-3">
          {features.map((feature) => (
            <li key={feature.label} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span
                className={cn(
                  "flex-1 text-sm/5 font-normal text-muted-foreground",
                  featured && "text-foreground"
                )}
              >
                {feature.label}
              </span>

              {feature.tooltip && (
                <Tooltip>
                  <TooltipTrigger aria-label="More information">
                    <Info className="size-4 text-muted-foreground opacity-70 hover:opacity-100" />
                  </TooltipTrigger>
                  <TooltipContent>{feature.tooltip}</TooltipContent>
                </Tooltip>
              )}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto px-5">
        <Button variant={featured ? "default" : "outline"} size="lg" className="mt-auto w-full">
          Get started
        </Button>
      </CardFooter>
    </Card>
  );
}
