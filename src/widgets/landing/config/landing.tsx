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

interface SequenceStepContent {
  title: string;
  description: ReactNode;
}

interface SequenceSectionContent {
  headline: ReactNode;
  description: string;
  steps: SequenceStepContent[];
}

export const SEQUENCE_SECTION_CONTENT: Record<InformationType, SequenceSectionContent> = {
  designer: {
    headline: (
      <>
        기본금 보장부터 맞춤형 매칭까지,
        <br />
        디자이너 중심의 진행 절차를 확인하세요
      </>
    ),
    description:
      "내가 원하는 조건의 외주를 직접 선택하세요. 보장된 기본금을 받고 안정적으로 작업하세요.",
    steps: [
      {
        title: "의뢰서 확인",
        description: (
          <>
            카테고리 레이아웃, 컨셉 등이 적힌
            <br />
            외주 의뢰서를 확인하고
            <br />
            신청하실 수 있습니다.
          </>
        ),
      },
      {
        title: "1차 시안 제출",
        description: (
          <>
            디자이너 3~5명이 각각 1차
            <br />
            시안을 제출하고, 의뢰인이
            <br />그 중 한 분을 채택합니다.
          </>
        ),
      },
      {
        title: "기본 참여 보상 수령",
        description: (
          <>
            최종 시안으로 채택되지
            <br />
            못해도 레벨별 기본 참여 보상이
            <br />
            자동 지급됩니다.
          </>
        ),
      },
      {
        title: "간편 수정",
        description: (
          <>
            1회 수정 의뢰서에 들어오는
            <br />
            최대 2개의 수정 사항만 확인하고
            <br />
            수정본을 제출합니다.
          </>
        ),
      },
      {
        title: "인센티브 수령",
        description: (
          <>
            최종 수정본 제출 후
            <br />
            채택 인센티브와 수정금이
            <br />
            추가 지급됩니다.
          </>
        ),
      },
    ],
  },
  instructor: {
    headline: (
      <>
        복잡한 탐색 없이 쉽고 빠른 의뢰서 한 장으로,
        <br />
        여러 명의 시안을 한 번에 받아보세요
      </>
    ),
    description:
      "옵션형으로 간편하게 의뢰서를 완성하세요. 한 번의 의뢰로 여러 명의 디자이너가 제안하는 맞춤형 시안들을 비교하고 선택할 수 있습니다.",
    steps: [
      {
        title: "의뢰서 작성",
        description: (
          <>
            카테고리 레이아웃, 컨셉, 플랜을
            <br />
            선택지에서 골라 의뢰서를
            <br />
            작성합니다.
          </>
        ),
      },
      {
        title: "디자이너 매칭",
        description: (
          <>
            검증된 디자이너 3~5명이
            <br />
            의뢰서를 보고 작업을 수락하면,
            <br />
            곧바로 시안 제작을 시작합니다.
          </>
        ),
      },
      {
        title: "시안 비교 선택",
        description: (
          <>
            한 화면에서 시안을 비교하시고,
            <br />
            가장 마음에 드는 시안을
            <br />
            채택하시면 됩니다.
          </>
        ),
      },
      {
        title: "간편 수정",
        description: (
          <>
            수정할 부분을 선택하면 빠르게
            <br />
            디자이너에게 전달되며, 기본 3회
            <br />
            무료 수정으로 진행됩니다.
          </>
        ),
      },
      {
        title: "최종본 수정",
        description: (
          <>
            디자인 시안을 이용한 교재 제작이
            <br />
            용이하도록 png, hwp 형식으로
            <br />
            기본 제공해 드립니다.
          </>
        ),
      },
    ],
  },
};

interface ParadigmCardContent {
  tag: string;
  title: string;
  description: ReactNode;
}

interface ParadigmSectionContent {
  headline: ReactNode;
  description: string;
  cards: ParadigmCardContent[];
}

export const PARADIGM_SECTION_CONTENT: Record<InformationType, ParadigmSectionContent> = {
  designer: {
    headline: (
      <>
        디자이너의 시간과 권리,
        <br />
        정당하게 보상합니다
      </>
    ),
    description: "내가 고르는 외주, 미채택도 받는 기본 참여금, 그리고 틀 안의 수정",
    cards: [
      {
        tag: "디자이너 주도 매칭",
        title: "내가 선택하는 외주",
        description: (
          <>
            매칭 대기 외주 목록에서 작업 의뢰서를 직접 확인하고, 마음에
            <br />
            드는 외주만 골라 참여하실 수 있습니다. 선택을 기다리는 게
            <br />
            아니라, 디자이너가 외주를 선택하는 구조입니다.
          </>
        ),
      },
      {
        tag: "제출만 해도 N만원",
        title: "무급 노동은 그만",
        description: (
          <>
            공모전처럼 떨어지면 0원이 되는 구조가 아닙니다.
            <br />
            시안 제출만 마치셔도 레벨별 기본 참여금이 지급됩니다.
            <br />
            채택되시면 추가 인센티브와 수정금까지 별도 지급됩니다.
          </>
        ),
      },
      {
        tag: "수정 7회 + 검열된 요청서",
        title: "무한 수정으로부터 보호",
        description: (
          <>
            최대 수정 횟수 7회와 운영팀의 검열을 거친 수정 요청서로
            <br />
            디자이너의 시간과 권리를 보호합니다. 한 회당 최대 2개의
            <br />
            수정 사항으로 제한되어 안전합니다.
          </>
        ),
      },
    ],
  },
  instructor: {
    headline: (
      <>
        한 번만 요청하시면
        <br />
        3~5개 시안을 받아보실 수 있습니다
      </>
    ),
    description:
      "타 외주 플랫폼처럼 한 명에게만 디자인을 맡기지 않습니다. 외주를 요청하느라 쓸데없는 시간을 낭비하지도 않습니다.",
    cards: [
      {
        tag: "평균 작성 시간 5분",
        title: "요청서는 짧게",
        description: (
          <>
            단가나 양식을 찾아볼 필요 없이, 학원가에 맞춰진
            <br />
            선택지에서 옵션만 선택하시면 됩니다. 외주 의뢰
            <br />
            양식을 새로 익히실 필요도, 빈 칸을 채울 부담도 없습니다.
          </>
        ),
      },
      {
        tag: "정찰가 40만원 · 수정 3회 포함",
        title: "결제는 가볍게",
        description: (
          <>
            기존 외수자 대비 저렴한 금액으로, 기본 수정 3회까지
            <br />
            무료로 제공해 선생님 강의 퀄리티를 효율적으로
            <br />
            높여드립니다.
          </>
        ),
      },
      {
        tag: "3~5개 동시 비교",
        title: "시안은 많이",
        description: (
          <>
            검증된 디자이너 3~5명이 각기 제출한 시안을
            <br />한 화면에서 비교하시고, 가장 마음에 드는 디자인을
            <br />
            채택하시면 됩니다.
          </>
        ),
      },
    ],
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
