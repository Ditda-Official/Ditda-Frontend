"use client";

import { useState } from "react";

import ConceptKeywordCard from "./ConceptKeywordCard";

const CONCEPT_CATEGORIES = [
  { title: "밝은", keywords: ["귀여운", "경쾌한", "맑은"] },
  { title: "부드러운", keywords: ["내츄럴한", "은은한", "온화한"] },
  { title: "고급스러운", keywords: ["우아한", "고상한", "모던한"] },
  { title: "강렬한", keywords: ["화려한", "다이나믹한"] },
  { title: "단정한", keywords: ["점잖은"] },
];

const MAX_SELECT = 2;

const DesignConceptSection = () => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const handleSelect = (keyword: string) => {
    setSelectedKeywords(prev => {
      if (prev.includes(keyword)) {
        return prev.filter(k => k !== keyword);
      }
      if (prev.length >= MAX_SELECT) {
        return prev;
      }
      return [...prev, keyword];
    });
  };

  return (
    <div className="rounded-12 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div>
        <h1 className="text-heading1-sb text-gray-90 pb-2">디자인 컨셉</h1>
        <h2 className="text-gray-70 text-body2-m">
          원하는 컨셉의 태그를 두가지 선택하거나 직접 작성해주세요
        </h2>
      </div>
      <div className="bg-gray-10 text-gray-80 text-body1-m rounded-48 px-8 py-2 text-center">
        작업물이 컨셉으로 되면 좋겠어요
      </div>
      <div className="flex flex-row gap-6">
        {CONCEPT_CATEGORIES.map(({ title, keywords }) => (
          <ConceptKeywordCard
            key={title}
            title={title}
            keywords={keywords}
            selectedKeywords={selectedKeywords}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default DesignConceptSection;
