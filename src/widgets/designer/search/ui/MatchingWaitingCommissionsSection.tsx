"use client";

import {
  type MatchingWaitingCommission,
  MatchingWaitingHeader,
  MatchingWaitingRow,
} from "@/features/designer/search";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import usePagination from "@/shared/lib/hooks/usePagination";
import PageIndicator from "@/shared/ui/PageIndicator";
import { MATCHING_WAITING_ITEMS_PER_PAGE } from "@/widgets/designer/search/config/search";

const matchingWaitingCommissions: MatchingWaitingCommission[] = [
  {
    id: 1,
    deadline: "2026.07.02 11:59pm",
    category: "포스터",
    title: "해커스톡 왕초보 영어 커리큘럼 리뉴얼 - 고다현",
    basePrice: "40,000원",
    maxReward: "843,000원",
  },
  {
    id: 2,
    deadline: "2026.07.03 11:59pm",
    category: "교재 외지/내지",
    title: "스타트업 채용 설명회 키비주얼 - 김서윤",
    basePrice: "55,000원",
    maxReward: "620,000원",
  },
  {
    id: 3,
    deadline: "2026.07.04 11:59pm",
    category: "명함",
    title: "브랜드 굿즈 패키지 그래픽 - 박지호",
    basePrice: "70,000원",
    maxReward: "1,120,000원",
  },
  {
    id: 4,
    deadline: "2026.07.05 11:59pm",
    category: "상세페이지",
    title: "온라인 강의 랜딩 상세페이지 - 이하린",
    basePrice: "85,000원",
    maxReward: "756,000원",
  },
  {
    id: 5,
    deadline: "2026.07.06 11:59pm",
    category: "로고",
    title: "카페 신메뉴 홍보 포스터 - 고다현",
    basePrice: "40,000원",
    maxReward: "980,000원",
  },
  {
    id: 6,
    deadline: "2026.07.07 11:59pm",
    category: "배너",
    title: "초등 수학 문제집 표지 디자인 - 김서윤",
    basePrice: "55,000원",
    maxReward: "843,000원",
  },
  {
    id: 7,
    deadline: "2026.07.08 11:59pm",
    category: "포스터",
    title: "앱 출시 프로모션 배너 세트 - 박지호",
    basePrice: "70,000원",
    maxReward: "620,000원",
  },
  {
    id: 8,
    deadline: "2026.07.09 11:59pm",
    category: "교재 외지/내지",
    title: "전시회 초대장 및 리플렛 - 이하린",
    basePrice: "85,000원",
    maxReward: "1,120,000원",
  },
  {
    id: 9,
    deadline: "2026.07.10 11:59pm",
    category: "명함",
    title: "해커스톡 왕초보 영어 커리큘럼 리뉴얼 - 고다현",
    basePrice: "40,000원",
    maxReward: "756,000원",
  },
  {
    id: 10,
    deadline: "2026.07.11 11:59pm",
    category: "상세페이지",
    title: "스타트업 채용 설명회 키비주얼 - 김서윤",
    basePrice: "55,000원",
    maxReward: "980,000원",
  },
  {
    id: 11,
    deadline: "2026.07.12 11:59pm",
    category: "로고",
    title: "브랜드 굿즈 패키지 그래픽 - 박지호",
    basePrice: "70,000원",
    maxReward: "843,000원",
  },
  {
    id: 12,
    deadline: "2026.07.13 11:59pm",
    category: "배너",
    title: "온라인 강의 랜딩 상세페이지 - 이하린",
    basePrice: "85,000원",
    maxReward: "620,000원",
  },
  {
    id: 13,
    deadline: "2026.07.14 11:59pm",
    category: "포스터",
    title: "카페 신메뉴 홍보 포스터 - 고다현",
    basePrice: "40,000원",
    maxReward: "1,120,000원",
  },
];

const MatchingWaitingCommissionsSection = () => {
  const { current, totalPages, pageItems, handlePrev, handleNext } =
    usePagination<MatchingWaitingCommission>(
      matchingWaitingCommissions,
      MATCHING_WAITING_ITEMS_PER_PAGE,
    );

  return (
    <div className="mx-auto flex w-275 flex-col items-start gap-10 pt-10 pb-14">
      <h1 className="text-title2-sb w-full text-left text-black">매칭 대기 외주 목록</h1>
      <section className="flex w-full flex-col items-center gap-6">
        <div className="rounded-12 text-caption1-r text-gray-70 w-full bg-white pt-6">
          <MatchingWaitingHeader />
          <div className="flex flex-col">
            {pageItems.map(item => (
              <MatchingWaitingRow key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-8">
          <button
            type="button"
            aria-label="이전 페이지"
            onClick={handlePrev}
            disabled={current === 0}
            className="disabled:cursor-not-allowed disabled:opacity-40"
          >
            <PrevButton className="size-12 cursor-pointer" />
          </button>
          <PageIndicator total={totalPages} current={current} />
          <button
            type="button"
            aria-label="다음 페이지"
            onClick={handleNext}
            disabled={current === totalPages - 1}
            className="disabled:cursor-not-allowed disabled:opacity-40"
          >
            <NextButton className="size-12 cursor-pointer" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default MatchingWaitingCommissionsSection;
