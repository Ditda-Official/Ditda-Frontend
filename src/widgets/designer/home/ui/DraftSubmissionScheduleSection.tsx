"use client";

import { ArrowRightIcon, NextButton, PrevButton } from "@/shared/assets/icons";
import usePagination from "@/shared/lib/hooks/usePagination";
import Button from "@/shared/ui/Button";
import PageIndicator from "@/shared/ui/PageIndicator";
import Tag from "@/shared/ui/Tag";
import { DRAFT_SUBMISSION_ITEMS_PER_PAGE } from "@/widgets/designer/home/config/home";

type DraftSubmissionScheduleItem = {
  id: number;
  dDay: string;
  category: string;
  title: string;
  submissionDeadline: string;
  maxReward: string;
};

const draftSubmissionScheduleItems: DraftSubmissionScheduleItem[] = [
  {
    id: 1,
    dDay: "D-1",
    category: "포스터",
    title: "해커스톡 왕초보 영어 - 누구누",
    submissionDeadline: "2026.05.16 11:59pm",
    maxReward: "400,000원",
  },
  {
    id: 2,
    dDay: "D-12",
    category: "교재 외지/내지",
    title: "해커스톡 왕초보 영어 - 누구누누구누누구누",
    submissionDeadline: "2026.05.16 11:59pm",
    maxReward: "400,000원",
  },
  {
    id: 3,
    dDay: "D-55",
    category: "명함",
    title: "해커스톡 왕초보 영어 - 누구누누구누누구누누구누누구누누구누누구누누구누",
    submissionDeadline: "2026.05.16 11:59pm",
    maxReward: "400,000원",
  },
  {
    id: 4,
    dDay: "D-4",
    category: "포스터",
    title: "해커스톡 왕초보 영어 - 누구누",
    submissionDeadline: "2026.05.16 11:59pm",
    maxReward: "400,000원",
  },
  {
    id: 5,
    dDay: "D-1",
    category: "교재 외지/내지",
    title: "해커스톡 왕초보 영어 - 누구누",
    submissionDeadline: "2026.05.16 11:59pm",
    maxReward: "400,000원",
  },
  {
    id: 6,
    dDay: "D-24",
    category: "명함",
    title: "해커스톡 왕초보 영어 - 누구누",
    submissionDeadline: "2026.05.16 11:59pm",
    maxReward: "400,000원",
  },
];

const DraftSubmissionScheduleSection = () => {
  const { current, totalPages, pageItems, handlePrev, handleNext } =
    usePagination<DraftSubmissionScheduleItem>(
      draftSubmissionScheduleItems,
      DRAFT_SUBMISSION_ITEMS_PER_PAGE,
    );

  return (
    <section className="rounded-12 flex h-94.5 w-full flex-col bg-white px-6 pt-6 pb-4">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-8">
          <h2 className="text-heading1-sb text-black">
            <span className="text-main-main">시안 제출</span> 예정 외주
          </h2>

          <div>
            <div className="border-b-gray-40 text-caption1-r text-gray-70 flex w-full items-center justify-between border-b pb-3 whitespace-nowrap">
              <div className="flex items-center gap-6">
                <p className="w-11">디데이</p>
                <p className="w-20">카테고리</p>
                <p>외주명</p>
              </div>
              <div className="flex w-96.5 items-center justify-between">
                <div className="flex items-center gap-14">
                  <p className="w-32">제출마감 일자</p>
                  <p className="w-20">최대 수령액</p>
                </div>
                <div className="w-25" />
              </div>
            </div>

            {pageItems.map(item => (
              <div key={item.id} className="border-b-gray-10 flex h-15 items-center border-b py-3">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-6">
                    <Tag variant="default" label={item.dDay} />
                    <p className="text-body2-m text-gray-70 w-20 truncate">{item.category}</p>
                    <div className="flex items-center">
                      <p className="text-heading3-m text-gray-80 max-w-80 truncate">{item.title}</p>
                      <ArrowRightIcon className="text-gray-90 size-5 shrink-0 cursor-pointer" />
                    </div>
                  </div>

                  <div className="flex w-96.5 items-center justify-between">
                    <div className="flex items-center gap-14">
                      <p className="text-body2-sb text-gray-70 w-32">{item.submissionDeadline}</p>
                      <p className="text-body2-sb text-gray-70 w-20">{item.maxReward}</p>
                    </div>
                    <Button type="button" variant="small_primary" className="w-25">
                      제출하기
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <PrevButton className="size-12 cursor-pointer" onClick={handlePrev} />
          <PageIndicator total={totalPages} current={current} />
          <NextButton className="size-12 cursor-pointer" onClick={handleNext} />
        </div>
      </div>
    </section>
  );
};

export default DraftSubmissionScheduleSection;
