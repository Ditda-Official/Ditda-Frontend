import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SidebarMenu from "../SidebarMenu";

const meta: Meta<typeof SidebarMenu> = {
  title: "shared/SidebarMenu",
  component: SidebarMenu,
  tags: ["autodocs"],
  args: {
    label: "현재 외주",
    href: "/instructor",
  },
};

export default meta;

type Story = StoryObj<typeof SidebarMenu>;

export const Default: Story = {};

export const Logout: Story = {
  args: { label: "로그아웃", href: undefined, onClick: () => {} },
};

export const Disabled: Story = {
  args: { label: "로그아웃", href: undefined, disabled: true, onClick: () => {} },
};
