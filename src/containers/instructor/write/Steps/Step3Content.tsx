"use client";

import { useState } from "react";

import Button from "@/components/common/Button";
import PaymentModal from "@/components/instructor/write/PaymentModal/PaymentModal";
import DeadlineChooseSection from "@/containers/instructor/write/DeadlineChooseSection";
import PlanChooseSection from "@/containers/instructor/write/PlanChooseSection";
import { useWriteFormStore } from "@/store/writeFormStore";

const Step3Content = () => {
  const { setCurrentStep, selectedPlan, firstDate, finalDate } = useWriteFormStore();
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
