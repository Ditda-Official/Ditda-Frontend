export type PlanType = "basic" | "plus" | "max";

export const PLAN_CONTENT: Record<
  PlanType,
  {
    title: string;
    designerCount: string;
    price: string;
    description: string;
  }
> = {
  basic: {
    title: "기본 / Basic",
    designerCount: "디자이너 3인",
    price: "40",
    description: "다양한 시안을 합리적인 가격에 경험해보고 싶으신 선생님께",
  },
  plus: {
    title: "플러스 / Plus",
    designerCount: "디자이너 4인",
    price: "48",
    description: "더 많은 디자이너에게 시안을 받아보고 싶으신 선생님께",
  },
  max: {
    title: "맥스 / Max",
    designerCount: "디자이너 5인",
    price: "56",
    description: "가장 다양한 디자인을 보고 결정하고 싶은 선생님께",
  },
};
