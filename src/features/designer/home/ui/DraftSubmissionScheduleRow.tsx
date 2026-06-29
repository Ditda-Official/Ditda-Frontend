import { getDDay } from "@/features/designer/home/lib/getDDay";
import { ArrowRightIcon } from "@/shared/assets/icons";
import Button from "@/shared/ui/Button";
import Tag from "@/shared/ui/Tag";

export type DraftSubmissionScheduleItem = {
  id: number;
  category: string;
  title: string;
  submissionDeadline: string;
  maxReward: string;
};

const DraftSubmissionScheduleRow = ({ item }: { item: DraftSubmissionScheduleItem }) => {
  return (
    <div className="border-b-gray-10 flex h-15 items-center border-b py-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Tag variant="default" label={getDDay(item.submissionDeadline)} />
          <p className="text-body2-m text-gray-70 w-20 truncate">{item.category}</p>
          <div className="flex items-center">
            <p className="text-heading3-m text-gray-80 max-w-80 truncate">{item.title}</p>
            <ArrowRightIcon className="text-gray-90 size-5 shrink-0 cursor-pointer" />
          </div>
        </div>

        <div className="flex w-96.5 items-center justify-between">
          <div className="flex items-center gap-14">
            <p className="text-body2-sb text-gray-70 w-32">{item.submissionDeadline}</p>
            <p className="text-body2-sb text-gray-70 w-20">{item.maxReward}</p>
          </div>
          <Button type="button" variant="small_primary" className="w-fit">
            제출하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DraftSubmissionScheduleRow;
