"use client";

import {
  CommissionsHeader,
  type ModifyingCommissionItem,
  ModifyingCommissionsRow,
} from "@/features/designer/home";
import { NextButton, PrevButton } from "@/shared/assets/icons";
import usePagination from "@/shared/lib/hooks/usePagination";
import PageIndicator from "@/shared/ui/PageIndicator";
import { MODIFYING_ITEMS_PER_PAGE } from "@/widgets/designer/home/config/home";

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
            <CommissionsHeader rightLabel="작업 단계" rightClassName="w-20">
              <p className="w-11">디데이</p>
              <p>외주명</p>
            </CommissionsHeader>

            <div className="h-45">
              {pageItems.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <span className="text-heading3-m text-gray-60">수정 중인 외주가 없습니다</span>
                </div>
              ) : (
                pageItems.map(item => <ModifyingCommissionsRow key={item.id} item={item} />)
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
