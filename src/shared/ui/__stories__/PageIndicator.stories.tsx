import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PageIndicator from "../PageIndicator";

const meta: Meta<typeof PageIndicator> = {
  title: "shared/PageIndicator",
  component: PageIndicator,
  tags: ["autodocs"],
  args: {
    total: 4,
    current: 1,
  },
};

export default meta;

type Story = StoryObj<typeof PageIndicator>;

export const Home: Story = {
  args: { variant: "home" },
};

export const My: Story = {
  args: { variant: "my" },
};
