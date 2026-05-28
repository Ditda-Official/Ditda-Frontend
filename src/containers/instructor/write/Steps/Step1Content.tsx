"use client";

import Button from "@/components/common/Button";
import CategorySection from "@/containers/instructor/write/CategorySection";
import ColorChooseSection from "@/containers/instructor/write/ColorChooseSection";
import DesignConceptSection from "@/containers/instructor/write/DesignConceptSection";
import SizeSection from "@/containers/instructor/write/SizeSection";
import { useWriteFormStore } from "@/store/writeFormStore";

const Step1Content = () => {
  const { selectedCategory, selectedSize, selectedKeywords, colorMode, colors, setCurrentStep } =
    useWriteFormStore();

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

export default Step1Content;
