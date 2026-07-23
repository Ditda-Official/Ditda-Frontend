import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SmallInput from "../SmallInput";

const meta: Meta<typeof SmallInput> = {
  title: "shared/input/SmallInput",
  component: SmallInput,
  tags: ["autodocs"],
  args: {
    placeholder: "내용을 입력해주세요",
  },
  decorators: [
    Story => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SmallInput>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "홍길동" },
};
