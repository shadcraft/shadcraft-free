"use client";

/**
 * ResizablePreview - A composable, uncontrolled preview component for previewing responsive content.
 *
 * Provides breakpoint controls (mobile: 375px, tablet: 768px, desktop: 100%) and drag-to-resize functionality.
 * Components can be composed freely under the provider, with the handle and controls placed anywhere.
 */
import { Monitor, RefreshCcw, Smartphone, Tablet } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { useResizableWidth } from "@/hooks/use-resizable-width";
import { cn } from "@/lib/utils";

type ViewportBreakpoint = "desktop" | "tablet" | "mobile";

interface ResizablePreviewContextValue {
  width: string;
  setWidth: (width: string) => void;
  setBreakpoint: (breakpoint: ViewportBreakpoint) => void;
  breakpoint: ViewportBreakpoint | null;
  minWidthPx: number;
  isDragging: boolean;
  boundaryRef: React.RefObject<HTMLDivElement | null>;
  resizableContainerRef: React.RefObject<HTMLDivElement | null>;
  handlePointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  handlePointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  handlePointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  iframeKey: number;
  reloadIframe: () => void;
}

const ResizablePreviewContext = React.createContext<ResizablePreviewContextValue | null>(
  null
);

function useResizablePreview() {
  const context = React.useContext(ResizablePreviewContext);
  if (!context) {
    throw new Error("useResizablePreview must be used within a ResizablePreview");
  }
  return context;
}

interface ResizablePreviewProviderProps extends React.ComponentProps<"div"> {
  defaultWidth?: string;
  onWidthChange?: (width: string) => void;
  minWidthPx?: number;
  defaultBreakpoint?: ViewportBreakpoint;
}

