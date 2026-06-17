"use client";

import { useState } from "react";

import { UserTypeDesignerIcon, UserTypeInstructorIcon } from "@/shared/assets/icons";
import Button from "@/shared/ui/Button";

import type { SignupRole } from "../model/signup";
import UserTypeBtn from "./UserTypeBtn";

type UserTypeStepProps = {
  onNext: (selectedType: SignupRole) => void;
};

const UserTypeStep = ({ onNext }: UserTypeStepProps) => {
  const [selectedType, setSelectedType] = useState<SignupRole | null>(null);

  const handleNextClick = () => {
    if (selectedType == null) return;

    onNext(selectedType);
  };

  return (
    <div className="flex min-h-full flex-col bg-white">
      <div className="flex flex-1 items-center justify-center">
        <section className="flex w-118 flex-col items-end gap-12">
          <div className="flex w-full flex-col items-center gap-16">
            <div className="flex flex-col items-center gap-2">
              <p className="text-heading3-m text-main-dark">회원가입을 진행하기 전!</p>
              <h1 className="text-title2-b text-black">가입하려는 회원 유형을 선택해주세요</h1>
            </div>

            <div className="flex gap-2">
              <UserTypeBtn
                icon={<UserTypeDesignerIcon className="size-20" />}
                type="디자이너"
                description="외주를 맡고 싶어요!"
                isSelected={selectedType === "designer"}
                onClick={() => setSelectedType("designer")}
              />
              <UserTypeBtn
                icon={<UserTypeInstructorIcon className="size-20" />}
                type="강사/교사"
                description="외주를 맡기고 싶어요!"
                isSelected={selectedType === "instructor"}
                onClick={() => setSelectedType("instructor")}
              />
            </div>
          </div>

          <Button
            variant={selectedType == null ? "medium_disabled" : "medium_primary"}
            className="w-fit"
            onClick={handleNextClick}
            type="button"
          >
            다음
          </Button>
        </section>
      </div>
    </div>
  );
};

export default UserTypeStep;
