"use client";

import { PlanChooseCard, type PlanType, useWriteFormStore } from "@/features/instructor/write";

const PLANS: PlanType[] = ["기본", "플러스", "맥스"];

const PlanChooseSection = () => {
  const { selectedPlan, setSelectedPlan } = useWriteFormStore();

  return (
    <div className="rounded-12 focus-within:border-purple-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-90 text-heading1-sb">플랜 선택</h1>
        <h2 className="text-gray-70 text-body2-m">
          작업을 진행할 디자이너의 인원수를 선택해주세요
        </h2>
      </div>
      <div className="flex flex-row gap-3">
        {PLANS.map(plan => (
          <PlanChooseCard
            key={plan}
            plan={plan}
            isSelected={selectedPlan === plan}
            onClick={() => setSelectedPlan(plan)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanChooseSection;
