"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import StepHeader from "@/components/instructor/write/StepHeader";
import CategorySection from "@/container/instructor/write/CategorySection";
import ColorChooseSection from "@/container/instructor/write/ColorChooseSection";
import DesignConceptSection from "@/container/instructor/write/DesignConceptSection";
import SizeSection from "@/container/instructor/write/SizeSection";
import { useWriteForm, WriteFormProvider } from "@/context/WriteFormContext";

const WritePageContent = () => {
  const { selectedCategory, selectedSize, selectedKeywords, colorMode, colors } = useWriteForm();

  const isColorReady = colorMode === "designer" || colors.every(c => c !== null);
  const isAllSelected =
    selectedCategory !== null &&
    selectedSize !== null &&
    selectedKeywords.length >= 1 &&
    isColorReady;

  return (
    <div className="flex flex-col gap-10 pt-15 pr-30 pb-30 pl-29">
      <CategorySection />
      <SizeSection />
      <DesignConceptSection />
      <ColorChooseSection />
      <div className="flex justify-end">
        <Button variant={isAllSelected ? "medium_primary" : "medium_disabled"} className="w-fit">
          다음
        </Button>
      </div>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  // 브라우저 뒤로가기 가로채기
  useEffect(() => {
    history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      history.pushState(null, "", window.location.href);
      setPendingHref("/instructor");
      setShowLeaveModal(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // 사이드바 등 링크 클릭 가로채기
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
      <div className="sticky top-0 z-10">
        <StepHeader />
      </div>
      <WriteFormProvider>
        <WritePageContent />
      </WriteFormProvider>
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

export default Page;
