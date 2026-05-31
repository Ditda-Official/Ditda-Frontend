import CommissionsHeader from "@/components/instructor/home/CommissionsHeader";
import ModifyingCommissionsRow from "@/components/instructor/home/ModifyingCommissionsRow";

const ModifyingCommissionsSection = () => {
  return (
    <div className="rounded-12 w-full bg-white px-6 pt-6 pb-4">
      <div className="flex flex-col gap-8">
        <span className="text-heading1-sb text-black">
          <span className="text-main-main">수정 중</span>인 외주
        </span>
        <div>
          <CommissionsHeader rightLabel="작업 단계" rightClassName="w-20">
            <p className="w-11">디데이</p>
            <p>외주명</p>
          </CommissionsHeader>
          <ModifyingCommissionsRow />
        </div>
      </div>
    </div>
  );
};

export default ModifyingCommissionsSection;
