import { GitHub } from "@/components/logos/github";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Tagline } from "@/registry/pro-marketing/ui/tagline";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative isolate w-full overflow-hidden px-4 pt-6 pb-12 lg:px-8 lg:pt-10 lg:pb-20">
      <div className="from-muted rounded-t-3xl bg-linear-to-b to-transparent px-4 pt-6 lg:pt-10">
        <PageHeader className="relative items-center justify-center text-center">
          <Tagline variant="badge">New release</Tagline>
          <PageHeaderHeading>
            <span className="from-primary to-muted-foreground bg-linear-to-r bg-clip-text text-transparent">
              Premium quality shadcn/ui components and blocks
            </span>
          </PageHeaderHeading>
          <PageHeaderDescription>
            A free registry of polished shadcn/ui components and marketing blocks built to
            production standards. Fast to use, easy to extend, and ready for any modern web project.
          </PageHeaderDescription>

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
        </PageHeader>
      </div>
    </main>
  );
}
