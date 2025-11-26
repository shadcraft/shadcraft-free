"use client";

import {
  Check,
  ChevronRight,
  Clipboard,
  Code,
  Copy,
  Eye,
  File,
  Folder,
  FolderOpen,
  Fullscreen,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { type RegistryItem } from "shadcn/schema";
import { BundledLanguage } from "shiki";

import { CodeBlock } from "@/components/code-block";
import { React as ReactLogo } from "@/components/logos/react";
import {
  DesktopBreakpointButton,
  MobileBreakpointButton,
  PreviewIframe,
  ReloadIframeButton,
  ResizablePreview,
  ResizablePreviewContainer,
  ResizablePreviewContent,
  ResizablePreviewHandle,
  ResizablePreviewProvider,
  TabletBreakpointButton,
} from "@/components/resizable-preview";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useIsMobile } from "@/hooks/use-mobile";
import { createFileTreeForRegistryItemFiles, FileTree } from "@/lib/registry";
import { cn } from "@/lib/utils";
import { RegistryItemFile } from "@/types/shadcn-patch";
import { getViewPathForItem } from "@/utils/registry/view";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type RegistryItemFileWithContent = RegistryItemFile & {
  content: string;
};

type DemoViewerContext = {
  item: RegistryItem;
  view: "code" | "preview";
  setView: React.Dispatch<React.SetStateAction<"code" | "preview">>;
  activeFile: string | null;
  setActiveFile: (file: string) => void;
  tree: ReturnType<typeof createFileTreeForRegistryItemFiles> | null;
  files: RegistryItemFileWithContent[] | null;
};

const DemoViewerContext = React.createContext<DemoViewerContext | null>(null);

function useDemoViewer() {
  const context = React.useContext(DemoViewerContext);
  if (!context) {
    throw new Error("useDemoViewer must be used within a DemoViewerProvider.");
  }
  return context;
}

type DemoViewerProviderProps = Pick<DemoViewerContext, "item" | "tree" | "files"> &
  React.ComponentProps<"div">;

