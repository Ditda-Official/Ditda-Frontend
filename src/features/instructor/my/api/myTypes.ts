export type MyInfoStats = {
  totalCommissionCount: number;
  ongoingCommissionCount: number;
};

export type MyInfo = {
  name: string;
  profileImageUrl: string;
  stats: MyInfoStats;
};
