"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";

import { CheckboxFillIcon, CheckboxGrayIcon, CloseIcon, StepOneDesignerIcon } from "@/assets/icons";
import Button from "@/components/common/Button";
import InputField from "@/components/common/input/InputField";
import {
  DESIGNER_TERMS,
  SIGNUP_MAX_NAME_LENGTH,
  SIGNUP_MAX_PHONE_NUMBER_LENGTH,
} from "@/constants/signup";

type DesignerTermsId = (typeof DESIGNER_TERMS)[number]["id"];

const CheckIcon = ({ isChecked }: { isChecked: boolean }) => {
  const Icon = isChecked ? CheckboxFillIcon : CheckboxGrayIcon;

  return <Icon className="size-4.5 shrink-0" />;
};

const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, "").slice(0, SIGNUP_MAX_PHONE_NUMBER_LENGTH);

  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;

  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
};

const createCheckedTerms = (value: boolean) =>
  Object.fromEntries(DESIGNER_TERMS.map(({ id }) => [id, value])) as Record<
    DesignerTermsId,
    boolean
  >;

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedTermId, setSelectedTermId] = useState<DesignerTermsId | null>(null);
  const [checkedTerms, setCheckedTerms] = useState<Record<DesignerTermsId, boolean>>(() =>
    createCheckedTerms(false),
  );

  const selectedTerm = DESIGNER_TERMS.find(({ id }) => id === selectedTermId);
  const isAllAgreed = DESIGNER_TERMS.every(({ id }) => checkedTerms[id]);
  const isNextEnabled = isAllAgreed && name.trim().length > 0 && phoneNumber.trim().length > 0;

  const toggleAllTerms = () => {
    const nextValue = !isAllAgreed;

    setCheckedTerms(createCheckedTerms(nextValue));
  };

  const toggleTerm = (termId: DesignerTermsId) => {
    setCheckedTerms(prev => ({ ...prev, [termId]: !prev[termId] }));
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.slice(0, SIGNUP_MAX_NAME_LENGTH));
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(event.target.value));
  };

  return (
    <div className="flex min-h-full flex-col bg-white">
      <div className="flex flex-1 items-center justify-center">
        <section className="flex w-118 flex-col gap-12">
          <div className="flex w-full flex-col gap-16">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-title2-b text-black">회원가입</h1>
              <StepOneDesignerIcon className="h-8 w-[138px] shrink-0" />
            </div>

            <div className="flex w-full flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h2 className="text-body2-r text-gray-70">약관 동의</h2>

                <div className="border-gray-30 rounded-8 flex flex-col gap-4 border bg-white p-5">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center gap-4 text-left"
                    onClick={toggleAllTerms}
                  >
                    <CheckIcon isChecked={isAllAgreed} />
                    <span className="text-heading3-sb text-gray-90">모두 동의합니다</span>
                  </button>

                  <div className="bg-gray-20 h-px w-full" />

                  <div className="flex flex-col gap-3">
                    {DESIGNER_TERMS.map(({ id, label }) => (
                      <div key={id} className="flex items-center justify-between gap-4">
                        <button
                          type="button"
                          className="flex min-w-0 cursor-pointer items-center gap-4 text-left"
                          onClick={() => toggleTerm(id)}
                        >
                          <CheckIcon isChecked={checkedTerms[id]} />
                          <span className="text-heading3-m text-gray-90">{label}</span>
                        </button>

                        <button
                          type="button"
                          className="text-body2-r text-gray-60 shrink-0 cursor-pointer underline underline-offset-2"
                          onClick={() => setSelectedTermId(id)}
                        >
                          보기
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <InputField
                label="이름"
                maxLength={SIGNUP_MAX_NAME_LENGTH}
                placeholder="이름을 입력해주세요"
                value={name}
                onClear={() => setName("")}
                onChange={handleNameChange}
              />
              <InputField
                label="전화번호"
                inputMode="numeric"
                maxLength={SIGNUP_MAX_PHONE_NUMBER_LENGTH + 2}
                placeholder="전화번호를 입력해주세요"
                type="tel"
                value={phoneNumber}
                onClear={() => setPhoneNumber("")}
                onChange={handlePhoneNumberChange}
              />
            </div>
          </div>

          <div className="flex w-full items-start justify-between">
            <Button
              className="w-[232px]"
              variant="medium_secondary"
              type="button"
              onClick={() => router.push("/signup")}
            >
              이전
            </Button>
            <Button
              className="w-[232px]"
              variant={isNextEnabled ? "medium_primary" : "medium_disabled"}
              type="button"
              onClick={() => {
                if (isNextEnabled) router.push("/signup/designer/step2");
              }}
            >
              다음
            </Button>
          </div>
        </section>
      </div>

      {selectedTerm != null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-8"
          onClick={() => setSelectedTermId(null)}
        >
          <section
            className="rounded-12 flex h-[792px] w-[612px] flex-col gap-6 bg-white px-6 py-8"
            onClick={event => event.stopPropagation()}
          >
            <header className="border-gray-20 flex items-center justify-between gap-4">
              <h2 className="text-heading2-sb text-black">{selectedTerm.modalTitle}</h2>
              <button
                type="button"
                className="text-gray-80 flex size-6 shrink-0 cursor-pointer items-center justify-center hover:text-black"
                onClick={() => setSelectedTermId(null)}
              >
                <CloseIcon aria-hidden="true" className="size-6" />
              </button>
            </header>
            <div className="bg-gray-20 h-px w-full" />
            <p className="scrollbar-hide text-body1-m text-gray-80 min-h-0 flex-1 overflow-y-auto leading-6 whitespace-pre-line">
              {selectedTerm.content}
            </p>
          </section>
        </div>
      )}
    </div>
  );
};

export default Page;
