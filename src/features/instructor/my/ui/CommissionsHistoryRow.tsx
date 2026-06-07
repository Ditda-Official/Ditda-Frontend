import { ArrowRightIcon } from "@/shared/assets/icons";
import Badge from "@/shared/ui/Badge";

const CommissionsHistoryRow = () => {
  return (
    <div className="hover:bg-gray-5 border-b-gray-20 flex h-19.25 w-full cursor-pointer items-center justify-between border-b bg-white px-3 py-5 transition-colors duration-150">
      <div className="flex flex-row gap-6">
        <Badge variant="표지" />
        <div className="text-gray-90 flex flex-row items-center gap-1">
          <p className="text-heading3-m">YMB 영어교재 표지디자인 외주</p>
          <ArrowRightIcon className="size-6" />
        </div>
      </div>
      <div className="flex flex-row items-center gap-16">
        <p className="text-gray-70 text-heading2-m w-25">2025.05.05</p>
        <p className="text-gray-70 text-heading2-m w-14">기본</p>
        <p className="text-gray-90 text-heading3-m w-25">400,000원</p>
      </div>
    </div>
  );
};

export default CommissionsHistoryRow;
