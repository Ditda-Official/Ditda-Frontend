"use client";

import { useState } from "react";

import { CONCEPT_CATEGORIES } from "@/features/instructor/write";
import Chip from "@/shared/ui/Chip";
import Menu from "@/shared/ui/Menu";

const MENU_LABELS = ["디자인 정보", "작업 요청사항", "자료 및 레퍼런스"] as const;

const CommissionDetailSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-xl bg-white px-6">
      <div className="border-gray-40 flex shrink-0 gap-4 border-b pt-2">
        {MENU_LABELS.map((label, index) => (
          <Menu
            key={label}
            label={label}
            selected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
      <div className="flex min-h-0 flex-1 flex-col py-7">
        <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <h3 className="text-gray-70 text-caption1-sb">카테고리</h3>
              <p className="text-gray-80 text-heading3-sb">교재 외지/내지</p>
            </div>
            <hr className="border-gray-20" />
            <div className="flex flex-col gap-2">
              <h3 className="text-gray-70 text-caption1-sb">사이즈</h3>
              <p className="text-gray-80 text-heading3-sb">A4 (210x297mm)</p>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-gray-70 text-caption1-sb">디자인 컨셉</h3>
              <div className="flex flex-row gap-12">
                {CONCEPT_CATEGORIES.map(({ title, keywords }) => (
                  <div key={title} className="flex flex-col gap-4 bg-white">
                    <h1 className="text-gray-80 text-body2-sb">{title}</h1>
                    <div className="flex w-full flex-col gap-2">
                      {keywords.map(keyword => (
                        <Chip
                          key={keyword}
                          label={keyword}
                          variant="long"
                          className="w-35"
                          disabled
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-gray-70 text-caption1-sb border-gray-30 inline-block w-fit border-b pb-1">
                추가 요청사항
              </h3>
              <div className="text-gray-80 text-body1-m h-30.5 pt-3 pb-3">
                이건 이게 좋고요 저건 저게 좋고 이것은 이렇게 이렇게 해주세요이건 이게 좋고요 저건
                저게 좋고 이것은 이렇게 이렇게 해주세요이건 이게 좋고요 저건 저게 좋것은 이렇게
                이렇게 해주세요이건 이게 좋고요 저건 저게 좋고 이것은 이렇게 이렇게 해주세요이건
                이게 좋고요 저건 저게 좋고 이것은 이렇게 이렇게 해주세요이건 이게 좋고요 저건 저게
                좋고 이것은 이렇게 이렇게 해주세요이건 이게 좋고요 저건 저게 좋고 이것은 이렇게
                이렇게 해주세요이건 이게 좋고요 저건 저게 좋고 이것은 이렇게 이렇게 해주세요이건
                이게 좋고요 저건 저게 좋고 이
              </div>
            </div>
            <hr className="border-gray-20" />
            <div className="flex flex-col gap-2">
              <h3 className="text-gray-70 text-caption1-sb">색상</h3>
              <p className="text-gray-80 text-heading3-sb pb-12">
                컨셉에 맞춰 자유롭게 진행해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionDetailSection;
