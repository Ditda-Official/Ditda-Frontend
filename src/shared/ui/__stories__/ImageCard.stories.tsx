import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ImageCard from "../ImageCard";

const meta: Meta<typeof ImageCard> = {
  title: "shared/ImageCard",
  component: ImageCard,
  tags: ["autodocs"],
  args: {
    url: "/images/thumbnail_mock.jpg",
    label: "디자인 시안",
  },
};

export default meta;

type Story = StoryObj<typeof ImageCard>;

export const Default: Story = {};

export const WithoutLabel: Story = {
  args: { label: undefined },
};
