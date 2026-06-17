"use client";

import { useRouter } from "next/navigation";

import { AccountStep } from "@/features/signup";
import { StepTwoInstructorIcon } from "@/shared/assets/icons";

const Page = () => {
  const router = useRouter();

  return (
    <AccountStep
      progressIcon={<StepTwoInstructorIcon className="h-8 w-[85px] shrink-0" />}
      nextButtonText="가입하기"
      onPrev={() => router.push("/signup/instructor/step1")}
      onNext={() => router.push("/login")}
    />
  );
};

export default Page;
