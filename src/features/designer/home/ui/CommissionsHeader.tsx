import { ReactNode } from "react";

import { cn } from "@/shared/lib/utils/cn";

interface CommissionsHeaderProps {
  children: ReactNode;
  rightLabel?: string;
  rightClassName?: string;
  rightContent?: ReactNode;
  className?: string;
  leftClassName?: string;
}

const CommissionsHeader = ({
  children,
  rightLabel,
  rightClassName,
  rightContent,
  className,
  leftClassName = "flex flex-1 gap-6",
}: CommissionsHeaderProps) => {
  return (
    <div
      className={cn(
        "border-b-gray-40 text-caption1-r text-gray-70 flex w-full justify-between border-b pb-3 whitespace-nowrap",
        className,
      )}
    >
      <div className={leftClassName}>{children}</div>
      {rightContent ?? <p className={rightClassName}>{rightLabel}</p>}
    </div>
  );
};

export default CommissionsHeader;
