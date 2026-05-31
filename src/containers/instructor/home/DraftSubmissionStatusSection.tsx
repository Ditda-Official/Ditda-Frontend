"use client";

import { useState } from "react";

import { NextButton, PrevButton } from "@/assets/icons";
import PageIndicator from "@/components/common/PageIndicator";

const TOTAL_PAGES = 2;

const DraftSubmissionStatusSection = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => setCurrent(prev => Math.max(0, prev - 1));
  const handleNext = () => setCurrent(prev => Math.min(TOTAL_PAGES - 1, prev + 1));

  return (
    <div className="rounded-12 w-full bg-white px-6 pt-6 pb-4">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-8">
          <span className="text-heading1-sb text-black">
            <span className="text-main-main">시안 제출</span> 현황
          </span>
          <div className="text-gray-70 text-caption1-r border-b-gray-10 flex flex-row justify-between border-b pb-3 whitespace-nowrap">
            <div className="flex shrink-0 flex-row gap-6">
              <p className="w-11">디데이</p>
              <p className="w-20">카테고리</p>
              <p className="w-full">외주명</p>
            </div>
            <p className="w-53">시안 제출자 수</p>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <PrevButton className="size-12 cursor-pointer" onClick={handlePrev} />
          <PageIndicator total={TOTAL_PAGES} current={current} />
          <NextButton className="size-12 cursor-pointer" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default DraftSubmissionStatusSection;
