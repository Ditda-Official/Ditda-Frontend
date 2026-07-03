import { ClockIcon } from "@/shared/assets/icons";
import Tag from "@/shared/ui/Tag";
import CommissionDetailSection from "@/widgets/instructor/detail/ui/CommissionDetailSection";

const page = () => {
  return (
    <div className="mx-auto w-235">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-title2-sb text-black">수학의 정석 - 한석원</h1>
          <div className="flex flex-row gap-2">
            <ClockIcon className="text-gray-90 size-6" />
            <h2 className="text-gray-80 text-body1-sb">1차 마감: 2026년 5월 9일</h2>
            <Tag label="D-3" variant="default" />
            <hr className="border-gray-30 h-6.5 w-px border-l" />
            <h2 className="text-gray-80 text-body1-sb">최종 마감: 2026년 5월 30일</h2>
            <Tag label="D-24" variant="default" />
          </div>
        </div>
        <CommissionDetailSection />
      </div>
    </div>
  );
};

export default page;
