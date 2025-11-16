"use client";

import { Check, Monitor, Moon, MoonIcon, Sun, SunIcon } from "lucide-react";
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
          {...props}
        >
          <SunIcon className="hidden dark:block" />
          <MoonIcon className="block dark:hidden" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </ContextMenuTrigger>

      <ContextMenuContent alignOffset={50}>
        <ContextMenuItem onClick={() => setTheme("light")}>
          <Sun /> Light {theme === "light" && <Check className="ml-auto" />}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => setTheme("dark")}>
          <Moon />
          Dark
          {theme === "dark" && <Check className="ml-auto" />}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => setTheme("system")}>
          <Monitor /> System
          {theme === "system" && <Check className="ml-auto" />}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