function DemoViewerProvider({
  item,
  tree,
  files,
  children,
  className,
  ...props
}: DemoViewerProviderProps) {
  const [view, setView] = React.useState<DemoViewerContext["view"]>("preview");
  const [activeFile, setActiveFile] = React.useState<DemoViewerContext["activeFile"]>(
    files?.[0].target ?? null
  );

  return (
    <DemoViewerContext.Provider
      value={{
        item,
        view,
        setView,
        activeFile,
        setActiveFile,
        tree,
        files,
      }}
    >
      <div
        id={item.name}
        data-view={view}
        className={cn("group/demo-view-wrapper min-w-0 scroll-mt-24 overflow-hidden", className)}
        style={
          {
            "--height": item.meta?.iframeHeight ?? "800px",
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </DemoViewerContext.Provider>
  );
}

function DemoViewerToolbar() {
  const { setView, view, item } = useDemoViewer();
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const isMobile = useIsMobile();

  const url = getViewPathForItem(item);

  const handleTabChange = (value: string) => {
    setView(value as "preview" | "code");
  };

  return (
    <div className="flex w-full items-center gap-2">
      <Tabs value={view} onValueChange={handleTabChange} className="shrink-0">
        <TabsList className="flex h-8 items-center rounded-md p-1 *:data-[slot=tabs-trigger]:h-6 *:data-[slot=tabs-trigger]:rounded-sm *:data-[slot=tabs-trigger]:px-2 *:data-[slot=tabs-trigger]:text-xs">
          <TabsTrigger value="preview">
            <Eye className="size-3" />
            <span className="max-md:sr-only">Preview</span>
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code className="size-3" />
            <span className="max-md:sr-only">Code</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <ButtonGroup className="ml-auto">
        <ButtonGroup>
          <ReloadIframeButton />
          <Button variant="outline" size="icon-sm" asChild title="Open in New Tab">
            <Link href={url} target="_blank">
              <span className="sr-only">Open in New Tab</span>
              <Fullscreen />
            </Link>
          </Button>
        </ButtonGroup>

        {!isMobile && (
          <ButtonGroup>
            <MobileBreakpointButton />
            <TabletBreakpointButton />
            <DesktopBreakpointButton />
          </ButtonGroup>
        )}

        <ButtonGroup>
          <Button
            size="sm"
            className="border font-mono"
            onClick={() => {
              copyToClipboard(`npx shadcn@latest add @shadcraft/${item.name}`);
            }}
            title="Copy CLI Command"
          >
            {isCopied ? <Check /> : <Copy />}
            <span className="max-sm:hidden">{item.name}</span>
            <span className="sm:hidden">CLI Command</span>
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  );
}

function DemoViewerPreview() {
  const isMobile = useIsMobile();
  const { item } = useDemoViewer();
  const url = getViewPathForItem(item);

  return (
    <div className="size-full group-data-[view=code]/demo-view-wrapper:hidden">
      <ResizablePreview>
        <div className="relative grid size-full">
          <div className="absolute inset-1 right-2 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px] opacity-50" />

          <ResizablePreviewContainer className="bg-muted/25 isolate rounded-xl border md:p-1.5">
            <ResizablePreviewContent
              className={cn(
                "relative isolate size-full overflow-hidden rounded-[calc(var(--radius-xl)-4px)] shadow-md",
                "md:ring-border/50 md:ring-1"
              )}
            >
              <PreviewIframe
                src={url}
                height={item.meta?.iframeHeight ?? 800}
                className="bg-background no-scrollbar relative"
              />
            </ResizablePreviewContent>

            {!isMobile && <ResizablePreviewHandle />}
          </ResizablePreviewContainer>
        </div>
      </ResizablePreview>
    </div>
  );
}

function DemoViewerCode() {
  const { activeFile, files } = useDemoViewer();
  const file = React.useMemo(() => {
    return files?.find((file) => file.target === activeFile);
  }, [files, activeFile]);

  if (!file) {
    return null;
  }

  const language = file.path.split(".").pop() ?? "tsx";
  const FileIcon = language === "tsx" ? ReactLogo : File;

  return (
    <div className="isolate size-full group-data-[view=preview]/demo-view-wrapper:hidden">
      <div className="bg-code text-code-foreground relative size-full content-center overflow-hidden rounded-lg border text-center md:rounded-xl">
        <div className="flex size-full">
          <DemoViewerFileTreeSidebar />
          <figure className="m-0! flex size-full min-w-0 flex-col rounded-xl border-none">
            <figcaption
              className="flex h-12 shrink-0 items-center gap-2 border-b px-4 py-2"
              data-language={language}
            >
              <FileIcon className="text-muted-foreground size-3.5 shrink-0" />
              <span className="text-foreground line-clamp-1 font-mono text-sm">{file.target}</span>
              <div className="ml-auto flex items-center gap-2">
                <DemoCopyCodeButton />
              </div>
            </figcaption>

            <CodeBlock
              language={language as BundledLanguage}
              code={file?.content}
              showLineNumbers
              className="scrollbar-thin overflow-auto overscroll-contain rounded-none border-none text-left"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}

function DemoViewerFileTreeSidebar() {
  const { tree } = useDemoViewer();

  if (!tree || tree.length === 0) {
    return null;
  }

  return (
    <SidebarProvider className="flex min-h-full! w-72">
      <Sidebar collapsible="none" className="isolate border-r">
        <SidebarHeader className="flex h-12 flex-row items-center justify-between gap-2 border-b px-4 text-left">
          <span className="text-muted-foreground line-clamp-1 font-mono text-sm font-medium">
            Files
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="text-muted-foreground size-3.5" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[25ch] text-balance">
              The resulting files structure after running the CLI command.
            </TooltipContent>
          </Tooltip>
        </SidebarHeader>

        <SidebarContent className="gap-0">
          <SidebarGroup className="m-0 p-0">
            <SidebarGroupContent>
              <SidebarMenu className="translate-x-0 gap-1.5 font-mono">
                {tree.map((file, index) => (
                  <Tree key={index} item={file} index={1} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

function Tree({ item, index }: { item: FileTree; index: number }) {
  const { activeFile, setActiveFile } = useDemoViewer();

  if (!item.children) {
    const Icon = item.path?.endsWith(".tsx") ? ReactLogo : File;
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={item.path === activeFile}
          onClick={() => item.path && setActiveFile(item.path)}
          className="hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15 rounded-none pl-(--index) whitespace-nowrap"
          data-index={index}
          style={
            {
              "--index": `${index * (index === 1 ? 1 : 1)}rem`,
            } as React.CSSProperties
          }
        >
          <Icon className="ml-2" />
          <span className="line-clamp-1">{item.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=closed]>button>[data-slot=folder-open-icon]]:hidden [&[data-state=open]>button>[data-slot=folder-closed-icon]]:hidden [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className="hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15 rounded-none pl-(--index) whitespace-nowrap"
            style={
              {
                "--index": `${index * (index === 1 ? 1 : 1)}rem`,
              } as React.CSSProperties
            }
          >
            <ChevronRight className="transition-transform" />
            <Folder data-slot="folder-closed-icon" />
            <FolderOpen data-slot="folder-open-icon" />

            {item.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="m-0 w-full translate-x-0 border-none p-0">
            {item.children.map((subItem, key) => (
              <Tree key={key} item={subItem} index={index + 1} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

function DemoCopyCodeButton({
  children,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick">) {
  const { activeFile, item } = useDemoViewer();
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const file = React.useMemo(() => {
    return item.files?.find((file) => file.target === activeFile);
  }, [activeFile, item.files]);

  const content = file?.content;

  if (!content) {
    return null;
  }

  const Icon = isCopied ? Check : Clipboard;

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Copy code"
      title="Copy code"
      onClick={() => {
        copyToClipboard(content);
      }}
      {...props}
    >
      {children ?? <Icon className="animate-in zoom-in-50" />}
    </Button>
  );
}

function DemoViewer({
  item,
  tree,
  files,
  ...props
}: Pick<DemoViewerContext, "item" | "tree" | "files">) {
  return (
    <DemoViewerProvider item={item} tree={tree} files={files} {...props}>
      <ResizablePreviewProvider className="flex flex-col gap-2">
        <DemoViewerToolbar />

        <div className="isolate aspect-10/16 overflow-hidden md:aspect-4/5 lg:aspect-video">
          <DemoViewerPreview />
          <DemoViewerCode />
        </div>
      </ResizablePreviewProvider>
    </DemoViewerProvider>
  );
}

export { DemoViewer };
