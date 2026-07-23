import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Toast from "../Toast";

const meta: Meta<typeof Toast> = {
  title: "shared/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: {
    message: "저장되었습니다.",
    show: true,
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Visible: Story = {};

export const Hidden: Story = {
  args: { show: false },
};
