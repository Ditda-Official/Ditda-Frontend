"use client";

import { useRouter } from "next/navigation";

import {
  CATEGORY_DISPLAY_MAP,
  type DraftSubmissionItem,
} from "@/features/designer/home/api/homeTypes";
import { formatSubmitDeadline, getDDay } from "@/features/designer/home/lib/getDDay";
import { ArrowRightIcon } from "@/shared/assets/icons";
import Button from "@/shared/ui/Button";
import Tag from "@/shared/ui/Tag";

const formatAmount = (amount?: number | null) =>
  amount == null ? "-" : `${amount.toLocaleString("ko-KR")}원`;

const DraftSubmissionScheduleRow = ({ item }: { item: DraftSubmissionItem }) => {
  const router = useRouter();
  const { category, commissionId, isSubmitted, maxAmount, submitDeadline, title } = item;
  const categoryLabel = CATEGORY_DISPLAY_MAP[category] ?? category;

  return (
    <div className="border-b-gray-10 flex h-15 items-center border-b py-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Tag variant="default" label={getDDay(submitDeadline)} />
          <p className="text-body2-m text-gray-70 w-20 truncate">{categoryLabel}</p>
          <div className="flex items-center">
            <p className="text-heading3-m text-gray-80 max-w-80 truncate">{title}</p>
            <button
              type="button"
              aria-label={`${title} 외주 상세 보기`}
              onClick={() => router.push(`/designer/detail/${commissionId}?hideActions=true`)}
            >
              <ArrowRightIcon className="text-gray-90 size-5 shrink-0 cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="flex w-96.5 items-center justify-between">
          <div className="flex items-center gap-14">
            <p className="text-body2-sb text-gray-70 w-32">
              {formatSubmitDeadline(submitDeadline)}
            </p>
            <p className="text-body2-sb text-gray-70 w-20">{formatAmount(maxAmount)}</p>
          </div>
          <Button
            type="button"
            variant={isSubmitted ? "small_text" : "small_primary"}
            className="w-fit"
            onClick={
              isSubmitted ? undefined : () => router.push(`/designer/submit/${commissionId}`)
            }
          >
            {isSubmitted ? "제출완료" : "제출하기"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DraftSubmissionScheduleRow;
