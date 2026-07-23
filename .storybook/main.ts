import type { StorybookConfig } from "@storybook/nextjs-vite";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {
      // 프로젝트에서 .svg는 next/image가 아닌 SVGR 컴포넌트로만 사용하므로,
      // nextjs-vite의 기본 next/image 목킹 대상에서 .svg를 제외해 vite-plugin-svgr와 충돌하지 않게 한다.
      image: {
        excludeFiles: [/\.svg$/],
      },
    },
  },
  staticDirs: ["../public"],
  async viteFinal(viteConfig) {
    viteConfig.plugins ??= [];
    viteConfig.plugins.push(svgr({ include: "**/*.svg", svgrOptions: { dimensions: false } }));
    return viteConfig;
  },
};
export default config;
