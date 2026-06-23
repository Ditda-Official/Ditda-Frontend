"use client";

import { useState } from "react";

import { CheckboxFillIcon, CheckboxWhiteIcon } from "@/shared/assets/icons";
import { cn } from "@/shared/lib/utils/cn";
import CommentCard from "@/shared/ui/CommentCard";
import DraftModal from "@/shared/ui/modal/DraftModal";
import Thumbnail from "@/shared/ui/Thumbnail";
import { REVISION_CATEGORIES } from "@/widgets/instructor/revision/config/revision";

interface RevisionCategorySectionProps {
  draftTitle: string;
  designerComment?: string;
  remainingRevisionCount: number;
  maxRevisionCount: number;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  fileUrls: string[];
}

const RevisionCategorySection = ({
  draftTitle,
  designerComment,
  remainingRevisionCount,
  maxRevisionCount,
  selectedCategories,
  onToggleCategory,
  fileUrls,
}: RevisionCategorySectionProps) => {
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);

  const titleSection = (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-heading1-sb text-gray-90">
          수정 요청하기 <span className="text-gray-70">(</span>
          <span className="text-green-main">{remainingRevisionCount}</span>
          <span className="text-gray-70">/{maxRevisionCount})</span>
        </h1>
        {remainingRevisionCount === 0 && (
          <a
            href="https://forms.gle/exFTiZJ8Fp8UUNij6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-80 text-body2-m cursor-pointer underline underline-offset-2"
          >
            수정 횟수를 추가하시겠어요?
          </a>
        )}
      </div>
      <p className="text-gray-70 text-body2-m">시안 수정은 총 3회 수정이 가능합니다.</p>
    </div>
  );

  const categoryCheckboxes = (
    <div className="flex flex-row justify-between">
      {REVISION_CATEGORIES.map(category => {
        const isSelected = selectedCategories.includes(category);
        const CheckboxIcon = isSelected ? CheckboxFillIcon : CheckboxWhiteIcon;
        return (
          <div
            key={category}
            className={cn(
              "flex flex-row gap-2",
              remainingRevisionCount === 0 ? "cursor-not-allowed" : "cursor-pointer",
            )}
            onClick={() => {
              if (remainingRevisionCount === 0) return;
              onToggleCategory(category);
            }}
          >
            <CheckboxIcon className="size-6" />
            <p className="text-gray-90 text-body1-m">{category}</p>
          </div>
        );
      })}
    </div>
  );

  if (designerComment) {
    return (
      <>
        <div className="rounded-12 w-235 bg-white p-6">
          <div className="flex flex-col">
            <div className="flex flex-row gap-10 py-3">
              <Thumbnail
                className="h-68.25 w-62.5"
                onDetailClick={() => setIsDraftModalOpen(true)}
              />
              <div className="flex flex-1 flex-col justify-between">
                {titleSection}
                <CommentCard title="디자이너 코멘트" comment={designerComment} />
              </div>
            </div>
            <div className="flex flex-col gap-6 px-2 py-6">
              <div>
                <p className="text-gray-90 text-heading2-sb pb-2">
                  수정하고 싶은 카테고리를 골라주세요
                </p>
                <p className="text-gray-70 text-body2-m">1회 수정에 최대 2개까지 가능합니다.</p>
              </div>
              <hr className="text-gray-20" />
              {categoryCheckboxes}
            </div>
          </div>
        </div>
        <DraftModal
          isOpen={isDraftModalOpen}
          onClose={() => setIsDraftModalOpen(false)}
          title={draftTitle}
          fileUrls={fileUrls}
        />
      </>
    );
  }

  return (
    <>
      <div className="rounded-12 w-235 bg-white p-6">
        <div className="flex flex-col gap-10.5">
          {titleSection}
          <div className="flex flex-row gap-2">
            <Thumbnail className="h-63.75 w-62.5" onDetailClick={() => setIsDraftModalOpen(true)} />
            <div className="flex flex-1 flex-col gap-6 p-6">
              <div>
                <p className="text-gray-90 text-heading3-m pb-2">
                  수정하고 싶은 카테고리를 골라주세요
                </p>
                <p className="text-gray-70 text-caption1-m">1회 수정에 최대 2개까지 가능합니다.</p>
              </div>
              <hr className="text-gray-20" />
              {categoryCheckboxes}
            </div>
          </div>
        </div>
      </div>
      <DraftModal
        isOpen={isDraftModalOpen}
        onClose={() => setIsDraftModalOpen(false)}
        title={draftTitle}
        fileUrls={fileUrls}
      />
    </>
  );
};

export default RevisionCategorySection;
