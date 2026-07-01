"use client";

import { ArrowRightIcon, NextButton, PrevButton } from "@/shared/assets/icons";
import usePagination from "@/shared/lib/hooks/usePagination";
import Badge from "@/shared/ui/Badge";
import PageIndicator from "@/shared/ui/PageIndicator";

type PaymentHistory = {
  id: number;
  category: "교재";
  title: string;
  amountType: "기본금" | "최종금액";
  amount: number;
};

const PAYMENT_HISTORY_ITEMS_PER_PAGE = 3;

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

const formatPrice = (amount: number) => `${amount.toLocaleString()}원`;

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
          <div className="border-b-gray-20 flex items-center justify-between border-b px-3 py-2">
            <p className="text-caption1-r text-gray-70">외주</p>
            <div className="flex items-center gap-16">
              <p className="text-caption1-r text-gray-70 w-14">금액 종류</p>
              <p className="text-caption1-r text-gray-70 w-25">금액</p>
            </div>
          </div>

          {pageItems.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-heading3-m text-gray-60">진행된 외주가 없습니다</p>
            </div>
          ) : (
            pageItems.map(history => (
              <div
                key={history.id}
                className="border-b-gray-20 flex h-19.25 items-center justify-between border-b px-3 py-5"
              >
                <div className="flex items-center gap-6">
                  <Badge variant={history.category} />
                  <div className="text-gray-90 flex items-center gap-1">
                    <p className="text-heading3-m truncate">{history.title}</p>
                    <ArrowRightIcon className="size-6 shrink-0 cursor-pointer" />
                  </div>
                </div>
                <div className="flex items-center gap-16">
                  <p className="text-heading3-m text-gray-70 w-14">{history.amountType}</p>
                  <p className="text-heading2-m text-gray-90 w-25">{formatPrice(history.amount)}</p>
                </div>
              </div>
            ))
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
