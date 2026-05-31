"use client";

import { NextButton, PrevButton } from "@/assets/icons";
import PageIndicator from "@/components/common/PageIndicator";
import CommissionsHeader from "@/components/instructor/home/CommissionsHeader";
import MatchingStatusRow from "@/components/instructor/home/MatchingStatusRow";
import { MATCHING_ITEMS_PER_PAGE } from "@/constants/home";
import { matchingStatusData } from "@/data/instructor/home";
import usePagination from "@/lib/hooks/usePagination";

const MatchingCommissionsSection = () => {
  const { current, totalPages, pageItems, handlePrev, handleNext } = usePagination(
    matchingStatusData,
    MATCHING_ITEMS_PER_PAGE,
  );

  return (
    <div className="rounded-12 w-full bg-white px-6 pt-6 pb-4">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-8">
          <span className="text-heading1-sb text-black">
            <span className="text-main-main">매칭 중</span>인 외주
          </span>
          <div>
            <CommissionsHeader rightLabel="매칭 인원">
              <p className="w-11">디데이</p>
              <p>외주명</p>
            </CommissionsHeader>
            {pageItems.map(item => (
              <MatchingStatusRow key={item.commissionId} item={item} />
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <PrevButton className="size-12 cursor-pointer" onClick={handlePrev} />
          <PageIndicator total={totalPages} current={current} />
          <NextButton className="size-12 cursor-pointer" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default MatchingCommissionsSection;
