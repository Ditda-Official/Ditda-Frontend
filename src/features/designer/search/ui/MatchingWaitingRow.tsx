"use client";

import { useRouter } from "next/navigation";

import { getDDay } from "@/features/designer/home";
import {
  DESIGNER_COMMISSION_CATEGORY_DISPLAY_MAP,
  type DesignerCommission,
} from "@/features/designer/search/api/searchTypes";
import Button from "@/shared/ui/Button";
import Tag from "@/shared/ui/Tag";

const formatAmount = (amount: number) => `${amount.toLocaleString("ko-KR")}원`;

const MatchingWaitingRow = ({ item }: { item: DesignerCommission }) => {
  const categoryLabel = DESIGNER_COMMISSION_CATEGORY_DISPLAY_MAP[item.category] ?? item.category;
  const router = useRouter();

  return (
    <div className="border-b-gray-10 hover:bg-gray-10 rounded-8 flex w-full cursor-pointer items-center justify-between border-b px-6 py-4 transition-colors duration-150">
      <div className="flex items-center gap-29">
        <div className="flex items-center gap-8">
          <Tag variant="gray" label={getDDay(item.applicationDeadline)} />
          <div className="flex w-103.25 items-center gap-1">
            <span className="text-body2-m text-gray-70 shrink-0">[{categoryLabel}]</span>
            <span className="text-heading3-m text-gray-80 min-w-0 flex-1 truncate">
              {item.title}
            </span>
          </div>
        </div>
        <div className="flex w-63 shrink-0 items-center gap-20">
          <p className="text-heading3-m text-gray-80 w-18">{formatAmount(item.baseAmount)}</p>
          <p className="text-heading3-sb text-gray-90 w-25">{formatAmount(item.maxAmount)}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center">
        <Button
          type="button"
          variant="small_secondary"
          className="w-fit whitespace-nowrap"
          onClick={() => router.push(`/designer/detail/${item.commissionId}`)}
        >
          확인하기
        </Button>
      </div>
    </div>
  );
};

export default MatchingWaitingRow;
