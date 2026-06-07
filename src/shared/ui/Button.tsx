import { ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils/cn";

type ButtonVariant =
  | "small_primary"
  | "small_secondary"
  | "small_tertiary"
  | "small_disabled"
  | "medium_primary"
  | "medium_secondary"
  | "medium_tertiary"
  | "medium_disabled"
  | "large_primary"
  | "large_disabled"
  | "certification_primary"
  | "certification_disabled"
  | "xsmall_primary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  small_disabled:
    "px-3.5 py-1.5 rounded-8 bg-gray-10 text-gray-60 cursor-not-allowed text-body1-sb",
  small_primary:
    "px-3.5 py-1.5 rounded-8 bg-main-main text-white hover:bg-main-dark text-body1-sb hover:text-gray-20",
  small_secondary:
    "px-3.5 py-1.5 rounded-8 border border-purple-10 bg-purple-5 hover:border-transparent hover:bg-gray-30 text-purple-60 text-body1-m",
  small_tertiary:
    "px-3.5 py-1.5 rounded-8 text-body1-sb text-gray-60 bg-gray-20 border border-transparent hover:bg-gray-40 active:bg-purple-20 active:text-main-main active:border-purple-30",
  medium_primary:
    "px-8 py-3 rounded-12 bg-main-main text-white hover:bg-main-dark hover:text-gray-20 text-heading3-sb",
  medium_secondary:
    "px-8 py-3 rounded-12 bg-white text-heading3-sb text-gray-70 border border-gray-30 hover:bg-gray-30",
  medium_tertiary: "px-8 py-3 rounded-12 bg-gray-30 hover:bg-gray-50 text-gray-70 text-heading3-sb",
  medium_disabled:
    "px-8 py-3 rounded-12 bg-gray-30 text-gray-60 text-heading3-sb cursor-not-allowed",
  large_primary:
    "px-7 py-4 rounded-12 bg-main-main text-heading2-sb hover:bg-main-dark hover:text-gray-20 text-white",
  large_disabled:
    "px-7 py-4 cursor-not-allowed bg-gray-30 rounded-12 text-heading2-sb text-gray-60",
  certification_primary:
    "rounded-8 px-6 py-4 bg-main-main text-heading3-m text-white hover:text-gray-20 hover:bg-main-dark",
  certification_disabled:
    "rounded-8 px-6 py-4 text-gray-60 text-heading3-m bg-gray-30 cursor-not-allowed",
  xsmall_primary:
    "rounded-8 text-gray-70 px-3 py-2 bg-gray-40 text-caption2-m hover:bg-purple-40 hover:text-white gap-1 [&>svg]:size-4.5",
};

const Button = ({ variant, children, className, ...props }: ButtonProps) => {
  const isDisabled =
    variant === "small_disabled" ||
    variant === "medium_disabled" ||
    variant === "large_disabled" ||
    variant === "certification_disabled";

  return (
    <button
      className={cn(
        "inline-flex w-full cursor-pointer items-center justify-center transition-colors duration-150",
        variantStyles[variant],
        className,
      )}
      disabled={isDisabled || props.disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
