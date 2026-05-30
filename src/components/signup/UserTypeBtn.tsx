import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type UserTypeBtnProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-pressed" | "children" | "type"
> & {
  icon: ReactNode;
  type: string;
  description: string;
  isSelected?: boolean;
};

const userTypeBtnStyles = {
  selected: {
    button: "border-purple-40 bg-white",
    icon: "text-purple-40",
    type: "text-purple-60",
    description: "text-gray-70",
  },
  default: {
    button: "border-gray-20 bg-gray-10 hover:border-purple-40 hover:bg-purple-40",
    icon: "text-gray-60 group-hover:text-white",
    type: "text-gray-60 group-hover:text-white",
    description: "text-gray-60 group-hover:text-white",
  },
};

const UserTypeBtn = ({
  icon,
  type,
  description,
  isSelected = false,
  className,
  ...props
}: UserTypeBtnProps) => {
  const styles = isSelected ? userTypeBtnStyles.selected : userTypeBtnStyles.default;

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={cn(
        "group rounded-12 flex w-58 cursor-pointer flex-col items-center gap-6 border-2 px-6 py-9 text-center transition-colors duration-150 outline-none",
        styles.button,
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "flex size-20 items-center justify-center transition-colors duration-150",
          styles.icon,
        )}
      >
        {icon}
      </span>

      <span className="flex flex-col items-center gap-2">
        <span className={cn("text-title2-b transition-colors duration-150", styles.type)}>
          {type}
        </span>
        <span className={cn("text-body2-m transition-colors duration-150", styles.description)}>
          {description}
        </span>
      </span>
    </button>
  );
};

export default UserTypeBtn;
