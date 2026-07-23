import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import InputField from "../InputField";

const meta: Meta<typeof InputField> = {
  title: "shared/input/InputField",
  component: InputField,
  tags: ["autodocs"],
  args: {
    label: "이메일",
    placeholder: "이메일을 입력해주세요",
  },
  decorators: [
    Story => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {};

export const Success: Story = {
  args: { defaultValue: "hello@ditda.kr", isSuccess: true, message: "사용 가능한 이메일입니다" },
};

export const Error: Story = {
  args: { defaultValue: "hello@", errorMessage: "이메일 형식이 올바르지 않습니다" },
};

export const Password: Story = {
  args: {
    label: "비밀번호",
    type: "password",
    showPasswordToggle: true,
    placeholder: "비밀번호를 입력해주세요",
  },
};

export const Disabled: Story = {
  args: { defaultValue: "hello@ditda.kr", disabled: true },
};
