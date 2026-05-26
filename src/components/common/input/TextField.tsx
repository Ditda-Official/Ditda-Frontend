"use client";

import type { ChangeEventHandler, ComponentPropsWithoutRef } from "react";
import { useState } from "react";

import { cn } from "@/lib/utils/cn";

const DEFAULT_TEXT_FIELD_MAX_LENGTH = 300;

export type TextFieldProps = Omit<
  ComponentPropsWithoutRef<"textarea">,
  "children" | "disabled" | "maxLength" | "onChange" | "rows" | "value"
> & {
  defaultValue?: string;
  maxLength?: number;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
  variant?: "gray" | "white";
};

const TextField = ({
  className,
  defaultValue = "",
  maxLength = DEFAULT_TEXT_FIELD_MAX_LENGTH,
  onChange,
  value,
  variant = "gray",
  ...props
}: TextFieldProps) => {
  const characterLimit = Math.max(0, maxLength);
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    defaultValue.slice(0, characterLimit),
  );
  const isControlled = value != null;
  const textValue = (isControlled ? value : uncontrolledValue).slice(0, characterLimit);
  const hasValue = textValue.length > 0;

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
    if (!isControlled) {
      setUncontrolledValue(event.target.value.slice(0, characterLimit));
    }

    onChange?.(event);
  };

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
          "scrollbar-hide text-body2-m text-gray-80 placeholder:text-body2-m placeholder:text-gray-60 h-24.5 w-full resize-none bg-transparent outline-none",
          className,
        )}
        maxLength={characterLimit}
        onChange={handleChange}
        value={textValue}
      />
      <div className="text-caption1-m text-gray-60 self-end">
        {textValue.length}/{characterLimit}
      </div>
    </div>
  );
};

export default TextField;
