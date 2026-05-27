"use client";

import { useState } from "react";

import Radio from "@/components/common/Radio";
import { cn } from "@/lib/utils/cn";
import type { RgbaColor } from "@/lib/utils/color";
import { clamp, hexToRgb, toHex } from "@/lib/utils/color";

type ColorChooseCardProps = {
  index: number;
  isMain: boolean;
  isSelected: boolean;
  color: RgbaColor | null;
  onRadioChange: () => void;
  onCardClick: () => void;
  onColorChange: (color: RgbaColor) => void;
};

const DEFAULT_COLOR: RgbaColor = { r: 0, g: 0, b: 0, a: 100 };

const ColorChooseCard = ({
  index,
  isMain,
  isSelected,
  color,
  onRadioChange,
  onCardClick,
  onColorChange,
}: ColorChooseCardProps) => {
  const hasColor = color !== null;
  const hex = hasColor ? toHex(color) : null;

  // Hex 입력 중에만 쓰는 임시 draft
  const [hexDraft, setHexDraft] = useState<string | null>(null);

  const channelMap = hasColor ? { R: color.r, G: color.g, B: color.b, A: color.a } : null;

  const handleChannelChange = (ch: "R" | "G" | "B" | "A", raw: string) => {
    const num = parseInt(raw, 10);
    if (isNaN(num)) return;
    const base = color ?? DEFAULT_COLOR;
    const max = ch === "A" ? 100 : 255;
    onColorChange({ ...base, [ch.toLowerCase()]: clamp(num, 0, max) });
  };

  const handleHexCommit = () => {
    if (hexDraft === null) return;
    const rgb = hexToRgb(hexDraft);
    if (rgb) {
      onColorChange({ ...rgb, a: color?.a ?? 100 });
    }
    setHexDraft(null);
  };

  return (
    <div
      className={cn(
        "rounded-12 relative flex w-138 cursor-pointer items-center border bg-white py-3 pr-4 pl-4 transition-colors duration-150",
        isSelected ? "border-main-main" : "border-gray-30",
      )}
      onClick={onCardClick}
    >
      <div className="relative" onClick={e => e.stopPropagation()}>
        <Radio checked={isMain} name="main-color" value={String(index)} onChange={onRadioChange} />
        {isMain && (
          <span className="text-caption2-m text-main-main absolute top-full left-1/2 -translate-x-1/2 pt-0.5 whitespace-nowrap">
            Main
          </span>
        )}
      </div>
      <div
        className={cn(
          "rounded-8 ml-7 size-19.5",
          !hasColor && "border-gray-40 bg-gray-10 border border-dashed",
        )}
        style={
          hasColor
            ? { backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 100})` }
            : undefined
        }
      />
      <div className="ml-3 flex flex-1 flex-col gap-2">
        <span className="text-caption1-m text-right text-gray-50">Color {index}</span>
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-2">
            {(["R", "G", "B", "A"] as const).map(ch => (
              <div key={ch} className="flex flex-col items-center">
                <span className="text-body1-m text-gray-60">{ch}</span>
                <input
                  type="number"
                  min={0}
                  max={ch === "A" ? 100 : 255}
                  value={channelMap?.[ch] ?? ""}
                  onFocus={onCardClick}
                  onClick={e => e.stopPropagation()}
                  onChange={e => handleChannelChange(ch, e.target.value)}
                  className="rounded-4 text-body1-m border-gray-20 text-gray-80 flex h-7 w-10 [appearance:textfield] items-center justify-center border text-center outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>
            ))}
          </div>
          <input
            type="text"
            value={hexDraft ?? hex ?? ""}
            onFocus={e => {
              onCardClick();
              setHexDraft(e.target.value);
            }}
            onClick={e => e.stopPropagation()}
            onChange={e => setHexDraft(e.target.value)}
            onBlur={handleHexCommit}
            className="rounded-4 text-body1-m border-gray-20 text-gray-80 flex h-8 w-19.5 items-center justify-center border text-center outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorChooseCard;
