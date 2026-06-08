"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";

import { CloseCircleIcon } from "@/shared/assets/icons";
import DragScrollbar from "@/shared/ui/DragScrollbar";

interface DraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrls: string[];
}

const DraftModal = ({ isOpen, onClose, title, fileUrls }: DraftModalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="rounded-24 flex h-191 w-303.5 flex-col bg-white py-10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between px-14 pb-10">
          <h1 id={titleId} className="text-heading1-sb flex items-center text-black">
            {title}
          </h1>
          <CloseCircleIcon
            className="text-gray-70 size-12 cursor-pointer"
            role="button"
            aria-label="모달 닫기"
            onClick={onClose}
          />
        </div>
        <div
          ref={scrollRef}
          className="scrollbar-hide flex flex-row gap-6 overflow-x-auto pr-14 pb-0.75 pl-14"
        >
          {fileUrls.map((fileUrl, index) => (
            <div
              key={`${fileUrl}-${index}`}
              className="rounded-12 relative h-128.25 w-86.25 shrink-0 overflow-hidden select-none"
              onContextMenu={e => e.preventDefault()}
            >
              <Image
                src={fileUrl}
                alt="시안 이미지"
                fill
                sizes="345px"
                draggable={false}
                className="pointer-events-none object-cover"
              />
            </div>
          ))}
        </div>
        <DragScrollbar scrollRef={scrollRef} className="mt-8 px-14" />
      </div>
    </div>
  );
};

export default DraftModal;
