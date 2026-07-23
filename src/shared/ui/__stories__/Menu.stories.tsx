import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import Menu from "../Menu";

const meta: Meta<typeof Menu> = {
  title: "shared/Menu",
  component: Menu,
  tags: ["autodocs"],
  args: {
    label: "전체",
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: { selected: false },
};

export const Selected: Story = {
  args: { selected: true },
};
