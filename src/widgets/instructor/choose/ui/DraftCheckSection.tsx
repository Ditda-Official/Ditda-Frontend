"use client";

import { useState } from "react";

import { Draft, DraftCard } from "@/features/instructor/choose";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import { DRAFT_CARDS_PER_PAGE } from "@/widgets/instructor/choose/config/choose";

interface DraftCheckSectionProps {
  commissionId: string | number;
  drafts: Draft[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const DraftCheckSection = ({
  commissionId,
  drafts,
  selectedIndex,
  onSelect,
}: DraftCheckSectionProps) => {
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
      <div className="flex flex-row justify-end gap-4 pb-4">
        <button
          type="button"
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        >
          <PrevButton className="hover:fill-gray-5 size-12 transition-colors" />
        </button>
        <button
          type="button"
          onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        >
          <NextButton className="hover:fill-gray-5 size-12 transition-colors" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6 pb-8">
        {visibleDrafts.map((draft, i) => {
          const globalIndex = page * DRAFT_CARDS_PER_PAGE + i;
          return (
            <DraftCard
              key={draft.draftId}
              index={globalIndex}
              commissionId={commissionId}
              draftId={draft.draftId}
              thumbnailUrl={draft.thumbnailUrl}
              isSelected={selectedIndex === globalIndex}
              onSelect={onSelect}
            />
          );
        })}
      </div>
      <a
        href="https://forms.gle/SahSfZWVywkGXRs76"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-60 text-caption1-m cursor-pointer underline underline-offset-2"
      >
        부적절한 시안이 있으신가요?
      </a>
    </div>
  );
};

export default DraftCheckSection;
