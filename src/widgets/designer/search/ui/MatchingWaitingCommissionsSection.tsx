"use client";

import { useEffect, useState } from "react";

import { MatchingWaitingHeader, MatchingWaitingRow } from "@/features/designer/search";
import { getDesignerCommissions } from "@/features/designer/search/api/search";
import type { DesignerCommission } from "@/features/designer/search/api/searchTypes";
import { getApiErrorMessage } from "@/shared/api/client";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import PageIndicator from "@/shared/ui/PageIndicator";
import { MATCHING_WAITING_ITEMS_PER_PAGE } from "@/widgets/designer/search/config/search";

const MatchingWaitingCommissionsSection = () => {
  const [current, setCurrent] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageItems, setPageItems] = useState<DesignerCommission[]>([]);
  const [statusMessage, setStatusMessage] = useState("불러오는 중입니다");

  useEffect(() => {
    let isMounted = true;

    getDesignerCommissions(current, MATCHING_WAITING_ITEMS_PER_PAGE)
      .then(result => {
        if (!isMounted) return;

        setPageItems(result.items);
        setTotalPages(result.totalPages);
        setStatusMessage("등록된 외주가 없습니다");
      })
      .catch(async error => {
        const message = (await getApiErrorMessage(error)) || "외주 목록을 불러오지 못했습니다";

        if (!isMounted) return;

        setPageItems([]);
        setTotalPages(0);
        setStatusMessage(message);
      });

    return () => {
      isMounted = false;
    };
  }, [current]);

  const handlePrev = () => setCurrent(prev => Math.max(0, prev - 1));
  const handleNext = () => setCurrent(prev => Math.min(totalPages - 1, prev + 1));

  return (
    <div className="mx-auto flex w-275 flex-col items-start gap-10 pt-10 pb-14">
      <h1 className="text-title2-sb w-full text-left text-black">매칭 대기 외주 목록</h1>
      <section className="flex w-full flex-col items-center gap-6">
        <div className="rounded-12 text-caption1-r text-gray-70 w-full bg-white pt-6">
          <MatchingWaitingHeader />
          <div className="flex flex-col">
            {pageItems.length === 0 ? (
              <div className="flex h-204 items-center justify-center">
                <span className="text-heading3-m text-gray-60">{statusMessage}</span>
              </div>
            ) : (
              pageItems.map(item => <MatchingWaitingRow key={item.commissionId} item={item} />)
            )}
          </div>
        </div>
        {pageItems.length > 0 && (
          <div className="flex items-center justify-center gap-8">
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
      </section>
    </div>
  );
};

export default MatchingWaitingCommissionsSection;
