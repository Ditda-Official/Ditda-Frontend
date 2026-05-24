"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/cn";

export type SmallInputProps = Omit<ComponentPropsWithoutRef<"input">, "children"> & {
  children?: string | number;
};

const SmallInput = ({
  children,
  className,
  defaultValue,
  type = "text",
  value,
  ...props
}: SmallInputProps) => {
  return (
    <input
      {...props}
      className={cn(
        "text-body2-m text-gray-80 placeholder:text-gray-60 rounded-8 border-gray-40 h-11.5 w-full max-w-full border bg-white p-3 transition-colors outline-none",
        "focus:border-gray-60",
        className,
      )}
      defaultValue={defaultValue ?? (value == null ? children : undefined)}
      type={type}
      value={value}
    />
  );
};

export default SmallInput;
