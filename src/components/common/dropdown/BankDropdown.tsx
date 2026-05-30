"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowDownIcon, ArrowUpIcon } from "@/assets/icons";
import {
  BANK_DROPDOWN_MAX_HEIGHT,
  BANK_OPTIONS,
  type BankCode,
  type BankOption,
} from "@/constants/signup";
import { cn } from "@/lib/utils/cn";

interface BankDropdownProps {
  className?: string;
  defaultValue?: BankCode | null;
  disabled?: boolean;
  onChange?: (bank: BankOption) => void;
  placeholder?: string;
  value?: BankCode | null;
}

const BankDropdown = ({
  className,
  defaultValue = null,
  disabled = false,
  onChange,
  placeholder = "은행을 선택해주세요",
  value,
}: BankDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<BankCode | null>(defaultValue);

  const selectedCode = value === undefined ? internalValue : value;
  const selectedBank = BANK_OPTIONS.find(({ code }) => code === selectedCode);
  const DirectionIcon = isOpen ? ArrowUpIcon : ArrowDownIcon;

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (bank: BankOption) => {
    if (value === undefined) {
      setInternalValue(bank.code);
    }

    onChange?.(bank);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      <button
        aria-expanded={isOpen}
        className={cn(
          "rounded-8 border-gray-30 flex h-14 w-full cursor-pointer items-center justify-between border bg-white p-4 text-left outline-none",
          "hover:bg-gray-10 focus-visible:bg-gray-10",
          disabled && "bg-gray-10 cursor-not-allowed text-gray-50",
        )}
        disabled={disabled}
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span
          className={cn(
            "text-heading3-m truncate tracking-normal",
            selectedBank ? "text-gray-90" : "text-gray-50",
            disabled && "text-gray-50",
          )}
        >
          {selectedBank?.name ?? placeholder}
        </span>
        <DirectionIcon aria-hidden="true" className="text-gray-60 size-6 shrink-0" />
      </button>

      {isOpen && !disabled && (
        <div className="rounded-8 border-gray-20 absolute top-[calc(100%+4px)] z-20 w-full overflow-hidden border bg-white">
          <div
            className="scrollbar-hide overflow-y-auto"
            style={{ maxHeight: BANK_DROPDOWN_MAX_HEIGHT }}
          >
            {BANK_OPTIONS.map(bank => {
              const isSelected = bank.code === selectedCode;

              return (
                <button
                  className={cn(
                    "text-heading3-m flex h-14 w-full cursor-pointer items-center p-4 text-left",
                    "hover:bg-gray-10 focus-visible:bg-gray-10 focus-visible:outline-none",
                    isSelected ? "bg-purple-5 text-main-main" : "text-gray-80",
                  )}
                  key={bank.code}
                  type="button"
                  onClick={() => handleSelect(bank)}
                >
                  {bank.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BankDropdown;
