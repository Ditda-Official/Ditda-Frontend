"use client";

import { type ReactNode } from "react";

import { SIGNUP_MAX_ID_LENGTH, SIGNUP_MAX_PASSWORD_LENGTH } from "@/features/signup/config/signup";
import type {
  SignupAccountData,
  SignupProfileData,
  SignupRole,
} from "@/features/signup/model/signup";
import { useSignupStep2Form } from "@/features/signup/model/useSignupStep2Form";
import { normalizeClientUserRole, setClientAuth } from "@/shared/lib/auth/client";
import Button from "@/shared/ui/Button";
import InputField from "@/shared/ui/input/InputField";

type AccountStepProps = {
  progressIcon: ReactNode;
  nextButtonText: string;
  role: SignupRole;
  initialData?: SignupAccountData;
  profileData?: SignupProfileData;
  onPrev: () => void;
  onNext: (data: SignupAccountData) => void;
};

const AccountStep = ({
  progressIcon,
  nextButtonText,
  role,
  initialData,
  profileData,
  onPrev,
  onNext,
}: AccountStepProps) => {
  const form = useSignupStep2Form(initialData);

  const handleNext = async () => {
    const accountData = await form.validateAndGetAccountData();

    if (accountData == null) return;

    if (role === "instructor") {
      if (profileData == null) {
        form.setSubmitErrorMessage("프로필 정보를 확인할 수 없습니다");
        return;
      }

      const result = await form.handleInstructorSignup(profileData, accountData);

      if (result == null) return;

      const userRole = normalizeClientUserRole(result.userType);

      if (userRole == null) {
        form.setSubmitErrorMessage("사용자 유형을 확인할 수 없습니다");
        return;
      }

      setClientAuth({ accessToken: result.accessToken, role: userRole });
    }

    onNext(accountData);
  };

  return (
    <div className="flex min-h-full flex-col bg-white">
      <div className="flex flex-1 items-center justify-center">
        <section className="flex w-118 flex-col gap-12">
          <div className="flex w-full flex-col gap-16">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-title2-b text-black">회원가입</h1>
              {progressIcon}
            </div>

            <div className="flex w-full flex-col gap-5">
              <div className="flex w-full flex-col gap-2">
                <p className="text-body2-r text-gray-70">아이디</p>
                <div className="flex w-full flex-col gap-1">
                  <div className="flex w-full items-start gap-2">
                    <InputField
                      errorMessage={form.userIdErrorMessage}
                      isSuccess={form.isUserIdAvailable}
                      maxLength={SIGNUP_MAX_ID_LENGTH}
                      placeholder="아이디를 입력해주세요"
                      value={form.userId}
                      wrapperClassName="min-w-0 flex-1 [&>div>p]:hidden"
                      onChange={form.handleUserIdChange}
                      onClear={form.clearUserId}
                    />
                    <Button
                      className="h-14.5 w-fit shrink-0 whitespace-nowrap"
                      type="button"
                      variant={
                        form.isUserIdLengthValid
                          ? "certification_primary"
                          : "certification_disabled"
                      }
                      onClick={() => void form.handleUserIdCheck()}
                    >
                      중복확인
                    </Button>
                  </div>
                  {form.userIdMessage != null && (
                    <p
                      className={
                        form.userIdErrorMessage != null
                          ? "text-caption1-m text-red-main px-1"
                          : "text-caption1-m text-gray-80 px-1"
                      }
                    >
                      {form.userIdMessage}
                    </p>
                  )}
                </div>
              </div>

              <InputField
                errorMessage={form.passwordErrorMessage}
                isSuccess={form.password.length > 0 && form.isPasswordValid}
                label="비밀번호"
                maxLength={SIGNUP_MAX_PASSWORD_LENGTH}
                placeholder="비밀번호를 입력해주세요"
                showPasswordToggle
                type="password"
                value={form.password}
                onChange={form.handlePasswordChange}
              />
              <InputField
                errorMessage={form.passwordConfirmErrorMessage}
                isSuccess={form.isPasswordConfirmValid}
                label="비밀번호 확인"
                placeholder="비밀번호를 입력해주세요"
                showPasswordToggle
                type="password"
                value={form.passwordConfirm}
                onChange={form.handlePasswordConfirmChange}
              />

              <div className="flex w-full flex-col gap-2">
                <p className="text-body2-r text-gray-70">이메일</p>
                <div className="flex w-full items-start gap-2">
                  <InputField
                    errorMessage={form.emailErrorMessage}
                    inputMode="email"
                    placeholder="이메일을 입력해주세요"
                    type="email"
                    value={form.email}
                    wrapperClassName="min-w-0 flex-1"
                    onChange={form.handleEmailChange}
                    onClear={form.clearEmail}
                  />
                  <Button
                    className="h-14.5 w-fit shrink-0 whitespace-nowrap"
                    type="button"
                    variant={
                      form.isEmailVerificationButtonEnabled
                        ? "certification_primary"
                        : "certification_disabled"
                    }
                    onClick={() => void form.handleEmailVerificationRequest()}
                  >
                    인증 번호 받기
                  </Button>
                </div>
                {form.isVerificationCodeVisible && (
                  <div className="flex w-full items-start gap-2">
                    <InputField
                      className={form.isEmailVerified ? "text-gray-60" : undefined}
                      disabled={form.isEmailVerified}
                      errorMessage={form.verificationCodeErrorMessage}
                      inputMode="numeric"
                      isSuccess={form.isEmailVerified}
                      placeholder="인증번호를 입력해주세요"
                      rightElement={
                        form.verificationTimerText != null ? (
                          <span className="text-heading3-m text-main-main shrink-0 tabular-nums">
                            {form.verificationTimerText}
                          </span>
                        ) : undefined
                      }
                      value={form.verificationCode}
                      wrapperClassName="min-w-0 flex-1"
                      onChange={form.handleVerificationCodeChange}
                    />
                    <Button
                      className="h-14.5 w-fit shrink-0 whitespace-nowrap"
                      type="button"
                      variant={
                        form.isEmailVerificationConfirmButtonEnabled
                          ? "certification_primary"
                          : "certification_disabled"
                      }
                      onClick={() => void form.handleEmailVerificationConfirm()}
                    >
                      확인
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full items-start justify-between">
            <Button className="w-58" type="button" variant="medium_secondary" onClick={onPrev}>
              이전
            </Button>
            <Button
              className="w-58"
              type="button"
              variant={form.isSubmitEnabled ? "medium_primary" : "medium_disabled"}
              onClick={() => void handleNext()}
            >
              {form.isSubmitting ? "가입 중" : nextButtonText}
            </Button>
          </div>
          {form.submitErrorMessage != null && (
            <p className="text-caption1-m text-red-main text-right">{form.submitErrorMessage}</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AccountStep;
