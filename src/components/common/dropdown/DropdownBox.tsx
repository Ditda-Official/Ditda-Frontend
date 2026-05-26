import { useState } from "react";

import { ArrowDownIcon } from "@/assets/icons";

interface DropdownBoxProps {
  label: string;
  placeholder?: string;
  selectedValue?: string;
}

const DropdownBox = ({
  label,
  placeholder = "0000년 00월 00일",
  selectedValue,
}: DropdownBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="rounded-12 border-gray-40 hover:border-purple-40 cursor-pointer border bg-white py-2 pr-2 pl-5 transition-all duration-150"
      onClick={() => setIsOpen(prev => !prev)}
    >
      <div className="flex flex-row gap-2">
        <p className="text-gray-80 text-body2-m self-center text-center">{label}</p>
        <div className="flex flex-row gap-1 py-2 pr-1 pl-4">
          <p className={`text-body1-sb ${selectedValue ? "text-main-main" : "text-gray-70"}`}>
            {selectedValue ?? placeholder}
          </p>
          <ArrowDownIcon
            className={`text-gray-70 size-6 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default DropdownBox;
