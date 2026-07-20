"use client";

import { useEffect, useRef, useState } from "react";

import type { CommissionHistoryItem } from "@/features/instructor/my";
import { CommissionsHeader, CommissionsHistoryRow } from "@/features/instructor/my";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import PageIndicator from "@/shared/ui/PageIndicator";
import { getCommissions } from "@/widgets/instructor/my/api/my";
import type { GetCommissionsResult } from "@/widgets/instructor/my/api/myTypes";

const CommissionsHistorySection = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<CommissionHistoryItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const pageCache = useRef(new Map<number, GetCommissionsResult>());

  useEffect(() => {
    const cached = pageCache.current.get(page);
    if (cached) {
      setItems(cached.items);
      setTotalPages(cached.totalPages);
      return;
    }

    getCommissions(page).then(result => {
      pageCache.current.set(page, result);
      setItems(result.items);
      setTotalPages(result.totalPages);
    });
  }, [page]);

  const handlePrev = () => setPage(prev => Math.max(0, prev - 1));
  const handleNext = () => setPage(prev => Math.min(totalPages - 1, prev + 1));

  return (
    <div className="rounded-12 flex h-auto w-275 flex-col gap-6 bg-white p-6">
      <h1 className="text-heading1-sb text-black">외주 내역 확인</h1>
      <div className="flex h-66.25 flex-col">
        <CommissionsHeader />
        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-heading3-m text-gray-60">진행된 외주가 없습니다</p>
          </div>
        ) : (
          <>
            {items.map(item => (
              <CommissionsHistoryRow key={item.commissionId} item={item} />
            ))}
          </>
        )}
      </div>
      {totalPages > 0 && (
        <div className="flex flex-row items-center justify-center gap-8">
          <button
            type="button"
            onClick={handlePrev}
            disabled={page === 0}
            className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          >
            <PrevButton className="hover:fill-gray-5 size-12 transition-colors" />
          </button>
          <PageIndicator total={totalPages} current={page} variant="my" />
          <button
            type="button"
            onClick={handleNext}
            disabled={page === totalPages - 1}
            className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          >
            <NextButton className="hover:fill-gray-5 size-12 transition-colors" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CommissionsHistorySection;
