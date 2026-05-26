"use client";

import ProgressBar from "@/components/instructor/write/ProgressBar";
import { useWriteForm } from "@/context/WriteFormContext";

const StepHeader = () => {
  const { currentStep } = useWriteForm();

  return (
    <header className="bg-gray-10 flex w-full justify-between py-4">
      <p className="text-title2-sb text-black">새 외주 작성</p>
      <ProgressBar currentStep={currentStep} />
    </header>
  );
};

export default StepHeader;
