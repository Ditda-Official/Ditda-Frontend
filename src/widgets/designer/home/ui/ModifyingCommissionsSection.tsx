"use client";

import { NextButton, PrevButton } from "@/shared/assets/icons";
import usePagination from "@/shared/lib/hooks/usePagination";
import Button from "@/shared/ui/Button";
import PageIndicator from "@/shared/ui/PageIndicator";
import Tag from "@/shared/ui/Tag";
import { MODIFYING_ITEMS_PER_PAGE } from "@/widgets/designer/home/config/home";

type ModifyingCommissionItem = {
  id: number;
  title: string;
  finalDeadline: string;
  isSubmitted: boolean;
};

//목데이터
const modifyingCommissionItems: ModifyingCommissionItem[] = [
  {
    id: 1,
    title: "수학의 정석 - 한석원물마마마마마나너나마마마마마마마마나너나마마마",
    finalDeadline: "2026-07-01",
    isSubmitted: false,
  },
  {
    id: 2,
    title: "수학의 정석 - 한석원몸마마마마나너나마마마",
    finalDeadline: "2026-07-01",
    isSubmitted: false,
  },
  {
    id: 3,
    title: "수학의 정석 - 한석원",
    finalDeadline: "2026-07-05",
    isSubmitted: true,
  },
  {
    id: 4,
    title: "해커스톡 왕초보 영어 - 누구해커스톡 왕초보 영어",
    finalDeadline: "2026-07-08",
    isSubmitted: false,
  },
];

const getDDay = (deadline: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(deadline);
  targetDate.setHours(0, 0, 0, 0);

  const diff = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return diff >= 0 ? `D-${diff}` : "-";
};

const ModifyingCommissionsSection = () => {
  const { current, totalPages, pageItems, handlePrev, handleNext } =
    usePagination<ModifyingCommissionItem>(modifyingCommissionItems, MODIFYING_ITEMS_PER_PAGE);

  return (
    <section className="rounded-12 w-full bg-white px-6 pt-6 pb-4">
      <div className="flex flex-col gap-8">
        <h2 className="text-heading1-sb text-black">
          <span className="text-main-main">수정 중</span>인 외주
        </h2>

        <div className="flex flex-col gap-5">
          <div>
            <div className="border-b-gray-40 text-caption1-r text-gray-70 flex w-full justify-between border-b pb-3 whitespace-nowrap">
              <div className="flex flex-1 gap-6">
                <p className="w-11">디데이</p>
                <p>외주명</p>
              </div>
              <p className="w-20">작업 단계</p>
            </div>

            <div className="h-45">
              {pageItems.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <span className="text-heading3-m text-gray-60">수정 중인 외주가 없습니다</span>
                </div>
              ) : (
                pageItems.map(item => (
                  <div
                    key={item.id}
                    className="border-b-gray-10 flex h-15 items-center border-b py-3"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-6">
                        <Tag variant="default" label={getDDay(item.finalDeadline)} />
                        <p className="text-heading3-m text-gray-80 max-w-80 truncate">
                          {item.title}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant={item.isSubmitted ? "small_text" : "small_secondary"}
                        className="w-fit"
                      >
                        {item.isSubmitted ? "전송완료" : "확인하기"}
                      </Button>
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

export default ModifyingCommissionsSection;
