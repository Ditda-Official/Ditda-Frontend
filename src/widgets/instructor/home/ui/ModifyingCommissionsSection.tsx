"use client";

import { useEffect, useState } from "react";

import {
  CommissionsHeader,
  getRevisions,
  ModifyingCommissionsRow,
  type ModifyingItem,
} from "@/features/instructor/home";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import usePagination from "@/shared/lib/hooks/usePagination";
import PageIndicator from "@/shared/ui/PageIndicator";
import { MODIFYING_ITEMS_PER_PAGE } from "@/widgets/instructor/home/config/home";

const ModifyingCommissionsSection = () => {
  const [items, setItems] = useState<ModifyingItem[]>([]);

  useEffect(() => {
    getRevisions().then(setItems);
  }, []);

  const { current, totalPages, pageItems, handlePrev, handleNext } = usePagination(
    items,
    MODIFYING_ITEMS_PER_PAGE,
  );

  return (
    <div className="rounded-12 h-94.5 w-full bg-white px-6 pt-6 pb-4">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-8">
          <span className="text-heading1-sb text-black">
            <span className="text-main-main">수정 중</span>인 외주
          </span>
          <div>
            <CommissionsHeader rightLabel="작업 단계" rightClassName="w-20">
              <p className="w-11">디데이</p>
              <p>외주명</p>
            </CommissionsHeader>
            {pageItems.map(item => (
              <ModifyingCommissionsRow key={item.commissionId} item={item} />
            ))}
          </div>
        </div>
        {pageItems.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <span className="text-heading3-m text-gray-60">진행중인 외주가 없습니다</span>
          </div>
        ) : (
          <div className="flex flex-row justify-between">
            <PrevButton className="size-12 cursor-pointer" onClick={handlePrev} />
            <PageIndicator total={totalPages} current={current} />
            <NextButton className="size-12 cursor-pointer" onClick={handleNext} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyingCommissionsSection;
