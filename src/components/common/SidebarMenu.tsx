"use client";

import { useState } from "react";

import {
  ExitBoldIcon,
  ExitIcon,
  FileBoldIcon,
  FileIcon,
  FileImageBoldIcon,
  FileImageIcon,
  ProfileCircleBoldIcon,
  ProfileCircleIcon,
  SearchBoldIcon,
  SearchIcon,
} from "@/assets/icons";

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const ICON_MAP: Record<string, { icon: IconComponent; boldIcon: IconComponent }> = {
  "현재 외주": { icon: FileIcon, boldIcon: FileBoldIcon },
  "외주 찾기": { icon: SearchIcon, boldIcon: SearchBoldIcon },
  마이페이지: { icon: ProfileCircleIcon, boldIcon: ProfileCircleBoldIcon },
  로그아웃: { icon: ExitIcon, boldIcon: ExitBoldIcon },
  "새 외주 작성": { icon: FileIcon, boldIcon: FileBoldIcon },
  "진행 중 외주": { icon: FileImageIcon, boldIcon: FileImageBoldIcon },
};

interface SidebarMenuProps {
  label: string;
}

const SidebarMenu = ({ label }: SidebarMenuProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isActive = isSelected || isHovered;
  const icons = ICON_MAP[label];

  return (
    <nav
      className="bg-gray-5 rounded-8 hover:bg-gray-20 group w-58 cursor-pointer px-5 py-3"
      onClick={() => setIsSelected(prev => !prev)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
