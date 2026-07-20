"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  AccountStep,
  DESIGNER_TERMS,
  DesignerAdditionalStep,
  INSTRUCTOR_TERMS,
  postSignupDesigner,
  SIGNUP_INITIAL_STEP,
  SIGNUP_STEPS_BY_ROLE,
  type SignupAccountData,
  type SignupDesignerAdditionalData,
  type SignupFunnelStep,
  type SignupProfileData,
  SignupProgressIcon,
  type SignupRole,
  TermsProfileStep,
  UserTypeStep,
  useSignupFormStore,
} from "@/features/signup";
import {
  getClientUserHomePath,
  normalizeClientUserRole,
  setClientAuth,
} from "@/shared/lib/auth/client";

const SignupFunnel = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<SignupRole | null>(null);
  const [currentStep, setCurrentStep] = useState<SignupFunnelStep>(SIGNUP_INITIAL_STEP);
  const [profileData, setProfileData] = useState<SignupProfileData>();
  const [accountData, setAccountData] = useState<SignupAccountData>();
  const resetSignupForm = useSignupFormStore(state => state.resetSignupForm);

  useEffect(() => {
    return () => resetSignupForm();
  }, [resetSignupForm]);

  const handleRoleNext = (role: SignupRole) => {
    resetSignupForm();
    setSelectedRole(role);
    setProfileData(undefined);
    setAccountData(undefined);
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
      router.push(selectedRole === "instructor" ? "/instructor" : "/login");
      return;
    }

    setCurrentStep(nextStep);
  };

  const handleProfileNext = (data: SignupProfileData) => {
    setProfileData(data);
    moveNext();
  };

  const handleAccountNext = (data: SignupAccountData) => {
    setAccountData(data);

    if (selectedRole === "instructor") {
      resetSignupForm();
    }

    moveNext();
  };

  const handleDesignerSubmit = async (data: SignupDesignerAdditionalData) => {
    if (profileData == null || accountData == null) {
      throw new Error("회원가입 정보를 확인할 수 없습니다");
    }

    const result = await postSignupDesigner({
      profile: profileData,
      account: accountData,
      additional: data,
    });
    const userRole = normalizeClientUserRole(result.userType);

    if (userRole == null) {
      throw new Error("사용자 유형을 확인할 수 없습니다");
    }

    setClientAuth({ accessToken: result.accessToken, role: userRole });
    resetSignupForm();
    router.push(getClientUserHomePath(userRole));
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
          initialData={profileData}
          onPrev={movePrev}
          onNext={handleProfileNext}
        />
      );
    }

    return (
      <TermsProfileStep
        terms={INSTRUCTOR_TERMS}
        progressIcon={<SignupProgressIcon currentStep={1} totalSteps={2} />}
        initialData={profileData}
        onPrev={movePrev}
        onNext={handleProfileNext}
      />
    );
  }

  if (currentStep === "account") {
    if (selectedRole === "designer") {
      return (
        <AccountStep
          progressIcon={<SignupProgressIcon currentStep={2} totalSteps={3} />}
          nextButtonText="다음"
          role={selectedRole}
          profileData={profileData}
          onPrev={movePrev}
          onNext={handleAccountNext}
        />
      );
    }

    return (
      <AccountStep
        progressIcon={<SignupProgressIcon currentStep={2} totalSteps={2} />}
        nextButtonText="가입하기"
        role={selectedRole}
        profileData={profileData}
        onPrev={movePrev}
        onNext={handleAccountNext}
      />
    );
  }

  return (
    <DesignerAdditionalStep
      progressIcon={<SignupProgressIcon currentStep={3} totalSteps={3} />}
      onPrev={movePrev}
      onSubmit={handleDesignerSubmit}
    />
  );
};

export default SignupFunnel;
