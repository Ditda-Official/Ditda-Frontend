import "@/app/globals.css";

import type { Preview } from "@storybook/nextjs-vite";

const preview: Preview = {
  decorators: [
    Story => (
      <div className="font-sans antialiased">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    // 프로젝트가 App Router만 사용하므로 next/navigation 훅(useRouter 등)이
    // AppRouterContext 없이도 동작하도록 전역으로 활성화한다.
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
