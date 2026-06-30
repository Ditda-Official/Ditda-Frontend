"use client";

import { useEffect, useRef, useState } from "react";

import {
  CONCEPT_CATEGORIES,
  ConceptKeywordCard,
  MAX_CONCEPT_SELECT,
  useWriteFormStore,
} from "@/features/instructor/write";
import ConceptResult from "@/features/instructor/write/ui/ConceptResult";
import { ArrowDownIcon, ExclamationMarkCircleIcon } from "@/shared/assets/icons";
import TextField from "@/shared/ui/input/TextField";
import Toast from "@/shared/ui/Toast";

const LIMIT_TOAST_MESSAGE =
  "컨셉은 5개까지 선택할 수 있습니다. 추가적인 내용은 하단 토글을 열어 작성해주세요.";

const DesignConceptSection = () => {
  const { selectedKeywords, setSelectedKeywords, additionalConcept, setAdditionalConcept } =
    useWriteFormStore();
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);
  const [showLimitToast, setShowLimitToast] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const handleSelect = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else if (selectedKeywords.length < MAX_CONCEPT_SELECT) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    } else {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      setShowLimitToast(true);
      toastTimeoutRef.current = setTimeout(() => setShowLimitToast(false), 2500);
    }
  };

  const handleRemove = (keyword: string) => {
    setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
  };

  return (
    <div className="rounded-12 focus-within:border-gray-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <Toast
        message={LIMIT_TOAST_MESSAGE}
        show={showLimitToast}
        className="fixed top-4 left-[calc(50%+var(--sidebar-w,0)/2)] w-235 -translate-x-1/2"
      />
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
      <ConceptResult selectedKeywords={selectedKeywords} onRemove={handleRemove} />
      <div className="border-t-gray-20 flex flex-col gap-2 border-t pt-3 pb-1">
        <div className="flex flex-row items-center gap-1">
          <ExclamationMarkCircleIcon className="text-blue-main size-5 shrink-0" />
          <p className="text-gray-70 text-body1-sb">
            원하는 컨셉이 없거나 추가로 반영할 내용이 있다면 직접 입력할 수 있어요
          </p>
          <ArrowDownIcon
            className={`text-gray-70 size-6 cursor-pointer transition-transform ${isAdditionalOpen ? "rotate-180" : ""}`}
            onClick={() => setIsAdditionalOpen(prev => !prev)}
          />
        </div>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
            isAdditionalOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <TextField
              placeholder="1번 사진은 선생님 개인 프로필 사진입니다. 저자의 말 페이지에 활용해주세요."
              value={additionalConcept}
              onChange={e => setAdditionalConcept(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignConceptSection;
