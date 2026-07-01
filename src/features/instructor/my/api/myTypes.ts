export type MyInfoStats = {
  totalCommissionCount: number;
  ongoingCommissionCount: number;
};

export type MyInfo = {
  name: string;
  profileImageUrl: string;
  stats: MyInfoStats;
};

export type CommissionHistoryItem = {
  commissionId: number;
  category: string;
  title: string;
  createdAt: string;
  plan: "BASIC" | "PLUS" | "MAX";
  paidAmount: number | null;
  status: string;
};
