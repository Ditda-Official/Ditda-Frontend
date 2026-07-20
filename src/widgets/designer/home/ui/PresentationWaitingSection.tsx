"use client";

import {
  CommissionsHeader,
  type PresentationWaitingItem,
  PresentationWaitingRow,
} from "@/features/designer/home";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import usePagination from "@/shared/lib/hooks/usePagination";
import PageIndicator from "@/shared/ui/PageIndicator";
import { MATCHING_ITEMS_PER_PAGE } from "@/widgets/designer/home/config/home";

const PresentationWaitingSection = ({ items }: { items: PresentationWaitingItem[] }) => {
  const { current, totalPages, pageItems, handlePrev, handleNext } =
    usePagination<PresentationWaitingItem>(items, MATCHING_ITEMS_PER_PAGE);

  return (
    <section className="rounded-12 w-full bg-white px-6 pt-6 pb-4">
      <div className="flex flex-col gap-8">
        <h2 className="text-heading1-sb text-black">
          발표 <span className="text-main-main">대기란</span>
        </h2>

        <div className="flex flex-col gap-5">
          <div>
            <CommissionsHeader rightLabel="결과" rightClassName="w-14.5">
              <p className="w-11">디데이</p>
              <p>외주명</p>
            </CommissionsHeader>

            <div className="h-45">
              {pageItems.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <span className="text-heading3-m text-gray-60">
                    발표 대기 중인 외주가 없습니다
                  </span>
                </div>
              ) : (
                pageItems.map(item => (
                  <PresentationWaitingRow key={item.commissionId} item={item} />
                ))
              )}
            </div>
          </div>

          {pageItems.length > 0 && (
            <div className="flex items-center justify-between">
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
    </section>
  );
};

export default PresentationWaitingSection;
