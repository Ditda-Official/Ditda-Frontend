import {
  CONCEPT_CATEGORIES,
  KEYWORD_API_MAP,
  SIZE_DIMENSIONS_MAP,
} from "@/features/designer/detail";
import { CATEGORY_DISPLAY_MAP } from "@/features/designer/home";
import type { CommissionDesignInfo } from "@/shared/api/commissionTypes";
import Chip from "@/shared/ui/Chip";
import Tag from "@/shared/ui/Tag";

interface DesignInfoTabProps {
  category: string;
  designInfo: CommissionDesignInfo;
}

const DesignInfoTab = ({ category, designInfo }: DesignInfoTabProps) => {
  const { pageSize, concepts, additionalConcept, colorSelectionMode, colors } = designInfo;
  const dimensions = SIZE_DIMENSIONS_MAP[pageSize];

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <h3 className="text-gray-70 text-caption1-sb">카테고리</h3>
        <p className="text-gray-80 text-heading3-sb">
          {CATEGORY_DISPLAY_MAP[category] ?? category}
        </p>
      </div>
      <hr className="border-gray-20" />
      <div className="flex flex-col gap-2">
        <h3 className="text-gray-70 text-caption1-sb">사이즈</h3>
        <p className="text-gray-80 text-heading3-sb">
          {pageSize}
          {dimensions ? ` ${dimensions}` : ""}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <h3 className="text-gray-80 text-heading3-sb">디자인 컨셉</h3>
        <div className="flex flex-row gap-12">
          {CONCEPT_CATEGORIES.map(({ title, keywords }) => (
            <div key={title} className="flex flex-col gap-4 bg-white">
              <h1 className="text-gray-80 text-body2-sb">{title}</h1>
              <div className="flex w-full flex-col gap-2">
                {keywords.map(keyword => {
                  const isSelected = concepts.includes(KEYWORD_API_MAP[keyword]);

                  return (
                    <Chip
                      key={keyword}
                      label={keyword}
                      variant="long"
                      className="w-35"
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
      <div className="flex flex-col">
        <h3 className="text-gray-70 text-body1-sb border-gray-30 inline-block w-fit border-b pb-1">
          추가 요청사항
        </h3>
        <div className="text-gray-80 text-body1-m pt-3 pb-3">
          {additionalConcept || "작성된 추가 요청사항이 없습니다"}
        </div>
      </div>
      <hr className="border-gray-20" />
      <div
        className={`flex flex-col ${colorSelectionMode === "USER_SELECTED" ? "gap-5" : "gap-2"}`}
      >
        <h3 className="text-gray-70 text-caption1-sb">색상</h3>
        {colorSelectionMode === "USER_SELECTED" ? (
          <div className="flex gap-4 pb-10">
            {colors.map(({ role, colorCode }) => (
              <div key={role} className="flex flex-col gap-5.5">
                <div
                  className="rounded-8 border-gray-20 relative size-25 bg-(--swatch-color)/10"
                  style={{ "--swatch-color": colorCode } as React.CSSProperties}
                >
                  {role === "MAIN" && (
                    <div className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[50%]">
                      <Tag variant="default" label="Main" />
                    </div>
                  )}
                </div>
                <span className="text-gray-70 text-body2-m text-center">{colorCode}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-80 text-heading3-sb pb-12">컨셉에 맞춰 자유롭게 진행해주세요.</p>
        )}
      </div>
    </div>
  );
};

export default DesignInfoTab;
