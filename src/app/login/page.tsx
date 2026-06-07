"use client";

import Link from "next/link";
import { useState } from "react";

import { BlackLogo } from "@/shared/assets/logos";
import Button from "@/shared/ui/Button";
import InputField from "@/shared/ui/input/InputField";

const Page = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const isLoginEnabled = loginId.trim().length > 0 && password.trim().length > 0;

  return (
    <div className="flex min-h-full flex-col bg-white">
      <div className="flex flex-1 items-center justify-center">
        <section className="flex w-118 flex-col items-center gap-16">
          <BlackLogo className="h-12.5 w-40" />

          <div className="flex w-full flex-col items-center gap-18.25">
            <div className="flex w-full flex-col gap-12">
              <div className="flex w-full flex-col gap-4">
                <InputField
                  label="아이디"
                  onChange={event => setLoginId(event.target.value)}
                  placeholder="아이디를 입력해주세요"
                  value={loginId}
                />
                <InputField
                  label="비밀번호"
                  onChange={event => setPassword(event.target.value)}
                  placeholder="비밀번호를 입력해주세요"
                  showPasswordToggle
                  type="password"
                  value={password}
                />
              </div>

              <Button
                disabled={!isLoginEnabled}
                variant={isLoginEnabled ? "large_primary" : "large_disabled"}
                type="button"
              >
                로그인하기
              </Button>
            </div>

            <div className="flex flex-col items-center gap-3">
              <p className="text-body1-m text-gray-60">Ditda가 처음이신가요?</p>
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
