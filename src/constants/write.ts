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

export const CATEGORIES = [
  { label: "유인물", items: ["교재 외지/내지", "대봉투"] },
  { label: "홍보물", items: [] },
  { label: "퍼스널 브랜딩", items: [] },
];

export const SIZE_OPTIONS = [
  {
    id: "a4",
    size: "A4",
    dimensions: "(210×297mm)",
    description: "자체 교재, 얇은 제본 교재",
    recommended: true,
  },
  {
    id: "국배판",
    size: "국배판",
    dimensions: "(188×257mm)",
    description: "시중 참고서/문제집",
  },
  {
    id: "b5",
    size: "B5",
    dimensions: "(182×257mm)",
    description: "일반 수업 교재, 개념서, 문제집",
  },
  {
    id: "a5",
    size: "A5",
    dimensions: "(148×210mm)",
    description: "작은 암기장, 요약집",
  },
];

export const CONCEPT_CATEGORIES = [
  { title: "밝은", keywords: ["귀여운", "경쾌한", "맑은"] },
  { title: "부드러운", keywords: ["내츄럴한", "은은한", "온화한"] },
  { title: "고급스러운", keywords: ["우아한", "고상한", "모던한"] },
  { title: "강렬한", keywords: ["화려한", "다이나믹한"] },
  { title: "단정한", keywords: ["점잖은"] },
];

export const MAX_CONCEPT_SELECT = 2;
