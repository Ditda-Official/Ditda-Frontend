"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { useWriteFormStore } from "@/features/instructor/write";
import Modal from "@/shared/ui/modal/Modal";
import { Step1Content } from "@/widgets/instructor/write";

// 2/3단계는 진입 전까지 번들에 포함시키지 않도록 지연 로딩
const Step2Content = dynamic(() => import("@/widgets/instructor/write/ui/Step2Content"));
const Step3Content = dynamic(() => import("@/widgets/instructor/write/ui/Step3Content"));

const WritePageContent = () => {
  const currentStep = useWriteFormStore(s => s.currentStep);

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
  const { currentStep, setCurrentStep } = useWriteFormStore(
    useShallow(s => ({ currentStep: s.currentStep, setCurrentStep: s.setCurrentStep })),
  );
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
    <>
      <WritePageContent />
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
    </>
  );
};

export default Page;
