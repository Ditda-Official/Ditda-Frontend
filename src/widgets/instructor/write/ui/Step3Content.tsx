"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { useWriteFormStore } from "@/features/instructor/write";
import Button from "@/shared/ui/Button";
import DeadlineChooseSection from "@/widgets/instructor/write/ui/DeadlineChooseSection";
import PlanChooseSection from "@/widgets/instructor/write/ui/PlanChooseSection";

// 결제하기 클릭 전까지 결제 모달 코드는 번들에 포함시키지 않도록 지연 로딩
const PaymentModal = dynamic(
  () => import("@/features/instructor/write/ui/PaymentModal/PaymentModal"),
);

const Step3Content = () => {
  const { setCurrentStep, selectedPlan, firstDate, finalDate } = useWriteFormStore(
    useShallow(s => ({
      setCurrentStep: s.setCurrentStep,
      selectedPlan: s.selectedPlan,
      firstDate: s.firstDate,
      finalDate: s.finalDate,
    })),
  );
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const isAllReady = selectedPlan !== null && firstDate !== null && finalDate !== null;

  return (
    <>
      <div className="flex flex-col gap-10 pt-15 pb-60">
        <PlanChooseSection />
        <DeadlineChooseSection />
        <div className="flex justify-between">
          <Button variant="medium_secondary" className="w-fit" onClick={() => setCurrentStep(2)}>
            이전
          </Button>
          <Button
            variant={isAllReady ? "medium_primary" : "medium_disabled"}
            className="w-fit"
            disabled={!isAllReady}
            onClick={() => setIsPaymentOpen(true)}
          >
            결제하기
          </Button>
        </div>
      </div>
      <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
    </>
  );
};

export default Step3Content;
