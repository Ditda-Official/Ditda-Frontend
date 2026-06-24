import type { PlanType } from "@/features/instructor/write/config/write";

export type Plan = {
  code: PlanType;
  designerCount: number;
  price: number;
  description: string;
};

export type GetPlansResult = {
  plans: Plan[];
};
