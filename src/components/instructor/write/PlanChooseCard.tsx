import Badge from "@/components/common/Badge";
import { PLAN_MAP, PlanType } from "@/constants/write";

interface PlanChooseCardProps {
  plan: PlanType;
  isSelected?: boolean;
  onClick?: () => void;
}

const PlanChooseCard = ({ plan, isSelected = false, onClick }: PlanChooseCardProps) => {
  const { label, size, price, description } = PLAN_MAP[plan];

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      className={`rounded-14 w-full cursor-pointer border p-6 transition-colors duration-150 outline-none ${
        isSelected
          ? "border-main-main bg-purple-5"
          : "border-gray-40 hover:bg-gray-10 bg-white hover:border-transparent"
      }`}
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-1">
            <span className="text-gray-80 text-heading3-sb">{label}</span>
            <Badge size={size} />
          </div>
          <p className="text-gray-70 text-caption2-m">{description}</p>
        </div>
        <p className="text-heading1-sb text-black">{price}</p>
      </div>
    </div>
  );
};

export default PlanChooseCard;
