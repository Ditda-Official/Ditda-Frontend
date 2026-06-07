"use client";

import {
  commissionHistoryData,
  CommissionsHeader,
  CommissionsHistoryRow,
} from "@/features/instructor/my";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import usePagination from "@/shared/lib/hooks/usePagination";
import PageIndicator from "@/shared/ui/PageIndicator";
import { COMMISSION_HISTORY_ITEMS_PER_PAGE } from "@/widgets/instructor/my/config/my";

const CommissionsHistorySection = () => {
  const { current, totalPages, pageItems, handlePrev, handleNext } = usePagination(
    commissionHistoryData,
    COMMISSION_HISTORY_ITEMS_PER_PAGE,
  );

  return (
    <div className="rounded-12 flex h-auto w-212.75 flex-col gap-6 bg-white p-6">
      <h1 className="text-heading1-sb text-black">외주 내역 확인</h1>
      <div className="flex h-66.25 flex-col">
        <CommissionsHeader />
        {pageItems.map(item => (
          <CommissionsHistoryRow key={item.commissionId} item={item} />
        ))}
      </div>
      <div className="flex flex-row items-center justify-center gap-8">
        <PrevButton className="size-12 cursor-pointer" onClick={handlePrev} />
        <PageIndicator total={totalPages} current={current} variant="my" />
        <NextButton className="size-12 cursor-pointer" onClick={handleNext} />
      </div>
    </div>
  );
};

export default CommissionsHistorySection;
