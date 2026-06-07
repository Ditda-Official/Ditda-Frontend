import { getDDay } from "@/features/instructor/home/lib/getDDay";
import { MatchingItem } from "@/features/instructor/home/model/home";
import { ArrowRightIcon } from "@/shared/assets/icons";
import Tag from "@/shared/ui/Tag";

const MatchingCommissionsRow = ({ item }: { item: MatchingItem }) => {
  const { title, finalDeadline, matching } = item;
  const { matched, total } = matching;

  return (
    <div className="border-b-gray-10 hover:bg-gray-5 flex h-15 cursor-pointer items-center border-b py-3 transition-colors duration-150">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-row items-center gap-6">
          <Tag variant="black" label={getDDay(finalDeadline)} />
          <div className="flex flex-row items-center">
            <p className="text-gray-80 text-heading3-m max-w-75 truncate">{title}</p>
            <ArrowRightIcon className="text-gray-90 size-5" />
          </div>
        </div>
        <p className="text-heading3-sb text-gray-60">
          (<span className="text-green-main">{matched}</span>/{total})
        </p>
      </div>
    </div>
  );
};

export default MatchingCommissionsRow;
