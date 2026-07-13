import Link from "next/link";

import {
  AMOUNT_TYPE_DISPLAY_MAP,
  CATEGORY_BADGE_MAP,
  type PaymentHistory,
} from "@/features/designer/my";
import { ArrowRightIcon } from "@/shared/assets/icons";
import Badge from "@/shared/ui/Badge";

const formatPrice = (amount: number) => `${amount.toLocaleString()}원`;

const PaymentHistoryRow = ({ item }: { item: PaymentHistory }) => {
  const { commissionId, category, title, amountType, amount } = item;

  return (
    <Link
      href={`/designer/detail/${commissionId}?hideActions=true`}
      className="hover:bg-gray-5 border-b-gray-20 flex h-19.25 items-center justify-between border-b px-3 py-5 transition-colors duration-150"
    >
      <div className="flex items-center gap-6">
        <Badge variant={CATEGORY_BADGE_MAP[category] ?? "교재"} />
        <div className="text-gray-90 flex items-center gap-1">
          <p className="text-heading3-m truncate">{title}</p>
          <ArrowRightIcon className="size-6 shrink-0" />
        </div>
      </div>
      <div className="flex items-center gap-16">
        <p className="text-heading3-m text-gray-70 w-14">
          {AMOUNT_TYPE_DISPLAY_MAP[amountType] ?? amountType}
        </p>
        <p className="text-heading2-m text-gray-90 w-25">{formatPrice(amount)}</p>
      </div>
    </Link>
  );
};

export default PaymentHistoryRow;
