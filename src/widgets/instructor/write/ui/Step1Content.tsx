"use client";

import { useWriteFormStore } from "@/features/instructor/write";
import Button from "@/shared/ui/Button";
import CategorySection from "@/widgets/instructor/write/ui/CategorySection";
import ColorChooseSection from "@/widgets/instructor/write/ui/ColorChooseSection";
import DesignConceptSection from "@/widgets/instructor/write/ui/DesignConceptSection";
import SizeSection from "@/widgets/instructor/write/ui/SizeSection";

const Step1Content = () => {
  const {
    selectedCategory,
    selectedSize,
    selectedKeywords,
    additionalConcept,
    colorMode,
    colors,
    setCurrentStep,
  } = useWriteFormStore();

  const isColorReady = colorMode === "designer" || colors.every(c => c !== null);
  const isConceptReady = selectedKeywords.length >= 1 || additionalConcept.trim().length > 0;
  const isAllSelected =
    selectedCategory !== null && selectedSize !== null && isConceptReady && isColorReady;

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
