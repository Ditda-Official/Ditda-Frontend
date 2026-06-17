"use client";

import { useRouter } from "next/navigation";

import { INSTRUCTOR_TERMS, TermsProfileStep } from "@/features/signup";
import { StepOneInstructorIcon } from "@/shared/assets/icons";

const Page = () => {
  const router = useRouter();

  return (
    <TermsProfileStep
      terms={INSTRUCTOR_TERMS}
      progressIcon={<StepOneInstructorIcon className="h-8 w-[85px] shrink-0" />}
      onPrev={() => router.push("/signup")}
      onNext={() => router.push("/signup/instructor/step2")}
    />
  );
};

export default Page;
