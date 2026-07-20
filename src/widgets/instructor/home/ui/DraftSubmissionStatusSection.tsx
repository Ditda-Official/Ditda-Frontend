"use client";

import { useEffect, useState } from "react";

import {
  CommissionsHeader,
  type DraftSubmissionItem,
  DraftSubmissionStatusRow,
  getDraftSubmissions,
} from "@/features/instructor/home";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import usePagination from "@/shared/lib/hooks/usePagination";
import PageIndicator from "@/shared/ui/PageIndicator";
import { DRAFT_SUBMISSION_ITEMS_PER_PAGE } from "@/widgets/instructor/home/config/home";

const DraftSubmissionStatusSection = () => {
  const [items, setItems] = useState<DraftSubmissionItem[]>([]);

  useEffect(() => {
    getDraftSubmissions().then(setItems);
  }, []);

  const { current, totalPages, pageItems, handlePrev, handleNext } =
    usePagination<DraftSubmissionItem>(items, DRAFT_SUBMISSION_ITEMS_PER_PAGE);

  return (
    <div className="rounded-12 h-94.5 w-full bg-white px-6 pt-6 pb-4">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-8">
          <span className="text-heading1-sb text-black">
            <span className="text-main-main">시안 제출</span> 현황
          </span>
          <div>
            <CommissionsHeader rightLabel="시안 제출자 수" rightClassName="w-85.75">
              <p className="w-11">디데이</p>
              <p className="w-20">카테고리</p>
              <p className="flex-1">외주명</p>
            </CommissionsHeader>
            {pageItems.map(item => (
              <DraftSubmissionStatusRow key={item.commissionId} item={item} />
            ))}
          </div>
        </div>
        {pageItems.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <span className="text-heading3-m text-gray-60">제출된 시안이 없습니다</span>
          </div>
        ) : (
          <div className="flex flex-row justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={current === 0}
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
              <PrevButton className="hover:fill-gray-5 size-12 transition-colors" />
            </button>
            <PageIndicator total={totalPages} current={current} />
            <button
              type="button"
              onClick={handleNext}
              disabled={current === totalPages - 1}
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
              <NextButton className="hover:fill-gray-5 size-12 transition-colors" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DraftSubmissionStatusSection;
