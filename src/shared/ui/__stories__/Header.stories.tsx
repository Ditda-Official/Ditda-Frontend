import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Header from "../Header";

const meta: Meta<typeof Header> = {
  title: "shared/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: { variant: "default" },
};

export const Landing: Story = {
  args: { variant: "landing" },
};
