import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "small_primary" | "small_secondary" | "small_tertiary" | "small_disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  small_disabled:
    "rounded-8 bg-gray-10 text-gray-60 cursor-not-allowed text-body1-sb pointer-events-none",
  small_primary:
    "rounded-8 bg-main-main text-white hover:bg-main-dark text-body1-sb hover:text-gray-50",
  small_secondary:
    "rounded-8 border border-purple-10 bg-purple-5 hover:border-transparent hover:bg-gray-30 text-purple-60 text-body1-m",
  small_tertiary:
    "rounded-8 text-body1-sb text-gray-60 bg-gray-20 border border-transparent hover:bg-gray-40 active:bg-gray-20 active:text-main-main active:border-purple-30 cursor-not-allowed",
};

const Button = ({ variant, children, className, ...props }: ButtonProps) => {
  const isDisabled = variant === "small_disabled";

  return (
    <button
      className={`inline-flex w-full cursor-pointer items-center justify-center px-3.5 py-1.5 transition-colors ${variantStyles[variant]} ${className ?? ""}`}
      disabled={isDisabled || props.disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
