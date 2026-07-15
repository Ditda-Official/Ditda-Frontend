"use client";

import { useWriteFormStore } from "@/features/instructor/write/model/writeFormStore";
import ProgressBar from "@/features/instructor/write/ui/ProgressBar";

const StepHeader = () => {
  const currentStep = useWriteFormStore(s => s.currentStep);

  return (
    <header className="bg-gray-10 flex w-full justify-between py-4">
      <p className="text-title2-sb text-black">새 외주 작성</p>
      <ProgressBar currentStep={currentStep} />
    </header>
  );
};

export default StepHeader;
