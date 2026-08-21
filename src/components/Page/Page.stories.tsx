import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./Page";
import { EXAMPLE_CONTACT_PAGE, EXAMPLE_DASHBOARD_PAGE } from "./examples";

const meta = {
  title: "Components/Page",
  component: Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContactFromJson: Story = {
  args: {
    config: EXAMPLE_CONTACT_PAGE,
  },
};

export const DashboardFromJson: Story = {
  args: {
    config: EXAMPLE_DASHBOARD_PAGE,
  },
};

export const CustomSlot: Story = {
  args: {
    config: {
      layout: { variant: "centered", contentMaxWidth: "40rem" },
      header: { title: "Custom widget", description: "Escape hatch via slots." },
      blocks: [
        { id: "intro", type: "typography", variant: "muted", text: "Anything you pass in slots renders here." },
        { id: "widget", type: "custom" },
      ],
    },
    slots: {
      widget: (
        <div style={{ padding: 16, border: "1px solid var(--axiom-color-border)", borderRadius: 8 }}>
          Your chart / map / editor
        </div>
      ),
    },
  },
};
