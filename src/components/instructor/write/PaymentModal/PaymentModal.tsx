"use client";

import { useEffect, useState } from "react";

import { CloseIcon } from "@/assets/icons";
import Step1 from "@/components/instructor/write/PaymentModal/Step1";
import Step2 from "@/components/instructor/write/PaymentModal/Step2";
import { useWriteFormStore } from "@/store/writeFormStore";

const PaymentModalContent = ({ onClose }: { onClose?: () => void }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const { basicInfo } = useWriteFormStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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
        {step === 1 ? <Step1 onNext={() => setStep(2)} /> : <Step2 onBack={() => setStep(1)} />}
      </div>
    </div>
  );
};

const PaymentModal = ({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
  if (!isOpen) return null;
  return <PaymentModalContent onClose={onClose} />;
};

export default PaymentModal;
