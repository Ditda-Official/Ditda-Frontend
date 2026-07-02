import type { CommissionHistoryItem } from "@/features/instructor/my";

export type GetCommissionsResult = {
  items: CommissionHistoryItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};
