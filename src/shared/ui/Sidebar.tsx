"use client";

import { ReactNode, useEffect, useRef } from "react";

interface SidebarProps {
  children: ReactNode;
  bottom?: ReactNode;
}

const Sidebar = ({ children, bottom }: SidebarProps) => {
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = asideRef.current;
    if (!node) return;

    const updateWidth = () => {
      document.documentElement.style.setProperty("--sidebar-w", `${node.offsetWidth}px`);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <aside ref={asideRef} className="bg-gray-5 flex h-full w-fit flex-col gap-3 px-4 pt-12 pb-3">
      {children}
      {bottom && (
        <div className="mt-auto">
          <hr className="border-gray-40 mb-2" />
          {bottom}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
