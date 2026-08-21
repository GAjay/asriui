import type { Preview } from "@storybook/react";
import React, { useEffect } from "react";
import "../src/styles/globals.css";

function ThemeDecorator({
  theme,
  children,
}: {
  theme: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      data-theme={theme}
      className="asriui-root"
      style={{
        minHeight: "100vh",
        padding: 24,
        background: "var(--asriui-color-background)",
        color: "var(--asriui-color-foreground)",
      }}
    >
      {children}
    </div>
  );
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "padded",
    backgrounds: {
      disable: true,
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: ["Introduction", "Foundations", "Components"],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "AsriUI color theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) || "light";
      return (
        <ThemeDecorator theme={theme}>
          <Story />
        </ThemeDecorator>
      );
    },
  ],
};

export default preview;
