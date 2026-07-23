import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Radio from "../Radio";

const meta: Meta<typeof Radio> = {
  title: "shared/Radio",
  component: Radio,
  tags: ["autodocs"],
  args: {
    name: "example",
    children: "옵션 A",
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
