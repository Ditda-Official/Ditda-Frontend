import { ReactNode } from "react";

interface CommissionsHeaderProps {
  children: ReactNode;
  rightLabel: string;
  rightClassName?: string;
}

const CommissionsHeader = ({ children, rightLabel, rightClassName }: CommissionsHeaderProps) => {
  return (
    <div className="text-gray-70 text-caption1-r border-b-gray-40 flex w-full flex-row justify-between border-b pb-3 whitespace-nowrap">
      <div className="flex flex-1 flex-row gap-6">{children}</div>
      <p className={rightClassName}>{rightLabel}</p>
    </div>
  );
};

export default CommissionsHeader;
