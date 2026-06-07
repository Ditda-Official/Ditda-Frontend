import { CommissionsHeader, CommissionsHistoryRow } from "@/features/instructor/my";
import { NextButton, PrevButton } from "@/shared/assets/icons";

const CommissionsHistorySection = () => {
  return (
    <div className="rounded-12 flex w-212.75 flex-col gap-6 bg-white p-6">
      <h1 className="text-heading1-sb text-black">외주 내역 확인</h1>
      <div className="flex flex-col">
        <CommissionsHeader />
        <CommissionsHistoryRow />
        <CommissionsHistoryRow />
        <CommissionsHistoryRow />
      </div>
      <div className="flex flex-row items-center justify-center gap-8">
        <PrevButton className="size-12 cursor-pointer" />
        <NextButton className="size-12 cursor-pointer" />
      </div>
    </div>
  );
};

export default CommissionsHistorySection;
