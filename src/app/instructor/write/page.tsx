"use client";

import Button from "@/components/common/Button";
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

const page = () => {
  return (
    <div className="bg-gray-10 min-h-screen pt-16">
      <div className="sticky top-0 z-10">
        <StepHeader />
      </div>
      <WriteFormProvider>
        <WritePageContent />
      </WriteFormProvider>
    </div>
  );
};

export default page;
