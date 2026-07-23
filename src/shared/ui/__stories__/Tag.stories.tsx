import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Tag from "../Tag";

const meta: Meta<typeof Tag> = {
  title: "shared/Tag",
  component: Tag,
  tags: ["autodocs"],
  args: {
    label: "NEW",
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: { variant: "default" },
};

export const Black: Story = {
  args: { variant: "black" },
};

export const Gray: Story = {
  args: { variant: "gray" },
};
