import { PlanCard } from "@/features/landing";

const PlanSection = () => {
  return (
    <div className="flex flex-col gap-25 bg-[rgba(246,245,252,0.30)] px-31.5 py-20.5 text-center">
      <div>
        <h1 className="text-main-main text-heading2-sb pb-3">플랜</h1>
        <h2 className="pb-8 text-[32px] leading-[140%] font-semibold tracking-[-0.64px] text-black">
          선생님 니즈에 맞춘 3가지 플랜
        </h2>
        <h3 className="text-gray-70 text-heading3-m">
          모든 플랜이 정찰가입니다. 결제 전 정확한 금액을 안내해 드립니다.
        </h3>
      </div>
      <div className="mx-auto flex flex-row gap-5">
        <PlanCard planType="basic" />
        <PlanCard planType="plus" />
        <PlanCard planType="max" />
      </div>
    </div>
  );
};

export default PlanSection;
