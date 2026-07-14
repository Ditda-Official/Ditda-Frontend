"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { CATEGORIES, useWriteFormStore } from "@/features/instructor/write";
import AccordionMenu from "@/shared/ui/AccordionMenu";
import Radio from "@/shared/ui/Radio";

const CategorySection = () => {
  const { selectedCategory, setSelectedCategory } = useWriteFormStore(
    useShallow(s => ({
      selectedCategory: s.selectedCategory,
      setSelectedCategory: s.setSelectedCategory,
    })),
  );
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleCategoryClick = (index: number) => {
    if (CATEGORIES[index].items.length === 0) return;
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
      if (selectedCategory?.categoryIndex !== index) setSelectedCategory(null);
    }
  };

  const selectedLabel = selectedCategory
    ? `${CATEGORIES[selectedCategory.categoryIndex].label} > ${selectedCategory.item}`
    : null;

  return (
    <div
      className={`rounded-12 focus-within:border-gray-40 flex flex-col gap-8 border bg-white px-6 pt-6 ${openIndex !== null ? "border-gray-40 pb-6" : "border-transparent pb-0"}`}
    >
      <div>
        <div className="flex flex-row items-center justify-between pb-2">
          <h1 className="text-gray-90 text-heading1-sb">카테고리</h1>
          {selectedLabel && (
            <div className="rounded-4 bg-purple-10 flex h-7 items-center px-2">
              <span className="text-body2-m text-gray-90">{selectedLabel}</span>
            </div>
          )}
        </div>
        <h2 className="text-gray-70 text-body2-m">원하는 작업물의 종류를 선택해주세요</h2>
      </div>
      <div>
        <div
          className={`border-gray-30 flex w-full flex-row gap-16 border-t px-4 py-3 ${openIndex !== null ? "border-b" : ""}`}
        >
          {CATEGORIES.map((category, index) => (
            <AccordionMenu
              key={category.label}
              label={category.label}
              selected={openIndex === index}
              onClick={() => handleCategoryClick(index)}
            />
          ))}
        </div>
        <div
          className={`grid transition-all duration-300 ease-in-out ${openIndex !== null ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr] pt-0"}`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-row flex-wrap gap-8 px-4 py-2">
              {openIndex !== null &&
                CATEGORIES[openIndex].items.map(item => (
                  <div key={item} className="w-36 shrink-0">
                    <Radio
                      name="category-item"
                      value={item}
                      checked={selectedCategory?.item === item}
                      disabled={item !== "교재 외지/내지"}
                      labelClassName={
                        item === "교재 외지/내지"
                          ? "text-body1-m text-gray-90 cursor-pointer"
                          : "text-body1-m text-gray-60 cursor-not-allowed"
                      }
                      onChange={() => setSelectedCategory({ categoryIndex: openIndex, item })}
                    >
                      {item}
                    </Radio>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
