const MatchingWaitingHeader = () => {
  return (
    <div className="px-6">
      <div className="border-b-gray-40 w-260 border-b pb-3">
        <div className="flex w-fit items-start gap-32">
          <div className="flex w-121.25 shrink-0 items-center gap-7">
            <p className="w-11">시간</p>
            <p className="w-103.25">외주</p>
          </div>
          <div className="flex w-63 shrink-0 items-center gap-20">
            <p className="w-18">기본금</p>
            <p className="w-25">최대 수령액</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingWaitingHeader;
