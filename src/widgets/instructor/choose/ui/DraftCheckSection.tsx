"use client";

import { useState } from "react";

import { Draft, DraftCard } from "@/features/instructor/choose";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import { DRAFT_CARDS_PER_PAGE } from "@/widgets/instructor/choose/config/choose";

interface DraftCheckSectionProps {
  drafts: Draft[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const DraftCheckSection = ({ drafts, selectedIndex, onSelect }: DraftCheckSectionProps) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(drafts.length / DRAFT_CARDS_PER_PAGE);
  const visibleDrafts = drafts.slice(
    page * DRAFT_CARDS_PER_PAGE,
    page * DRAFT_CARDS_PER_PAGE + DRAFT_CARDS_PER_PAGE,
  );

  return (
    <div className="rounded-12 w-235 bg-white p-6">
      <h1 className="text-gray-90 text-heading1-sb pb-2">시안 확인</h1>
      <h2 className="text-gray-70 text-body2-m">
        제출된 시안을 확인하고 가장 마음에 드는 시안을 선택해주세요
      </h2>
      {totalPages > 1 && (
        <div className="flex flex-row justify-end gap-4 pb-4">
          <PrevButton
            className={`size-12 ${page > 0 ? "cursor-pointer" : "cursor-default opacity-30"}`}
            onClick={() => setPage(p => Math.max(0, p - 1))}
          />
          <NextButton
            className={`size-12 ${page < totalPages - 1 ? "cursor-pointer" : "cursor-default opacity-30"}`}
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          />
        </div>
      )}
      <div className="grid grid-cols-3 gap-6 pb-8">
        {visibleDrafts.map((draft, i) => {
          const globalIndex = page * DRAFT_CARDS_PER_PAGE + i;
          return (
            <DraftCard
              key={draft.draftId}
              index={globalIndex}
              draftId={draft.draftId}
              thumbnailUrl={draft.thumbnailUrl}
              isSelected={selectedIndex === globalIndex}
              onSelect={onSelect}
            />
          );
        })}
      </div>
      <button className="text-gray-60 text-caption1-m cursor-pointer underline underline-offset-2">
        부적절한 시안이 있으신가요?
      </button>
    </div>
  );
};

export default DraftCheckSection;
