type LevelType = "L1" | "L2" | "L3";

type DescriptionSegment = {
  text: string;
  highlight: boolean;
};

const LEVEL_CONTENT: Record<
  LevelType,
  { label: string; segments: DescriptionSegment[]; price: string }
> = {
  L1: {
    label: "가입을 완료한 디자이너",
    segments: [
      { text: "서비스에 가입한", highlight: true },
      { text: "디자이너라면 누구든!", highlight: false },
    ],
    price: "30,000원",
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
    price: "40,000원",
  },
  L3: {
    label: "실력•신뢰 검증 디자이너",
    segments: [
      { text: "채택률•만족도", highlight: true },
      { text: "기준 달성", highlight: false },
    ],
    price: "50,000원",
  },
};

const LevelCard = ({ level }: { level: LevelType }) => {
  const { label, segments, price } = LEVEL_CONTENT[level];

  return (
    <div className="rounded-8 border-gray-30 flex h-28.5 w-121 flex-col items-center justify-center gap-3 border px-6 py-3">
      <div className="flex flex-row items-center gap-2 self-start">
        <p className="text-main-dark text-heading2-m">{level}</p>
        <div className="border-gray-20 h-4.25 border-l" />
        <p className="text-body2-m text-gray-70">{label}</p>
      </div>
      <div className="flex w-full flex-row justify-between">
        <span className="text-heading2-m">
          {segments.map((segment, index) => (
            <span key={index} className={segment.highlight ? "text-main-main" : "text-black"}>
              {segment.text}
              {index < segments.length - 1 && " "}
            </span>
          ))}
        </span>
        <p className="text-heading2-sb text-black">{price}</p>
      </div>
    </div>
  );
};

export default LevelCard;
