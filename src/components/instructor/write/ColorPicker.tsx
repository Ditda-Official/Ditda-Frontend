"use client";

import { useState } from "react";
import { RgbaColorPicker } from "react-colorful";

interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

const toHex = ({ r, g, b }: RgbaColor) =>
  "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0").toUpperCase()).join("");

const hexToRgb = (hex: string): Pick<RgbaColor, "r" | "g" | "b"> | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));

interface ColorPickerProps {
  value?: RgbaColor;
  onChange?: (color: RgbaColor) => void;
}

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

  const inputBase =
    "w-full rounded-md border border-gray-30 bg-gray-10 px-2 py-1.5 text-center text-body2-m text-gray-90 outline-none focus:border-purple-40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

  return (
    <div className="rounded-12 flex w-79.25 flex-col gap-3 border border-black p-4">
      <RgbaColorPicker
        color={{ ...color, a: color.a / 100 }}
        onChange={c => setColor({ ...c, a: Math.round(c.a * 100) })}
        style={{ width: "100%", height: "240px" }}
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
