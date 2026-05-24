import type { ComponentPropsWithoutRef, ReactNode } from "react";

type RadioProps = Omit<ComponentPropsWithoutRef<"input">, "className" | "type"> & {
  children?: ReactNode;
};

const Radio = ({ children, disabled, ...props }: RadioProps) => {
  return (
    <label
      className={`relative inline-flex items-center gap-2 ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      <input {...props} className="peer sr-only" disabled={disabled} type="radio" />
      <span
        aria-hidden="true"
        className="border-gray-20 bg-gray-10 after:bg-main-main peer-checked:border-purple-40 peer-checked:bg-purple-10 peer-focus-visible:outline-purple-40 inline-flex size-6 shrink-0 items-center justify-center rounded-full border-[2px] peer-checked:border peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 after:size-[14px] after:rounded-full after:opacity-0 peer-checked:after:opacity-100"
      />
      {children != null && (
        <span className="text-body1-m peer-checked:text-gray-90 text-gray-60">{children}</span>
      )}
    </label>
  );
};

export default Radio;
