"use client";

import { useState } from "react";

import { NextButton, PrevButton } from "@/assets/icons";
import PageIndicator from "@/components/common/PageIndicator";
import DraftSubmissionStatusHeader from "@/components/instructor/home/DraftSubmissionStatusHeader";
import DraftSubmissionStatusRow from "@/components/instructor/home/DraftSubmissionStatusRow";

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
          <div>
            <DraftSubmissionStatusHeader />
            <DraftSubmissionStatusRow />
            <DraftSubmissionStatusRow />
            <DraftSubmissionStatusRow />
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
