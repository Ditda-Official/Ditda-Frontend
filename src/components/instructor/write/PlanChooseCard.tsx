import Badge from "@/components/common/Badge";

type PlanType = "기본" | "플러스" | "맥스";

const planMap: Record<
  PlanType,
  { label: string; size: "3인" | "4인" | "5인"; price: string; description: string }
> = {
  기본: {
    label: "기본 플랜",
    size: "3인",
    price: "400,000 원",
    description: "디자이너 3명에 대한 시안을 받아볼 수 있습니다.",
  },
  플러스: {
    label: "플러스 플랜",
    size: "4인",
    price: "480,000 원",
    description: "더 다양한 디자이너의 시안을 받아볼 수 있습니다. ",
  },
  맥스: {
    label: "맥스 플랜",
    size: "5인",
    price: "560,000 원",
    description: "가장 많은 디자이너의 시안을 받아볼 수 있습니다. ",
  },
};

interface PlanChooseCardProps {
  plan: PlanType;
  isSelected?: boolean;
  onClick?: () => void;
}

const PlanChooseCard = ({ plan, isSelected = false, onClick }: PlanChooseCardProps) => {
  const { label, size, price, description } = planMap[plan];

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
