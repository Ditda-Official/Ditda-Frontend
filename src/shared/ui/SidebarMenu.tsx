"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { SIDEBAR_ICON_MAP } from "@/shared/config/sidebarMenu";

interface SidebarMenuProps {
  label: string;
  href?: string;
}

const SidebarMenu = ({ label, href }: SidebarMenuProps) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const isSelected = href ? pathname === href : false;
  const isActive = isSelected || isHovered;
  const icons = SIDEBAR_ICON_MAP[label];

  const content = (
    <div
      className={`flex flex-row items-center gap-2 ${isSelected ? "text-gray-90" : "text-gray-80"}`}
    >
      {icons &&
        (isActive ? <icons.boldIcon className="size-4.5" /> : <icons.icon className="size-4.5" />)}
      <p className={isSelected ? "text-body2-sb" : "text-body2-m group-hover:text-body2-sb"}>
        {label}
      </p>
    </div>
  );

  const className =
    "bg-gray-5 rounded-8 hover:bg-gray-20 group w-58 cursor-pointer px-5 py-3 block transition-colors duration-150" +
    (isSelected ? " bg-gray-20" : "");

  return href ? (
    <Link
      href={href}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </Link>
  ) : (
    <nav
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </nav>
  );
};

export default SidebarMenu;
