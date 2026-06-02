"use client";

import { useRouter } from "next/navigation";

import { ArrowLeftIcon, ExclamationMarkCircleIcon } from "@/assets/icons";
import Button from "@/components/common/Button";
import { PLAN_MAP } from "@/constants/write";
import { useWriteFormStore } from "@/store/writeFormStore";

const Step2 = ({ onBack }: { onBack: () => void }) => {
  const router = useRouter();
  const { selectedPlan } = useWriteFormStore();
  return (
    <div className="flex h-178.25 flex-col justify-between">
      <div>
        <div className="text-gray-80 flex cursor-pointer flex-row gap-1 pt-6" onClick={onBack}>
          <ArrowLeftIcon className="size-6" />
          <p className="text-body2-m">뒤로가기</p>
        </div>
        <div className="flex flex-col gap-4 pt-30">
          <h1 className="text-gray-90 text-heading1-sb text-center">
            아래 계좌로 <br /> 금액을 이체해주세요
          </h1>
          <div className="flex flex-row items-center justify-center gap-1 pb-12">
            <ExclamationMarkCircleIcon className="text-red-main size-6" />
            <h2 className="text-heading3-m text-gray-90">
              입금자명을 반드시 본명으로 작성해주세요
            </h2>
          </div>
          <div className="rounded-12 bg-gray-10 flex flex-col gap-4 p-6">
            <div className="flex flex-row justify-between">
              <p className="text-gray-70 text-body2-m">계좌번호</p>
              <p className="text-gray-80 text-heading3-sb">우리은행 1002763980123</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-gray-70 text-body2-m">예금주명</p>
              <p className="text-gray-80 text-heading3-sb">문현승</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-gray-70 text-body2-m">이체 금액</p>
              <p className="text-gray-90 text-heading1-sb">
                {selectedPlan ? PLAN_MAP[selectedPlan].price : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-gray-90 text-body2-m text-center">
          이체를 완료하신 후, 결제 완료 버튼을 눌러주세요
        </p>
        <Button variant="large_primary" onClick={() => router.push("/instructor")}>
          결제 완료
        </Button>
      </div>
    </div>
  );
};

export default Step2;
