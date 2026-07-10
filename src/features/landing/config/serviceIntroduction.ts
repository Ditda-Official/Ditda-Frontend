import designerGraphic from "@/shared/assets/images/landing/designer_graphic.png";

export type ServiceIntroductionCardType = "designer" | "instructor";

export const SERVICE_INTRODUCTION_CONTENT: Record<
  ServiceIntroductionCardType,
  {
    label: string;
    description: string;
    graphic: typeof designerGraphic | null;
    backgroundClassName: string;
  }
> = {
  designer: {
    label: "디자이너",
    description: "견적 조율 부담 없이 안정적으로 외주를 받고 싶어요",
    graphic: designerGraphic,
    backgroundClassName: "bg-white",
  },
  instructor: {
    label: "강사",
    description: "쉽고 빠르게 다양한 시안을 받아보고 싶어요",
    graphic: null,
    backgroundClassName: "instructor-card-gradient",
  },
};
