const CommissionsHeader = () => {
  return (
    <div className="text-gray-70 text-caption1-r border-b-gray-20 flex w-full shrink-0 flex-row justify-between border-b px-3 py-2">
      <p>외주</p>
      <div className="flex gap-16">
        <p className="w-25">외주 신청 일자</p>
        <p className="w-14">플랜</p>
        <p className="w-25">금액</p>
      </div>
    </div>
  );
};

export default CommissionsHeader;
