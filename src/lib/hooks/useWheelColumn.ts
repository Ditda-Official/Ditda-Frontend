import { useCallback, useEffect, useRef, type WheelEvent } from "react";

import { SCROLL_ANIMATION_MS, SNAP_DELAY, STEP, WHEEL_COOLDOWN } from "@/constants/dropdown";
import { easeOutCubic, getNearestIndex, getScrollTopForIndex } from "@/lib/utils/dropdown";

interface UseWheelColumnProps {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const useWheelColumn = ({ items, selectedIndex, onSelect }: UseWheelColumnProps) => {
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

  return { scrollRef, handleScroll, handleWheel };
};
