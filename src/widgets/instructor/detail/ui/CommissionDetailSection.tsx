"use client";

import { useState } from "react";

import Menu from "@/shared/ui/Menu";

const MENU_LABELS = ["디자인 정보", "작업 요청사항", "자료 및 레퍼런스"] as const;

const CommissionDetailSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="rounded-xl bg-white px-6">
      <div className="border-gray-40 flex gap-4 border-b pt-2">
        {MENU_LABELS.map((label, index) => (
          <Menu
            key={label}
            label={label}
            selected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
      <div className="py-7">{/* Content for the selected menu item */}</div>
    </div>
  );
};

export default CommissionDetailSection;
