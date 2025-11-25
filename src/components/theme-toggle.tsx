"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { META_THEME_COLORS, useMetaColor } from "@/hooks/use-meta-colors";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const { setMetaColor } = useMetaColor();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setMetaColor(resolvedTheme === "dark" ? META_THEME_COLORS.light : META_THEME_COLORS.dark);
  }, [resolvedTheme, setTheme, setMetaColor]);

  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={cn("", className)}
          title="Toggle theme"
          {...props}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 3l0 18" />
            <path d="M12 9l4.65 -4.65" />
            <path d="M12 14.3l7.37 -7.37" />
            <path d="M12 19.6l8.85 -8.85" />
          </svg>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </ContextMenuTrigger>

      <ContextMenuContent className="*:data-[active=true]:bg-accent *:data-[active=true]:text-accent-foreground space-y-1">
        <ContextMenuItem
          data-active={theme === "light"}
          onClick={() => setTheme("light")}
          className="cursor-pointer"
        >
          <Sun /> Light
        </ContextMenuItem>
        <ContextMenuItem
          data-active={theme === "dark"}
          onClick={() => setTheme("dark")}
          className="cursor-pointer"
        >
          <Moon />
          Dark
        </ContextMenuItem>
        <ContextMenuItem
          data-active={theme === "system"}
          onClick={() => setTheme("system")}
          className="cursor-pointer"
        >
          <Monitor /> System
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
