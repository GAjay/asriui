import type { Meta, StoryObj } from "@storybook/react";
import { Metric } from "./Metric";

const meta = {
  title: "Components/Metric",
  component: Metric,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Trading-focused metric tiles for quotes, portfolio stats, and market summaries. Supports live ticks, directional coloring, and compact ticker rows.",
      },
    },
  },
} satisfies Meta<typeof Metric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Quote: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Metric variant="quote" trend="up" live>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <Metric.Symbol>BTC/USD</Metric.Symbol>
          <Metric.Hint>Spot</Metric.Hint>
        </div>
        <Metric.Value value={68420.5} format="currency" />
        <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
          <Metric.Change value={3.54} />
          <Metric.Hint>+$2,340.12 today</Metric.Hint>
        </div>
      </Metric>
    </div>
  ),
};

export const MarketGrid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(160px, 1fr))", gap: 12, width: 560 }}>
      <Metric trend="up">
        <Metric.Label>24h Volume</Metric.Label>
        <Metric.Value value={28400000000} format="compact" />
        <Metric.Change value={12.4} />
      </Metric>
      <Metric trend="up">
        <Metric.Label>24h High</Metric.Label>
        <Metric.Value value={69120} format="currency" />
        <Metric.Hint>Reached 09:14 UTC</Metric.Hint>
      </Metric>
      <Metric trend="down">
        <Metric.Label>24h Low</Metric.Label>
        <Metric.Value value={66480} format="currency" />
        <Metric.Hint>Reached 03:42 UTC</Metric.Hint>
      </Metric>
    </div>
  ),
};

export const CompactRow: Story = {
  render: () => (
    <div style={{ width: 420, display: "grid", gap: 8 }}>
      <Metric variant="compact" trend="up">
        <Metric.Label>ETH/USD</Metric.Label>
        <div>
          <Metric.Value value={3421.18} format="currency" />
          <Metric.Change value={1.82} />
        </div>
      </Metric>
      <Metric variant="compact" trend="down">
        <Metric.Label>SOL/USD</Metric.Label>
        <div>
          <Metric.Value value={148.62} format="currency" />
          <Metric.Change value={-0.94} />
        </div>
      </Metric>
    </div>
  ),
};
