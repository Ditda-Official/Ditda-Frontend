import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import WheelColumn from "../WheelColumn";

const meta: Meta<typeof WheelColumn> = {
  title: "shared/dropdown/WheelColumn",
  component: WheelColumn,
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: ["onSelect", "onItemClick"] },
  },
};

export default meta;

type Story = StoryObj<typeof WheelColumn>;

const items = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

export const Default: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return <WheelColumn items={items} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />;
  },
};
