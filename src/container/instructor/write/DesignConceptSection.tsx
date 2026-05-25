"use client";

import { useState } from "react";

import Chip from "@/components/common/Chip";
import TextField from "@/components/input/TextField";
import ConceptKeywordCard from "@/container/instructor/write/ConceptKeywordCard";

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

  const handleRemove = (keyword: string) => {
    setSelectedKeywords(prev => prev.filter(k => k !== keyword));
  };

  return (
    <div className="rounded-12 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div>
        <h1 className="text-heading1-sb text-gray-90 pb-2">디자인 컨셉</h1>
        <h2 className="text-gray-70 text-body2-m">
          원하는 컨셉의 태그를 두가지 선택하거나 직접 작성해주세요
        </h2>
      </div>
      <div className="bg-gray-10 rounded-48 flex h-13.5 items-center justify-center gap-2 px-8 py-2">
        <span className="text-gray-80 text-body1-m shrink-0">작업물이</span>
        <div className="flex items-center gap-2">
          {Array.from({ length: MAX_SELECT }).map((_, i) => {
            const keyword = selectedKeywords[i];
            return keyword != null ? (
              <Chip
                key={keyword}
                label={keyword}
                variant="removable"
                onRemove={() => handleRemove(keyword)}
              />
            ) : (
              <div key={i} className="rounded-100 h-9.5 w-14.5 bg-white" />
            );
          })}
        </div>
        <span className="text-gray-80 text-body1-m shrink-0">컨셉으로 되면 좋겠어요</span>
      </div>
      <div className="flex flex-row justify-center gap-6">
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
      <div className="flex flex-col gap-2">
        <h3 className="text-gray-70 text-body1-sb">컨셉 추가 요청</h3>
        <TextField placeholder="원하는 컨셉이 있다면 적어주세요. (선택사항)" />
      </div>
    </div>
  );
};

export default DesignConceptSection;
