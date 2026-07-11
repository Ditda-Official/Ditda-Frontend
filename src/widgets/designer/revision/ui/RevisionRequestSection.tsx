"use client";

import { useState } from "react";

import TextField from "@/shared/ui/input/TextField";
import DraftModal from "@/shared/ui/modal/DraftModal";
import Tag from "@/shared/ui/Tag";
import Thumbnail from "@/shared/ui/Thumbnail";

const parseDeadlineDate = (deadline: string) => {
  const dateMatch = deadline.match(/^(\d{4})[.-](\d{1,2})[.-](\d{1,2})/);

  if (!dateMatch) {
    return new Date(deadline);
  }

  const [, year, month, day] = dateMatch;

  return new Date(Number(year), Number(month) - 1, Number(day));
};

const formatDate = (date: string) => {
  const targetDate = parseDeadlineDate(date);

  if (Number.isNaN(targetDate.getTime())) {
    return date;
  }

  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  return `${year}년 ${month}월 ${day}일`;
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

interface RevisionRequestSectionProps {
  title: string;
  finalDeadline: string;
  remainingRevisionCount: number;
  revisionCategory?: string;
  revisionComment?: string;
  thumbnailUrl?: string;
  draftFileUrls?: string[];
  additionalComment?: string;
  onChangeAdditionalComment?: (comment: string) => void;
}

const RevisionRequestSection = ({
  title,
  finalDeadline,
  remainingRevisionCount,
  revisionCategory = "레이아웃 수정",
  revisionComment = "지난번 수정사항 중 이러이러한 거 이렇게 바꾸랬는데 진심 너무 구려서 안하고 이렇게 하는것을 제안합니다. 어케 생각하세요 글고 이거이거는 수정 안하는게 나을떼. 지난번 수정사항 중 이러이러한 거 이렇게 바꾸랬는데 진심 너무 구려서 안하고 이렇게 하는것을 제안합니다....",
  thumbnailUrl,
  draftFileUrls = ["/images/thumbnail_mock.jpg"],
  additionalComment,
  onChangeAdditionalComment,
}: RevisionRequestSectionProps) => {
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);

  return (
    <>
      <section className="rounded-12 flex w-full flex-col gap-6 bg-white p-6">
        <div className="border-gray-20 flex flex-col gap-3 border-b pb-4">
          <div className="flex items-center gap-6">
            <p className="text-body1-sb text-gray-70 w-25">외주 정보</p>
            <p className="text-body1-m min-w-0 truncate text-black">{title}</p>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-body1-sb text-gray-70 w-25">수정 마감일</p>
            <div className="flex items-center gap-2">
              <p className="text-body1-m text-black">{formatDate(finalDeadline)}</p>
              <Tag variant="default" label={getDDay(finalDeadline)} />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-body1-sb text-gray-70 w-25">남은 수정 횟수</p>
            <p className="text-body1-m text-main-main">{remainingRevisionCount}회</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-7">
          <div className="flex w-223 items-start gap-10">
            <Thumbnail
              src={thumbnailUrl}
              className="h-63.75 w-62.5 shrink-0"
              onDetailClick={() => setIsDraftModalOpen(true)}
            />
            <div className="bg-purple-5 border-purple-10 rounded-12 flex min-h-37 flex-1 flex-col gap-4 border px-6 py-5">
              <h2 className="text-body1-sb text-main-main">{revisionCategory}</h2>
              <p className="text-body2-m text-gray-80">{revisionComment}</p>
            </div>
          </div>

          <div className="flex h-45 w-223 flex-col gap-2">
            <p className="text-body1-sb text-gray-70">추가 코멘트 작성</p>
            <TextField
              placeholder="강사님이 요청하신 수정사항에 대한 코멘트가 있다면 작성해주세요."
              value={additionalComment}
              onChange={event => onChangeAdditionalComment?.(event.target.value)}
            />
          </div>
        </div>
      </section>
      <DraftModal
        isOpen={isDraftModalOpen}
        onClose={() => setIsDraftModalOpen(false)}
        title={title}
        fileUrls={draftFileUrls}
      />
    </>
  );
};

export default RevisionRequestSection;
export type { RevisionRequestSectionProps };
