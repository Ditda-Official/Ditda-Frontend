"use client";

import { useState } from "react";
import { RgbaColorPicker } from "react-colorful";

import type { RgbaColor } from "@/lib/utils/color";
import { clamp, hexToRgb, toHex } from "@/lib/utils/color";

interface ColorPickerProps {
  value?: RgbaColor;
  onChange?: (color: RgbaColor) => void;
}

const inputBase =
  "w-full rounded-4 border border-gray-30 bg-gray-10 px-2 py-1.5 text-center text-body2-m text-gray-90 outline-none focus:border-purple-40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [internal, setInternal] = useState<RgbaColor>({ r: 0, g: 0, b: 0, a: 100 });

  const color = value ?? internal;
  const setColor = (next: RgbaColor) => {
    setInternal(next);
    onChange?.(next);
  };

  const hex = toHex(color);

  const handleHexChange = (raw: string) => {
    const cleaned = raw.startsWith("#") ? raw : `#${raw}`;
    if (cleaned.length === 7) {
      const rgb = hexToRgb(cleaned);
      if (rgb) setColor({ ...rgb, a: color.a });
    }
  };

  const handleChannel = (key: keyof RgbaColor, raw: string) => {
    const num = parseInt(raw, 10);
    if (isNaN(num)) return;
    const max = key === "a" ? 100 : 255;
    setColor({ ...color, [key]: clamp(num, 0, max) });
  };

  return (
    <div className="rounded-12 flex w-79.25 flex-col gap-3 border border-black p-4">
      <RgbaColorPicker
        className="h-60! w-full!"
        color={{ ...color, a: color.a / 100 }}
        onChange={c => setColor({ ...c, a: Math.round(c.a * 100) })}
      />
      <div className="flex gap-1.5">
        {/* Hex */}
        <div className="flex min-w-0 flex-[1.5] flex-col items-center gap-1">
          <input
            className={inputBase}
            defaultValue={hex.replace("#", "")}
            key={hex}
            maxLength={6}
            onBlur={e => handleHexChange(e.target.value)}
            onKeyDown={e =>
              e.key === "Enter" && handleHexChange((e.target as HTMLInputElement).value)
            }
          />
          <span className="text-body2-m text-gray-50">Hex</span>
        </div>
        {/* R, G, B, A */}
        {(["r", "g", "b", "a"] as const).map(ch => (
          <div key={ch} className="flex min-w-0 flex-1 flex-col items-center gap-1">
            <input
              className={inputBase}
              max={ch === "a" ? 100 : 255}
              min={0}
              onChange={e => handleChannel(ch, e.target.value)}
              type="number"
              value={color[ch]}
            />
            <span className="text-body2-m text-gray-50">{ch.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
