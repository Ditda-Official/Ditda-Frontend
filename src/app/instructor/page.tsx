"use client";

import { useState } from "react";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

const InstructorPage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  return (
    <div className="flex gap-4 p-10">
      <Button variant="medium_primary" onClick={() => setIsUploadModalOpen(true)}>
        업로드 초과 모달 열기
      </Button>
      <Button variant="medium_secondary" onClick={() => setIsLeaveModalOpen(true)}>
        페이지 이탈 모달 열기
      </Button>

      <Modal
        type="single"
        isOpen={isUploadModalOpen}
        title={"업로드 가능 파일 개수를\n초과했습니다"}
        description={
          "파일은 30MB 씩 총 3개까지 업로드가 가능합니다.\n기존의 업로드한 파일을 삭제 후 업로드해주세요."
        }
        confirmLabel="확인"
        onConfirm={() => setIsUploadModalOpen(false)}
        onClose={() => setIsUploadModalOpen(false)}
      />

      <Modal
        type="double"
        isOpen={isLeaveModalOpen}
        title="현재 페이지에서 이탈하시겠습니까?"
        description={"페이지를 이탈하면 작성된 정보는\n저장되지 않습니다."}
        confirmLabel="확인"
        cancelLabel="취소"
        onConfirm={() => setIsLeaveModalOpen(false)}
        onCancel={() => setIsLeaveModalOpen(false)}
        onClose={() => setIsLeaveModalOpen(false)}
      />
    </div>
  );
};

export default InstructorPage;
