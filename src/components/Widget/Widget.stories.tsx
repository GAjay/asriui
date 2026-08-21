import type { Meta, StoryObj } from "@storybook/react";
import { Widget } from "./Widget";

const meta = {
  title: "Components/Widget",
  component: Widget,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Drop-in embed surface for partner pages, ad scripts, and third-party widgets. Use `src` for iframe/webview content or `scriptSrc` for ad tags and vendor loaders — isolated from your app shell.",
      },
    },
  },
} satisfies Meta<typeof Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IframeEmbed: Story = {
  args: {
    src: "https://example.com",
    title: "Partner page",
    height: 320,
    width: 520,
  },
};

export const InlineHtml: Story = {
  args: {
    html: `<!doctype html>
<html>
  <body style="margin:0;font-family:system-ui,sans-serif;padding:16px;background:#0f172a;color:#e2e8f0;">
    <h2 style="margin:0 0 8px;font-size:16px;">Sponsored placement</h2>
    <p style="margin:0;font-size:13px;line-height:1.5;">Rendered inside a sandboxed iframe via <code>html</code>.</p>
  </body>
</html>`,
    title: "Sponsored placement",
    height: 140,
    width: 420,
  },
};

export const ScriptSlot: Story = {
  args: {
    mode: "script",
    scriptSrc: "https://cdn.jsdelivr.net/npm/@widgetjs/plus@1/dist/widget.min.js",
    slotId: "partner-widget",
    attrs: {
      "data-widget-id": "demo-slot",
    },
    height: 120,
    width: 420,
  },
};
