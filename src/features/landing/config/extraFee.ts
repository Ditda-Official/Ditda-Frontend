export type ExtraFeeType = "adoption" | "revision";

export const EXTRA_FEE_CONTENT: Record<
  ExtraFeeType,
  { question: string; label: string; price: string; note?: string }
> = {
  adoption: {
    question: "내 디자인이 선택되었다면?",
    label: "채택 인센티브",
    price: "150,000원",
    note: "*교재 외지•내지 디자인 기준",
  },
  revision: {
    question: "3회 이상의 추가 수정이 발생했다면?",
    label: "추가 수정금",
    price: "1회당 별도 지급",
  },
};
