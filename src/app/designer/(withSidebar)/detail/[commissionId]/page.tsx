"use client";

import { use } from "react";

import {
  BackToListButton,
  CommissionDetailSection,
  CommissionHeader,
  CommissionParticipationBar,
} from "@/widgets/designer/detail";
import { designerDetailCommissions } from "@/widgets/designer/detail/config/commission";

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
  const commission =
    designerDetailCommissions.find(item => String(item.id) === commissionId) ??
    designerDetailCommissions[0];

  return (
    <div className="mx-auto flex w-236.25 flex-col gap-4 py-8">
      <div className="flex w-full flex-col gap-9">
        <header className="flex flex-col items-start gap-5">
          {!shouldHideActions && <BackToListButton />}

          <CommissionHeader
            title={commission.title}
            firstDraftDeadline={commission.firstDraftDeadline}
            finalDeadline={commission.finalDeadline}
          />
        </header>

        <CommissionDetailSection commission={commission} />
      </div>

      {!shouldHideActions && (
        <CommissionParticipationBar
          basePrice={commission.basePrice}
          maxReward={commission.maxReward}
        />
      )}
    </div>
  );
};

export default Page;
