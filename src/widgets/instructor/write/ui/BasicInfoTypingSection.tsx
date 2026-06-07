"use client";

import { BASIC_INFO_FIELDS, type BasicInfo, useWriteFormStore } from "@/features/instructor/write";
import SmallInput from "@/shared/ui/input/SmallInput";

const BasicInfoTypingSection = () => {
  const { basicInfo, setBasicInfo } = useWriteFormStore();

  const handleChange = (label: string, value: string) => {
    setBasicInfo({ ...basicInfo, [label]: value } as BasicInfo);
  };

  return (
    <div className="rounded-12 focus-within:border-purple-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-90 text-heading1-sb">기본정보 작성하기</h1>
        <h2 className="text-gray-70 text-body2-m">원하는 작업물의 종류를 선택해주세요</h2>
      </div>
      <div className="flex w-120 flex-col gap-5 p-2">
        {BASIC_INFO_FIELDS.map(({ label, placeholder }) => (
          <div key={label} className="flex flex-row justify-between">
            <div className="flex items-start self-center whitespace-nowrap">
              <span className="text-gray-80 text-body1-sb">{label}</span>
              <span className="text-red-main text-caption1-m self-start">*</span>
            </div>
            <SmallInput
              className="w-87"
              placeholder={placeholder}
              value={basicInfo[label as keyof BasicInfo]}
              onChange={e => handleChange(label, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicInfoTypingSection;
