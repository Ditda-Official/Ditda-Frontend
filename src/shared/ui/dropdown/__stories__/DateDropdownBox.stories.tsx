import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import DateDropdownBox from "../DateDropdownBox";

const meta: Meta<typeof DateDropdownBox> = {
  title: "shared/dropdown/DateDropdownBox",
  component: DateDropdownBox,
  tags: ["autodocs"],
  args: {
    label: "1차 시안 수령일",
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof DateDropdownBox>;

export const Empty: Story = {};

export const Selected: Story = {
  args: { selectedValue: "2026년 08월 15일" },
};

export const Open: Story = {
  args: { selectedValue: "2026년 08월 15일", isOpen: true },
};
