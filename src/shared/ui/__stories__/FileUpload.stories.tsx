import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import FileUpload from "../FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "shared/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  args: {
    fileName: "portfolio.png",
    fileSize: "2.4MB",
    isUploading: false,
    onRemove: fn(),
  },
  decorators: [
    Story => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {};

export const Uploading: Story = {
  args: { isUploading: true },
};
