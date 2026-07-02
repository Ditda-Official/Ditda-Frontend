"use client";

import { useEffect, useState } from "react";

import { postCommission } from "@/features/instructor/write/api/write";
import { useWriteFormStore } from "@/features/instructor/write/model/writeFormStore";
import Step1 from "@/features/instructor/write/ui/PaymentModal/Step1";
import Step2 from "@/features/instructor/write/ui/PaymentModal/Step2";
import { getApiErrorMessage } from "@/shared/api/client";
import { CloseIcon } from "@/shared/assets/icons";

const PaymentModalContent = ({ onClose }: { onClose?: () => void }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [commissionId, setCommissionId] = useState<number | null>(null);
  const { basicInfo, getOrderRequest } = useWriteFormStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handlePay = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const result = await postCommission(getOrderRequest());
      setCommissionId(result.commissionId);
      setStep(2);
    } catch (error) {
      setErrorMessage(await getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="rounded-20 flex h-203 w-130 flex-col bg-white p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex shrink-0 flex-col gap-2">
          <div className="flex flex-row justify-between py-2">
            <h1 className="text-gray-90 text-heading2-sb">{basicInfo.교재명 || "외주 정보"}</h1>
            <CloseIcon className="text-gray-90 size-6 cursor-pointer" onClick={onClose} />
          </div>
          <hr className="border-gray-20 border-t" />
        </div>
        {step === 1 ? (
          <Step1 onNext={handlePay} isSubmitting={isSubmitting} errorMessage={errorMessage} />
        ) : (
          <Step2 onBack={() => setStep(1)} commissionId={commissionId} />
        )}
      </div>
    </div>
  );
};

const PaymentModal = ({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
  if (!isOpen) return null;
  return <PaymentModalContent onClose={onClose} />;
};

export default PaymentModal;
