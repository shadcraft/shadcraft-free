"use client";

import { ArrowRightIcon, Plus } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { Figma as FigmaLogo } from "@/components/logos/figma";
import { GitHub } from "@/components/logos/github";
import { React as ReactLogo } from "@/components/logos/react";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Tagline } from "@/components/ui/tagline";

export default function Home() {
  return (
    <main className="relative isolate flex w-full flex-col gap-12 overflow-hidden px-4 pt-6 pb-12 lg:gap-16 lg:px-8 lg:pt-10 lg:pb-20">
      <HeroSection />
      <FreeKitCTA />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-3xl"
      >
        <PageHeader className="relative items-center justify-center text-center">
          <motion.div variants={itemVariants}>
            <Tagline variant="default">New release</Tagline>
          </motion.div>

          <motion.div variants={itemVariants}>
            <PageHeaderHeading>
              <span className="bg-clip-text text-primary">
                Premium quality shadcn/ui components and blocks
              </span>
            </PageHeaderHeading>
          </motion.div>

          <motion.div variants={itemVariants}>
            <PageHeaderDescription>
              A free registry of polished shadcn/ui components and marketing blocks built to
              production standards. Fast to use, easy to extend, and ready for any modern web
              project.
            </PageHeaderDescription>
          </motion.div>

          <motion.div variants={itemVariants}>
            <PageHeaderActions className="mx-auto w-fit pt-4">
              <Button asChild>
                <Link href="/ui/avatar-stack">Explore the registry</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="https://github.com/shadcraft/shadcraft-free" target="_blank">
                  <GitHub />
                  GitHub
                </Link>
              </Button>
            </PageHeaderActions>
          </motion.div>
        </PageHeader>
      </motion.div>
    </section>
  );
}

function FreeKitCTA() {
  return (
    <section className="relative isolate">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-3xl flex-col gap-4 rounded-3xl bg-secondary p-6 inset-shadow-2xs inset-shadow-border"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <div className="flex size-14 items-center justify-center rounded-xl bg-background p-2 inset-shadow-2xs inset-shadow-border">
            <ReactLogo className="size-8" />
          </div>
          <Plus className="size-4 text-muted-foreground" />
          <div className="flex size-14 items-center justify-center rounded-xl bg-background p-2 inset-shadow-2xs inset-shadow-border">
            <FigmaLogo className="size-8" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <h2 className="text-xl font-medium text-balance">Try the Free Figma and React kit</h2>
          <p className="text-balance text-muted-foreground">
            Access a curated set of shadcn components in the Figma community library, try tweakcn
            theming, and use the free Shadcraft registry. A simple way to trial the kit before
            upgrading.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="w-fit pt-4">
          <Button asChild>
            <Link
              href="https://polar.sh/checkout/polar_c_yhJ8HZh0Hi7rTuJUM3YbSSSGJ1U4gPWHnmaym1fOkpf"
              target="_blank"
            >
              Get started <ArrowRightIcon />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
} as const;
