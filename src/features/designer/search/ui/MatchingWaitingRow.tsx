import { getDDay } from "@/features/designer/search/lib/getDDay";
import Button from "@/shared/ui/Button";
import Tag from "@/shared/ui/Tag";

export type MatchingWaitingCommission = {
  id: number;
  deadline: string;
  category: string;
  title: string;
  basePrice: string;
  maxReward: string;
};

const MatchingWaitingRow = ({ item }: { item: MatchingWaitingCommission }) => {
  return (
    <div className="border-b-gray-10 hover:bg-gray-10 flex w-272 cursor-pointer items-center justify-between border-b px-6 py-4 transition-colors duration-150">
      <div className="flex items-center gap-29">
        <div className="flex items-center gap-8">
          <Tag variant="gray" label={getDDay(item.deadline)} />
          <div className="flex w-103.25 items-center gap-1">
            <span className="text-body2-m text-gray-70 shrink-0">[{item.category}]</span>
            <span className="text-heading3-m text-gray-80 min-w-0 flex-1 truncate">
              {item.title}
            </span>
          </div>
        </div>
        <div className="flex w-63 shrink-0 items-center gap-20">
          <p className="text-heading3-m text-gray-80 w-18">{item.basePrice}</p>
          <p className="text-heading3-sb text-gray-90 w-25">{item.maxReward}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center">
        <Button type="button" variant="small_secondary" className="w-fit whitespace-nowrap">
          확인하기
        </Button>
      </div>
    </div>
  );
};

export default MatchingWaitingRow;
