import { DraftCard } from "@/features/instructor/choose";
import { NextButton, PrevButton } from "@/shared/assets/icons";

const DraftCheckSection = () => {
  return (
    <div className="rounded-12 w-full bg-white p-6">
      <h1 className="text-gray-90 text-heading1-sb pb-2">시안 확인</h1>
      <h2 className="text-gray-70 text-body2-m">
        제출된 시안을 확인하고 가장 마음에 드는 시안을 선택해주세요
      </h2>
      <div className="flex flex-row justify-end gap-4 pb-4">
        <PrevButton className="size-12 cursor-pointer" />
        <NextButton className="size-12 cursor-pointer" />
      </div>
      <div className="flex flex-row gap-6">
        <DraftCard />
        <DraftCard />
        <DraftCard />
      </div>
    </div>
  );
};

export default DraftCheckSection;
