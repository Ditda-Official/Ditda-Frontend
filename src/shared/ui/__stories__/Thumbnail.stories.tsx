import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import Thumbnail from "../Thumbnail";

const meta: Meta<typeof Thumbnail> = {
  title: "shared/Thumbnail",
  component: Thumbnail,
  tags: ["autodocs"],
  args: {
    src: "/images/thumbnail_mock.jpg",
    onDetailClick: fn(),
  },
  decorators: [
    Story => (
      <div className="h-70 w-50">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Thumbnail>;

export const Default: Story = {};
