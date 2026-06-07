import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
  bottom?: ReactNode;
}

const Sidebar = ({ children, bottom }: SidebarProps) => {
  return (
    <aside className="bg-gray-5 flex h-full w-fit flex-col gap-3 px-4 pt-12 pb-3">
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
