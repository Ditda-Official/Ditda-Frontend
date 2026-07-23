import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import Chip from "../Chip";

const meta: Meta<typeof Chip> = {
  title: "shared/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: {
    label: "디자인",
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Selectable: Story = {
  args: { variant: "selectable", isSelected: false },
};

export const SelectableSelected: Story = {
  args: { variant: "selectable", isSelected: true },
};

export const Removable: Story = {
  args: { variant: "removable", onRemove: fn() },
};

export const Long: Story = {
  args: { variant: "long", isSelected: false },
};

export const LongSelected: Story = {
  args: { variant: "long", isSelected: true },
};

export const LongDisabled: Story = {
  args: { variant: "long", disabled: true },
};
