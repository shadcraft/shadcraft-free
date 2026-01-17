"use client";

import * as React from "react";

type UseResizableWidthOptions = {
  minWidthPx: number;
  onWidthChange: (widthPx: number) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useResizableWidth({
  minWidthPx,
  onWidthChange,
}: UseResizableWidthOptions) {
  const [isDragging, setIsDragging] = React.useState(false);

  // Optional: Attach to define a specific boundary container
  // If not attached, falls back to the resizable container's parent element
  const boundaryRef = React.useRef<HTMLDivElement>(null);

  // Required: Attach to the element that will be resized
  const resizableContainerRef = React.useRef<HTMLDivElement>(null);

  const dragStartX = React.useRef(0);
  const dragStartWidth = React.useRef(0);
  const maxAvailableWidth = React.useRef(Number.MAX_SAFE_INTEGER);

  const calculateMaxWidth = React.useCallback(() => {
    if (!resizableContainerRef.current) return minWidthPx;

    // Use boundaryRef if attached, otherwise fall back to the parent element
    const boundary = boundaryRef.current ?? resizableContainerRef.current.parentElement;
    if (!boundary) return Number.MAX_SAFE_INTEGER;

    const styles = window.getComputedStyle(boundary);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const borderLeft = parseFloat(styles.borderLeftWidth) || 0;
    const borderRight = parseFloat(styles.borderRightWidth) || 0;

    // offsetWidth = content + padding + borders
    // Subtract borders and padding to get the actual content area where the child fits
    const availableWidth =
      boundary.offsetWidth - paddingLeft - paddingRight - borderLeft - borderRight;

    return availableWidth;
  }, [minWidthPx]);

  const getCurrentWidth = React.useCallback(() => {
    return resizableContainerRef.current?.getBoundingClientRect().width ?? minWidthPx;
  }, [minWidthPx]);

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;

      setIsDragging(true);
      dragStartX.current = e.clientX;
      dragStartWidth.current = getCurrentWidth();
      maxAvailableWidth.current = calculateMaxWidth();
      document.body.style.userSelect = "none";

      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
    },
    [getCurrentWidth, calculateMaxWidth]
  );

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStartX.current;
      const newWidth = clamp(
        dragStartWidth.current + deltaX,
        minWidthPx,
        maxAvailableWidth.current
      );

      onWidthChange(Math.round(newWidth));
    },
    [isDragging, minWidthPx, onWidthChange]
  );

  const handlePointerUp = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      setIsDragging(false);
      document.body.style.userSelect = "";

      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    },
    [isDragging]
  );

  return {
    isDragging,
    boundaryRef,
    resizableContainerRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } as const;
}
