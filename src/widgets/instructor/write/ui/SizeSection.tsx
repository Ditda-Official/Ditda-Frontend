"use client";

import { useShallow } from "zustand/react/shallow";

import {
  PaperSizeCard,
  SIZE_OPTIONS,
  SizeRecommendedCard,
  useWriteFormStore,
} from "@/features/instructor/write";

const SizeSection = () => {
  const { selectedCategory, selectedSize, setSelectedSize } = useWriteFormStore(
    useShallow(s => ({
      selectedCategory: s.selectedCategory,
      selectedSize: s.selectedSize,
      setSelectedSize: s.setSelectedSize,
    })),
  );

  const selectedSizeLabel = selectedSize
    ? SIZE_OPTIONS.find(option => option.id === selectedSize)?.size
    : null;

  return (
    <div className="rounded-12 focus-within:border-gray-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div>
        <div className="flex flex-row items-center justify-between pb-2">
          <h1 className="text-gray-90 text-heading1-sb">사이즈</h1>
          {selectedSizeLabel && (
            <div className="rounded-4 bg-purple-10 flex h-7 items-center px-2">
              <span className="text-body2-m text-gray-90">{selectedSizeLabel}</span>
            </div>
          )}
        </div>
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
