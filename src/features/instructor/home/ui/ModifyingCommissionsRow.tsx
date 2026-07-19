"use client";

import { useRouter } from "next/navigation";

import { ModifyingItem } from "@/features/instructor/home/api/homeTypes";
import { getDDay } from "@/features/instructor/home/lib/getDDay";
import { cn } from "@/shared/lib/utils/cn";
import Button from "@/shared/ui/Button";
import Tag from "@/shared/ui/Tag";

const ModifyingCommissionsRow = ({ item }: { item: ModifyingItem }) => {
  const router = useRouter();
  const { commissionId, title, finalDeadline, isSubmitted, hasUpdated } = item;

  return (
    <div className="border-b-gray-10 flex h-15 cursor-default border-b py-3">
      <div className="flex w-full flex-row justify-between">
        <div className={cn("flex flex-row items-center", hasUpdated ? "gap-3" : "gap-6")}>
          <Tag variant="default" label={getDDay(finalDeadline)} />
          <div className={cn("flex flex-row items-center", hasUpdated && "gap-1")}>
            {hasUpdated && <div className="bg-main-main size-2 self-start rounded-full" />}
            <p className="text-gray-80 text-heading3-m max-w-75 truncate">{title}</p>
          </div>
        </div>
        {isSubmitted ? (
          <button className="text-body1-m text-purple-70 w-20">전송완료</button>
        ) : (
          <Button
            variant="small_secondary"
            className="w-fit"
            onClick={() => router.push(`/instructor/revision/${commissionId}`)}
          >
            확인하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModifyingCommissionsRow;
