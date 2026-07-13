import type { CSSProperties } from "react";

import { CATEGORY_DISPLAY_MAP } from "@/features/designer/home";
import {
  CONCEPT_CATEGORIES,
  KEYWORD_API_MAP,
  SIZE_DIMENSIONS_MAP,
} from "@/features/instructor/write";
import type { CommissionDetail } from "@/shared/api/commissionTypes";
import Chip from "@/shared/ui/Chip";
import Tag from "@/shared/ui/Tag";

type DesignInfoTabProps = Pick<CommissionDetail, "category" | "designInfo">;

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

const DesignInfoTab = ({ category, designInfo }: DesignInfoTabProps) => {
  const { pageSize, concepts, additionalConcept, colorSelectionMode, colors } = designInfo;
  const dimensions = SIZE_DIMENSIONS_MAP[pageSize];

  return (
    <div className="flex flex-col items-start gap-7">
      <InfoBlock label="카테고리" value={CATEGORY_DISPLAY_MAP[category] ?? category} />
      <hr className="border-gray-20 w-full" />
      <InfoBlock label="사이즈" value={`${pageSize}${dimensions ? ` ${dimensions}` : ""}`} />
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
                    const isSelected = concepts.includes(KEYWORD_API_MAP[keyword]);

                    return (
                      <Chip
                        key={keyword}
                        label={keyword}
                        variant="long"
                        className="h-8.5 w-35"
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
          <p className="text-body1-m text-gray-80">
            {additionalConcept || "작성된 추가 요청사항이 없습니다"}
          </p>
        </div>
      </section>

      <hr className="border-gray-20 w-full" />

      <section className="flex w-full flex-col items-start gap-5 pb-10">
        <h3 className="text-caption1-sb text-gray-70">색상</h3>
        {colorSelectionMode === "USER_SELECTED" ? (
          <div className="flex gap-4">
            {colors.map(({ role, colorCode }) => (
              <div key={role} className="flex flex-col items-center gap-5.5">
                <div
                  className="rounded-8 border-gray-20 relative size-25 border bg-(--swatch-color)/10"
                  style={{ "--swatch-color": colorCode } as CSSProperties}
                >
                  {role === "MAIN" && (
                    <div className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[50%]">
                      <Tag variant="default" label="Main" />
                    </div>
                  )}
                </div>
                <span className="text-body2-m text-gray-70">{colorCode}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-heading3-sb text-gray-80 pb-12">컨셉에 맞춰 자유롭게 진행해주세요.</p>
        )}
      </section>
    </div>
  );
};

export default DesignInfoTab;
