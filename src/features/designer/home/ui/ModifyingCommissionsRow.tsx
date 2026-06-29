import { getDDay } from "@/features/designer/home/lib/getDDay";
import Button from "@/shared/ui/Button";
import Tag from "@/shared/ui/Tag";

export type ModifyingCommissionItem = {
  id: number;
  title: string;
  finalDeadline: string;
  isSubmitted: boolean;
};

const ModifyingCommissionsRow = ({ item }: { item: ModifyingCommissionItem }) => {
  return (
    <div className="border-b-gray-10 flex h-15 items-center border-b py-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Tag variant="default" label={getDDay(item.finalDeadline)} />
          <p className="text-heading3-m text-gray-80 max-w-80 truncate">{item.title}</p>
        </div>
        <Button
          type="button"
          variant={item.isSubmitted ? "small_text" : "small_secondary"}
          className="w-fit"
        >
          {item.isSubmitted ? "전송완료" : "확인하기"}
        </Button>
      </div>
    </div>
  );
};

export default ModifyingCommissionsRow;
