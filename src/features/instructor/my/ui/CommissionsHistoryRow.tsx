import {
  CATEGORY_BADGE_MAP,
  CommissionHistoryItem,
  PLAN_DISPLAY_MAP,
  PLAN_PAID_AMOUNT_MAP,
} from "@/features/instructor/my";
import { ArrowRightIcon } from "@/shared/assets/icons";
import Badge from "@/shared/ui/Badge";

const CommissionsHistoryRow = ({ item }: { item: CommissionHistoryItem }) => {
  const { category, title, createdAt, plan, paidAmount } = item;

  return (
    <div className="hover:bg-gray-5 border-b-gray-20 flex h-19.25 w-full shrink-0 cursor-pointer items-center justify-between border-b bg-white px-3 py-5 transition-colors duration-150">
      <div className="flex flex-row gap-6">
        <Badge variant={CATEGORY_BADGE_MAP[category] ?? "교재"} />
        <div className="text-gray-90 flex flex-row items-center gap-1">
          <p className="text-heading3-m max-w-70 truncate">{title}</p>
          <ArrowRightIcon className="size-6" />
        </div>
      </div>
      <div className="flex flex-row items-center gap-16">
        <p className="text-gray-70 text-heading2-m w-25">{createdAt.replaceAll("-", ".")}</p>
        <p className="text-gray-70 text-heading2-m w-14">{PLAN_DISPLAY_MAP[plan]}</p>
        <p className="text-gray-90 text-heading3-m w-25">
          {(paidAmount ?? PLAN_PAID_AMOUNT_MAP[plan]).toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

export default CommissionsHistoryRow;
