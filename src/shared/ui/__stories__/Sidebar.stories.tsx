import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Sidebar from "../Sidebar";
import SidebarMenu from "../SidebarMenu";

const meta: Meta<typeof Sidebar> = {
  title: "shared/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <div className="h-160">
      <Sidebar bottom={<SidebarMenu label="로그아웃" onClick={() => {}} />}>
        <SidebarMenu label="현재 외주" href="/instructor" />
        <SidebarMenu label="외주 찾기" href="/instructor/write" />
        <SidebarMenu label="마이페이지" href="/instructor/my" />
      </Sidebar>
    </div>
  ),
};
