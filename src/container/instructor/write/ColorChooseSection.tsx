"use client";

import { useState } from "react";

import Toggle from "@/components/common/Toggle";

type ColorMode = "designer" | "custom";

const ColorChooseSection = () => {
  const [colorMode, setColorMode] = useState<ColorMode>("custom");
  return (
    <div className="rounded-12 focus-within:border-purple-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-90 text-heading1-sb">색상 선택</h1>
          <h2 className="text-gray-70 text-body2-m">작업물의 컬러 3가지를 선택해주세요</h2>
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
      {colorMode === "designer" && (
        <h3 className="text-body2-sb text-gray-60">
          디자이너가 외주 시작 후, 자유롭게 색상을 선택하여 디자인하게 됩니다.
        </h3>
      )}
    </div>
  );
};

export default ColorChooseSection;
