"use client";

import { useState } from "react";

import { SIDEBAR_ICON_MAP } from "@/constants/sidebarMenu";

interface SidebarMenuProps {
  label: string;
}

const SidebarMenu = ({ label }: SidebarMenuProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isActive = isSelected || isHovered;
  const icons = SIDEBAR_ICON_MAP[label];

  return (
    <nav
      className="bg-gray-5 rounded-8 hover:bg-gray-20 group w-58 cursor-pointer px-5 py-3"
      onClick={() => setIsSelected(prev => !prev)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* TODO: 추후 SELECTED 상태까지 포함 */}
      <div className="text-gray-80 flex flex-row items-center gap-2">
        {icons &&
          (isActive ? (
            <icons.boldIcon className="size-4.5" />
          ) : (
            <icons.icon className="size-4.5" />
          ))}
        <p className="text-body2-m group-hover:text-body2-sb">{label}</p>
      </div>
    </nav>
  );
};

export default SidebarMenu;
