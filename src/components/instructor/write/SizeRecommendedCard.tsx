import { ReactNode } from "react";

interface SizeRecommendedCardProps {
  size: string;
  dimensions: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
  children?: ReactNode; // 추천 규격 text
}

const SizeRecommendedCard = ({
  size,
  dimensions,
  description,
  isSelected = false,
  onClick,
  children,
}: SizeRecommendedCardProps) => {
  return (
    <div
      onClick={onClick}
      tabIndex={0}
      className={`rounded-8 w-49.25 cursor-pointer border px-4 py-3 transition-colors duration-150 ${isSelected ? "border-main-main bg-purple-10" : "border-gray-20 hover:bg-gray-10 bg-white"}`}
    >
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-1">
            <span className="text-heading3-sb text-gray-80">{size}</span>
            <span className="text-caption1-m text-gray-60">{dimensions}</span>
          </div>
          {children && (
            <span
              className={`text-main-main ${isSelected ? "text-caption1-sb" : "text-caption2-m"}`}
            >
              {children}
            </span>
          )}
        </div>
        <span className="text-gray-80 text-body2-m">{description}</span>
      </div>
    </div>
  );
};

export default SizeRecommendedCard;
