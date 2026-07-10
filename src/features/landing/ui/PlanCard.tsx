import { PLAN_CONTENT, type PlanType } from "@/features/landing/config/landing";

interface PlanCardProps {
  planType: PlanType;
}

const PlanCard = ({ planType }: PlanCardProps) => {
  const { title, designerCount, price, description } = PLAN_CONTENT[planType];

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`rounded-8 relative flex h-28.5 w-95.5 flex-row items-center justify-between border bg-white px-7 py-6 ${
          planType === "plus" ? "border-main-main" : "border-gray-30"
        }`}
      >
        {planType === "plus" && (
          <span className="rounded-8 bg-main-main text-heading3-m absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-2 text-white">
            추천 플랜
          </span>
        )}
        <div>
          <p className="text-body1-sb text-purple-60 text-left font-bold">{title}</p>
          <p className="text-gray-70 text-body1-m">{designerCount}</p>
        </div>
        <div className="flex flex-row items-end">
          <p className="text-[40px] leading-[140%] font-semibold tracking-[-0.8px] text-black">
            {price}
          </p>
          <p className="text-gray-70 text-heading3-m h-fit py-2 pl-0.5">만 원</p>
        </div>
      </div>
      <span className="text-gray-70 text-body2-m text-center">{description}</span>
    </div>
  );
};

export default PlanCard;
