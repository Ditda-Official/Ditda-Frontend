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

interface InterviewQuote {
  quote: string;
  author: string;
}

interface RealitySectionContent {
  label: string;
  headline: ReactNode;
  description: string;
  cards: RealityCardContent[];
  quotes: InterviewQuote[];
}

export const REALITY_SECTION_CONTENT: Record<InformationType, RealitySectionContent> = {
  designer: {
    label: "디자이너 시장의 현실",
    headline: (
      <>
        실력은 충분한데,
        <br />
        시작할 외주가 없는 시대
      </>
    ),
    description: "현재 학생 디자이너•초기 프리랜서가 마주하는 숫자입니다.",
    cards: [
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
        color: "red",
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
    ],
    quotes: [
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
    ],
  },
  instructor: {
    label: "학원가 외주의 현실",
    headline: (
      <>
        외주에 들어간 시간만큼,
        <br />
        강의 준비 시간이 사라집니다.
      </>
    ),
    description: "현재 학원가 외주는 이렇게 굴러가고 있습니다.",
    cards: [
      {
        highlight: "2개",
        title: "100만원에 시안 2개",
        description: (
          <>
            비교할 게 없는 정형화된
            <br />
            디자인을 받아봐야합니다.
          </>
        ),
        color: "red",
      },
      {
        highlight: "94%",
        title: "시각적 불만족",
        description: (
          <>
            콘텐츠 불신의 94%는
            <br />
            디자인 미달에서 비롯됩니다.
          </>
        ),
        color: "red",
      },
      {
        highlight: "10만+",
        title: "수정 1회당 추가",
        description: (
          <>
            수정 비용이 예산에
            <br />큰 비중을 차지합니다.
          </>
        ),
        color: "purple",
      },
      {
        highlight: "5시간",
        title: "불필요한 시간 낭비",
        description: (
          <>
            탐색부터 요구사항 정리까지,
            <br />
            시간만 소모됩니다.
          </>
        ),
        color: "purple",
      },
    ],
    quotes: [
      {
        quote: "교재 한 권 외지 내지 디자인에 100만원이 우스워요.",
        author: "분당 단과학원 영어 선생님",
      },
      {
        quote: "받아보는 시안이 고작 2개라, 비교할 게 없어요.",
        author: "강남 수학 단과 학원장",
      },
      {
        quote: "수정 한 번에 10만원씩 더 쓰게 하더라고요.",
        author: "분당 수능전문학원 국어 선생님",
      },
      {
        quote: "단가 기준이 없어서, 매번 다른 분 견적과 비교하는 게 시간 아까워요.",
        author: "강남 중형 학원 운영장",
      },
    ],
  },
};
