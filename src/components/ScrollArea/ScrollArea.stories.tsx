import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./ScrollArea";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const longList = (
  <div style={{ display: "grid", gap: 8, padding: "0.25rem 0.5rem 0.25rem 0" }}>
    {Array.from({ length: 24 }, (_, index) => (
      <div
        key={index}
        style={{
          padding: "0.65rem 0.75rem",
          border: "1px solid var(--axiom-color-border)",
          borderRadius: "var(--axiom-radius-md)",
        }}
      >
        Item {index + 1}
      </div>
    ))}
  </div>
);

export const Container: Story = {
  render: () => (
    <ScrollArea height={240} type="always" label="Notifications" style={{ width: 320 }}>
      {longList}
    </ScrollArea>
  ),
};

export const PageScroll: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ScrollArea page type="always">
      <div style={{ padding: "2rem", maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ marginTop: 0 }}>Page scroll demo</h2>
        {Array.from({ length: 30 }, (_, index) => (
          <p key={index}>
            Paragraph {index + 1}. ScrollArea syncs the custom thumb with window scrolling for
            full-page layouts.
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};
