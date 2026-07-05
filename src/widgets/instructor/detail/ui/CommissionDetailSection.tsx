"use client";

import { useState } from "react";

import type { CommissionDetail } from "@/shared/api/commissionTypes";
import Menu from "@/shared/ui/Menu";
import DesignInfoTab from "@/widgets/instructor/detail/ui/DesignInfoTab";
import ReferenceTab from "@/widgets/instructor/detail/ui/ReferenceTab";
import WorkRequestTab from "@/widgets/instructor/detail/ui/WorkRequestTab";

const MENU_LABELS = ["디자인 정보", "작업 요청사항", "자료 및 레퍼런스"] as const;

interface CommissionDetailSectionProps {
  commission: CommissionDetail;
}

const CommissionDetailSection = ({ commission }: CommissionDetailSectionProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-xl bg-white px-6">
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
          {selectedIndex === 0 && (
            <DesignInfoTab category={commission.category} designInfo={commission.designInfo} />
          )}
          {selectedIndex === 1 && <WorkRequestTab categoryDetail={commission.categoryDetail} />}
          {selectedIndex === 2 && <ReferenceTab files={commission.files} />}
        </div>
      </div>
    </div>
  );
};

export default CommissionDetailSection;
