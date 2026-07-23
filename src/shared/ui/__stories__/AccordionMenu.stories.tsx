import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import AccordionMenu from "../AccordionMenu";

const meta: Meta<typeof AccordionMenu> = {
  title: "shared/AccordionMenu",
  component: AccordionMenu,
  tags: ["autodocs"],
  args: {
    label: "옵션 선택",
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof AccordionMenu>;

export const Default: Story = {
  args: { selected: false },
};

export const Selected: Story = {
  args: { selected: true },
};
