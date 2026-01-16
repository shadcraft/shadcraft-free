import { ArrowUpRight, Globe } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { XformerlyTwitter } from "@/components/logos/twitter";
import { Separator } from "@/components/ui/separator";
import { getRegistryItems } from "@/lib/registry";
import { groupBlocksByCategories } from "@/utils/registry";

const shadcraftLinks = [
  {
    label: "Home",
    href: "https://shadcraft.com/",
  },
  {
    label: "Pricing",
    href: "https://shadcraft.com/pricing",
  },
  {
    label: "Support",
    href: "https://discord.com/invite/tzgMKeqG3s",
  },
  {
    label: "Contact us",
    href: "https://shadcraft.com/contact",
  },
  {
    label: "Documentation",
    href: "https://shadcraft.com/docs/free-registry",
  },
];

export async function Footer() {
  const registryUiItems = await getRegistryItems((item) => item.type === "registry:ui");
  const registryComponentItems = await getRegistryItems(
    (item) => item.type === "registry:component"
  );
  const resolvedComponentItems = [...registryUiItems, ...registryComponentItems];

  const blockItems = await getRegistryItems((item) => item.type === "registry:block");
  const blockItemsByCategories = groupBlocksByCategories(blockItems);

  return (
    <footer
      className="relative w-full bg-background py-12 lg:py-20"
      role="contentinfo"
      aria-label="Website footer"
    >
      <div className="absolute inset-x-0 top-0 flex w-full items-center gap-4">
        <Separator className="flex-1" />
        <Logo className="shrink-0" />
        <Separator className="flex-1" />
      </div>

      <div className="container mx-auto flex w-full flex-col gap-5 px-5 lg:gap-9 lg:px-8">
        {/* Navigation */}
        <nav
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-9"
          aria-label="Footer navigation"
        >
          {/* Shadcraft Website*/}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-medium text-foreground">Shadcraft</h3>
            <ul className="grid gap-3">
              {shadcraftLinks.map((item) => {
                return (
                  <li key={item.label} className="text-sm text-muted-foreground">
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 transition-all hover:text-primary"
                    >
                      {item.label} <ArrowUpRight className="size-3" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Marketing Components */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-medium text-foreground">Marketing Components</h3>
            <ul className="grid gap-3">
              {resolvedComponentItems.map((item) => {
                const href =
                  item.type === "registry:ui" ? `/ui/${item.name}` : `/components/${item.name}`;
                return (
                  <li key={item.name} className="text-sm text-muted-foreground">
                    <Link
                      href={href}
                      className="flex items-center gap-1 transition-all hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Marketing Blocks */}
          <div className="flex flex-col gap-6 md:col-span-2">
            <h3 className="text-sm font-medium text-foreground">Marketing Blocks</h3>
            <ul className="grid gap-x-12 gap-y-3 md:grid-cols-2 lg:gap-x-9">
              {blockItemsByCategories.map((item) => (
                <li key={item.slug} className="text-sm text-muted-foreground">
                  <Link
                    href={`/blocks/${item.slug}`}
                    className="flex items-center gap-1 transition-all hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <Separator role="presentation" aria-hidden="true" />

        {/* Logo and Social Links and Copyright */}
        <div className="flex w-full flex-col gap-9 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col gap-4">
            <Link href="/" className="flex items-center gap-2" aria-label="Go to home page">
              <Logo />
              <span className="flex items-center gap-2 text-xl font-semibold lowercase">
                shadcraft <span className="code-inline translate-y-px">free</span>
              </span>
            </Link>

            <span className="text-sm font-normal text-balance text-muted-foreground">
              This is a free and open-source project by{" "}
              <Link
                href="https://x.com/shadcraft_"
                target="_blank"
                aria-label="Go to Shadcraft Twitter"
                className="link"
              >
                Shadcraft
              </Link>
              . You can find the source code on{" "}
              <Link
                href="https://github.com/shadcraft/shadcraft-free"
                target="_blank"
                aria-label="Go to GitHub Repository"
                className="link"
              >
                GitHub
              </Link>
              .
            </span>
          </div>

          {/* Social Links and Copyright */}
          <div className="flex w-full flex-col gap-4 self-end lg:items-end">
            <div className="flex items-center gap-3 lg:gap-4">
              <Link
                href="https://x.com/shadcraft_"
                target="_blank"
                aria-label="Go to Shadcraft Twitter"
                className="text-muted-foreground transition-all hover:text-primary"
              >
                <XformerlyTwitter className="size-3.5" />
              </Link>

              <Link
                href="https://www.shadcraft.com"
                target="_blank"
                aria-label="Go to Shadcraft website"
                className="text-muted-foreground transition-all hover:text-primary"
              >
                <Globe className="size-4" />
              </Link>
            </div>

            <div className="flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-end">
              <p className="text-sm font-normal text-muted-foreground">
                &copy; Shadcraft {getCurrentYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

async function getCurrentYear() {
  return new Date().getFullYear();
}
