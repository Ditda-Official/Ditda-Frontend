"use client";

import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";

import { getCommissionDetail } from "@/shared/api/commission";
import type { CommissionDetail } from "@/shared/api/commissionTypes";
import {
  BackToListButton,
  CommissionDetailSection,
  CommissionHeader,
  CommissionParticipationBar,
} from "@/widgets/designer/detail";

interface PageProps {
  params: Promise<{ commissionId: string }>;
  searchParams: Promise<{ hideActions?: string | string[] }>;
}

const Page = ({ params, searchParams }: PageProps) => {
  const { commissionId } = use(params);
  const { hideActions } = use(searchParams);
  const shouldHideActions = Array.isArray(hideActions)
    ? hideActions.includes("true")
    : hideActions === "true";
  const [commission, setCommission] = useState<CommissionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getCommissionDetail(commissionId)
      .then(result => {
        if (isMounted) setCommission(result);
      })
      .catch(() => {
        if (isMounted) setCommission(null);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [commissionId]);

  if (isLoading) return null;
  if (!commission) return notFound();

  const { dateInfo, priceInfo } = commission;

  return (
    <div className="mx-auto flex h-full w-236.25 flex-col gap-4 py-8">
      <div className="flex min-h-0 w-full flex-1 flex-col gap-9">
        <header className="flex flex-col items-start gap-5">
          {!shouldHideActions && <BackToListButton />}

          <CommissionHeader
            title={commission.title}
            firstDraftDeadline={dateInfo.firstDraftDeadline}
            finalDeadline={dateInfo.finalDeadline}
          />
        </header>

        <CommissionDetailSection commission={commission} />
      </div>

      {!shouldHideActions && priceInfo && (
        <CommissionParticipationBar
          key={commission.commissionId}
          commissionId={commission.commissionId}
          baseAmount={priceInfo.baseAmount}
          maxAmount={priceInfo.maxAmount}
          applied={commission.applied ?? false}
          applicationDeadline={dateInfo.applicationDeadline}
        />
      )}
    </div>
  );
};

export default Page;
