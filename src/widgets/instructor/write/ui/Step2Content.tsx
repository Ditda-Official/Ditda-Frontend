"use client";

import { useWriteFormStore } from "@/features/instructor/write";
import Button from "@/shared/ui/Button";
import AttachFileSection from "@/widgets/instructor/write/ui/AttachFileSection";
import BasicInfoTypingSection from "@/widgets/instructor/write/ui/BasicInfoTypingSection";
import NecessaryPageChooseSection from "@/widgets/instructor/write/ui/NecessaryPageChooseSection";
import ReferenceSection from "@/widgets/instructor/write/ui/ReferenceSection";

const Step2Content = () => {
  const {
    basicInfo,
    selectedPages,
    materialFiles,
    materialDescription,
    referenceFiles,
    referenceDescription,
    setCurrentStep,
  } = useWriteFormStore();

  const isAllFilled =
    basicInfo.교재명.trim() !== "" &&
    basicInfo.강사명.trim() !== "" &&
    basicInfo.과목명.trim() !== "" &&
    selectedPages.length >= 1 &&
    (materialFiles.length === 0 || materialDescription.trim() !== "") &&
    (referenceFiles.length === 0 || referenceDescription.trim() !== "");

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

export default Step2Content;
