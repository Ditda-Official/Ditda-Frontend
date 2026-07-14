"use client";

import { useShallow } from "zustand/react/shallow";

import { PAGE_OPTIONS, useWriteFormStore } from "@/features/instructor/write";
import Chip from "@/shared/ui/Chip";
import TextField from "@/shared/ui/input/TextField";

const NecessaryPageChooseSection = () => {
  const { selectedPages, setSelectedPages, pageDescriptions, setPageDescription } =
    useWriteFormStore(
      useShallow(s => ({
        selectedPages: s.selectedPages,
        setSelectedPages: s.setSelectedPages,
        pageDescriptions: s.pageDescriptions,
        setPageDescription: s.setPageDescription,
      })),
    );

  const togglePage = (label: string) => {
    if (selectedPages.includes(label)) {
      setSelectedPages(selectedPages.filter(p => p !== label));
    } else {
      setSelectedPages([...selectedPages, label]);
    }
  };

  const hasSelected = selectedPages.length > 0;

  return (
    <div className="rounded-12 focus-within:border-gray-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row">
            <h1 className="text-heading1-sb text-gray-90">외주 맡길 페이지 선택하기</h1>
            <span className="text-red-main text-caption1-m self-start">*</span>
          </div>
          <p className="text-gray-60 text-body2-m">복수 선택 가능</p>
        </div>
        <h2 className="text-body2-m text-gray-70">
          선택한 페이지에 대한 페이지 별 추가 디자인 요청사항과 원하시는 레이아웃이 있다면
          작성해주세요.
        </h2>
      </div>
      <div className="flex w-fit flex-row gap-4">
        {PAGE_OPTIONS.map(label => (
          <Chip
            key={label}
            label={label}
            isSelected={selectedPages.includes(label)}
            onClick={() => togglePage(label)}
          />
        ))}
      </div>
      <hr className="border-gray-20 w-full border-t" />
      <div className="flex flex-col gap-2">
        <h1 className="text-heading1-sb text-gray-90">레이아웃 및 디자인 요청사항 (선택)</h1>
      </div>
      {hasSelected ? (
        <div className="grid grid-cols-2 gap-6">
          {PAGE_OPTIONS.filter(label => selectedPages.includes(label)).map(label => (
            <div key={label} className="flex flex-col gap-2">
              <p className="text-body1-sb text-gray-80">
                {label} <span className="text-gray-70">레이아웃</span>
              </p>
              <TextField
                maxLength={150}
                placeholder="예) 2단으로 구성해주세요"
                variant="white"
                value={pageDescriptions[label] ?? ""}
                onChange={e => setPageDescription(label, e.target.value)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-60 text-body1-sb py-4">
          상단에서 외주 맡길 페이지를 우선 선택해주세요
        </p>
      )}
    </div>
  );
};

export default NecessaryPageChooseSection;
