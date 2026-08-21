import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Tokens",
  parameters: {
    docs: {
      description: {
        component:
          "AxiomUI design tokens are CSS custom properties. Override them or switch `data-theme` to theme the system.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const swatches = [
  ["--axiom-color-primary", "Primary"],
  ["--axiom-color-secondary", "Secondary"],
  ["--axiom-color-danger", "Danger"],
  ["--axiom-color-background", "Background"],
  ["--axiom-color-foreground", "Foreground"],
  ["--axiom-color-muted", "Muted"],
  ["--axiom-color-border", "Border"],
] as const;

export const Colors: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
      {swatches.map(([token, label]) => (
        <div key={token}>
          <div
            style={{
              height: 64,
              borderRadius: "var(--axiom-radius-md)",
              border: "1px solid var(--axiom-color-border)",
              background: `var(${token})`,
            }}
          />
          <div style={{ marginTop: 8, fontSize: 12 }}>
            <strong>{label}</strong>
            <div style={{ color: "var(--axiom-color-muted-foreground)" }}>{token}</div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {[1, 2, 3, 4, 6, 8].map((step) => (
        <div key={step} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <code style={{ width: 120 }}>--axiom-space-{step}</code>
          <div
            style={{
              height: 12,
              width: `var(--axiom-space-${step})`,
              background: "var(--axiom-color-primary)",
              borderRadius: 2,
            }}
          />
        </div>
      ))}
    </div>
  ),
};
