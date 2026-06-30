"use client";

import {
  CONCEPT_CATEGORIES,
  ConceptKeywordCard,
  MAX_CONCEPT_SELECT,
  useWriteFormStore,
} from "@/features/instructor/write";
import Chip from "@/shared/ui/Chip";
import TextField from "@/shared/ui/input/TextField";

const DesignConceptSection = () => {
  const { selectedKeywords, setSelectedKeywords, additionalConcept, setAdditionalConcept } =
    useWriteFormStore();

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
    <div className="rounded-12 focus-within:border-gray-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div>
        <h1 className="text-heading1-sb text-gray-90 pb-2">디자인 컨셉</h1>
        <h2 className="text-gray-70 text-body2-m">최대 5개까지 자유롭게 선택할 수 있어요</h2>
      </div>

      <div className="flex flex-row justify-center gap-12">
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
        <TextField
          placeholder="원하는 컨셉이 있다면 적어주세요. (선택사항)"
          value={additionalConcept}
          onChange={e => setAdditionalConcept(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DesignConceptSection;
