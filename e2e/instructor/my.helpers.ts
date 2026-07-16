import { mockApi } from "../utils/mockApi";

export const MY_INFO_PATH = "/api/v1/instructors/me";
export const COMMISSIONS_HISTORY_PATH = "/api/v1/instructors/commissions";

export const mockMyInfo = (
  overrides: { name?: string; totalCommissionCount?: number; ongoingCommissionCount?: number } = {},
) =>
  mockApi(MY_INFO_PATH, {
    result: {
      name: overrides.name ?? "e2e-test-instructor",
      profileImageUrl: null,
      stats: {
        totalCommissionCount: overrides.totalCommissionCount ?? 3,
        ongoingCommissionCount: overrides.ongoingCommissionCount ?? 1,
      },
    },
  });

type MockCommissionHistoryItem = {
  commissionId: number;
  category?: string;
  title: string;
  createdAt: string;
  plan?: "BASIC" | "PLUS" | "MAX";
  paidAmount?: number | null;
  status?: string;
};

export const mockCommissionsHistory = (items: MockCommissionHistoryItem[]) =>
  mockApi(COMMISSIONS_HISTORY_PATH, {
    result: {
      items: items.map(item => ({
        category: "FLYER_TEXTBOOK_COVER_INNER",
        plan: "BASIC" as const,
        paidAmount: null,
        status: "IN_PROGRESS",
        ...item,
      })),
      page: 0,
      size: 3,
      totalElements: items.length,
      totalPages: items.length > 0 ? 1 : 0,
    },
  });
