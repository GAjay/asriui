import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./AspectRatio";
import { Image } from "../Image";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Video: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AspectRatio ratio={16 / 9}>
        <Image src="/showcase/hero.jpg" alt="Workspace" widths={[400, 800]} sizes="480px" />
      </AspectRatio>
    </div>
  ),
};
