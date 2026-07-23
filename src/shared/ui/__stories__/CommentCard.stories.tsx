import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CommentCard from "../CommentCard";

const meta: Meta<typeof CommentCard> = {
  title: "shared/CommentCard",
  component: CommentCard,
  tags: ["autodocs"],
  args: {
    title: "디자이너 코멘트",
    comment: "요청하신 컨셉에 맞춰 시안을 준비했습니다. 확인 후 피드백 부탁드립니다.",
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

type Story = StoryObj<typeof CommentCard>;

export const Default: Story = {};
