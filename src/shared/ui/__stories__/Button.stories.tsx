import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Button from "../Button";

const meta: Meta<typeof Button> = {
  title: "shared/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "버튼",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const SmallPrimary: Story = {
  args: { variant: "small_primary" },
};

export const SmallSecondary: Story = {
  args: { variant: "small_secondary" },
};

export const SmallTertiary: Story = {
  args: { variant: "small_tertiary" },
};

export const SmallText: Story = {
  args: { variant: "small_text" },
};

export const SmallDisabled: Story = {
  args: { variant: "small_disabled" },
};

export const MediumPrimary: Story = {
  args: { variant: "medium_primary" },
};

export const MediumSecondary: Story = {
  args: { variant: "medium_secondary" },
};

export const MediumTertiary: Story = {
  args: { variant: "medium_tertiary" },
};

export const MediumDisabled: Story = {
  args: { variant: "medium_disabled" },
};

export const LargePrimary: Story = {
  args: { variant: "large_primary" },
};

export const LargeDisabled: Story = {
  args: { variant: "large_disabled" },
};

export const CertificationPrimary: Story = {
  args: { variant: "certification_primary" },
};

export const CertificationDisabled: Story = {
  args: { variant: "certification_disabled" },
};

export const XSmallPrimary: Story = {
  args: { variant: "xsmall_primary" },
};

export const Choose: Story = {
  args: { variant: "choose" },
};
