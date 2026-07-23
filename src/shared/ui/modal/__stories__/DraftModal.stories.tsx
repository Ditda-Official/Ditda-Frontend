import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import DraftModal from "../DraftModal";

const meta: Meta<typeof DraftModal> = {
  title: "shared/modal/DraftModal",
  component: DraftModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    Story => (
      <div style={{ minWidth: "1220px", minHeight: "800px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    isOpen: true,
    title: "1차 시안",
    fileUrls: ["/images/thumbnail_mock.jpg", "/images/thumbnail_mock.jpg"],
    onClose: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof DraftModal>;

export const Default: Story = {};
