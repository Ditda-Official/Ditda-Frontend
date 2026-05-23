"use client";

import { useState } from "react";

import Button from "@/components/common/Button";
import FileDragAndDrop from "@/components/common/FileDragAndDrop";
import Modal from "@/components/common/Modal";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-4">
    <h2 className="text-heading3-sb text-gray-80 border-gray-30 border-b pb-2">{title}</h2>
    {children}
  </section>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <p className="text-caption2-m text-gray-50">{label}</p>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </div>
);

const InstructorPage = () => {
  const [singleOpen, setSingleOpen] = useState(false);
  const [doubleOpen, setDoubleOpen] = useState(false);

  return (
    <div className="flex flex-col gap-12 p-10">
      <Section title="Button">
        <Row label="xsmall">
          <Button variant="xsmall_primary">xsmall primary</Button>
        </Row>
        <Row label="small">
          <Button variant="small_primary">small primary</Button>
          <Button variant="small_secondary">small secondary</Button>
          <Button variant="small_tertiary">small tertiary</Button>
          <Button variant="small_disabled">small disabled</Button>
        </Row>
        <Row label="medium">
          <Button variant="medium_primary">medium primary</Button>
          <Button variant="medium_secondary">medium secondary</Button>
          <Button variant="medium_tertiary">medium tertiary</Button>
          <Button variant="medium_disabled">medium disabled</Button>
        </Row>
        <Row label="large">
          <Button variant="large_primary">large primary</Button>
          <Button variant="large_disabled">large disabled</Button>
        </Row>
        <Row label="certification">
          <Button variant="certification_primary">certification primary</Button>
          <Button variant="certification_disabled">certification disabled</Button>
        </Row>
      </Section>

      <Section title="FileDragAndDrop">
        <FileDragAndDrop />
      </Section>

      <Section title="Modal">
        <Row label="single">
          <Button variant="small_primary" className="w-fit" onClick={() => setSingleOpen(true)}>
            single 모달 열기
          </Button>
        </Row>
        <Row label="double">
          <Button variant="small_primary" className="w-fit" onClick={() => setDoubleOpen(true)}>
            double 모달 열기
          </Button>
        </Row>
      </Section>

      <Modal
        isOpen={singleOpen}
        type="single"
        title={"업로드 가능 파일 개수를\n초과했습니다"}
        description={
          "파일은 30MB 씩 총 3개까지 업로드가 가능합니다.\n기존의 업로드한 파일을 삭제 후 업로드해주세요."
        }
        confirmLabel="버튼"
        onConfirm={() => setSingleOpen(false)}
        onClose={() => setSingleOpen(false)}
      />
      <Modal
        isOpen={doubleOpen}
        type="double"
        title="현재 페이지에서 이탈하시겠습니까?"
        description={"페이지를 이탈하면 작성된 정보는\n저장되지 않습니다."}
        confirmLabel="확인"
        cancelLabel="취소"
        onConfirm={() => setDoubleOpen(false)}
        onCancel={() => setDoubleOpen(false)}
        onClose={() => setDoubleOpen(false)}
      />
    </div>
  );
};

export default InstructorPage;
