"use client";

import { useEffect, useRef, useState } from "react";

import {
  ColorChooseCard,
  ColorPicker,
  type RgbaColor,
  useWriteFormStore,
} from "@/features/instructor/write";
import { cn } from "@/shared/lib/utils/cn";
import Toggle from "@/shared/ui/Toggle";

const ColorChooseSection = () => {
  const { colorMode, setColorMode, colors, setColors, mainColorIndex, setMainColorIndex } =
    useWriteFormStore();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isFocused, setIsFocused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        if (colors.every(c => c !== null)) {
          setActiveIndex(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [colors]);

  const handleCardClick = (i: number) => {
    setActiveIndex(i);
    setIsFocused(true);
  };

  const handleColorChange = (index: number, color: RgbaColor) => {
    setColors(colors.map((c, i) => (i === index ? color : c)));
  };

  return (
    <div
      ref={sectionRef}
      className={cn(
        "rounded-12 flex flex-col gap-8 border bg-white p-6",
        isFocused ? "border-purple-40" : "border-transparent",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-90 text-heading1-sb">색상 선택</h1>
          <h2 className="text-gray-70 text-body2-m">
            {colorMode === "designer"
              ? "디자이너에게 색상을 맡겨보세요"
              : "작업물의 컬러 3가지를 선택해주세요"}
          </h2>
        </div>
        <Toggle
          options={[
            { value: "designer", label: "디자이너가 지정" },
            { value: "custom", label: "직접 색상 지정" },
          ]}
          value={colorMode}
          onChange={setColorMode}
        />
      </div>
      {colorMode === "designer" ? (
        <h3 className="text-body2-sb text-gray-60">
          디자이너가 외주 시작 후, 자유롭게 색상을 선택하여 디자인하게 됩니다.
        </h3>
      ) : (
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-2">
            {colors.map((color, i) => (
              <ColorChooseCard
                key={i}
                color={color}
                index={i + 1}
                isMain={mainColorIndex === i}
                isSelected={activeIndex === i}
                onCardClick={() => handleCardClick(i)}
                onRadioChange={() => setMainColorIndex(i)}
                onColorChange={c => handleColorChange(i, c)}
              />
            ))}
          </div>
          <ColorPicker
            value={activeIndex !== null ? (colors[activeIndex] ?? undefined) : undefined}
            onChange={c => activeIndex !== null && handleColorChange(activeIndex, c)}
          />
        </div>
      )}
    </div>
  );
};

export default ColorChooseSection;
