"use client";

import { useState } from "react";

import Menu from "@/shared/ui/Menu";
import DesignInfoTab from "@/widgets/instructor/detail/ui/DesignInfoTab";
import ReferenceTab from "@/widgets/instructor/detail/ui/ReferenceTab";
import WorkRequestTab from "@/widgets/instructor/detail/ui/WorkRequestTab";

const MENU_LABELS = ["디자인 정보", "작업 요청사항", "자료 및 레퍼런스"] as const;

const CommissionDetailSection = () => {
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
          {selectedIndex === 0 && <DesignInfoTab />}
          {selectedIndex === 1 && <WorkRequestTab />}
          {selectedIndex === 2 && <ReferenceTab />}
        </div>
      </div>
    </div>
  );
};

export default CommissionDetailSection;
