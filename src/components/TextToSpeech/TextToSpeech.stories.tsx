import type { Meta, StoryObj } from "@storybook/react";
import { TextToSpeech } from "./TextToSpeech";

const meta = {
  title: "Components/TextToSpeech",
  component: TextToSpeech,
  tags: ["autodocs"],
} satisfies Meta<typeof TextToSpeech>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TextToSpeech>
      AsriUI ships accessible components with motion, theming, and builder-ready workflows.
    </TextToSpeech>
  ),
};
