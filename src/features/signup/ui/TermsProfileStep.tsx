"use client";

import { type ChangeEvent, type ReactNode, useState } from "react";

import {
  SIGNUP_MAX_NAME_LENGTH,
  SIGNUP_MAX_PHONE_NUMBER_LENGTH,
  type SignupTermContent,
} from "@/features/signup/config/signup";
import type { SignupProfileData, SignupTermType } from "@/features/signup/model/signup";
import { signupProfileSchema } from "@/features/signup/model/signupSchemas";
import { CheckboxFillIcon, CheckboxGrayIcon, CloseIcon } from "@/shared/assets/icons";
import Button from "@/shared/ui/Button";
import InputField from "@/shared/ui/input/InputField";

type SignupTerm = {
  id: SignupTermType;
  label: string;
  modalTitle: string;
  content: SignupTermContent;
  version: string;
};

type TermsProfileStepProps = {
  terms: readonly SignupTerm[];
  progressIcon: ReactNode;
  initialData?: SignupProfileData;
  onPrev: () => void;
  onNext: (data: SignupProfileData) => void;
};

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

const createCheckedTerms = (
  terms: readonly SignupTerm[],
  value: boolean,
): Record<SignupTermType, boolean> =>
  Object.fromEntries(terms.map(({ id }) => [id, value])) as Record<SignupTermType, boolean>;

const createInitialCheckedTerms = (
  terms: readonly SignupTerm[],
  initialData: SignupProfileData | undefined,
) =>
  Object.fromEntries(
    terms.map(({ id }) => [
      id,
      initialData?.terms.some(term => term.type === id && term.isAgreed) ?? false,
    ]),
  ) as Record<SignupTermType, boolean>;

const isTermArticleHeading = (heading: string) => heading.startsWith("제");

const TermContentViewer = ({ content }: { content: SignupTermContent }) => {
  return (
    <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
      <div className="flex flex-col gap-6">
        {content.sections.map(section => {
          const isArticleSection = isTermArticleHeading(section.heading);
          const ListTag = isArticleSection ? "ol" : "ul";
          const listStyleClassName = isArticleSection ? "list-decimal" : "list-disc";

          return (
            <section key={section.heading} className="flex flex-col gap-2">
              <h4 className="text-heading1-b text-black">{section.heading}</h4>

              {section.items != null && (
                <ListTag className={`flex ${listStyleClassName} flex-col pl-6`}>
                  {section.items.map(item => (
                    <li key={item.text} className="text-body1-m text-gray-90">
                      <p>{item.text}</p>

                      {item.subItems != null && (
                        <ul className="flex flex-col gap-1">
                          {item.subItems.map(subItem => (
                            <li key={subItem}>{subItem}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ListTag>
              )}

              {section.paragraphs?.map(paragraph => (
                <p key={paragraph} className="text-body1-m text-gray-90">
                  {paragraph}
                </p>
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
};

const TermsProfileStep = ({
  terms,
  progressIcon,
  initialData,
  onPrev,
  onNext,
}: TermsProfileStepProps) => {
  const [name, setName] = useState(initialData?.name ?? "");
  const [phoneNumber, setPhoneNumber] = useState(
    initialData != null ? formatPhoneNumber(initialData.phone) : "",
  );
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [checkedTerms, setCheckedTerms] = useState<Record<SignupTermType, boolean>>(() =>
    createInitialCheckedTerms(terms, initialData),
  );

  const selectedTerm = terms.find(({ id }) => id === selectedTermId);
  const isAllAgreed = terms.every(({ id }) => checkedTerms[id]);
  const profileData = {
    name: name.trim(),
    phone: phoneNumber.replace(/\D/g, ""),
    terms: terms.map(({ id, version }) => ({
      type: id,
      version,
      isAgreed: checkedTerms[id],
    })),
  };
  const parsedProfileData = signupProfileSchema.safeParse(profileData);
  const isNextEnabled = parsedProfileData.success;

  const toggleAllTerms = () => {
    const nextValue = !isAllAgreed;

    setCheckedTerms(createCheckedTerms(terms, nextValue));
  };

  const toggleTerm = (termId: SignupTermType) => {
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
              {progressIcon}
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
                    {terms.map(({ id, label }) => (
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
            <Button className="w-58" variant="medium_secondary" type="button" onClick={onPrev}>
              이전
            </Button>
            <Button
              className="w-58"
              variant={isNextEnabled ? "medium_primary" : "medium_disabled"}
              type="button"
              onClick={() => {
                if (parsedProfileData.success) onNext(parsedProfileData.data);
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
            className="rounded-12 flex h-198 w-153 flex-col gap-6 bg-white px-6 py-8"
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
            <TermContentViewer content={selectedTerm.content} />
          </section>
        </div>
      )}
    </div>
  );
};

export default TermsProfileStep;
