"use client";

import { useEffect, useState } from "react";

import {
  getPlans,
  type Plan,
  PlanChooseCard,
  useWriteFormStore,
} from "@/features/instructor/write";

const PlanChooseSection = () => {
  const { selectedPlan, setSelectedPlan } = useWriteFormStore();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    getPlans().then(setPlans).catch(console.error);
  }, []);

  return (
    <div className="rounded-12 focus-within:border-gray-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-90 text-heading1-sb">플랜 선택</h1>
        <h2 className="text-gray-70 text-body2-m">
          작업을 진행할 디자이너의 인원수를 선택해 주세요.
        </h2>
      </div>
      <div className="flex flex-row gap-3">
        {plans.map(plan => (
          <PlanChooseCard
            key={plan.code}
            plan={plan}
            isSelected={selectedPlan?.code === plan.code}
            onClick={() => setSelectedPlan(plan)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanChooseSection;
