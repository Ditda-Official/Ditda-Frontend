"use client";

import {
  CommissionsHeader,
  type DraftSubmissionItem,
  DraftSubmissionScheduleRow,
} from "@/features/designer/home";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import usePagination from "@/shared/lib/hooks/usePagination";
import PageIndicator from "@/shared/ui/PageIndicator";
import { DRAFT_SUBMISSION_ITEMS_PER_PAGE } from "@/widgets/designer/home/config/home";

const DraftSubmissionScheduleSection = ({ items }: { items: DraftSubmissionItem[] }) => {
  const { current, totalPages, pageItems, handlePrev, handleNext } =
    usePagination<DraftSubmissionItem>(items, DRAFT_SUBMISSION_ITEMS_PER_PAGE);

  return (
    <section className="rounded-12 flex h-94.5 w-full flex-col bg-white px-6 pt-6 pb-4">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-8">
          <h2 className="text-heading1-sb text-black">
            <span className="text-main-main">시안 제출</span> 예정 외주
          </h2>

          <div>
            <CommissionsHeader
              className="items-center"
              leftClassName="flex items-center gap-6"
              rightContent={
                <div className="flex w-96.5 items-center justify-between">
                  <div className="flex items-center gap-14">
                    <p className="w-32">제출마감 일자</p>
                    <p className="w-20">최대 수령액</p>
                  </div>
                  <div className="w-25" />
                </div>
              }
            >
              <p className="w-11">디데이</p>
              <p className="w-20">카테고리</p>
              <p>외주명</p>
            </CommissionsHeader>

            {pageItems.map(item => (
              <DraftSubmissionScheduleRow key={item.commissionId} item={item} />
            ))}
          </div>
        </div>

        {pageItems.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <span className="text-heading3-m text-gray-60">시안 제출 예정인 외주가 없습니다</span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <PrevButton className="size-12 cursor-pointer" onClick={handlePrev} />
            <PageIndicator total={totalPages} current={current} />
            <NextButton className="size-12 cursor-pointer" onClick={handleNext} />
          </div>
        )}
      </div>
    </section>
  );
};

export default DraftSubmissionScheduleSection;
