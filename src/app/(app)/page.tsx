"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { GitHub } from "@/components/logos/github";
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
    <main className="relative isolate w-full overflow-hidden px-4 pt-6 pb-12 lg:px-8 lg:pt-10 lg:pb-20">
      <div className="relative isolate px-4 pt-6 lg:pt-10">
        {/* Background gradient effect and border beam */}
        <div className="from-muted absolute inset-0 z-[-1] rounded-t-3xl bg-linear-to-b to-transparent">
          <div className="border-beam rounded-inherit absolute inset-0 rounded-t-3xl mask-b-from-0% antialiased" />
        </div>

        <motion.div variants={headerContainerVariants} initial="hidden" animate="visible">
          <PageHeader className="relative items-center justify-center text-center">
            <motion.div variants={headerItemVariants}>
              <Tagline variant="badge">New release</Tagline>
            </motion.div>

            <motion.div variants={headerItemVariants}>
              <PageHeaderHeading>
                <span className="from-primary to-muted-foreground bg-linear-to-r bg-clip-text text-transparent">
                  Premium quality shadcn/ui components and blocks
                </span>
              </PageHeaderHeading>
            </motion.div>

            <motion.div variants={headerItemVariants}>
              <PageHeaderDescription>
                A free registry of polished shadcn/ui components and marketing blocks built to
                production standards. Fast to use, easy to extend, and ready for any modern web
                project.
              </PageHeaderDescription>
            </motion.div>

            <motion.div variants={headerItemVariants}>
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
      </div>
    </main>
  );
}

const headerContainerVariants = {
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

const headerItemVariants = {
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
