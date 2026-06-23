import type { Plan } from "@/features/instructor/write/api/writeTypes";
import { PLAN_LABEL_MAP } from "@/features/instructor/write/config/write";
import Badge, { type BadgeVariant } from "@/shared/ui/Badge";

interface PlanChooseCardProps {
  plan: Plan;
  isSelected?: boolean;
  onClick?: () => void;
}

const PlanChooseCard = ({ plan, isSelected = false, onClick }: PlanChooseCardProps) => {
  const label = PLAN_LABEL_MAP[plan.code];
  const badgeVariant = `${plan.designerCount}인` as BadgeVariant;
  const formattedPrice = `${plan.price.toLocaleString("ko-KR")}원`;

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
            <Badge variant={badgeVariant} />
          </div>
          <p className="text-gray-70 text-caption2-m">{plan.description}</p>
        </div>
        <p className="text-heading1-sb text-black">{formattedPrice}</p>
      </div>
    </div>
  );
};

export default PlanChooseCard;
