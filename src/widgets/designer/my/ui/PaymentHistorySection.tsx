"use client";

import {
  type PaymentHistory,
  PaymentHistoryHeader,
  PaymentHistoryRow,
} from "@/features/designer/my";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import usePagination from "@/shared/lib/hooks/usePagination";
import PageIndicator from "@/shared/ui/PageIndicator";
import { PAYMENT_HISTORY_ITEMS_PER_PAGE } from "@/widgets/designer/my/config/my";

const paymentHistories: PaymentHistory[] = [
  {
    id: 1,
    category: "교재",
    title: "YMB 영어교재 표지디자인 외주",
    amountType: "기본금",
    amount: 40000,
  },
  {
    id: 2,
    category: "교재",
    title: "YMB 영어교재 표지디자인 외주",
    amountType: "최종금액",
    amount: 480000,
  },
  {
    id: 3,
    category: "교재",
    title: "YMB 영어교재 표지디자인 외주",
    amountType: "기본금",
    amount: 40000,
  },
  {
    id: 4,
    category: "교재",
    title: "YMB 영어교재 표지디자인 외주",
    amountType: "최종금액",
    amount: 320000,
  },
  {
    id: 5,
    category: "교재",
    title: "YMB 영어교재 표지디자인 외주",
    amountType: "기본금",
    amount: 50000,
  },
];

const PaymentHistorySection = () => {
  const { current, totalPages, pageItems, handlePrev, handleNext } = usePagination<PaymentHistory>(
    paymentHistories,
    PAYMENT_HISTORY_ITEMS_PER_PAGE,
  );

  return (
    <section className="rounded-12 flex h-109.25 w-full flex-col gap-6 bg-white p-6">
      <h2 className="text-heading1-sb text-black">지급 내역 확인</h2>
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex h-66.25 flex-col">
          <PaymentHistoryHeader />

          {pageItems.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-heading3-m text-gray-60">진행된 외주가 없습니다</p>
            </div>
          ) : (
            pageItems.map(history => <PaymentHistoryRow key={history.id} item={history} />)
          )}
        </div>

        {pageItems.length > 0 && (
          <div className="flex items-center justify-center gap-8">
            <PrevButton className="size-12 cursor-pointer" onClick={handlePrev} />
            <PageIndicator total={totalPages} current={current} variant="my" />
            <NextButton className="size-12 cursor-pointer" onClick={handleNext} />
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentHistorySection;
