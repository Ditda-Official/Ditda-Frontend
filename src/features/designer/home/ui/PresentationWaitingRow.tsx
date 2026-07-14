"use client";

import { useRouter } from "next/navigation";

import type {
  DesignerAnnouncementType,
  PresentationWaitingItem,
} from "@/features/designer/home/api/homeTypes";
import { getDDay } from "@/features/designer/home/lib/getDDay";
import { ArrowRightIcon } from "@/shared/assets/icons";
import Badge, { type BadgeVariant } from "@/shared/ui/Badge";
import Tag from "@/shared/ui/Tag";

const announcementBadgeVariantMap: Record<DesignerAnnouncementType, BadgeVariant> = {
  AWAITING: "waiting",
  SELECTED: "pass",
  NOT_SELECTED: "fail",
};

const PresentationWaitingRow = ({ item }: { item: PresentationWaitingItem }) => {
  const router = useRouter();

  return (
    <div className="border-b-gray-10 flex h-15 items-center border-b py-3">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <Tag variant="black" label={getDDay(item.applicationDeadline)} />
          <div className="flex items-center">
            <p className="text-heading3-m text-gray-80 max-w-80 truncate">{item.title}</p>
            <button
              type="button"
              aria-label={`${item.title} 외주 상세 보기`}
              onClick={() => router.push(`/designer/detail/${item.commissionId}?hideActions=true`)}
            >
              <ArrowRightIcon className="text-gray-90 size-5 shrink-0 cursor-pointer" />
            </button>
          </div>
        </div>
        <Badge variant={announcementBadgeVariantMap[item.status]} />
      </div>
    </div>
  );
};

export default PresentationWaitingRow;
