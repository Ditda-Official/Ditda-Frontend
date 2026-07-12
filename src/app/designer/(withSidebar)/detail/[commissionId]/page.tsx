"use client";

import { useParams, useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

import { ArrowLeftIcon, ClockIcon } from "@/shared/assets/icons";
import Button from "@/shared/ui/Button";
import Chip from "@/shared/ui/Chip";
import ImageCard from "@/shared/ui/ImageCard";
import TextField from "@/shared/ui/input/TextField";
import Menu from "@/shared/ui/Menu";
import Tag from "@/shared/ui/Tag";

const MENU_LABELS = ["디자인 정보", "작업 요청사항", "자료 및 레퍼런스"] as const;

const CONCEPT_GROUPS = [
  { title: "질감", keywords: ["입체감 있는", "평면적인", "거친", "매끈한"] },
  { title: "레이아웃", keywords: ["정돈된", "역동적인", "여백이 많은", "꽉 찬"] },
  { title: "형태", keywords: ["둥근", "각진", "자유로운", "기하학적인"] },
  { title: "색감", keywords: ["화려한", "차분한", "밝은", "어두운"] },
  { title: "무드", keywords: ["귀여운", "시크한", "감성적인", "전문적인"] },
] as const;

const REQUIRED_PAGES = [
  "강사 프로필",
  "저자의 말",
  "목차",
  "단원 시작 간지",
  "개념 설명",
  "대표 유형",
  "문제 풀이",
  "노트",
  "표지",
] as const;

type MockCommission = {
  id: number;
  title: string;
  firstDraftDeadline: string;
  finalDeadline: string;
  category: string;
  size: string;
  selectedConcepts: string[];
  additionalRequest: string;
  colors: { role?: string; code: string; background: string }[];
  requiredPages: string[];
  pageRequests: { title: string; value: string; placeholder: string }[];
  materialImages: string[];
  materialInfo: string;
  referenceImages: string[];
  referenceInfo: string;
  basePrice: string;
  maxReward: string;
};

const mockCommissions: MockCommission[] = [
  {
    id: 1,
    title: "수학의 정석 - 한석원",
    firstDraftDeadline: "2026.05.09 11:59pm",
    finalDeadline: "2026.05.30 11:59pm",
    category: "교재 외지 / 내지",
    size: "A4 (210×297mm)",
    selectedConcepts: ["입체감 있는", "정돈된", "밝은"],
    additionalRequest:
      "이건 이게 좋고요 저건 저게 좋고 이것은 이렇게 이렇게 해주세요. 핵심 개념이 눈에 잘 들어오도록 여백은 충분히 두고, 표지는 수학 문제집다운 신뢰감이 느껴졌으면 합니다.",
    colors: [
      { role: "Main", code: "#A379FC", background: "#F3F5F7" },
      { code: "#A379FC", background: "#FFF2F5" },
      { code: "#A379FC", background: "#E0EEFF" },
    ],
    requiredPages: ["강사 프로필", "저자의 말", "문제 풀이"],
    pageRequests: [
      {
        title: "강사 프로필 레이아웃",
        value: "강사 사진과 약력을 좌우 2단으로 구성해주세요.",
        placeholder: "자유롭게 해주세요",
      },
      {
        title: "단원 시작 간지 레이아웃",
        value: "예) 2단으로 구성해주세요",
        placeholder: "예) 2단으로 구성해주세요",
      },
      {
        title: "개념 설명 레이아웃",
        value: "",
        placeholder: "예) 2단으로 구성해주세요",
      },
    ],
    materialImages: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
    materialInfo:
      "이건 이게 좋고요 저건 저게 좋고 이것은 이렇게 이렇게 해주세요. 첨부 자료의 톤을 우선 참고하고, 실제 작업물에서는 정보 위계가 더 명확하게 보이도록 정리해주세요.",
    referenceImages: ["/images/thumbnail_mock.jpg", "/images/thumbnail_mock.jpg"],
    referenceInfo:
      "이건 이게 좋고요 저건 저게 좋고 이것은 이렇게 이렇게 해주세요. 레퍼런스의 색 대비와 타이포 리듬을 참고하되 그대로 복제하지 않고 새로운 방향으로 풀어주세요.",
    basePrice: "40,000원",
    maxReward: "320,000원",
  },
];

const formatDeadlineDate = (deadline: string) => {
  const dateMatch = deadline.match(/^(\d{4})[.-](\d{1,2})[.-](\d{1,2})/);

  if (!dateMatch) return deadline;

  const [, year, month, day] = dateMatch;

  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};

const parseDeadlineDate = (deadline: string) => {
  const dateMatch = deadline.match(/^(\d{4})[.-](\d{1,2})[.-](\d{1,2})/);

  if (!dateMatch) {
    return new Date(deadline);
  }

  const [, year, month, day] = dateMatch;

  return new Date(Number(year), Number(month) - 1, Number(day));
};

const getDDay = (deadline: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = parseDeadlineDate(deadline);
  targetDate.setHours(0, 0, 0, 0);

  if (Number.isNaN(targetDate.getTime())) {
    return "-";
  }

  const diff = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return diff >= 0 ? `D-${diff}` : "-";
};

const DeadlineItem = ({ label, deadline }: { label: string; deadline: string }) => {
  return (
    <div className="flex items-center gap-1.5">
      <p className="text-body1-sb text-gray-80">
        {label}: {formatDeadlineDate(deadline)}
      </p>
      <Tag variant="default" label={getDDay(deadline)} />
    </div>
  );
};

const InfoBlock = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <h3 className="text-caption1-sb text-gray-70">{label}</h3>
      <p className="text-heading3-sb text-gray-80">{value}</p>
    </div>
  );
};

