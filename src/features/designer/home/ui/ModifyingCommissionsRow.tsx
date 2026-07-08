"use client";

import { useRouter } from "next/navigation";

import { getDDay } from "@/features/designer/home/lib/getDDay";
import Button from "@/shared/ui/Button";
import Tag from "@/shared/ui/Tag";

export type ModifyingCommissionItem = {
  commissionId: number;
  title: string;
  finalDeadline: string;
  remainingRevisionCount: number;
  isSubmitted: boolean;
};

const ModifyingCommissionsRow = ({ item }: { item: ModifyingCommissionItem }) => {
  const router = useRouter();
  const { commissionId, finalDeadline, isSubmitted, title } = item;

  return (
    <div className="border-b-gray-10 flex h-15 items-center border-b py-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Tag variant="default" label={getDDay(finalDeadline)} />
          <p className="text-heading3-m text-gray-80 max-w-80 truncate">{title}</p>
        </div>
        <Button
          type="button"
          variant={isSubmitted ? "small_text" : "small_secondary"}
          className="w-fit"
          onClick={
            isSubmitted ? undefined : () => router.push(`/designer/revision/${commissionId}`)
          }
        >
          {isSubmitted ? "전송완료" : "확인하기"}
        </Button>
      </div>
    </div>
  );
};

export default ModifyingCommissionsRow;
