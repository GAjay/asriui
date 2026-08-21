import type { Meta, StoryObj } from "@storybook/react";
import { ToastShowcase } from "./ToastShowcase";

const SHOWCASE_ITEMS = [
  {
    label: "Success",
    toast: { variant: "success" as const, title: "Saved", description: "Your profile was updated." },
  },
  {
    label: "Error",
    toast: { variant: "error" as const, title: "Upload failed", description: "Try again in a minute." },
  },
  {
    label: "Warning",
    toast: { variant: "warning" as const, title: "Storage almost full" },
  },
  {
    label: "Info",
    toast: { variant: "info" as const, title: "New version available" },
  },
  {
    label: "With action",
    buttonVariant: "ghost" as const,
    toast: {
      variant: "error" as const,
      title: "Something went wrong",
      description: "We could not save your changes.",
      action: { label: "Get support", onClick: () => undefined },
    },
  },
];

const meta: Meta<typeof ToastShowcase> = {
  title: "Components/Toast",
  component: ToastShowcase,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToastShowcase>;

export const Playground: Story = {
  args: {
    title: "Toast showcase",
    description: "Pass items — buttons and notifications are generated automatically.",
    items: SHOWCASE_ITEMS,
    columns: 3,
    position: "bottom-right",
    showProgress: true,
  },
};

export const WithoutProgressBar: Story = {
  args: {
    items: [{ label: "Silent", toast: { title: "No progress bar", variant: "info", showProgress: false } }],
    showProgress: false,
  },
};
