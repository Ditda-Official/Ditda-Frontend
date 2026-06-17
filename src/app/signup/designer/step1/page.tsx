"use client";

import { useRouter } from "next/navigation";

import { DESIGNER_TERMS, TermsProfileStep } from "@/features/signup";
import { StepOneDesignerIcon } from "@/shared/assets/icons";

const Page = () => {
  const router = useRouter();

  return (
    <TermsProfileStep
      terms={DESIGNER_TERMS}
      progressIcon={<StepOneDesignerIcon className="h-8 w-[138px] shrink-0" />}
      onPrev={() => router.push("/signup")}
      onNext={() => router.push("/signup/designer/step2")}
    />
  );
};

export default Page;
