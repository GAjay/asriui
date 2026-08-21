import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Dialog } from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
      <Dialog.Content
        title="Are you sure?"
        description="This will permanently delete your account and remove your data."
      >
        <Dialog.Footer>
          <Dialog.Close>Cancel</Dialog.Close>
          <Button variant="danger">Delete</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const CompoundLayout: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Close />
        <Dialog.Header>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Description>
            This will permanently delete your account and remove your data.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close>Cancel</Dialog.Close>
          <Button variant="danger">Delete</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};