function ResizablePreviewProvider({
  children,
  defaultWidth = "100%",
  onWidthChange,
  minWidthPx = 325,
  className,
  defaultBreakpoint = "desktop",
  ...props
}: ResizablePreviewProviderProps) {
  const [width, setWidthState] = React.useState(defaultWidth);
  const [breakpoint, setBreakpointState] = React.useState<ViewportBreakpoint | null>(
    defaultBreakpoint
  );
  const isMobileDevice = useIsMobile();
  const [iframeKey, setIframeKey] = React.useState(0);

  const reloadIframe = React.useCallback(() => {
    setIframeKey((prev) => prev + 1);
  }, []);

  React.useEffect(() => {
    if (isMobileDevice) {
      setWidthState("100%");
      onWidthChange?.("100%");
    }
  }, [isMobileDevice, onWidthChange]);

  const handleWidthChangeFromHook = React.useCallback(
    (px: number) => {
      const newWidth = `${px}px`;
      setWidthState(newWidth);
      setBreakpointState(null);
      onWidthChange?.(newWidth);
    },
    [onWidthChange]
  );

  const {
    isDragging,
    boundaryRef,
    resizableContainerRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useResizableWidth({
    minWidthPx,
    onWidthChange: handleWidthChangeFromHook,
  });

  const setWidth = React.useCallback(
    (newWidth: string) => {
      setWidthState(newWidth);
      onWidthChange?.(newWidth);
    },
    [onWidthChange]
  );

  const setBreakpoint = React.useCallback(
    (bp: ViewportBreakpoint) => {
      let newWidth = "100%";
      if (bp === "tablet") newWidth = "768px";
      if (bp === "mobile") newWidth = "375px";

      setWidthState(newWidth);
      setBreakpointState(bp);
      onWidthChange?.(newWidth);
    },
    [onWidthChange]
  );

  const contextValue: ResizablePreviewContextValue = React.useMemo(
    () => ({
      width,
      setWidth,
      breakpoint,
      setBreakpoint,
      minWidthPx,
      isDragging,
      boundaryRef,
      resizableContainerRef,
      handlePointerDown,
      handlePointerMove,
      handlePointerUp,
      iframeKey,
      reloadIframe,
    }),
    [
      width,
      setWidth,
      breakpoint,
      setBreakpoint,
      minWidthPx,
      isDragging,
      boundaryRef,
      resizableContainerRef,
      handlePointerDown,
      handlePointerMove,
      handlePointerUp,
      iframeKey,
      reloadIframe,
    ]
  );

  return (
    <ResizablePreviewContext.Provider value={contextValue}>
      <div
        data-slot="resizable-preview-wrapper"
        className={cn("group/resizable-preview-wrapper size-full", className)}
        {...props}
      >
        {children}
      </div>
    </ResizablePreviewContext.Provider>
  );
}

function ResizablePreview({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="resizable-preview"
      className={cn("group/resizable-preview flex h-full min-w-0 flex-col", className)}
      {...props}
    />
  );
}

function ResizablePreviewContainer({
  children,
  className,
  style,
  animate = true,
  ...props
}: React.ComponentProps<"div"> & {
  animate?: boolean;
}) {
  const { width, minWidthPx, isDragging, boundaryRef, resizableContainerRef } =
    useResizablePreview();

  return (
    <div
      ref={boundaryRef}
      data-slot="resizable-preview-container"
      className={cn(
        "relative flex size-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        ref={resizableContainerRef}
        className={cn(
          "relative h-full max-w-full",
          animate && !isDragging && "transition-all duration-150",
          isDragging && "transition-none!"
        )}
        style={{ width, minWidth: minWidthPx, ...style }}
      >
        {children}
      </div>
    </div>
  );
}

function ResizablePreviewContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="resizable-preview-content"
      className={cn("size-full overflow-hidden", className)}
      {...props}
    />
  );
}

function ResizablePreviewHandle({ className, ...props }: React.ComponentProps<"div">) {
  const {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    setWidth,
    width,
    resizableContainerRef,
    boundaryRef,
    minWidthPx,
  } = useResizablePreview();

  const animationFrameRef = React.useRef<number | null>(null);

  const handleDoubleClick = React.useCallback(() => {
    setWidth("100%");
  }, [setWidth]);

  // Left and Right arrow keys to resize; R to reset to 100%
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        setWidth("100%");
        return;
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();

        // Throttle updates to animation frame to prevent lag
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          // Get current pixel width
          let currentWidthPx: number;
          if (width.endsWith("px")) {
            currentWidthPx = parseFloat(width) || minWidthPx;
          } else {
            // If it's a percentage, get the actual pixel width from the DOM
            const container = resizableContainerRef.current;
            if (container) {
              currentWidthPx = container.getBoundingClientRect().width;
            } else {
              currentWidthPx = minWidthPx;
            }
          }

          // Calculate max width for ArrowRight clamping
          let maxWidthPx = Number.MAX_SAFE_INTEGER;
          if (e.key === "ArrowRight") {
            const boundary =
              boundaryRef.current ?? resizableContainerRef.current?.parentElement;
            if (boundary) {
              const styles = window.getComputedStyle(boundary);
              const paddingLeft = parseFloat(styles.paddingLeft) || 0;
              const paddingRight = parseFloat(styles.paddingRight) || 0;
              const borderLeft = parseFloat(styles.borderLeftWidth) || 0;
              const borderRight = parseFloat(styles.borderRightWidth) || 0;
              maxWidthPx =
                boundary.offsetWidth -
                paddingLeft -
                paddingRight -
                borderLeft -
                borderRight;
            }
          }

          const step = 16;
          const newWidthPx = Math.min(
            maxWidthPx,
            e.key === "ArrowLeft"
              ? Math.max(minWidthPx, currentWidthPx - step)
              : currentWidthPx + step
          );

          setWidth(`${newWidthPx}px`);
        });
      }
    },
    [setWidth, width, resizableContainerRef, boundaryRef, minWidthPx]
  );

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize preview"
      tabIndex={0}
      onDoubleClick={handleDoubleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      className={cn(
        "absolute inset-y-0 right-0 z-30 flex h-full w-2 translate-x-full cursor-col-resize touch-none items-center justify-center bg-transparent outline-none select-none",
        "cursor-col-resize after:absolute after:h-10 after:w-1 after:rounded-full after:bg-border after:transition-all hover:after:bg-muted-foreground active:after:h-14 active:after:w-0.75 active:after:bg-muted-foreground",
        "focus-visible:after:h-14 focus-visible:after:w-0.75 focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50 focus-visible:after:outline-ring",
        className
      )}
      {...props}
    />
  );
}

