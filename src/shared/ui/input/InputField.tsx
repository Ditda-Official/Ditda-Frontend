"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useId, useState } from "react";

import {
  CheckCircleFillIcon,
  CloseCircleFillIcon,
  ClosedEyeIcon,
  ExclamationMarkCircleIcon,
  OpenEyeIcon,
} from "@/shared/assets/icons";
import { cn } from "@/shared/lib/utils/cn";

const iconButtonClassName =
  "disabled:text-gray-30 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center transition-colors disabled:cursor-not-allowed";

export type InputFieldProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  message?: string;
  errorMessage?: string;
  isSuccess?: boolean;
  onClear?: () => void;
  rightElement?: ReactNode;
  showPasswordToggle?: boolean;
  wrapperClassName?: string;
};

const InputField = ({
  className,
  disabled,
  errorMessage,
  id,
  isSuccess = false,
  label,
  message,
  onClear,
  rightElement,
  showPasswordToggle = false,
  type,
  value,
  wrapperClassName,
  ...props
}: InputFieldProps) => {
  const generatedId = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputId = id ?? generatedId;
  const hasError = Boolean(errorMessage);
  const hasPasswordToggle = showPasswordToggle && type === "password";
  const hasValue = value != null && String(value).length > 0;
  const visibleMessage = errorMessage || message;
  const messageId = visibleMessage ? `${inputId}-message` : undefined;
  const inputType = hasPasswordToggle && isPasswordVisible ? "text" : type;
  const StatusIcon = hasError ? ExclamationMarkCircleIcon : isSuccess ? CheckCircleFillIcon : null;
  const PasswordIcon = isPasswordVisible ? ClosedEyeIcon : OpenEyeIcon;
  const hasRightContent =
    StatusIcon != null ||
    (onClear != null && hasValue) ||
    rightElement != null ||
    hasPasswordToggle;

  return (
    <div className={cn("flex w-full flex-col gap-2", wrapperClassName)}>
      {label != null && (
        <label className="text-body2-r text-gray-70" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            "rounded-8 border-gray-30 flex w-full items-center justify-between border bg-white p-4 transition-colors",
            "focus-within:border-purple-30",
            hasError && "border-red-main focus-within:border-red-main",
            disabled && "bg-gray-10 text-gray-50",
          )}
        >
          <input
            {...props}
            aria-describedby={messageId}
            aria-invalid={hasError || undefined}
            className={cn(
              "text-heading3-m text-gray-90 min-w-0 flex-1 bg-transparent outline-none",
              "placeholder:text-heading3-m placeholder:text-gray-50 disabled:cursor-not-allowed",
              className,
            )}
            disabled={disabled}
            id={inputId}
            type={inputType}
            value={value}
          />
          {hasRightContent && (
            <div className="flex shrink-0 items-center gap-2">
              {StatusIcon != null && (
                <StatusIcon
                  aria-hidden="true"
                  className={cn("size-6 shrink-0", hasError && "text-red-main")}
                />
              )}
              {onClear != null && hasValue && (
                <button
                  aria-label="입력값 삭제"
                  className={cn(iconButtonClassName, "text-gray-40 hover:text-gray-60")}
                  disabled={disabled}
                  onClick={onClear}
                  type="button"
                >
                  <CloseCircleFillIcon aria-hidden="true" className="size-5" />
                </button>
              )}
              {rightElement}
              {hasPasswordToggle && (
                <button
                  aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
                  className={cn(iconButtonClassName, "text-gray-60")}
                  disabled={disabled}
                  onClick={() => setIsPasswordVisible(prev => !prev)}
                  type="button"
                >
                  <PasswordIcon aria-hidden="true" className="size-6" />
                </button>
              )}
            </div>
          )}
        </div>
        {visibleMessage && (
          <p
            className={cn("text-caption1-m px-1", hasError ? "text-red-main" : "text-gray-60")}
            id={messageId}
          >
            {visibleMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputField;
