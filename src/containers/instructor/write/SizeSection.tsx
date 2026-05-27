"use client";

import PaperSizeCard from "@/components/instructor/write/PaperSizeCard";
import SizeRecommendedCard from "@/components/instructor/write/SizeRecommendedCard";
import { SIZE_OPTIONS } from "@/constants/write";
import { useWriteForm } from "@/context/WriteFormContext";

const SizeSection = () => {
  const { selectedCategory, selectedSize, setSelectedSize } = useWriteForm();

  return (
    <div className="rounded-12 focus-within:border-purple-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div>
        <h1 className="text-gray-90 text-heading1-sb pb-2">사이즈</h1>
        {selectedCategory && (
          <h2 className="text-gray-70 text-body2-m">진행할 작업물의 사이즈를 선택해주세요</h2>
        )}
      </div>
      {selectedCategory ? (
        <div className="flex flex-row justify-between">
          <PaperSizeCard />
          <div className="grid h-fit grid-cols-2 gap-3">
            {SIZE_OPTIONS.map(option => (
              <SizeRecommendedCard
                key={option.id}
                size={option.size}
                dimensions={option.dimensions}
                description={option.description}
                isSelected={selectedSize === option.id}
                onClick={() => setSelectedSize(option.id)}
              >
                {option.recommended ? "추천 규격" : null}
              </SizeRecommendedCard>
            ))}
          </div>
        </div>
      ) : (
        <span className="text-body1-sb text-gray-60">카테고리를 우선 선택해주세요</span>
      )}
    </div>
  );
};

export default SizeSection;
