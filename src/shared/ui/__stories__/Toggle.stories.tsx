import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import Toggle from "../Toggle";

type ToggleDemoArgs = {
  leftLabel: string;
  rightLabel: string;
};

const meta = {
  title: "shared/Toggle",
  tags: ["autodocs"],
  args: {
    leftLabel: "디자이너",
    rightLabel: "강사",
  },
  argTypes: {
    leftLabel: { control: "text", description: "왼쪽 옵션 라벨" },
    rightLabel: { control: "text", description: "오른쪽 옵션 라벨" },
  },
  render: ({ leftLabel, rightLabel }) => {
    const [value, setValue] = useState<"left" | "right">("left");
    const options: [
      { value: "left" | "right"; label: string },
      { value: "left" | "right"; label: string },
    ] = [
      { value: "left", label: leftLabel },
      { value: "right", label: rightLabel },
    ];
    return <Toggle options={options} value={value} onChange={setValue} />;
  },
} satisfies Meta<ToggleDemoArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
