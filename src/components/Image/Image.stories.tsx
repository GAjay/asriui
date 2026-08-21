import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "../AspectRatio";
import { Image } from "./Image";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Responsive: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <AspectRatio ratio={4 / 3}>
        <Image
          src="/showcase/card.jpg"
          alt="Card preview"
          widths={[320, 640, 960]}
          sizes="(max-width: 420px) 100vw, 420px"
        />
      </AspectRatio>
    </div>
  ),
};

export const Cached: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <AspectRatio ratio={4 / 3}>
        <Image
          src="/showcase/card.jpg"
          alt="Cached card preview"
          cache
          refetchInterval={60 * 60 * 1000}
        />
      </AspectRatio>
    </div>
  ),
};
