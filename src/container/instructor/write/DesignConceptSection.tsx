"use client";

import Chip from "@/components/common/Chip";
import TextField from "@/components/input/TextField";
import { CONCEPT_CATEGORIES, MAX_CONCEPT_SELECT } from "@/constants/write";
import ConceptKeywordCard from "@/container/instructor/write/ConceptKeywordCard";
import { useWriteForm } from "@/context/WriteFormContext";

const DesignConceptSection = () => {
  const { selectedKeywords, setSelectedKeywords } = useWriteForm();

  const handleSelect = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else if (selectedKeywords.length < MAX_CONCEPT_SELECT) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleRemove = (keyword: string) => {
    setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
  };

  return (
    <div className="rounded-12 focus-within:border-purple-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div>
        <h1 className="text-heading1-sb text-gray-90 pb-2">디자인 컨셉</h1>
        <h2 className="text-gray-70 text-body2-m">
          원하는 컨셉의 태그를 두가지 선택하거나 직접 작성해주세요
        </h2>
      </div>
      <div className="bg-gray-10 rounded-48 flex h-13.5 items-center justify-center gap-2 px-8 py-2">
        <span className="text-gray-80 text-body1-m shrink-0">작업물이</span>
        <div className="flex items-center gap-2">
          {Array.from({ length: MAX_CONCEPT_SELECT }).map((_, i) => {
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
