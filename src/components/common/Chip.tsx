import { CloseIcon } from "@/assets/icons";
import { cn } from "@/lib/utils/cn";

type ChipVariant = "selectable" | "removable";

interface ChipProps {
  label: string;
  isSelected?: boolean;
  isHoverPreview?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  removeAriaLabel?: string;
  variant?: ChipVariant;
}

const Chip = ({
  label,
  isSelected = false,
  isHoverPreview = false,
  onRemove,
  onClick,
  removeAriaLabel,
  variant = "selectable",
}: ChipProps) => {
  if (variant === "removable") {
    const iconWrapperStyles = "inline-flex size-4 shrink-0 items-center justify-center";
    const icon = <CloseIcon aria-hidden="true" className="text-gray-20 size-full" />;

    return (
      <div
        className="bg-main-main rounded-100 inline-flex cursor-pointer items-center justify-center gap-1 py-1.5 pr-2 pl-3 text-white"
        onClick={onRemove}
        role={onRemove != null ? "button" : undefined}
        tabIndex={onRemove != null ? 0 : undefined}
        aria-label={onRemove != null ? (removeAriaLabel ?? `${label} 삭제`) : undefined}
      >
        <span className="text-body2-m">{label}</span>
        <span className={iconWrapperStyles}>{icon}</span>
      </div>
    );
  }

  const baseStyles =
    "group rounded-100 inline-flex h-[34px] cursor-pointer items-center justify-center border px-3 py-[6px]";
  const selectedStyles = "border-main-main bg-purple-10";
  const defaultStyles = "border-transparent bg-gray-10 hover:bg-gray-40";

  const spanColor = isSelected
    ? "text-body2-sb text-main-main"
    : "text-body2-m text-gray-70 group-hover:text-gray-70";

  return (
    <div
      className={cn(
        baseStyles,
        isSelected ? selectedStyles : defaultStyles,
        isHoverPreview && !isSelected && "bg-gray-40",
      )}
      onClick={onClick}
      role={onClick != null ? "button" : undefined}
      tabIndex={onClick != null ? 0 : undefined}
    >
      <span className={spanColor}>{label}</span>
    </div>
  );
};

export default Chip;
