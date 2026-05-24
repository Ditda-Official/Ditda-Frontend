"use client";

import { useState } from "react";

import AccordionMenu from "@/components/common/AccordionMenu";
import Radio from "@/components/common/Radio";

const CATEGORIES = [
  { label: "홍보물", items: ["교재 외지/내지", "대봉투"] },
  { label: "유인물", items: [] },
  { label: "퍼스널 브랜딩", items: [] },
];

const CategorySection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="rounded-12 flex flex-col gap-8 bg-white p-6">
      <div>
        <h1 className="text-gray-90 text-heading1-sb pb-2">카테고리</h1>
        <h2 className="text-gray-70 text-body2-m">원하는 작업물의 종류를 선택해주세요</h2>
      </div>
      <div>
        <div className="flex w-fit flex-row gap-8 px-4">
          {CATEGORIES.map((category, index) => (
            <AccordionMenu
              key={category.label}
              label={category.label}
              selected={selected === index}
              onClick={() =>
                category.items.length > 0 && setSelected(selected === index ? null : index)
              }
            />
          ))}
        </div>
        <div
          className={`grid transition-all duration-300 ease-in-out ${selected !== null ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr] pt-0"}`}
        >
          <div className="overflow-hidden">
            <hr className="border-gray-10" />
            <div className="flex flex-row gap-6 px-4 pt-6">
              {selected !== null &&
                CATEGORIES[selected].items.map(item => (
                  <Radio key={item} name="category-item" value={item}>
                    {item}
                  </Radio>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
