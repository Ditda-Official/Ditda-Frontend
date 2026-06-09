"use client";

import { useState } from "react";

import { draftDetailsData } from "@/features/instructor/choose";
import Button from "@/shared/ui/Button";
import DraftModal from "@/shared/ui/modal/DraftModal";
import Thumbnail from "@/shared/ui/Thumbnail";

interface DraftCardProps {
  index: number;
  draftId: number;
  thumbnailUrl: string;
  isSelected: boolean;
  onSelect: (index: number) => void;
}

const DraftCard = ({ index, draftId, thumbnailUrl, isSelected, onSelect }: DraftCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const detail = draftDetailsData[draftId];

  return (
    <>
      <div className="border-gray-30 rounded-12 border-[1.5px] bg-white p-4">
        <div className="flex justify-between pb-6">
          <span className="text-gray-70 text-body1-sb">시안 {index + 1}</span>
          <Button
            variant="choose"
            aria-pressed={isSelected}
            className="w-fit"
            onClick={() => onSelect(index)}
          >
            이 디자인으로 할게요
          </Button>
        </div>
        <Thumbnail
          src={thumbnailUrl}
          alt={`시안 ${draftId}`}
          className="h-63.75 w-full shrink-0"
          onDetailClick={() => setIsModalOpen(true)}
        />
      </div>
      {detail && (
        <DraftModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`시안 ${index + 1}`}
          fileUrls={detail.fileUrls}
        />
      )}
    </>
  );
};

export default DraftCard;
