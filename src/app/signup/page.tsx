"use client";

import { useRouter } from "next/navigation";

import { type SignupRole, UserTypeStep } from "@/features/signup";

const Page = () => {
  const router = useRouter();

  const handleNext = (selectedType: SignupRole) => {
    router.push(`/signup/${selectedType}/step1`);
  };

  return <UserTypeStep onNext={handleNext} />;
};

export default Page;
