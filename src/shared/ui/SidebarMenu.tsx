"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { SIDEBAR_ICON_MAP } from "@/shared/config/sidebarMenu";

interface SidebarMenuProps {
  label: string;
  href?: string;
  matchPrefix?: string | string[];
  disabled?: boolean;
  onClick?: () => void;
}

const SidebarMenu = ({ label, href, matchPrefix, disabled = false, onClick }: SidebarMenuProps) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const prefixes = matchPrefix ? (Array.isArray(matchPrefix) ? matchPrefix : [matchPrefix]) : [];
  const isSelected = href ? pathname === href || prefixes.some(p => pathname.startsWith(p)) : false;
  const isActive = isSelected || isHovered;
  const icons = SIDEBAR_ICON_MAP[label];
  const isLogout = label === "로그아웃";

  const content = (
    <div
      className={`flex flex-row items-center gap-2 ${
        isSelected ? "text-gray-90" : isLogout && !isActive ? "text-gray-70" : "text-gray-80"
      }`}
    >
      {icons &&
        (isActive ? <icons.boldIcon className="size-4.5" /> : <icons.icon className="size-4.5" />)}
      <p className={isSelected ? "text-body2-sb" : "text-body2-m group-hover:text-body2-sb"}>
        {label}
      </p>
    </div>
  );

  const className =
    "bg-gray-5 rounded-8 hover:bg-gray-20 group block w-58 cursor-pointer px-5 py-3 text-left transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60" +
    (isSelected ? " bg-gray-20" : "");

  if (href != null) {
    return (
      <Link
        href={href}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </Link>
    );
  }

  return onClick != null ? (
    <button
      className={className}
      disabled={disabled}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </button>
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
