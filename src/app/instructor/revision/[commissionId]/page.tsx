"use client";

import { useState } from "react";

import Button from "@/shared/ui/Button";
import { RevisionRequestSection } from "@/widgets/instructor/revision";
import { MAX_SELECTABLE_COUNT } from "@/widgets/instructor/revision/config/revision";

const Page = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleToggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(selected => selected !== category);
      }
      if (prev.length >= MAX_SELECTABLE_COUNT) {
        return prev;
      }
      return [...prev, category];
    });
  };

  return (
    <div className="mx-auto flex w-235 flex-col items-center pt-16">
      <h1 className="text-title2-sb w-full py-4 pb-8 text-left text-black">YBM 영어 교재</h1>
      <div className="flex flex-col gap-10">
        <RevisionRequestSection
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
        />
        <div className="flex w-full flex-row justify-end gap-4">
          <Button
            className="w-fit"
            variant={selectedCategories.length > 0 ? "medium_disabled" : "medium_primary"}
          >
            최종 시안으로 선택하기
          </Button>
          <Button
            className="w-fit"
            variant={selectedCategories.length > 0 ? "medium_primary" : "medium_disabled"}
          >
            수정사항 전달하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
