"use client";

import { useEffect, useState } from "react";

import {
  type PaymentHistory,
  PaymentHistoryHeader,
  PaymentHistoryRow,
} from "@/features/designer/my";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import PageIndicator from "@/shared/ui/PageIndicator";
import { getSettlements } from "@/widgets/designer/my/api/my";

const PaymentHistorySection = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<PaymentHistory[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getSettlements(page).then(result => {
      setItems(result.items);
      setTotalPages(result.totalPages);
    });
  }, [page]);

  const handlePrev = () => setPage(prev => Math.max(0, prev - 1));
  const handleNext = () => setPage(prev => Math.min(totalPages - 1, prev + 1));

  return (
    <section className="rounded-12 flex h-109.25 w-full flex-col gap-6 bg-white p-6">
      <h2 className="text-heading1-sb text-black">지급 내역 확인</h2>
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex h-66.25 flex-col">
          <PaymentHistoryHeader />

          {items.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-heading3-m text-gray-60">진행된 외주가 없습니다</p>
            </div>
          ) : (
            items.map(history => <PaymentHistoryRow key={history.commissionId} item={history} />)
          )}
        </div>

        {totalPages > 0 && (
          <div className="flex items-center justify-center gap-8">
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
    </section>
  );
};

export default PaymentHistorySection;
