"use client";

import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";

import { getDDay } from "@/features/instructor/home";
import { formatDate } from "@/features/instructor/write";
import { getCommissionDetail } from "@/shared/api/commission";
import type { CommissionDetail } from "@/shared/api/commissionTypes";
import { ClockIcon } from "@/shared/assets/icons";
import Tag from "@/shared/ui/Tag";
import CommissionDetailSection from "@/widgets/instructor/detail/ui/CommissionDetailSection";

interface PageProps {
  params: Promise<{ commissionId: string }>;
}

const Page = ({ params }: PageProps) => {
  const { commissionId } = use(params);
  const [commission, setCommission] = useState<CommissionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommissionDetail(commissionId)
      .then(setCommission)
      .finally(() => setIsLoading(false));
  }, [commissionId]);

  if (isLoading) return null;
  if (!commission) return notFound();

  const { title, dateInfo } = commission;

  return (
    <div className="mx-auto flex h-full w-235 flex-col py-8">
      <div className="flex min-h-0 flex-1 flex-col gap-8">
        <div className="flex shrink-0 flex-col gap-3">
          <h1 className="text-title2-sb text-black">{title}</h1>
          <div className="flex flex-row gap-2">
            <ClockIcon className="text-gray-90 size-6" />
            <h2 className="text-gray-80 text-body1-sb">
              1차 마감: {formatDate(new Date(dateInfo.firstDraftDeadline))}
            </h2>
            <Tag label={getDDay(dateInfo.firstDraftDeadline)} variant="default" />
            <hr className="border-gray-30 h-6.5 w-px border-l" />
            <h2 className="text-gray-80 text-body1-sb">
              최종 마감: {formatDate(new Date(dateInfo.finalDeadline))}
            </h2>
            <Tag label={getDDay(dateInfo.finalDeadline)} variant="default" />
          </div>
        </div>
        <CommissionDetailSection commission={commission} />
      </div>
    </div>
  );
};

export default Page;
