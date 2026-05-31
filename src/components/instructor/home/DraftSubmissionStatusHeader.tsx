const DraftSubmissionStatusSectionHeader = () => {
  return (
    <div className="text-gray-70 text-caption1-r border-b-gray-10 flex flex-row justify-between border-b pb-3 whitespace-nowrap">
      <div className="flex flex-1 flex-row gap-6">
        <p className="w-11">디데이</p>
        <p className="w-20">카테고리</p>
        <p className="flex-1">외주명</p>
      </div>
      <p className="w-53">시안 제출자 수</p>
    </div>
  );
};

export default DraftSubmissionStatusSectionHeader;
