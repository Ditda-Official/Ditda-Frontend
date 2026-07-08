import { ReactNode } from "react";

export type InformationType = "designer" | "instructor";

interface InformationContent {
  title: string;
  highlight: string;
  description: ReactNode;
  rule: string;
}

export const INFORMATION_SECTION_CONTENT: Record<InformationType, InformationContent> = {
  designer: {
    title: "시안제출만 해도 기본 참여금 지급",
    highlight: "공모전 0원의 시대는 끝",
    description: (
      <>
        요청 들어오는 대로 작업해야 했던 압박에서 벗어나,
        <br />
        검증된 학원 강사들의 의뢰 중 내가 원하는 작업만 골라 시작하세요.
      </>
    ),
    rule: "채택되지 못해도 보장되는 기본금과 최대 수정 7회의 룰 안에서 스트레스 없이 안전하게 작업하실 수 있습니다.",
  },
  instructor: {
    title: "100만원에 시안 2개 받던 시대,",
    highlight: "이제 40만원에 시안 5개입니다.",
    description: (
      <>
        선생님 1명에 디자이너 3-5명이 동시 매칭됩니다.
        <br />
        시안을 비교하고 마음에 드는 디자인 하나만 채택하시면 됩니다.
      </>
    ),
    rule: "정찰가 40만원, 수정 3회 무료, 학원가 외주에 최적화된 매칭 구조",
  },
};
