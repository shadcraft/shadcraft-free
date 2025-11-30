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
  Menu,
  MoreHorizontal,
  X,
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
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useIsMobile } from "@/hooks/use-mobile";
import { createFileTreeForRegistryItemFiles, FileTree } from "@/lib/registry";
import { cn } from "@/lib/utils";
import { RegistryItemFile } from "@/types/shadcn-patch";
import { getViewPathForItem } from "@/utils/registry/view";

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
  const isMobile = useIsMobile();

  const url = getViewPathForItem(item);

  const handleTabChange = (value: string) => {
    setView(value as "preview" | "code");
  };

  const forceTabSwitchToPreview = () => {
    if (view === "preview") return;
    setView("preview");
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
          <ReloadIframeButton onClick={forceTabSwitchToPreview} />
          <Button variant="outline" size="icon-sm" asChild title="Open in New Tab">
            <Link href={url} target="_blank">
              <span className="sr-only">Open in New Tab</span>
              <Fullscreen />
            </Link>
          </Button>
        </ButtonGroup>

        {!isMobile && (
          <ButtonGroup>
            <MobileBreakpointButton onClick={forceTabSwitchToPreview} />
            <TabletBreakpointButton onClick={forceTabSwitchToPreview} />
            <DesktopBreakpointButton onClick={forceTabSwitchToPreview} />
          </ButtonGroup>
        )}

        <CopyCLICommand />
      </ButtonGroup>
    </div>
  );
}

function CopyCLICommand() {
  const { item } = useDemoViewer();
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const handleCopyCommand = (type: "url" | "namespace") => {
    const commandPrefix = `npx shadcn@latest add`;
    if (type === "url") {
      copyToClipboard(`${commandPrefix} https://shadcraft-free.vercel.app/r/${item.name}.json`);
    } else if (type === "namespace") {
      copyToClipboard(`${commandPrefix} @shadcraft/${item.name}`);
    }
  };

  return (
    <ButtonGroup className="">
      <Button
        size="sm"
        className="font-mono"
        onClick={() => handleCopyCommand("namespace")}
        title="Copy CLI Command"
      >
        {isCopied ? <Check /> : <Copy />}
        <span className="max-sm:hidden">{item.name}</span>
        <span className="sm:hidden">CLI Command</span>
      </Button>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon-sm" title="Copy options">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleCopyCommand("url")} className="cursor-pointer">
            <Copy className="size-4" />
            URL
            <span className="text-muted-foreground ml-auto pl-4 font-mono text-xs">
              /r/{item.name}.json
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleCopyCommand("namespace")}
            className="cursor-pointer"
          >
            <Copy className="size-4" />
            Namespace
            <span className="text-muted-foreground ml-auto pl-4 font-mono text-xs">
              @shadcraft/{item.name}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}

function DemoViewerPreview() {
  const isMobile = useIsMobile();
  const { item } = useDemoViewer();
  const url = getViewPathForItem(item);

  return (
    <div className="size-full group-data-[view=code]/demo-view-wrapper:hidden">
      <div className="bg-muted/25 relative size-full rounded-xl border">
        <ResizablePreview>
          <div className="absolute inset-1 right-2 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px] opacity-50" />

          <ResizablePreviewContainer className="md:p-1.5">
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
        </ResizablePreview>
      </div>
    </div>
  );
}

