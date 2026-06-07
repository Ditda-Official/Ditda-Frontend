"use client";

import { ITEM_GAP, LIST_H, PAD_BOTTOM, PAD_TOP } from "@/shared/config/dropdown";
import { useWheelColumn } from "@/shared/lib/hooks/useWheelColumn";
import { cn } from "@/shared/lib/utils/cn";

interface WheelColumnProps {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  itemClassName?: string;
}

const WheelColumn = ({ items, selectedIndex, onSelect, itemClassName = "" }: WheelColumnProps) => {
  const { scrollRef, handleScroll, handleWheel } = useWheelColumn({
    items,
    selectedIndex,
    onSelect,
  });

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      onWheel={handleWheel}
      style={{ height: LIST_H, scrollPaddingTop: PAD_TOP }}
      className="[scroll-snap-type:y_mandatory] scrollbar-none overflow-y-auto overscroll-y-contain [&::-webkit-scrollbar]:hidden"
    >
      <div aria-hidden="true" style={{ height: PAD_TOP }} />
      <div>
        {items.map((label, index) => (
          <div
            key={`${label}-${index}`}
            style={{
              marginBottom: index === items.length - 1 ? 0 : ITEM_GAP,
            }}
            className={cn(
              "flex snap-start snap-always items-center justify-end",
              index === selectedIndex ? "h-9.5" : "h-5.5",
            )}
          >
            <p
              className={cn(
                "text-heading3-m leading-none whitespace-nowrap transition-colors duration-200 ease-out",
                index === selectedIndex ? "text-gray-90" : "text-gray-50",
                itemClassName,
              )}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
      <div aria-hidden="true" style={{ height: PAD_BOTTOM }} />
    </div>
  );
};

export default WheelColumn;
