"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import PaymentModal from "@/components/instructor/write/PaymentModal";
import StepHeader from "@/components/instructor/write/StepHeader";
import AttachFileSection from "@/containers/instructor/write/AttachFileSection";
import BasicInfoTypingSection from "@/containers/instructor/write/BasicInfoTypingSection";
import CategorySection from "@/containers/instructor/write/CategorySection";
import ColorChooseSection from "@/containers/instructor/write/ColorChooseSection";
import DeadlineChooseSection from "@/containers/instructor/write/DeadlineChooseSection";
import DesignConceptSection from "@/containers/instructor/write/DesignConceptSection";
import NecessaryPageChooseSection from "@/containers/instructor/write/NecessaryPageChooseSection";
import PlanChooseSection from "@/containers/instructor/write/PlanChooseSection";
import ReferenceSection from "@/containers/instructor/write/ReferenceSection";
import SizeSection from "@/containers/instructor/write/SizeSection";
import { useWriteForm, WriteFormProvider } from "@/context/WriteFormContext";

const Step1Content = () => {
  const { selectedCategory, selectedSize, selectedKeywords, colorMode, colors, setCurrentStep } =
    useWriteForm();

  const isColorReady = colorMode === "designer" || colors.every(c => c !== null);
  const isAllSelected =
    selectedCategory !== null &&
    selectedSize !== null &&
    selectedKeywords.length >= 1 &&
    isColorReady;

  return (
    <div className="flex flex-col gap-10 pt-15 pb-30">
      <CategorySection />
      <SizeSection />
      <DesignConceptSection />
      <ColorChooseSection />
      <div className="flex justify-end">
        <Button
          variant={isAllSelected ? "medium_primary" : "medium_disabled"}
          className="w-fit"
          onClick={() => {
            if (isAllSelected) setCurrentStep(2);
          }}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

const Step2Content = () => {
  const { basicInfo, selectedPages, setCurrentStep } = useWriteForm();

  const isAllFilled =
    basicInfo.교재명.trim() !== "" &&
    basicInfo.강사명.trim() !== "" &&
    basicInfo.과목명.trim() !== "" &&
    selectedPages.length >= 2;

  return (
    <div className="flex flex-col gap-10 pt-15 pb-30">
      <BasicInfoTypingSection />
      <NecessaryPageChooseSection />
      <AttachFileSection />
      <ReferenceSection />
      <div className="flex justify-between">
        <Button variant="medium_secondary" className="w-fit" onClick={() => setCurrentStep(1)}>
          이전
        </Button>
        <Button
          variant={isAllFilled ? "medium_primary" : "medium_disabled"}
          className="w-fit"
          disabled={!isAllFilled}
          onClick={() => setCurrentStep(3)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

const Step3Content = () => {
  const { setCurrentStep, selectedPlan, firstDate, finalDate } = useWriteForm();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const isAllReady = selectedPlan !== null && firstDate !== null && finalDate !== null;

  return (
    <>
      <div className="flex flex-col gap-10 pt-15 pb-50">
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

const WritePageContent = () => {
  const { currentStep } = useWriteForm();

  useEffect(() => {
    const main = document.querySelector("main");
    if (main) main.scrollTop = 0;
  }, [currentStep]);

  if (currentStep === 1) return <Step1Content />;
  if (currentStep === 2) return <Step2Content />;
  if (currentStep === 3) return <Step3Content />;
  return null;
};

const Page = () => {
  const router = useRouter();
  const { currentStep, setCurrentStep } = useWriteForm();
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      history.pushState(null, "", window.location.href);

      if (currentStep > 1) {
        setCurrentStep((currentStep - 1) as 1 | 2);
      } else {
        setPendingHref("/instructor");
        setShowLeaveModal(true);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentStep, setCurrentStep]);

  // 사이드바 등 외부 링크 클릭 가로채기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "/instructor/write") return;

      e.preventDefault();
      e.stopPropagation();
      setPendingHref(href);
      setShowLeaveModal(true);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  const handleConfirmLeave = () => {
    setShowLeaveModal(false);
    if (pendingHref) router.push(pendingHref);
    setPendingHref(null);
  };

  const handleCancelLeave = () => {
    setShowLeaveModal(false);
    setPendingHref(null);
  };

  return (
    <div className="bg-gray-10 min-h-screen pt-16">
      <div className="mx-auto w-235">
        <div className="sticky top-0 z-10">
          <StepHeader />
        </div>
        <WritePageContent />
      </div>
      <Modal
        isOpen={showLeaveModal}
        type="double"
        title={"현재 페이지에서 이탈하시겠습니까?"}
        description={"페이지를 이탈하면 작성된 정보는\n저장되지 않습니다."}
        confirmLabel="확인"
        cancelLabel="취소"
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
        onClose={handleCancelLeave}
      />
    </div>
  );
};

const PageWrapper = () => (
  <WriteFormProvider>
    <Page />
  </WriteFormProvider>
);

export default PageWrapper;
