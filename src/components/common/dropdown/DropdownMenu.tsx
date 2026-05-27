"use client";

import { useCallback, useEffect, useRef, useState, type WheelEvent } from "react";

interface DropdownMenuProps {
  onConfirm?: (date: Date) => void;
}

interface WheelColumnProps {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  itemClassName?: string;
}

const ITEM_H = 22;
const SELECTED_H = 38;
const ITEM_GAP = 12;
const STEP = ITEM_H + ITEM_GAP;
const LIST_H = 208;
const PAD_TOP = 2 * STEP;
const PAD_BOTTOM = LIST_H - PAD_TOP - SELECTED_H;
const SNAP_DELAY = 100;
const WHEEL_COOLDOWN = 240;
const SCROLL_ANIMATION_MS = 250;
const YEAR_RANGE = 10;
const SELECTED_EXTRA = SELECTED_H - ITEM_H;

const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;

const getDaysInMonth = (year: number, monthIndex: number) =>
  new Date(year, monthIndex + 1, 0).getDate();

const getScrollTopForIndex = (index: number, selectedIndex: number) =>
  index * STEP + (index > selectedIndex ? SELECTED_EXTRA : 0);

const getNearestIndex = (scrollTop: number, selectedIndex: number, itemCount: number) => {
  let nearestIndex = 0;
  let minDistance = Number.POSITIVE_INFINITY;

  for (let index = 0; index < itemCount; index += 1) {
    const distance = Math.abs(scrollTop - getScrollTopForIndex(index, selectedIndex));
    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = index;
    }
  }

  return nearestIndex;
};

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
            className={`flex snap-start snap-always items-center justify-end ${
              index === selectedIndex ? "h-9.5" : "h-5.5"
            }`}
          >
            <p
              className={`text-heading3-m leading-none whitespace-nowrap ${
                index === selectedIndex ? "text-gray-90" : "text-gray-50"
              } ${itemClassName} transition-colors duration-200 ease-out`}
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

const DropdownMenu = ({ onConfirm }: DropdownMenuProps) => {
  const [initialDate] = useState(() => new Date());
  const baseYear = initialDate.getFullYear();
  const initialMonthIndex = initialDate.getMonth();
  const initialDayIndex = initialDate.getDate() - 1;

  const years = Array.from({ length: YEAR_RANGE }, (_, index) => `${baseYear + index}년`);
  const months = Array.from({ length: 12 }, (_, index) => `${index + 1}월`);

  const [yearIndex, setYearIndex] = useState(0);
  const [monthIndex, setMonthIndex] = useState(initialMonthIndex);
  const [dayIndex, setDayIndex] = useState(initialDayIndex);

  const selectedYear = baseYear + yearIndex;
  const daysInMonth = getDaysInMonth(selectedYear, monthIndex);
  const days = Array.from({ length: daysInMonth }, (_, index) => `${index + 1}일`);
  const safeDayIndex = Math.min(dayIndex, daysInMonth - 1);

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
        className="text-gray-80 text-body1-sb border-t-gray-10 hover:bg-gray-30 rounded-b-8 w-full cursor-pointer border-t px-3 py-2 transition-colors duration-150"
        onClick={() => onConfirm?.(new Date(selectedYear, monthIndex, safeDayIndex + 1))}
      >
        선택하기
      </button>
    </div>
  );
};

export default DropdownMenu;
