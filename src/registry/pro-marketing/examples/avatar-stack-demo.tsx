import { User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarStack } from "@/registry/pro-marketing/ui/avatar-stack";

export function AvatarStackDemo() {
  return (
    <div className="flex flex-col items-center gap-12 p-5 lg:p-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium text-balance">Default</span>
        <AvatarStack>
          {avatarsSrc.map((src) => (
            <Avatar key={src}>
              <AvatarImage src={src} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          ))}
        </AvatarStack>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium text-balance">
          Max number of avatars
        </span>
        <AvatarStack max={3}>
          {avatarsSrc.map((src) => (
            <Avatar key={src}>
              <AvatarImage src={src} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          ))}
        </AvatarStack>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium text-balance">Unmasked</span>
        <AvatarStack max={4} mask={false}>
          {avatarsSrc.map((src) => (
            <Avatar key={src}>
              <AvatarImage src={src} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          ))}
        </AvatarStack>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium text-balance">
          Overlap Ratio -0.1 (10% of avatar size)
        </span>
        <AvatarStack overlapRatio={-0.1}>
          {avatarsSrc.map((src) => (
            <Avatar key={src}>
              <AvatarImage src={src} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          ))}
        </AvatarStack>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium text-balance">
          Overlap Ratio 0.3 (30% of avatar size)
        </span>
        <AvatarStack overlapRatio={0.3}>
          {avatarsSrc.map((src) => (
            <Avatar key={src}>
              <AvatarImage src={src} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          ))}
        </AvatarStack>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium text-balance">
          Custom size 48px
        </span>
        <AvatarStack max={3} size={48}>
          {avatarsSrc.map((src) => (
            <Avatar key={src}>
              <AvatarImage src={src} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          ))}
        </AvatarStack>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium text-balance">
          Vertical orientation
        </span>
        <AvatarStack orientation="vertical" max={3}>
          {avatarsSrc.map((src) => (
            <Avatar key={src}>
              <AvatarImage src={src} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          ))}
        </AvatarStack>
      </div>
    </div>
  );
}

const avatarsSrc = [
  "https://shadcraft-registry.vercel.app/assets/avatars/person-1.webp",
  "https://shadcraft-registry.vercel.app/assets/avatars/person-2.webp",
  "https://shadcraft-registry.vercel.app/assets/avatars/person-3.webp",
  "https://shadcraft-registry.vercel.app/assets/avatars/person-4.webp",
  "https://shadcraft-registry.vercel.app/assets/avatars/person-5.webp",
];
