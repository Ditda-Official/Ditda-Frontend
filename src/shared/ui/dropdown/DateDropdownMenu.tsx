"use client";

import { useCallback, useState } from "react";

import { PAD_TOP, YEAR_RANGE } from "@/shared/config/dropdown";
import { cn } from "@/shared/lib/utils/cn";
import { getDateForIndices, getDaysInMonth } from "@/shared/lib/utils/dropdown";
import WheelColumn from "@/shared/ui/dropdown/WheelColumn";

interface DropdownMenuProps {
  onConfirm?: (date: Date) => void;
  minDate?: Date;
  defaultDate?: Date;
  invalidMessage?: string;
}

const DateDropdownMenu = ({
  onConfirm,
  minDate,
  defaultDate,
  invalidMessage,
}: DropdownMenuProps) => {
  const [today] = useState(() => new Date());
  const baseYear = today.getFullYear();

  const initDate = defaultDate ?? today;
  const initialYearIndex = Math.min(Math.max(initDate.getFullYear() - baseYear, 0), YEAR_RANGE - 1);
  const initialMonthIndex = initDate.getMonth();
  const initialDayIndex = initDate.getDate() - 1;

  const years = Array.from({ length: YEAR_RANGE }, (_, index) => `${baseYear + index}년`);
  const months = Array.from({ length: 12 }, (_, index) => `${index + 1}월`);

  const [yearIndex, setYearIndex] = useState(initialYearIndex);
  const [monthIndex, setMonthIndex] = useState(initialMonthIndex);
  const [dayIndex, setDayIndex] = useState(initialDayIndex);

  const selectedYear = baseYear + yearIndex;
  const daysInMonth = getDaysInMonth(selectedYear, monthIndex);
  const days = Array.from({ length: daysInMonth }, (_, index) => `${index + 1}일`);
  const safeDayIndex = Math.min(dayIndex, daysInMonth - 1);

  const selectedDate = new Date(selectedYear, monthIndex, safeDayIndex + 1);
  const isInvalid = minDate != null && selectedDate <= minDate;

  const confirmDate = (date: Date) => {
    if (minDate != null && date <= minDate) return;
    onConfirm?.(date);
  };

  const handleYearSelect = useCallback(
    (nextYearIndex: number) => {
      setYearIndex(nextYearIndex);
      setDayIndex(prevDayIndex =>
        Math.min(prevDayIndex, getDaysInMonth(baseYear + nextYearIndex, monthIndex) - 1),
      );
    },
    [baseYear, monthIndex],
  );

  const handleMonthSelect = useCallback(
    (nextMonthIndex: number) => {
      setMonthIndex(nextMonthIndex);
      setDayIndex(prevDayIndex =>
        Math.min(prevDayIndex, getDaysInMonth(baseYear + yearIndex, nextMonthIndex) - 1),
      );
    },
    [baseYear, yearIndex],
  );

  return (
    <div className="rounded-8 border-gray-10 shadow-dropdown w-49 border bg-white">
      <div className="relative pt-3 pb-5">
        <div
          aria-hidden="true"
          style={{ top: 12 + PAD_TOP }}
          className="text-heading3-m rounded-7 bg-purple-10 pointer-events-none absolute left-1/2 z-0 flex h-9.5 -translate-x-1/2 items-center px-4 whitespace-nowrap text-transparent"
        >
          <div className="flex flex-row gap-6">
            <p>{years[years.length - 1]}</p>
            <p className="w-7.5">12월</p>
            <p className="w-8.5">31일</p>
          </div>
        </div>
        <div className="relative z-10 flex flex-row justify-center gap-6 text-right">
          <WheelColumn
            items={years}
            selectedIndex={yearIndex}
            onSelect={handleYearSelect}
            onItemClick={index => {
              handleYearSelect(index);
              confirmDate(getDateForIndices(baseYear, index, monthIndex, safeDayIndex));
            }}
          />
          <WheelColumn
            items={months}
            selectedIndex={monthIndex}
            onSelect={handleMonthSelect}
            onItemClick={index => {
              handleMonthSelect(index);
              confirmDate(getDateForIndices(baseYear, yearIndex, index, safeDayIndex));
            }}
            itemClassName="w-7.5"
          />
          <WheelColumn
            items={days}
            selectedIndex={safeDayIndex}
            onSelect={setDayIndex}
            onItemClick={index => {
              setDayIndex(index);
              confirmDate(getDateForIndices(baseYear, yearIndex, monthIndex, index));
            }}
            itemClassName="w-8.5"
          />
        </div>
      </div>
      <button
        disabled={isInvalid}
        className={cn(
          "text-body1-sb border-t-gray-10 rounded-b-8 w-full border-t px-3 py-2 transition-colors duration-150",
          isInvalid
            ? "text-gray-60 cursor-not-allowed"
            : "text-gray-80 hover:bg-gray-30 cursor-pointer",
        )}
        onClick={() => {
          if (!isInvalid) onConfirm?.(selectedDate);
        }}
      >
        <span className={cn(isInvalid && "whitespace-pre-line")}>
          {isInvalid ? (invalidMessage ?? "1차 시안 수령일\n이후 날짜를 선택해주세요") : "선택하기"}
        </span>
      </button>
    </div>
  );
};

export default DateDropdownMenu;