const UnderlineTitle = ({ children }: { children: string }) => {
  return (
    <h3 className="border-gray-30 text-body1-sb text-gray-70 inline-block w-fit border-b pb-1">
      {children}
    </h3>
  );
};

const DesignInfoTab = ({ commission }: { commission: MockCommission }) => {
  return (
    <div className="flex flex-col items-start gap-7">
      <InfoBlock label="카테고리" value={commission.category} />
      <hr className="border-gray-20 w-full" />
      <InfoBlock label="사이즈" value={commission.size} />
      <hr className="border-gray-20 w-full" />

      <section className="flex w-full flex-col items-start gap-7">
        <div className="flex w-full flex-col items-start gap-5">
          <h3 className="text-heading3-sb text-gray-80">디자인 컨셉</h3>
          <div className="grid w-full grid-cols-5 gap-12">
            {CONCEPT_GROUPS.map(({ title, keywords }) => (
              <div key={title} className="flex flex-col items-start gap-4">
                <h4 className="text-body2-sb text-gray-80">{title}</h4>
                <div className="flex w-full flex-col gap-2">
                  {keywords.map(keyword => {
                    const isSelected = commission.selectedConcepts.includes(keyword);

                    return (
                      <Chip
                        key={keyword}
                        label={keyword}
                        variant="long"
                        className="h-[34px] w-35"
                        isSelected={isSelected}
                        disabled={!isSelected}
                        disableHover
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-3">
          <UnderlineTitle>추가 요청사항</UnderlineTitle>
          <p className="text-body1-m text-gray-80">{commission.additionalRequest}</p>
        </div>
      </section>

      <hr className="border-gray-20 w-full" />

      <section className="flex w-full flex-col items-start gap-5 pb-10">
        <h3 className="text-caption1-sb text-gray-70">색상</h3>
        <div className="flex gap-4">
          {commission.colors.map(({ role, code, background }, index) => (
            <div key={`${code}-${index}`} className="flex flex-col items-center gap-5.5">
              <div
                className="rounded-8 border-gray-20 relative size-25 border"
                style={{ backgroundColor: background } as CSSProperties}
              >
                {role && (
                  <div className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[50%]">
                    <Tag variant="default" label={role} />
                  </div>
                )}
              </div>
              <span className="text-body2-m text-gray-70">{code}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const WorkRequestTab = ({ commission }: { commission: MockCommission }) => {
  const requiredPageSet = new Set(commission.requiredPages);

  return (
    <div className="flex flex-col items-start gap-7">
      <section className="flex w-full flex-col items-start gap-8">
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-heading2-sb text-gray-90">필수 페이지</h3>
          <p className="text-body2-m text-gray-70">
            작업물에 필수적으로 들어가야 할 페이지 및 레이아웃입니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {REQUIRED_PAGES.map(page => (
            <Chip
              key={page}
              label={page}
              className="w-fit"
              isSelected={requiredPageSet.has(page)}
              disableHover
            />
          ))}
        </div>
      </section>

      <hr className="border-gray-20 w-full" />

      <section className="flex w-full flex-col items-start gap-8">
        <h3 className="text-heading2-sb text-gray-90">레이아웃 및 디자인 요청사항</h3>
        <div className="grid w-full grid-cols-2 gap-6">
          {commission.pageRequests.map(({ title, value, placeholder }) => (
            <div key={title} className="flex flex-col gap-2">
              <p className="text-body1-sb text-gray-80">{title}</p>
              <TextField
                readOnly
                maxLength={150}
                value={value}
                placeholder={placeholder}
                variant="white"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ImageGallery = ({ images, labelPrefix }: { images: string[]; labelPrefix: string }) => {
  return (
    <div className="flex w-full justify-center gap-8">
      {images.map((url, index) => (
        <ImageCard
          key={`${labelPrefix}-${index}`}
          url={url}
          label={`${labelPrefix} ${String(index + 1).padStart(2, "0")}`}
        />
      ))}
    </div>
  );
};

const ReferenceTab = ({ commission }: { commission: MockCommission }) => {
  return (
    <div className="flex flex-col items-start gap-7">
      <section className="flex w-full flex-col items-start gap-5">
        <div className="flex w-full flex-col items-start gap-4">
          <h3 className="text-heading2-sb text-gray-80">디자인에 사용될 자료</h3>
          <ImageGallery images={commission.materialImages} labelPrefix="자료" />
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <UnderlineTitle>자료 정보</UnderlineTitle>
          <p className="text-body1-m text-gray-80">{commission.materialInfo}</p>
        </div>
      </section>

      <hr className="border-gray-20 w-full" />

      <section className="flex w-full flex-col items-start gap-5 pb-10">
        <div className="flex w-full flex-col items-start gap-4">
          <h3 className="text-heading2-sb text-gray-80">레퍼런스</h3>
          <ImageGallery images={commission.referenceImages} labelPrefix="레퍼런스" />
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <UnderlineTitle>레퍼런스 참고사항</UnderlineTitle>
          <p className="text-body1-m text-gray-80">{commission.referenceInfo}</p>
        </div>
      </section>
    </div>
  );
};

const RewardItem = ({ label, amount }: { label: string; amount: string }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-caption2-m text-gray-30">{label}</span>
      <strong className="text-heading2-sb text-white">{amount}</strong>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const { commissionId } = useParams<{ commissionId: string }>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCommission = useMemo(
    () =>
      mockCommissions.find(commission => String(commission.id) === commissionId) ??
      mockCommissions[0],
    [commissionId],
  );

  return (
    <div className="mx-auto flex w-236.25 flex-col gap-4 py-8">
      <div className="flex w-full flex-col gap-9">
        <header className="flex flex-col items-start gap-5">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1"
            onClick={() => router.push("/designer/search")}
          >
            <ArrowLeftIcon className="text-gray-70 size-4.5" />
            <span className="text-caption1-m text-gray-70">목록으로 돌아가기</span>
          </button>

          <div className="flex w-full flex-col items-start gap-3">
            <h1 className="text-title2-sb w-full text-black">{selectedCommission.title}</h1>

            <div className="flex items-center gap-2">
              <ClockIcon className="text-gray-80 size-6 shrink-0" />
              <div className="flex items-center gap-4">
                <DeadlineItem label="1차 마감" deadline={selectedCommission.firstDraftDeadline} />
                <DeadlineItem label="최종 마감" deadline={selectedCommission.finalDeadline} />
              </div>
            </div>
          </div>
        </header>

        <section className="rounded-12 flex h-168 w-full flex-col overflow-hidden bg-white">
          <div className="px-6 pt-2">
            <div className="border-gray-40 flex w-full gap-4 border-b">
              {MENU_LABELS.map((label, index) => (
                <Menu
                  key={label}
                  label={label}
                  selected={selectedIndex === index}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="scrollbar-hide flex-1 overflow-y-auto px-6 pt-7 pb-7">
            {selectedIndex === 0 && <DesignInfoTab commission={selectedCommission} />}
            {selectedIndex === 1 && <WorkRequestTab commission={selectedCommission} />}
            {selectedIndex === 2 && <ReferenceTab commission={selectedCommission} />}
          </div>
        </section>
      </div>

      <div className="border-gray-70 bg-gray-80 shadow-banner rounded-8 flex w-full items-center justify-between border py-2 pr-3 pl-6">
        <div className="flex items-center gap-6">
          <RewardItem label="기본금" amount={selectedCommission.basePrice} />
          <RewardItem label="최대 수령액" amount={selectedCommission.maxReward} />
        </div>
        <Button type="button" variant="medium_primary" className="w-60">
          참여하기
        </Button>
      </div>
    </div>
  );
};

export default Page;
