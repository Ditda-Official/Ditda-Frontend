"use client";

import { useEffect, useRef, useState } from "react";
import { RgbaColorPicker } from "react-colorful";

import type { RgbaColor } from "@/features/instructor/write/lib/color";
import { clamp, hexToRgb, toHex } from "@/features/instructor/write/lib/color";

interface ColorPickerProps {
  value?: RgbaColor;
  onChange?: (color: RgbaColor) => void;
}

const inputBase =
  "w-full rounded-4 border border-gray-30 bg-gray-10 px-2 py-1.5 text-center text-body2-m text-gray-90 outline-none focus:border-purple-40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [internal, setInternal] = useState<RgbaColor>({ r: 0, g: 0, b: 0, a: 100 });
  // react-colorful은 color prop이 외부에서 바뀌면(예: 다른 카드로 전환) 내부 HSV
  // 변환을 다시 계산하면서 실제 포인터 조작 없이도 onChange를 스스로 여러 번 호출한다.
  // 이 자동 보정 호출까지 커밋하면 사용자가 고르지 않은 카드에 값이 채워지므로,
  // 그라디언트/슬라이더를 실제로 누르고 있는 동안에만 onChange를 반영한다.
  const isPointerDownRef = useRef(false);

  useEffect(() => {
    const handlePointerUp = () => {
      isPointerDownRef.current = false;
    };
    document.addEventListener("pointerup", handlePointerUp);
    return () => document.removeEventListener("pointerup", handlePointerUp);
  }, []);

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
    <div className="rounded-12 border-gray-30 flex w-79.25 flex-col gap-3 border p-4">
      <div
        onPointerDownCapture={() => {
          isPointerDownRef.current = true;
        }}
      >
        <RgbaColorPicker
          className="h-60! w-full!"
          color={{ ...color, a: color.a / 100 }}
          onChange={c => {
            if (!isPointerDownRef.current) return;
            setColor({ ...c, a: Math.round(c.a * 100) });
          }}
        />
      </div>
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
