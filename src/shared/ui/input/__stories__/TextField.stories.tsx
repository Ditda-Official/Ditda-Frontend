import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TextField from "../TextField";

const meta: Meta<typeof TextField> = {
  title: "shared/input/TextField",
  component: TextField,
  tags: ["autodocs"],
  args: {
    placeholder: "요청 사항을 입력해주세요",
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

type Story = StoryObj<typeof TextField>;

export const Gray: Story = {
  args: { variant: "gray" },
};

export const White: Story = {
  args: { variant: "white" },
};

export const WithValue: Story = {
  args: { defaultValue: "레퍼런스 이미지처럼 미니멀한 느낌으로 부탁드려요." },
};
