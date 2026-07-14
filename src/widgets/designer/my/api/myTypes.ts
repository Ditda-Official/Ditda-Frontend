import type { PaymentHistory } from "@/features/designer/my";

export type GetSettlementsResult = {
  items: PaymentHistory[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};
