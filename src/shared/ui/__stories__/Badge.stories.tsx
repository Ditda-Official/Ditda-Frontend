import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Badge from "../Badge";

const meta: Meta<typeof Badge> = {
  title: "shared/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    variant: "3인",
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const ThreePeople: Story = {
  args: { variant: "3인" },
};

export const FourPeople: Story = {
  args: { variant: "4인" },
};

export const FivePeople: Story = {
  args: { variant: "5인" },
};

export const Textbook: Story = {
  args: { variant: "교재" },
};

export const Pass: Story = {
  args: { variant: "pass" },
};

export const Fail: Story = {
  args: { variant: "fail" },
};

export const Waiting: Story = {
  args: { variant: "waiting" },
};
