"use client";

import { useCallback, useEffect, useRef, useState, type WheelEvent } from "react";

import {
  ITEM_GAP,
  LIST_H,
  PAD_BOTTOM,
  PAD_TOP,
  SCROLL_ANIMATION_MS,
  SNAP_DELAY,
  STEP,
  WHEEL_COOLDOWN,
  YEAR_RANGE,
} from "@/constants/dropdown";
import { cn } from "@/lib/utils/cn";
import {
  easeOutCubic,
  getDaysInMonth,
  getNearestIndex,
  getScrollTopForIndex,
} from "@/lib/utils/dropdown";

interface DropdownMenuProps {
  onConfirm?: (date: Date) => void;
  minDate?: Date;
  defaultDate?: Date;
  invalidMessage?: string;
}

interface WheelColumnProps {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  itemClassName?: string;
}

const WheelColumn = ({ items, selectedIndex, onSelect, itemClassName = "" }: WheelColumnProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const wheelLockRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const didInitRef = useRef(false);

  const scrollToIndex = useCallback(
    (index: number, currentSelectedIndex: number, behavior: ScrollBehavior) => {
      const el = scrollRef.current;
      if (!el) return;

      const safeIndex = Math.min(Math.max(index, 0), items.length - 1);
      const targetTop = getScrollTopForIndex(safeIndex, currentSelectedIndex);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (behavior === "auto") {
        isAnimatingRef.current = false;
        el.scrollTop = targetTop;
        return;
      }

      if (Math.abs(el.scrollTop - targetTop) <= 1) {
        isAnimatingRef.current = false;
        el.scrollTop = targetTop;
        return;
      }

      const startTop = el.scrollTop;
      const startedAt = performance.now();
      isAnimatingRef.current = true;

      const animate = (timestamp: number) => {
        const progress = Math.min((timestamp - startedAt) / SCROLL_ANIMATION_MS, 1);
        el.scrollTop = startTop + (targetTop - startTop) * easeOutCubic(progress);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
          return;
        }

        el.scrollTop = targetTop;
        animationFrameRef.current = null;
        isAnimatingRef.current = false;
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [items.length],
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const targetTop = selectedIndex * STEP;
    if (Math.abs(el.scrollTop - targetTop) <= 1) {
      didInitRef.current = true;
      return;
    }

    scrollToIndex(selectedIndex, selectedIndex, didInitRef.current ? "smooth" : "auto");
    didInitRef.current = true;
  }, [scrollToIndex, selectedIndex]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const preventScroll = (e: Event) => e.preventDefault();
    el.addEventListener("wheel", preventScroll, { passive: false });
    return () => el.removeEventListener("wheel", preventScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (isAnimatingRef.current) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const el = scrollRef.current;
      if (!el || isAnimatingRef.current) return;

      const nextIndex = getNearestIndex(el.scrollTop, selectedIndex, items.length);

      if (nextIndex === selectedIndex) {
        scrollToIndex(nextIndex, selectedIndex, "smooth");
        return;
      }

      onSelect(nextIndex);
    }, SNAP_DELAY);
  }, [items.length, onSelect, scrollToIndex, selectedIndex]);

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (wheelLockRef.current || event.deltaY === 0) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(Math.max(selectedIndex + direction, 0), items.length - 1);
      if (nextIndex === selectedIndex) return;

      wheelLockRef.current = true;
      onSelect(nextIndex);

      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = setTimeout(() => {
        wheelLockRef.current = false;
      }, WHEEL_COOLDOWN);
    },
    [items.length, onSelect, selectedIndex],
  );

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      onWheel={handleWheel}
      style={{ height: LIST_H, scrollPaddingTop: PAD_TOP }}
      className="[scroll-snap-type:y_mandatory] scrollbar-none overflow-y-auto overscroll-y-contain [&::-webkit-scrollbar]:hidden"
    >
      <div aria-hidden="true" style={{ height: PAD_TOP }} />
      <div>
        {items.map((label, index) => (
          <div
            key={`${label}-${index}`}
            style={{
              marginBottom: index === items.length - 1 ? 0 : ITEM_GAP,
            }}
            className={cn(
              "flex snap-start snap-always items-center justify-end",
              index === selectedIndex ? "h-9.5" : "h-5.5",
            )}
          >
            <p
              className={cn(
                "text-heading3-m leading-none whitespace-nowrap transition-colors duration-200 ease-out",
                index === selectedIndex ? "text-gray-90" : "text-gray-50",
                itemClassName,
              )}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      <div aria-hidden="true" style={{ height: PAD_BOTTOM }} />
    </div>
  );
};

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
          <WheelColumn items={years} selectedIndex={yearIndex} onSelect={handleYearSelect} />
          <WheelColumn
            items={months}
            selectedIndex={monthIndex}
            onSelect={handleMonthSelect}
            itemClassName="w-7.5"
          />
          <WheelColumn
            items={days}
            selectedIndex={safeDayIndex}
            onSelect={setDayIndex}
            itemClassName="w-8.5"
          />
        </div>
      </div>
      <button
        disabled={isInvalid}
        className={cn(
          "text-body1-sb border-t-gray-10 rounded-b-8 w-full border-t px-3 py-2 transition-colors duration-150",
          isInvalid
            ? "text-gray-40 cursor-not-allowed"
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
