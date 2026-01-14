"use client";

import { ChevronDown, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RegistryItem } from "shadcn/schema";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { formatComponentName, groupBlocksByCategories } from "@/utils/registry";

export function RootSidebar({
  items,
  className,
  ...props
}: React.ComponentProps<typeof Sidebar> & { items: RegistryItem[] }) {
  return (
    <Sidebar
      className={cn("relative border-none bg-background", className)}
      collapsible="icon"
      {...props}
    >
      {/* Sidebar Header */}
      <MySidebarContent
        items={items}
        className="no-scrollbar overscroll-contain bg-background p-2 pb-12"
      />
      {/* Sidebar Footer */}
      <SidebarRail />
    </Sidebar>
  );
}

function MySidebarContent({
  items,
  className,
  ...props
}: { items: RegistryItem[] } & React.ComponentProps<typeof SidebarContent>) {
  const pathname = usePathname();

  const uiItems = items.filter((item) => item.type === "registry:ui");
  const componentItems = items.filter((item) => item.type === "registry:component");
  const resolvedComponentItems = [...uiItems, ...componentItems];

  const blockItems = items.filter((item) => item.type === "registry:block");
  const blockItemsByCategories = groupBlocksByCategories(blockItems);

  const templateItems = items.filter(
    (item) => item.type === "registry:block" && !!item.meta?.template
  );

  return (
    <SidebarContent className={cn("isolate", className)} {...props}>
      <div className="absolute inset-x-0 top-0 z-50 h-8 bg-linear-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-50 h-8 bg-linear-to-t from-background to-transparent" />
      {/* Components */}
      <Collapsible defaultOpen={resolvedComponentItems.length > 0} className="group/collapsible">
        <SidebarGroup>
          <CollapsibleTrigger className="w-full">
            <SidebarGroupLabel className="flex items-center justify-between pr-0">
              <span>Components</span>
              <ChevronDown className="size-4 shrink-0 transition-all duration-200 group-data-[state=open]/collapsible:rotate-180" />
            </SidebarGroupLabel>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {resolvedComponentItems.length > 0 ? (
                  resolvedComponentItems.map((item) => {
                    const href =
                      item.type === "registry:ui" ? `/ui/${item.name}` : `/components/${item.name}`;
                    const isActive = pathname === href;

                    return (
                      <SidebarMenuItem key={item.name} className="font-medium">
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={href} className="flex items-center justify-between gap-2">
                            <span className="1 min-w-0 truncate">
                              {item.title || formatComponentName(item.name)}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })
                ) : (
                  <span className="py-2 text-center text-xs text-muted-foreground">
                    No components found
                  </span>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>

      {/* Blocks */}
      <Collapsible defaultOpen={blockItems.length > 0} className="group/collapsible">
        <SidebarGroup>
          <CollapsibleTrigger className="w-full">
            <SidebarGroupLabel className="flex items-center justify-between pr-0">
              <span>Blocks</span>
              <ChevronDown className="size-4 shrink-0 transition-all duration-200 group-data-[state=open]/collapsible:rotate-180" />
            </SidebarGroupLabel>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {blockItemsByCategories.length > 0 ? (
                  blockItemsByCategories.map((item) => {
                    const href = `/blocks/${item.slug}`;
                    const isActive = pathname === href;
                    return (
                      <SidebarMenuItem key={item.slug} className="font-medium">
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link
                            href={href}
                            className="flex items-center justify-between gap-2 font-medium"
                          >
                            {item.title}
                            <span className="font-mono text-xs text-muted-foreground">
                              {item.amount}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })
                ) : (
                  <span className="py-2 text-center text-xs text-muted-foreground">
                    No blocks found
                  </span>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>

      {/* Templates */}
      <Collapsible defaultOpen={templateItems.length > 0} className="group/collapsible">
        <SidebarGroup>
          <CollapsibleTrigger className="w-full">
            <SidebarGroupLabel className="flex items-center justify-between pr-0">
              <div className="flex min-w-0 items-center">
                <LayoutTemplate className="size-4 shrink-0" />
                <span className="ml-2 transition-all duration-200">Templates</span>
              </div>
              <ChevronDown className="size-4 shrink-0 transition-all duration-200 group-data-[state=open]/collapsible:rotate-180" />
            </SidebarGroupLabel>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {templateItems.length > 0 ? (
                  templateItems.map((item) => {
                    const href = `/templates/${item.name}`;
                    const isActive = pathname === href;
                    return (
                      <SidebarMenuItem key={item.name} className="font-medium">
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={href}>{item.title || formatComponentName(item.name)}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })
                ) : (
                  <span className="py-2 text-center text-xs text-muted-foreground">
                    No templates found
                  </span>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </SidebarContent>
  );
}
