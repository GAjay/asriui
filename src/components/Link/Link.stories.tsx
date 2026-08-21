import type { Meta, StoryObj } from "@storybook/react";
import { AsriUIProvider } from "../../config/AsriUIProvider";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <AsriUIProvider config={{ analytics: { enabled: true, gtmId: "GTM-DEMO" } }}>
        <Story />
      </AsriUIProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  render: () => <Link href="/docs/components/button">Button docs</Link>,
};

export const External: Story = {
  render: () => (
    <Link href="https://ui.shadcn.com" target="_blank" trackLabel="shadcn reference">
      shadcn/ui reference
    </Link>
  ),
};

export const ButtonStyle: Story = {
  render: () => (
    <Link href="/docs/getting-started" variant="button" trackEvent="cta_getting_started">
      Getting started
    </Link>
  ),
};
