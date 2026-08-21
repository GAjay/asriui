import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Slider>
        <Slider.Track>
          <Slider.Slide>
            <div style={{ padding: "3.5rem 1.25rem", textAlign: "center" }}>First</div>
          </Slider.Slide>
          <Slider.Slide>
            <div style={{ padding: "3.5rem 1.25rem", textAlign: "center" }}>Second</div>
          </Slider.Slide>
          <Slider.Slide>
            <div style={{ padding: "3.5rem 1.25rem", textAlign: "center" }}>Third</div>
          </Slider.Slide>
        </Slider.Track>
        <Slider.Controls>
          <Slider.Prev />
          <Slider.Dots />
          <Slider.Next />
        </Slider.Controls>
      </Slider>
    </div>
  ),
};
