"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  AccountStep,
  DESIGNER_TERMS,
  DesignerAdditionalStep,
  INSTRUCTOR_TERMS,
  SIGNUP_INITIAL_STEP,
  SIGNUP_STEPS_BY_ROLE,
  type SignupFunnelStep,
  SignupProgressIcon,
  type SignupRole,
  TermsProfileStep,
  UserTypeStep,
} from "@/features/signup";

const SignupFunnel = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<SignupRole | null>(null);
  const [currentStep, setCurrentStep] = useState<SignupFunnelStep>(SIGNUP_INITIAL_STEP);

  const handleRoleNext = (role: SignupRole) => {
    setSelectedRole(role);
    setCurrentStep(SIGNUP_STEPS_BY_ROLE[role][0]);
  };

  const movePrev = () => {
    if (selectedRole == null || currentStep === SIGNUP_INITIAL_STEP) return;

    const roleSteps = SIGNUP_STEPS_BY_ROLE[selectedRole];
    const currentStepIndex = roleSteps.findIndex(step => step === currentStep);

    if (currentStepIndex <= 0) {
      setCurrentStep(SIGNUP_INITIAL_STEP);
      return;
    }

    setCurrentStep(roleSteps[currentStepIndex - 1]);
  };

  const moveNext = () => {
    if (selectedRole == null || currentStep === SIGNUP_INITIAL_STEP) return;

    const roleSteps = SIGNUP_STEPS_BY_ROLE[selectedRole];
    const currentStepIndex = roleSteps.findIndex(step => step === currentStep);
    const nextStep = roleSteps[currentStepIndex + 1];

    if (nextStep == null) {
      router.push("/login");
      return;
    }

    setCurrentStep(nextStep);
  };

  if (selectedRole == null || currentStep === "role") {
    return <UserTypeStep onNext={handleRoleNext} />;
  }

  if (currentStep === "termsProfile") {
    if (selectedRole === "designer") {
      return (
        <TermsProfileStep
          terms={DESIGNER_TERMS}
          progressIcon={<SignupProgressIcon currentStep={1} totalSteps={3} />}
          onPrev={movePrev}
          onNext={moveNext}
        />
      );
    }

    return (
      <TermsProfileStep
        terms={INSTRUCTOR_TERMS}
        progressIcon={<SignupProgressIcon currentStep={1} totalSteps={2} />}
        onPrev={movePrev}
        onNext={moveNext}
      />
    );
  }

  if (currentStep === "account") {
    if (selectedRole === "designer") {
      return (
        <AccountStep
          progressIcon={<SignupProgressIcon currentStep={2} totalSteps={3} />}
          nextButtonText="다음"
          onPrev={movePrev}
          onNext={moveNext}
        />
      );
    }

    return (
      <AccountStep
        progressIcon={<SignupProgressIcon currentStep={2} totalSteps={2} />}
        nextButtonText="가입하기"
        onPrev={movePrev}
        onNext={moveNext}
      />
    );
  }

  return (
    <DesignerAdditionalStep
      progressIcon={<SignupProgressIcon currentStep={3} totalSteps={3} />}
      onPrev={movePrev}
      onSubmit={moveNext}
    />
  );
};

export default SignupFunnel;
