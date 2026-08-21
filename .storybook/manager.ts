import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const asriuiTheme = create({
  base: "light",
  brandTitle: "AsriUI",
  brandUrl: "./",
  brandTarget: "_self",
  colorPrimary: "#2563eb",
  colorSecondary: "#2563eb",
  appBg: "#f8fafc",
  appContentBg: "#ffffff",
  appBorderColor: "#e2e8f0",
  appBorderRadius: 8,
  textColor: "#0f172a",
  barTextColor: "#475569",
  barSelectedColor: "#2563eb",
  inputBorder: "#e2e8f0",
  inputBorderRadius: 8,
});

addons.setConfig({
  theme: asriuiTheme,
  sidebar: {
    showRoots: true,
  },
});
