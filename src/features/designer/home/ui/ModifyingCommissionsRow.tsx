"use client";

import { useRouter } from "next/navigation";

import type { ModifyingItem } from "@/features/designer/home/api/homeTypes";
import { getDDay } from "@/features/designer/home/lib/getDDay";
import { cn } from "@/shared/lib/utils/cn";
import Button from "@/shared/ui/Button";
import Tag from "@/shared/ui/Tag";

const ModifyingCommissionsRow = ({ item }: { item: ModifyingItem }) => {
  const router = useRouter();
  const { commissionId, finalDeadline, hasUpdated, isSubmitted, title } = item;

  return (
    <div className="border-b-gray-10 flex h-15 items-center border-b py-3">
      <div className="flex w-full items-center justify-between">
        <div className={cn("flex items-center", hasUpdated ? "gap-3" : "gap-6")}>
          <Tag variant="default" label={getDDay(finalDeadline)} />
          <div className={cn("flex items-center", hasUpdated && "gap-1")}>
            {hasUpdated && <div className="bg-main-main size-2 self-start rounded-full" />}
            <p className="text-heading3-m text-gray-80 max-w-80 truncate">{title}</p>
          </div>
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