function PreviewIframe({ className, ...props }: React.ComponentProps<"iframe">) {
  const { iframeKey } = useResizablePreview();

  return (
    <iframe
      data-slot="preview-iframe"
      key={iframeKey}
      className={cn("size-full", className)}
      sandbox="allow-scripts allow-same-origin"
      loading="lazy"
      {...props}
    />
  );
}

function ReloadIframeButton({ onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { reloadIframe } = useResizablePreview();

  return (
    <Button
      data-slot="reload-iframe-button"
      variant="outline"
      size="icon-sm"
      title="Reload Preview"
      aria-label="Reload Preview"
      onClick={(e) => {
        reloadIframe();
        onClick?.(e);
      }}
      {...props}
    >
      <RefreshCcw />
    </Button>
  );
}

function DesktopBreakpointButton({
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { breakpoint, setBreakpoint } = useResizablePreview();
  const isActive = breakpoint === "desktop";

  return (
    <Button
      data-slot="desktop-breakpoint-button"
      variant="outline"
      size="icon-sm"
      onClick={(e) => {
        setBreakpoint("desktop");
        onClick?.(e);
      }}
      title="Desktop"
      aria-label="Desktop breakpoint"
      aria-pressed={isActive}
      {...props}
    >
      <Monitor />
    </Button>
  );
}

function TabletBreakpointButton({
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { breakpoint, setBreakpoint } = useResizablePreview();
  const isActive = breakpoint === "tablet";

  return (
    <Button
      data-slot="tablet-breakpoint-button"
      variant="outline"
      size="icon-sm"
      onClick={(e) => {
        setBreakpoint("tablet");
        onClick?.(e);
      }}
      title="Tablet"
      aria-label="Tablet breakpoint"
      aria-pressed={isActive}
      {...props}
    >
      <Tablet />
    </Button>
  );
}

function MobileBreakpointButton({
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { breakpoint, setBreakpoint } = useResizablePreview();
  const isActive = breakpoint === "mobile";

  return (
    <Button
      data-slot="mobile-breakpoint-button"
      variant="outline"
      size="icon-sm"
      onClick={(e) => {
        setBreakpoint("mobile");
        onClick?.(e);
      }}
      title="Mobile"
      aria-label="Mobile breakpoint"
      aria-pressed={isActive}
      {...props}
    >
      <Smartphone />
    </Button>
  );
}

function ResizablePreviewBreakpointControls({
  ...props
}: React.ComponentProps<typeof ButtonGroup>) {
  return (
    <ButtonGroup data-slot="resizable-preview-controls" {...props}>
      <DesktopBreakpointButton variant="secondary" className="border" />
      <TabletBreakpointButton variant="secondary" className="border" />
      <MobileBreakpointButton variant="secondary" className="border" />
    </ButtonGroup>
  );
}

export {
  DesktopBreakpointButton,
  MobileBreakpointButton,
  PreviewIframe,
  ReloadIframeButton,
  ResizablePreview,
  ResizablePreviewBreakpointControls,
  ResizablePreviewContainer,
  ResizablePreviewContent,
  ResizablePreviewHandle,
  ResizablePreviewProvider,
  TabletBreakpointButton,
  useResizablePreview,
};
