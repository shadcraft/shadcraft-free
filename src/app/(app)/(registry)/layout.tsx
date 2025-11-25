import { RootSidebar } from "@/app/(app)/(registry)/sidebar";
import { Breadcrumbs } from "@/app/(app)/breadcrumbs";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getRegistryItems } from "@/lib/registry";

export default async function RegistryLayout({ children }: { children: React.ReactNode }) {
  const registryItems = await getRegistryItems();

  return (
    <SidebarProvider
      className="flex"
      style={
        {
          "--sidebar-width-icon": "0rem",
        } as React.CSSProperties
      }
    >
      <RootSidebar
        items={registryItems}
        className="bg-background sticky top-(--header-height) z-20 h-[calc(100svh-var(--header-height))] shrink-0"
      />

      <SidebarInset className="relative min-w-0">
        <header className="bg-background/80 sticky top-(--header-height) z-10 flex h-10 w-full items-center gap-4 px-4 backdrop-blur lg:px-8">
          <SidebarTrigger size="icon-sm" />
          {/* Ideally this should be a parallel route {breadcrumbs} */}
          <Breadcrumbs />
        </header>

        <div className="w-full px-4 py-12 lg:px-8 lg:pb-20">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
