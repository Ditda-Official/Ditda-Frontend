"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { postNotifyDeposit } from "@/features/instructor/write/api/write";
import { useWriteFormStore } from "@/features/instructor/write/model/writeFormStore";
import { getApiErrorMessage } from "@/shared/api/client";
import { ArrowLeftIcon, ExclamationMarkCircleIcon } from "@/shared/assets/icons";
import Button from "@/shared/ui/Button";
import Toast from "@/shared/ui/Toast";

const Step2 = ({ onBack, commissionId }: { onBack: () => void; commissionId: number | null }) => {
  const router = useRouter();
  const selectedPlan = useWriteFormStore(s => s.selectedPlan);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [autoHide, setAutoHide] = useState(false);
  const showError = !!errorMessage && !autoHide;

  useEffect(() => {
    if (!showError) return;
    const timeout = setTimeout(() => setAutoHide(true), 2500);
    return () => clearTimeout(timeout);
  }, [showError]);

  const handleComplete = async () => {
    if (isSubmitting || commissionId == null) return;

    setIsSubmitting(true);
    setAutoHide(false);
    setErrorMessage(null);
    try {
      await postNotifyDeposit(commissionId);
      router.push("/instructor");
    } catch (error) {
      setErrorMessage(await getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

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
                {selectedPlan ? `${selectedPlan.price.toLocaleString("ko-KR")}원` : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-gray-90 text-body2-m text-center">
          이체를 완료하신 후, 결제 완료 버튼을 눌러주세요
        </p>
        <div className="relative">
          <Toast
            message={errorMessage ?? ""}
            show={showError}
            className="absolute -top-4 left-1/2 w-fit shrink-0 -translate-x-1/2 -translate-y-full whitespace-nowrap"
          />
          <Button
            variant={isSubmitting ? "large_disabled" : "large_primary"}
            disabled={isSubmitting}
            onClick={handleComplete}
          >
            결제 완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
