"use client";

import { DraftCard } from "@/features/instructor/choose";
import { NextButton, PrevButton } from "@/shared/assets/icons";

interface DraftCheckSectionProps {
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const DraftCheckSection = ({ selectedIndex, onSelect }: DraftCheckSectionProps) => {
  return (
    <div className="rounded-12 w-full bg-white p-6">
      <h1 className="text-gray-90 text-heading1-sb pb-2">시안 확인</h1>
      <h2 className="text-gray-70 text-body2-m">
        제출된 시안을 확인하고 가장 마음에 드는 시안을 선택해주세요
      </h2>
      <div className="flex flex-row justify-end gap-4 pb-4">
        <PrevButton className="size-12 cursor-pointer" />
        <NextButton className="size-12 cursor-pointer" />
      </div>
      <div className="flex flex-row gap-6 pb-8">
        {[0, 1, 2].map(i => (
          <DraftCard key={i} index={i} isSelected={selectedIndex === i} onSelect={onSelect} />
        ))}
      </div>
      <button className="text-gray-60 text-caption1-m cursor-pointer underline underline-offset-2">
        부적절한 시안이 있으신가요?
      </button>
    </div>
  );
};

export default DraftCheckSection;
