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

export type CreateCommissionResult = {
  commissionId: number;
  title: string;
  category: string;
  status: string;
  applicationDeadline: string;
  firstDraftDeadline: string;
  finalDeadline: string;
  maxRevision: number;
  createdAt: string;
};
