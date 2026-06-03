"use client";

import Button from "@/components/common/Button";
import AttachFileSection from "@/containers/instructor/write/AttachFileSection";
import BasicInfoTypingSection from "@/containers/instructor/write/BasicInfoTypingSection";
import NecessaryPageChooseSection from "@/containers/instructor/write/NecessaryPageChooseSection";
import ReferenceSection from "@/containers/instructor/write/ReferenceSection";
import { useWriteFormStore } from "@/store/writeFormStore";

const Step2Content = () => {
  const { basicInfo, selectedPages, setCurrentStep } = useWriteFormStore();

  const isAllFilled =
    basicInfo.교재명.trim() !== "" &&
    basicInfo.강사명.trim() !== "" &&
    basicInfo.과목명.trim() !== "" &&
    selectedPages.length >= 1;

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
