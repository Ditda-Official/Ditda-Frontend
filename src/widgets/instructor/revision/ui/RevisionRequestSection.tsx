"use client";

import { CheckboxFillIcon, CheckboxWhiteIcon } from "@/shared/assets/icons";
import Thumbnail from "@/shared/ui/Thumbnail";
import { REVISION_CATEGORIES } from "@/widgets/instructor/revision/config/revision";

interface RevisionRequestSectionProps {
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
}

const RevisionRequestSection = ({
  selectedCategories,
  onToggleCategory,
}: RevisionRequestSectionProps) => {
  return (
    <div className="rounded-12 w-235 bg-white p-6">
      <div className="flex flex-col gap-10.5">
        <div className="flex flex-col gap-2">
          <h1 className="text-heading1-sb text-gray-90">
            수정 요청하기 <span className="text-gray-70">(</span>
            <span className="text-green-main">3</span>
            <span className="text-gray-70">/3)</span>
          </h1>
          <p className="text-gray-70 text-body2-m">시안 수정은 총 3회 수정이 가능합니다.</p>
        </div>
        <div className="flex flex-row gap-2">
          <Thumbnail />
          <div className="flex flex-1 flex-col gap-6 p-6">
            <div>
              <p className="text-gray-90 text-heading3-m pb-2">
                수정하고 싶은 카테고리를 골라주세요
              </p>
              <p className="text-gray-70 text-caption1-m">1회 수정에 최대 2개까지 가능합니다.</p>
            </div>
            <hr className="text-gray-20" />
            <div className="flex flex-row justify-between">
              {REVISION_CATEGORIES.map(category => {
                const isSelected = selectedCategories.includes(category);
                const CheckboxIcon = isSelected ? CheckboxFillIcon : CheckboxWhiteIcon;
                return (
                  <div
                    key={category}
                    className="flex flex-row gap-2"
                    onClick={() => onToggleCategory(category)}
                  >
                    <CheckboxIcon className="size-6 cursor-pointer" />
                    <p className="text-gray-90 text-body1-m">{category}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevisionRequestSection;
