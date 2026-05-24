"use client";

import type { ChangeEventHandler, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/cn";

const DEFAULT_TEXT_FIELD_MAX_LENGTH = 300;

export type TextFieldProps = Omit<
  ComponentPropsWithoutRef<"textarea">,
  "children" | "defaultValue" | "disabled" | "maxLength" | "onChange" | "rows" | "value"
> & {
  maxLength?: number;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
  variant?: "gray" | "white";
};

const TextField = ({
  className,
  maxLength = DEFAULT_TEXT_FIELD_MAX_LENGTH,
  onChange,
  value,
  variant = "gray",
  ...props
}: TextFieldProps) => {
  const characterLimit = Math.max(0, maxLength);
  const textValue = value.slice(0, characterLimit);
  const hasValue = textValue.length > 0;

  return (
    <div
      className={cn(
        "rounded-8 flex w-full flex-col gap-1 px-4 pt-4 pb-3 transition-colors",
        variant === "gray" &&
          (hasValue ? "bg-gray-10 border border-gray-50" : "bg-gray-10 border border-transparent"),
        variant === "white" &&
          (hasValue ? "border border-gray-50 bg-white" : "border-gray-40 border bg-white"),
      )}
    >
      <textarea
        {...props}
        className={cn(
          "scrollbar-hide text-body2-m text-gray-80 placeholder:text-body2-m placeholder:text-gray-60 h-[98px] w-full resize-none bg-transparent outline-none",
          className,
        )}
        maxLength={characterLimit}
        onChange={onChange}
        value={textValue}
      />
      <div className="text-caption1-m text-gray-60 self-end">
        {textValue.length}/{characterLimit}
      </div>
    </div>
  );
};

export default TextField;
