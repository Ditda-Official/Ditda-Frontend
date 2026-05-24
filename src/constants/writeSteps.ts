import { OneCircleIcon, ThreeCircleIcon, TwoCircleIcon } from "@/assets/icons";

export type WriteStep = 1 | 2 | 3;

export const WRITE_STEPS: {
  step: WriteStep;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}[] = [
  { step: 1, label: "디자인 정보", Icon: OneCircleIcon },
  { step: 2, label: "컨텐츠 작성", Icon: TwoCircleIcon },
  { step: 3, label: "결제 정보", Icon: ThreeCircleIcon },
];
