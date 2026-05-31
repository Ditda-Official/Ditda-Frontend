import CommissionsHeader from "@/components/instructor/home/CommissionsHeader";

const MatchingCommissionsSection = () => {
  return (
    <div className="rounded-12 w-full bg-white px-6 pt-6 pb-4">
      <div className="flex flex-col gap-8">
        <span className="text-heading1-sb text-black">
          <span className="text-main-main">매칭 중</span>인 외주
        </span>
        <CommissionsHeader rightLabel="매칭 인원">
          <p className="w-11">디데이</p>
          <p>외주명</p>
        </CommissionsHeader>
      </div>
    </div>
  );
};

export default MatchingCommissionsSection;
