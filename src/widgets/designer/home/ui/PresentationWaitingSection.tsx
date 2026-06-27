"use client";

import { ArrowRightIcon, NextButton, PrevButton } from "@/shared/assets/icons";
import usePagination from "@/shared/lib/hooks/usePagination";
import Badge, { type BadgeVariant } from "@/shared/ui/Badge";
import PageIndicator from "@/shared/ui/PageIndicator";
import Tag from "@/shared/ui/Tag";
import { MATCHING_ITEMS_PER_PAGE } from "@/widgets/designer/home/config/home";

type PresentationResult = "selected" | "notSelected" | "waiting";

type PresentationWaitingItem = {
  id: number;
  title: string;
  announcementDate: string;
  result: PresentationResult;
};

// 목데이터
const presentationWaitingItems: PresentationWaitingItem[] = [
  {
    id: 3,
    title: "수학의 정석 - 한석원",
    announcementDate: "2026-07-01",
    result: "waiting",
  },
  {
    id: 4,
    title: "해커스톡 왕초보 영어 - 누구해커스톡 왕초보 영어",
    announcementDate: "2026-06-20",
    result: "selected",
  },
  {
    id: 5,
    title: "수학의 정석 - 한석원ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    announcementDate: "2026-06-15",
    result: "notSelected",
  },
  {
    id: 6,
    title: "수학의 정석 - 한석원",
    announcementDate: "2026-07-01",
    result: "waiting",
  },
];

const resultBadgeVariantMap: Record<PresentationResult, BadgeVariant> = {
  selected: "pass",
  notSelected: "fail",
  waiting: "waiting",
};

const getAnnouncementDDay = (announcementDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(announcementDate);
  targetDate.setHours(0, 0, 0, 0);

  const diff = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return diff >= 0 ? `D-${diff}` : "-";
};

const PresentationWaitingSection = () => {
  const { current, totalPages, pageItems, handlePrev, handleNext } =
    usePagination<PresentationWaitingItem>(presentationWaitingItems, MATCHING_ITEMS_PER_PAGE);

  return (
    <section className="rounded-12 w-full bg-white px-6 pt-6 pb-4">
      <div className="flex flex-col gap-8">
        <h2 className="text-heading1-sb text-black">
          발표 <span className="text-main-main">대기란</span>
        </h2>

        <div className="flex flex-col gap-5">
          <div>
            <div className="border-b-gray-40 text-caption1-r text-gray-70 flex w-full justify-between border-b pb-3 whitespace-nowrap">
              <div className="flex flex-1 gap-6">
                <p className="w-11">디데이</p>
                <p>외주명</p>
              </div>
              <p className="w-14.5">결과</p>
            </div>

            <div className="h-45">
              {pageItems.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <span className="text-heading3-m text-gray-60">
                    발표 대기 중인 외주가 없습니다
                  </span>
                </div>
              ) : (
                pageItems.map(item => (
                  <div
                    key={item.id}
                    className="border-b-gray-10 flex h-15 items-center border-b py-3"
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <div className="flex items-center gap-6">
                        <Tag variant="black" label={getAnnouncementDDay(item.announcementDate)} />
                        <div className="flex items-center">
                          <p className="text-heading3-m text-gray-80 max-w-80 truncate">
                            {item.title}
                          </p>
                          <ArrowRightIcon className="text-gray-90 size-5 shrink-0 cursor-pointer" />
                        </div>
                      </div>
                      <Badge variant={resultBadgeVariantMap[item.result]} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {pageItems.length > 0 && (
            <div className="flex items-center justify-between">
              <PrevButton className="size-12 cursor-pointer" onClick={handlePrev} />
              <PageIndicator total={totalPages} current={current} />
              <NextButton className="size-12 cursor-pointer" onClick={handleNext} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PresentationWaitingSection;
