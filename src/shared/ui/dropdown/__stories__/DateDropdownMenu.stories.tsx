import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import DateDropdownMenu from "../DateDropdownMenu";

const meta: Meta<typeof DateDropdownMenu> = {
  title: "shared/dropdown/DateDropdownMenu",
  component: DateDropdownMenu,
  tags: ["autodocs"],
  args: {
    onConfirm: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof DateDropdownMenu>;

export const Default: Story = {};

export const WithMinDate: Story = {
  args: { minDate: new Date() },
};
