import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useRef } from "react";

import DragScrollbar from "../DragScrollbar";

const meta: Meta<typeof DragScrollbar> = {
  title: "shared/DragScrollbar",
  component: DragScrollbar,
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: ["scrollRef"] },
  },
};

export default meta;

type Story = StoryObj<typeof DragScrollbar>;

const ScrollableExample = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-100">
      <div ref={scrollRef} className="scrollbar-hide flex gap-4 overflow-x-auto">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="bg-gray-20 rounded-12 h-40 w-40 shrink-0" />
        ))}
      </div>
      <DragScrollbar scrollRef={scrollRef} className="mt-4" />
    </div>
  );
};

export const Default: Story = {
  render: () => <ScrollableExample />,
};
