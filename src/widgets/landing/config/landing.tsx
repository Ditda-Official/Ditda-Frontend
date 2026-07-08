import { ReactNode } from "react";

import { InfinityIcon } from "@/shared/assets/icons";

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

interface RealityCardContent {
  highlight: ReactNode;
  title: string;
  description: ReactNode;
  color: "red" | "purple";
}

export const REALITY_CARDS: RealityCardContent[] = [
  {
    highlight: "0원",
    title: "공모전 탈락 시",
    description: (
      <>
        공모전 탈락 시 보상 없이
        <br />
        마무리되는 작업
      </>
    ),
    color: "red",
  },
  {
    highlight: "94%",
    title: "포폴 진입 장벽",
    description: (
      <>
        외주 사이트 대다수가
        <br />
        포폴 요구
      </>
    ),
    color: "purple",
  },
  {
    highlight: "22%",
    title: "수수료",
    description: (
      <>
        낮춰서 작성한 금액에 추가
        <br />
        수수료 납부
      </>
    ),
    color: "purple",
  },
  {
    highlight: <InfinityIcon className="size-10.5" />,
    title: "수정횟수",
    description: (
      <>
        요구대로 따라야만 하는
        <br />
        수정 갑질
      </>
    ),
    color: "purple",
  },
];

interface InterviewQuote {
  quote: string;
  author: string;
}

export const INTERVIEW_QUOTES: InterviewQuote[] = [
  {
    quote: "공모전은 리스크가 너무 커요. 떨어지면 무급 노동한 사람이 되니까.",
    author: "홍익대 시각디자인과 2학년 김OO",
  },
  {
    quote: "포폴 만들려고 들어간 사이트인데, 포폴 없다고 안받아주니까",
    author: "서울대 디자인학부 3학년 박OO",
  },
  {
    quote: "이제 외주를 좀 받아보고 싶은데, 대체 어디서 해요?",
    author: "연세대 통합디자인과 4학년 이OO",
  },
  {
    quote: "소속이 없으면 무한으로 요청하는 수정에 대처가 안돼요.",
    author: "프리랜서 UX/UI 디자이너 성OO",
  },
];
