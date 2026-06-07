// [강사] 마이페이지 본인 정보 + 통계 조회
export type MyInfo = {
  name: string;
  profileImageUrl: string;
  stats: {
    totalCommissionCount: number;
    ongoingCommissionCount: number;
  };
};

export const myInfoData: MyInfo = {
  name: "고다현",
  profileImageUrl: "",
  stats: {
    totalCommissionCount: 5,
    ongoingCommissionCount: 5,
  },
};
