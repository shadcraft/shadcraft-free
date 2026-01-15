import { FiLinkedin } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";

import { Separator } from "@/components/ui/separator";
import { PlaceholderLogo } from "@/registry/pro-marketing/ui/placeholder-logo";

export function Footer4() {
  return (
    <footer className="w-full bg-background py-12 lg:py-20" role="contentinfo">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 lg:gap-9 lg:px-8">
        <Separator role="presentation" aria-hidden="true" />

        <div className="grid grid-cols-4 gap-x-5 gap-y-12 lg:flex-row lg:items-start lg:justify-between lg:gap-x-9">
          {/* Logo and Description */}
          <div className="col-span-full flex flex-col justify-between gap-9 lg:col-span-1">
            <a href="/" aria-label="Go to home page">
              {/* Replace with your real logo  */}
              <PlaceholderLogo />
            </a>

            <div className="flex flex-col gap-4">
              <p className="text-sm text-pretty text-muted-foreground">
                Building tools that help teams work smarter and faster.
              </p>
              <div className="flex items-center gap-2">
                <FiLinkedin className="size-4" />
                <RiTwitterXLine className="size-4" />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav
            className="col-span-full grid gap-12 md:grid-cols-2 lg:col-span-3 lg:grid-cols-3 lg:gap-9"
            aria-label="Footer navigation"
          >
            {navigationData.map((section) => (
              <div key={section.title} className="flex flex-col gap-2.5">
                <h3 className="text-sm font-medium text-muted-foreground">{section.title}</h3>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label} className="text-base">
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <Separator role="presentation" aria-hidden="true" />

        {/* Social Links and Copyright */}
        <div className="w-full">
          <p className="text-sm text-muted-foreground">
            &copy; Copyright Acme Inc. 2025. All right reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const navigationData = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press", href: "#" },
      { label: "Leadership", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Community", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Events", href: "#" },
      { label: "Tutorials", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security", href: "#" },
      { label: "Cookie Settings", href: "#" },
      { label: "Data Processing Agreement", href: "#" },
      { label: "Compliance", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];
