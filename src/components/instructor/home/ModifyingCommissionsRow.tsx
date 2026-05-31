import Button from "@/components/common/Button";
import Tag from "@/components/common/Tag";
import { ModifyingItem } from "@/data/instructor/home";
import { cn } from "@/lib/utils/cn";
import { getDDay } from "@/lib/utils/date";

const ModifyingCommissionsRow = ({ item }: { item: ModifyingItem }) => {
  const { title, finalDeadline, isSubmitted, hasUpdate } = item;

  return (
    <div className="border-b-gray-10 hover:bg-gray-5 flex h-15 cursor-pointer items-center border-b py-3 transition-colors duration-150">
      <div className="flex w-full flex-row justify-between">
        <div className={cn("flex flex-row items-center", hasUpdate ? "gap-3" : "gap-6")}>
          <Tag variant="default" label={getDDay(finalDeadline)} />
          <div className={cn("flex flex-row items-center", hasUpdate && "gap-1")}>
            {hasUpdate && <div className="bg-main-main size-2 self-start rounded-full" />}
            <p className="text-gray-80 text-heading3-m max-w-75 truncate">{title}</p>
          </div>
        </div>
        {isSubmitted ? (
          <button className="text-body1-m text-purple-70 w-20">전송완료</button>
        ) : (
          <Button variant="small_secondary" className="w-fit">
            확인하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModifyingCommissionsRow;
