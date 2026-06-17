"use client";

import { useRouter } from "next/navigation";

import { AccountStep } from "@/features/signup";
import { StepTwoDesignerIcon } from "@/shared/assets/icons";

const Page = () => {
  const router = useRouter();

  return (
    <AccountStep
      progressIcon={<StepTwoDesignerIcon className="h-8 w-[138px] shrink-0" />}
      nextButtonText="다음"
      onPrev={() => router.push("/signup/designer/step1")}
      onNext={() => router.push("/signup/designer/step3")}
    />
  );
};

export default Page;
