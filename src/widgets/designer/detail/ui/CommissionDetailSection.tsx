"use client";

import { useState } from "react";

import Menu from "@/shared/ui/Menu";
import DesignInfoTab from "@/widgets/designer/detail/ui/DesignInfoTab";
import ReferenceTab from "@/widgets/designer/detail/ui/ReferenceTab";
import WorkRequestTab from "@/widgets/designer/detail/ui/WorkRequestTab";

const MENU_LABELS = ["디자인 정보", "작업 요청사항", "자료 및 레퍼런스"] as const;

export type DesignerCommissionDetail = {
  id: number;
  title: string;
  firstDraftDeadline: string;
  finalDeadline: string;
  category: string;
  size: string;
  selectedConcepts: string[];
  additionalRequest: string;
  colors: { role?: string; code: string; background: string }[];
  requiredPages: string[];
  pageRequests: { title: string; value: string; placeholder: string }[];
  materialImages: string[];
  materialInfo: string;
  referenceImages: string[];
  referenceInfo: string;
  basePrice: string;
  maxReward: string;
};

interface CommissionDetailSectionProps {
  commission: DesignerCommissionDetail;
  initialSelectedIndex?: number;
}

const CommissionDetailSection = ({
  commission,
  initialSelectedIndex = 0,
}: CommissionDetailSectionProps) => {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);

  return (
    <div className="rounded-12 flex h-168 w-full flex-col overflow-hidden bg-white px-6">
      <div className="border-gray-40 flex shrink-0 gap-4 border-b pt-2">
        {MENU_LABELS.map((label, index) => (
          <Menu
            key={label}
            label={label}
            selected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col py-7">
        <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
          {selectedIndex === 0 && <DesignInfoTab designInfo={commission} />}
          {selectedIndex === 1 && <WorkRequestTab workRequest={commission} />}
          {selectedIndex === 2 && <ReferenceTab referenceInfo={commission} />}
        </div>
      </div>
    </div>
  );
};

export default CommissionDetailSection;
