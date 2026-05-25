"use client";

import { useState } from "react";

import SizeRecommendedCard from "@/components/instructor/write/SizeRecommendedCard";
import { SIZE_OPTIONS } from "@/constants/sizeOptions";
import PaperSizeCard from "@/container/instructor/write/PaperSizeCard";

const SizeSection = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="rounded-12 focus-within:border-purple-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div>
        <h1 className="text-gray-90 text-heading1-sb pb-2">사이즈</h1>
        <h2 className="text-gray-70 text-body2-m">진행할 작업물의 사이즈를 선택해주세요</h2>
      </div>
      <div className="flex flex-row gap-4">
        <PaperSizeCard />
        <div className="grid h-fit grid-cols-2 gap-3">
          {SIZE_OPTIONS.map(option => (
            <SizeRecommendedCard
              key={option.id}
              size={option.size}
              dimensions={option.dimensions}
              description={option.description}
              isSelected={selectedId === option.id}
              onClick={() => setSelectedId(option.id)}
            >
              {option.recommended ? "추천 규격" : null}
            </SizeRecommendedCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SizeSection;
