export type LevelType = "L1" | "L2" | "L3";

type DescriptionSegment = {
  text: string;
  highlight: boolean;
};

export const LEVEL_CONTENT: Record<
  LevelType,
  { label: string; segments: DescriptionSegment[]; price: string }
> = {
  L1: {
    label: "가입을 완료한 디자이너",
    segments: [
      { text: "서비스에 가입한", highlight: true },
      { text: "디자이너라면 누구든!", highlight: false },
    ],
    price: "40,000원",
  },
  L2: {
    label: "활동 이력 축적 디자이너",
    segments: [
      { text: "시안", highlight: false },
      { text: "제출 횟수 누적", highlight: true },
      { text: "+", highlight: false },
      { text: "채택 1회", highlight: true },
      { text: "이상", highlight: false },
    ],
    price: "50,000원",
  },
  L3: {
    label: "실력•신뢰 검증 디자이너",
    segments: [
      { text: "채택률•만족도", highlight: true },
      { text: "기준 달성", highlight: false },
    ],
    price: "60,000원",
  },
};
