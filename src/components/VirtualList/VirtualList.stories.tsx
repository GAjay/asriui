import type { Meta, StoryObj } from "@storybook/react";
import { VirtualList } from "./VirtualList";

const meta: Meta<typeof VirtualList> = {
  title: "Components/VirtualList",
  component: VirtualList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof VirtualList>;

const items = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  label: `Transaction #${i + 1}`,
}));

export const Default: Story = {
  render: () => (
    <VirtualList
      items={items}
      itemHeight={44}
      height={320}
      getItemKey={(item) => item.id}
      renderItem={(item) => item.label}
    />
  ),
};
