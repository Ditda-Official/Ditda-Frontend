"use client";

import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import {
  formatDate,
  getFirstAvailableDate,
  getMinFinalDate,
  getMinFirstDate,
  useWriteFormStore,
} from "@/features/instructor/write";
import DateDropdownBox from "@/shared/ui/dropdown/DateDropdownBox";
import DateDropdownMenu from "@/shared/ui/dropdown/DateDropdownMenu";

const DeadlineChooseSection = () => {
  const { firstDate, setFirstDate, finalDate, setFinalDate } = useWriteFormStore(
    useShallow(s => ({
      firstDate: s.firstDate,
      setFirstDate: s.setFirstDate,
      finalDate: s.finalDate,
      setFinalDate: s.setFinalDate,
    })),
  );
  const [openMenu, setOpenMenu] = useState<"first" | "final" | null>(null);

  const minFirstDate = getMinFirstDate();
  const firstAvailableDate = getFirstAvailableDate();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFirstConfirm = (date: Date) => {
    setFirstDate(date);
    if (finalDate && finalDate < getMinFinalDate(date)) {
      setFinalDate(null);
    }
    setOpenMenu(null);
  };

  const handleFinalConfirm = (date: Date) => {
    setFinalDate(date);
    setOpenMenu(null);
  };

  return (
    <div className="rounded-12 focus-within:border-gray-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-90 text-heading1-sb">마감 기한 선택</h1>
        <h2 className="text-gray-70 text-body2-m">시안을 수령할 날짜를 선택해주세요</h2>
      </div>
      <div ref={containerRef} className="flex flex-row gap-6">
        <div className="relative">
          <DateDropdownBox
            label="1차 시안 수령일"
            placeholder="0000년 00월 00일"
            selectedValue={firstDate ? formatDate(firstDate) : undefined}
            isOpen={openMenu === "first"}
            onClick={() => setOpenMenu(openMenu === "first" ? null : "first")}
          />
          {openMenu === "first" && (
            <div className="absolute top-full right-0 z-50 mt-1">
              <DateDropdownMenu
                onConfirm={handleFirstConfirm}
                minDate={minFirstDate}
                invalidMessage={"오늘로부터 최소\n 12일 이후 날짜를\n선택해주세요"}
                defaultDate={firstDate ?? firstAvailableDate}
              />
            </div>
          )}
        </div>
        <div className="relative">
          <DateDropdownBox
            label="최종 시안 수령일"
            placeholder="0000년 00월 00일"
            selectedValue={finalDate ? formatDate(finalDate) : undefined}
            isOpen={openMenu === "final"}
            onClick={() => setOpenMenu(openMenu === "final" ? null : "final")}
          />
          {openMenu === "final" && (
            <div className="absolute top-full right-0 z-50 mt-1">
              <DateDropdownMenu
                onConfirm={handleFinalConfirm}
                minDate={firstDate ? getMinFinalDate(firstDate) : undefined}
                invalidMessage={"1차 시안 수령일로부터\n최소 2주 이후 날짜를\n선택해주세요"}
                defaultDate={finalDate ?? undefined}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeadlineChooseSection;
