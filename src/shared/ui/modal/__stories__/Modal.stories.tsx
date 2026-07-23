import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import Modal from "../Modal";

type ModalArgs = {
  isOpen: boolean;
  type: "single" | "double";
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose: () => void;
};

const meta = {
  title: "shared/modal/Modal",
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div style={{ minWidth: "600px", minHeight: "500px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: "radio",
      options: ["single", "double"],
      description: "single: 버튼 1개 / double: 버튼 2개(확인+취소)",
    },
    cancelLabel: {
      if: { arg: "type", eq: "double" },
    },
    onCancel: {
      if: { arg: "type", eq: "double" },
    },
  },
  args: {
    isOpen: true,
    type: "single",
    title: "요청이 완료되었습니다",
    description: "담당 디자이너가 확인 후 연락드릴 예정입니다.",
    confirmLabel: "확인",
    cancelLabel: "취소",
    onConfirm: fn(),
    onCancel: fn(),
    onClose: fn(),
  },
  render: ({ type, cancelLabel, onCancel, ...rest }) => {
    if (type === "double") {
      return (
        <Modal
          {...rest}
          type="double"
          cancelLabel={cancelLabel ?? "취소"}
          onCancel={onCancel ?? fn()}
        />
      );
    }
    return <Modal {...rest} type="single" />;
  },
} satisfies Meta<ModalArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    type: "single",
  },
};

export const Double: Story = {
  args: {
    type: "double",
    title: "작성을 취소하시겠어요?",
    description: "작성 중인 내용은 저장되지 않습니다.",
    confirmLabel: "나가기",
    cancelLabel: "취소",
  },
};
