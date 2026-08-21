import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Slider } from "../Slider";
import { Hero } from "./Hero";

const meta: Meta<typeof Hero> = {
  title: "Components/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const FullText: Story = {
  render: () => (
    <Hero variant="full" align="center" background="dotted" animated>
      <Hero.Copy>
        <Hero.Eyebrow>AsriUI</Hero.Eyebrow>
        <Hero.Title>The React kit for product teams</Hero.Title>
        <Hero.Description>
          Accessible components, page templates, and docs you can own — typed and tree-shakable.
        </Hero.Description>
        <Hero.Actions>
          <Button size="lg">Browse docs</Button>
          <Button size="lg" variant="secondary">
            View templates
          </Button>
        </Hero.Actions>
      </Hero.Copy>
    </Hero>
  ),
};

export const Aurora: Story = {
  render: () => (
    <Hero variant="full" align="center" background="aurora" animated size="md">
      <Hero.Copy>
        <Hero.Eyebrow>Backgrounds</Hero.Eyebrow>
        <Hero.Title>Animated aurora</Hero.Title>
        <Hero.Description>Use dotted, grid, glow, aurora, or mesh presets.</Hero.Description>
      </Hero.Copy>
    </Hero>
  ),
};

export const RightText: Story = {
  render: () => (
    <Hero variant="split" textSide="right" background="mesh" animated>
      <Hero.Copy>
        <Hero.Eyebrow>Launch</Hero.Eyebrow>
        <Hero.Title>Copy sits on the right</Hero.Title>
        <Hero.Description>Pair a visual or slider on the left with headline, body, and actions.</Hero.Description>
        <Hero.Actions>
          <Button>Get started</Button>
        </Hero.Actions>
      </Hero.Copy>
      <Hero.Media>
        <Slider>
          <Slider.Track>
            <Slider.Slide>
              <div style={{ padding: "4rem 1.5rem", textAlign: "center" }}>Slide one</div>
            </Slider.Slide>
            <Slider.Slide>
              <div style={{ padding: "4rem 1.5rem", textAlign: "center" }}>Slide two</div>
            </Slider.Slide>
          </Slider.Track>
          <Slider.Controls>
            <Slider.Prev />
            <Slider.Dots />
            <Slider.Next />
          </Slider.Controls>
        </Slider>
      </Hero.Media>
    </Hero>
  ),
};
