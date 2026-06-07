import { SELECTED_EXTRA, STEP } from "@/constants/dropdown";

export const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;

export const getDaysInMonth = (year: number, monthIndex: number) =>
  new Date(year, monthIndex + 1, 0).getDate();

export const getScrollTopForIndex = (index: number, selectedIndex: number) =>
  index * STEP + (index > selectedIndex ? SELECTED_EXTRA : 0);

export const getNearestIndex = (scrollTop: number, selectedIndex: number, itemCount: number) => {
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
