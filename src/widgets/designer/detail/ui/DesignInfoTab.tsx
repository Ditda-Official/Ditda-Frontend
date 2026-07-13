import type { CSSProperties } from "react";

import Chip from "@/shared/ui/Chip";
import Tag from "@/shared/ui/Tag";

const CONCEPT_CATEGORIES = [
  { title: "질감", keywords: ["입체감 있는", "평면적인", "거친", "매끈한"] },
  { title: "레이아웃", keywords: ["정돈된", "역동적인", "여백이 많은", "꽉 찬"] },
  { title: "형태", keywords: ["둥근", "각진", "자유로운", "기하학적인"] },
  { title: "색감", keywords: ["화려한", "차분한", "밝은", "어두운"] },
  { title: "무드", keywords: ["귀여운", "시크한", "감성적인", "전문적인"] },
] as const;

type DesignInfo = {
  category: string;
  size: string;
  selectedConcepts: string[];
  additionalRequest: string;
  colors: { role?: string; code: string; background: string }[];
};

interface DesignInfoTabProps {
  designInfo: DesignInfo;
}

const InfoBlock = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <h3 className="text-caption1-sb text-gray-70">{label}</h3>
      <p className="text-heading3-sb text-gray-80">{value}</p>
    </div>
  );
};

const UnderlineTitle = ({ children }: { children: string }) => {
  return (
    <h3 className="border-gray-30 text-body1-sb text-gray-70 inline-block w-fit border-b pb-1">
      {children}
    </h3>
  );
};

const DesignInfoTab = ({ designInfo }: DesignInfoTabProps) => {
  return (
    <div className="flex flex-col items-start gap-7">
      <InfoBlock label="카테고리" value={designInfo.category} />
      <hr className="border-gray-20 w-full" />
      <InfoBlock label="사이즈" value={designInfo.size} />
      <hr className="border-gray-20 w-full" />

      <section className="flex w-full flex-col items-start gap-7">
        <div className="flex w-full flex-col items-start gap-5">
          <h3 className="text-heading3-sb text-gray-80">디자인 컨셉</h3>
          <div className="grid w-full grid-cols-5 gap-12">
            {CONCEPT_CATEGORIES.map(({ title, keywords }) => (
              <div key={title} className="flex flex-col items-start gap-4">
                <h4 className="text-body2-sb text-gray-80">{title}</h4>
                <div className="flex w-full flex-col gap-2">
                  {keywords.map(keyword => {
                    const isSelected = designInfo.selectedConcepts.includes(keyword);

                    return (
                      <Chip
                        key={keyword}
                        label={keyword}
                        variant="long"
                        className="h-[34px] w-35"
                        isSelected={isSelected}
                        disabled={!isSelected}
                        disableHover
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-3">
          <UnderlineTitle>추가 요청사항</UnderlineTitle>
          <p className="text-body1-m text-gray-80">{designInfo.additionalRequest}</p>
        </div>
      </section>

      <hr className="border-gray-20 w-full" />

      <section className="flex w-full flex-col items-start gap-5 pb-10">
        <h3 className="text-caption1-sb text-gray-70">색상</h3>
        <div className="flex gap-4">
          {designInfo.colors.map(({ role, code, background }, index) => (
            <div key={`${code}-${index}`} className="flex flex-col items-center gap-5.5">
              <div
                className="rounded-8 border-gray-20 relative size-25 border"
                style={{ backgroundColor: background } as CSSProperties}
              >
                {role && (
                  <div className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[50%]">
                    <Tag variant="default" label={role} />
                  </div>
                )}
              </div>
              <span className="text-body2-m text-gray-70">{code}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DesignInfoTab;
