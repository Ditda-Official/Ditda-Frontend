import { ArrowRightIcon } from "@/shared/assets/icons";
import Badge from "@/shared/ui/Badge";

export type PaymentHistory = {
  id: number;
  category: "교재";
  title: string;
  amountType: "기본금" | "최종금액";
  amount: number;
};

const formatPrice = (amount: number) => `${amount.toLocaleString()}원`;

const PaymentHistoryRow = ({ item }: { item: PaymentHistory }) => {
  return (
    <div className="border-b-gray-20 flex h-19.25 items-center justify-between border-b px-3 py-5">
      <div className="flex items-center gap-6">
        <Badge variant={item.category} />
        <div className="text-gray-90 flex items-center gap-1">
          <p className="text-heading3-m truncate">{item.title}</p>
          <ArrowRightIcon className="size-6 shrink-0 cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center gap-16">
        <p className="text-heading3-m text-gray-70 w-14">{item.amountType}</p>
        <p className="text-heading2-m text-gray-90 w-25">{formatPrice(item.amount)}</p>
      </div>
    </div>
  );
};

export default PaymentHistoryRow;
