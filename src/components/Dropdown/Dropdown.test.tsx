import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dropdown } from "./Dropdown";

describe("Dropdown", () => {
  it("selects an option from the options prop", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Dropdown
        placeholder="Pick one"
        options={[
          { value: "a", label: "Alpha" },
          { value: "b", label: "Beta" },
        ]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /pick one/i }));
    await user.click(screen.getByRole("option", { name: "Beta" }));
    expect(onValueChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("button")).toHaveTextContent("Beta");
  });

  it("supports compound items", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown defaultValue="a">
        <Dropdown.Trigger />
        <Dropdown.Content>
          <Dropdown.Item value="a">Alpha</Dropdown.Item>
          <Dropdown.Item value="b">Beta</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>,
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("option", { name: "Alpha" })).toHaveAttribute("aria-selected", "true");
  });

  it("selects multiple options when multiple is enabled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Dropdown
        multiple
        placeholder="Pick several"
        options={[
          { value: "a", label: "Alpha" },
          { value: "b", label: "Beta" },
          { value: "c", label: "Gamma" },
        ]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: /pick several/i }));
    await user.click(screen.getByRole("option", { name: "Alpha" }));
    expect(onValueChange).toHaveBeenCalledWith(["a"]);
    await user.click(screen.getByRole("option", { name: "Beta" }));
    expect(onValueChange).toHaveBeenCalledWith(["a", "b"]);
    expect(screen.getByRole("option", { name: "Alpha" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("filters options while typing when searchable", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown
        searchable
        label="Country"
        placeholder="Search countries"
        options={[
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
          { value: "ca", label: "Canada" },
        ]}
      />,
    );

    const input = screen.getByRole("combobox", { name: "Country" });
    await user.click(input);
    await user.type(input, "Can");
    expect(screen.getByRole("option", { name: "Canada" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "United States" })).not.toBeInTheDocument();
  });
});
