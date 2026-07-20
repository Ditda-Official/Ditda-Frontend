"use client";

import Link from "next/link";

import { useLoginForm } from "@/features/login/model/useLoginForm";
import { BlackLogo } from "@/shared/assets/logos";
import Button from "@/shared/ui/Button";
import InputField from "@/shared/ui/input/InputField";

const Page = () => {
  const form = useLoginForm();

  return (
    <div className="flex min-h-full flex-col bg-white">
      <div className="flex flex-1 items-center justify-center">
        <section className="flex w-118 flex-col items-center gap-16">
          <BlackLogo className="h-12.5 w-40" />

          <div className="flex w-full flex-col items-center gap-18.25">
            <form
              className="flex w-full flex-col gap-12"
              onSubmit={event => void form.onSubmit(event)}
            >
              <div className="flex w-full flex-col gap-4">
                <InputField
                  label="아이디"
                  onChange={form.handleUsernameChange}
                  onClear={form.clearUsername}
                  placeholder="아이디를 입력해주세요"
                  value={form.username}
                />
                <InputField
                  label="비밀번호"
                  onChange={form.handlePasswordChange}
                  placeholder="비밀번호를 입력해주세요"
                  showPasswordToggle
                  type="password"
                  value={form.password}
                />
              </div>

              <div className="flex w-full flex-col items-center gap-2">
                <Button
                  disabled={!form.isLoginEnabled}
                  variant={form.isLoginEnabled ? "large_primary" : "large_disabled"}
                  type="submit"
                >
                  {form.isSubmitting ? "로그인 중" : "로그인하기"}
                </Button>
                {form.errorMessage != null && (
                  <p className="text-caption1-m text-red-main text-center">{form.errorMessage}</p>
                )}
              </div>
            </form>

            <div className="flex flex-col items-center gap-3">
              <p className="text-body1-m text-gray-60">ditda가 처음이신가요?</p>
              <Link
                className="text-heading3-sb text-gray-70 cursor-pointer underline"
                href="/signup"
              >
                회원가입하기
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
