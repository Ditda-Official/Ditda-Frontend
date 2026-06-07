"use client";

import {
  CommissionsHeader,
  draftSubmissionStatusData,
  DraftSubmissionStatusRow,
} from "@/features/instructor/home";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import PageIndicator from "@/shared/ui/PageIndicator";
import { DRAFT_SUBMISSION_ITEMS_PER_PAGE } from "@/widgets/instructor/home/config/home";
import usePagination from "@/widgets/instructor/home/lib/usePagination";

const DraftSubmissionStatusSection = () => {
  const { current, totalPages, pageItems, handlePrev, handleNext } = usePagination(
    draftSubmissionStatusData,
    DRAFT_SUBMISSION_ITEMS_PER_PAGE,
  );

  return (
    <div className="rounded-12 h-94.5 w-full bg-white px-6 pt-6 pb-4">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-8">
          <span className="text-heading1-sb text-black">
            <span className="text-main-main">시안 제출</span> 현황
          </span>
          <div>
            <CommissionsHeader rightLabel="시안 제출자 수" rightClassName="w-53">
              <p className="w-11">디데이</p>
              <p className="w-20">카테고리</p>
              <p className="flex-1">외주명</p>
            </CommissionsHeader>
            {pageItems.map(item => (
              <DraftSubmissionStatusRow key={item.commissionId} item={item} />
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <PrevButton className="size-12 cursor-pointer" onClick={handlePrev} />
          <PageIndicator total={totalPages} current={current} />
          <NextButton className="size-12 cursor-pointer" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default DraftSubmissionStatusSection;
