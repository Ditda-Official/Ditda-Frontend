"use client";

import type { RefObject } from "react";

import { useDragScrollbar } from "@/shared/lib/hooks/useDragScrollbar";
import { cn } from "@/shared/lib/utils/cn";

interface DragScrollbarProps {
  scrollRef: RefObject<HTMLElement | null>;
  className?: string;
}

const DragScrollbar = ({ scrollRef, className }: DragScrollbarProps) => {
  const { trackRef, progress, handleTrackMouseDown } = useDragScrollbar({ scrollRef });
  const percent = `${progress * 100}%`;

  return (
    <div className={cn("flex h-12 items-center", className)}>
      <div
        ref={trackRef}
        className="bg-purple-10 relative h-2 w-full cursor-pointer"
        onMouseDown={e => handleTrackMouseDown(e.clientX)}
      >
        <div className="bg-purple-30 absolute inset-y-0 left-0" style={{ width: percent }} />
        <div
          className="rounded-48 border-main-main absolute top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 cursor-grab border-4 bg-white active:cursor-grabbing"
          style={{ left: percent }}
        />
      </div>
    </div>
  );
};

export default DragScrollbar;
