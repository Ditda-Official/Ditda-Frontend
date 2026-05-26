"use client";

import { useState } from "react";

import AccordionMenu from "@/components/common/AccordionMenu";
import Radio from "@/components/common/Radio";
import { CATEGORIES } from "@/constants/write";
import { useWriteForm } from "@/context/WriteFormContext";

const CategorySection = () => {
  const { selectedCategory, setSelectedCategory } = useWriteForm();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    <div className="rounded-12 focus-within:border-purple-40 flex flex-col gap-8 border border-transparent bg-white p-6">
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
        <div className="flex w-fit flex-row gap-8 px-4">
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
            <hr className="border-gray-10" />
            <div className="flex flex-row gap-6 px-4 pt-6">
              {openIndex !== null &&
                CATEGORIES[openIndex].items.map(item => (
                  <Radio
                    key={item}
                    name="category-item"
                    value={item}
                    checked={selectedCategory?.item === item}
                    onChange={() => setSelectedCategory({ categoryIndex: openIndex, item })}
                  >
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