function DemoViewerCode() {
  const { activeFile, files } = useDemoViewer();
  const file = React.useMemo(() => {
    return files?.find((file) => file.target === activeFile);
  }, [files, activeFile]);

  const { tree } = useDemoViewer();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  if (!file) {
    return null;
  }

  const language = file.path.split(".").pop() ?? "tsx";
  const FileIcon = language === "tsx" ? ReactLogo : File;

  return (
    <div className="isolate size-full group-data-[view=preview]/demo-view-wrapper:hidden">
      <div className="relative size-full overflow-hidden rounded-xl border">
        <SidebarProvider
          className="size-full min-h-min"
          style={{ "--sidebar-width-icon": 0 } as React.CSSProperties}
        >
          {/* Sidebar that shows the file tree on screen larger than md */}
          <DemoViewerFileTreeSidebar className="group-data-[state=collapsed]:border-none" />

          <SidebarInset className="overflow-hidden">
            <figure className="bg-background grid size-full min-w-0 grid-rows-[auto_1fr]">
              <div className="flex flex-col border-b">
                <figcaption
                  className="flex h-12 shrink-0 items-center gap-2 px-4 py-2"
                  data-language={language}
                >
                  {/* File tree triggers, mobile and desktop showing in different breakpoints */}
                  {!!tree && (
                    <>
                      {/* Shows in screens smaller than lg */}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="size-7 lg:hidden"
                        onClick={toggleMenu}
                        title={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                      >
                        {isMenuOpen ? (
                          <X className="animate-in zoom-in-50" />
                        ) : (
                          <Menu className="animate-in zoom-in-50" />
                        )}
                      </Button>

                      {/* Shows in screens larger than lg */}
                      <SidebarTrigger
                        title="Toggle Sidebar"
                        aria-label="Toggle Sidebar"
                        className="max-lg:hidden"
                      />
                    </>
                  )}

                  <FileIcon className="text-muted-foreground size-3.5 shrink-0" />
                  <span className="text-foreground line-clamp-1 text-left font-mono text-sm">
                    {file.target}
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <DemoCopyCodeButton className="size-7" />
                  </div>
                </figcaption>

                {/* Mobile menu that shows the file tree on screen smaller than md */}
                <DemoViewerFileTreeMobileMenu isMenuOpen={isMenuOpen} />
              </div>

              <CodeBlock
                language={language as BundledLanguage}
                code={file?.content}
                showLineNumbers
                className="scrollbar-thin overflow-auto overscroll-contain rounded-none border-none text-left"
              />
            </figure>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
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

function DemoViewerFileTreeSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const { tree } = useDemoViewer();

  if (!tree || tree.length === 0) {
    return null;
  }

  return (
    <Sidebar
      collapsible="icon"
      className={cn("bg-sidebar relative isolate m-0 h-full p-0 max-lg:hidden", className)}
      {...props}
    >
      <div className="relative overflow-hidden border-b text-left group-data-[state=collapsed]:hidden">
        <div className="flex h-12 w-full shrink-0 items-center justify-between gap-2 px-4 py-2">
          <span className="text-sidebar-foreground line-clamp-1 font-mono text-sm">Files</span>

          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="text-muted-foreground size-3.5" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[25ch] text-center text-balance">
              The resulting files structure after running the CLI command.
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <SidebarContent className="group-data-[state=collapsed]:hidden">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <DemoViewerFileTree tree={tree} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

function DemoViewerFileTreeMobileMenu({ isMenuOpen }: { isMenuOpen: boolean }) {
  const { tree } = useDemoViewer();

  if (!tree || tree.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid transition-all ease-in-out lg:hidden",
        isMenuOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
      )}
    >
      <div className="overflow-hidden" inert={!isMenuOpen || undefined} aria-hidden={!isMenuOpen}>
        <div className="pb-2">
          <DemoViewerFileTree tree={tree} />
        </div>
      </div>
    </div>
  );
}

function DemoViewerFileTree({ tree }: { tree: FileTree[] }) {
  return (
    <SidebarMenu className="font-mono">
      {tree.map((file, index) => (
        <Tree key={index} item={file} index={1} />
      ))}
    </SidebarMenu>
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
          className="focus-visible:bg-sidebar-accent focus:bg-sidebar-accent data-[active=true]:bg-muted-foreground/15 group text-sidebar-foreground/80 relative gap-2 rounded-none pl-(--index) whitespace-nowrap transition-all"
          data-index={index}
          style={
            {
              "--index": `${index * 0.875}rem`,
            } as React.CSSProperties
          }
        >
          <Icon className="ml-2 size-3.5! text-inherit" />
          <span className="line-clamp-1">{item.name}</span>
          <div
            className="bg-primary pointer-events-none absolute inset-y-0 left-0 h-full w-[2px] opacity-0 group-data-[active=true]:opacity-50"
            aria-hidden="true"
          />
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
            className="focus-visible:bg-sidebar-accent focus:bg-sidebar-accent text-sidebar-foreground/80 gap-2 rounded-none pl-(--index) whitespace-nowrap transition-all"
            style={
              {
                "--index": `${index * 0.875}rem`,
              } as React.CSSProperties
            }
          >
            <ChevronRight className="size-3.5! transition-transform" />
            <Folder data-slot="folder-closed-icon" className="size-3.5!" />
            <FolderOpen data-slot="folder-open-icon" className="size-3.5!" />
            <span className="line-clamp-1">{item.name}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="m-0 w-full translate-x-0 gap-0 border-none p-0">
            {item.children.map((subItem, key) => (
              <Tree key={key} item={subItem} index={index + 1} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
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
