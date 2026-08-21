import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Dropdown } from "./Dropdown";

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "mx", label: "Mexico" },
];

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const WithOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string | string[]>("us");
    return (
      <Dropdown
        label="Country"
        placeholder="Select a country"
        value={value}
        onValueChange={setValue}
        options={COUNTRIES.slice(0, 3)}
      />
    );
  },
};

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState<string | string[]>("");
    return (
      <Dropdown
        label="Country"
        searchable
        placeholder="Type to filter countries"
        listMaxHeight="12rem"
        value={value}
        onValueChange={setValue}
        options={COUNTRIES}
      />
    );
  },
};

export const Compound: Story = {
  render: () => (
    <Dropdown defaultValue="draft">
      <Dropdown.Trigger />
      <Dropdown.Content aria-label="Status">
        <Dropdown.Group label="Status">
          <Dropdown.Item value="draft">Draft</Dropdown.Item>
          <Dropdown.Item value="published">Published</Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Item value="archived" disabled>
          Archived
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};
