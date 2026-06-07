// 아이템 높이
export const ITEM_H = 22;
export const SELECTED_H = 38;
export const ITEM_GAP = 12;

// 스크롤 레이아웃
export const STEP = ITEM_H + ITEM_GAP;
export const LIST_H = 208;
export const PAD_TOP = 2 * STEP; // 선택 행이 3번째 위치
export const PAD_BOTTOM = LIST_H - PAD_TOP - SELECTED_H;
export const SELECTED_EXTRA = SELECTED_H - ITEM_H;

// 타이밍
export const SNAP_DELAY = 100;
export const WHEEL_COOLDOWN = 240;
export const SCROLL_ANIMATION_MS = 250;

// 데이터 범위
export const YEAR_RANGE = 10;
