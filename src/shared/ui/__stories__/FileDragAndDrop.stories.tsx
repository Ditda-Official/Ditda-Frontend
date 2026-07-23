import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import FileDragAndDrop from "../FileDragAndDrop";

const meta: Meta<typeof FileDragAndDrop> = {
  title: "shared/FileDragAndDrop",
  component: FileDragAndDrop,
  tags: ["autodocs"],
  args: {
    onFilesAdded: fn(),
    isPortfolio: false,
  },
  decorators: [
    Story => (
      <div className="w-140">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FileDragAndDrop>;

export const Default: Story = {};

export const Portfolio: Story = {
  args: { isPortfolio: true },
};
