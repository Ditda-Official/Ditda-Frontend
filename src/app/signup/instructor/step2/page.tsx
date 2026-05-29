"use client";

import { useRouter } from "next/navigation";

import { StepTwoInstructorIcon } from "@/assets/icons";
import Button from "@/components/common/Button";
import InputField from "@/components/common/input/InputField";
import { SIGNUP_MAX_ID_LENGTH, SIGNUP_MAX_PASSWORD_LENGTH } from "@/constants/signup";
import { useSignupStep2Form } from "@/lib/hooks/useSignupStep2Form";

const Page = () => {
  const router = useRouter();
  const form = useSignupStep2Form();

  return (
    <div className="flex min-h-full flex-col bg-white">
      <div className="flex flex-1 items-center justify-center">
        <section className="flex w-118 flex-col gap-12">
          <div className="flex w-full flex-col gap-16">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-title2-b text-black">회원가입</h1>
              <StepTwoInstructorIcon className="h-8 w-[85px] shrink-0" />
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
                      className="h-[58px] w-fit shrink-0 whitespace-nowrap"
                      type="button"
                      variant={
                        form.isUserIdLengthValid
                          ? "certification_primary"
                          : "certification_disabled"
                      }
                      onClick={form.handleUserIdCheck}
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
                    className="h-[58px] w-fit shrink-0 whitespace-nowrap"
                    type="button"
                    variant={
                      form.isEmailVerificationButtonEnabled
                        ? "certification_primary"
                        : "certification_disabled"
                    }
                    onClick={form.handleEmailVerificationRequest}
                  >
                    인증 번호 받기
                  </Button>
                </div>
                {form.isVerificationCodeVisible && (
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
                    onChange={form.handleVerificationCodeChange}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full items-start justify-between">
            <Button
              className="w-[232px]"
              type="button"
              variant="medium_secondary"
              onClick={() => router.push("/signup/instructor/step1")}
            >
              이전
            </Button>
            <Button
              className="w-[232px]"
              type="button"
              variant={form.isSubmitEnabled ? "medium_primary" : "medium_disabled"}
              onClick={() => router.push("/login")}
            >
              가입하기
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
