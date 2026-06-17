"use client";

import { useRouter } from "next/navigation";

import { DesignerAdditionalStep } from "@/features/signup";
import { StepThreeDesignerIcon } from "@/shared/assets/icons";

const Page = () => {
  const router = useRouter();

  return (
    <DesignerAdditionalStep
      progressIcon={<StepThreeDesignerIcon className="h-8 w-[138px] shrink-0" />}
      onPrev={() => router.push("/signup/designer/step2")}
      onSubmit={() => router.push("/login")}
    />
  );
};

export default Page;
