import { LEVEL_CONTENT, type LevelType } from "@/features/landing/config/level";

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
