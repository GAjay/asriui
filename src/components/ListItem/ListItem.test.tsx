import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { List, ListItem } from "./ListItem";

describe("ListItem", () => {
  it("renders title and description", () => {
    render(
      <List>
        <ListItem title="Account" description="Profile settings" />
      </List>,
    );
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Profile settings")).toBeInTheDocument();
  });

  it("renders media and trailing content", () => {
    render(
      <List>
        <ListItem title="Billing" media="B" trailing="$12" />
      </List>,
    );
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("$12")).toBeInTheDocument();
  });

  it("handles interactive click", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <List>
        <ListItem title="Sign out" interactive onClick={onClick} />
      </List>,
    );
    await user.click(screen.getByRole("button", { name: "Sign out" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire click when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <List>
        <ListItem title="Disabled" interactive disabled onClick={onClick} />
      </List>,
    );
    await user.click(screen.getByRole("button", { name: "Disabled" }));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("marks selected interactive rows with aria-current", () => {
    render(
      <List>
        <ListItem title="Active" interactive selected />
      </List>,
    );
    expect(screen.getByRole("button", { name: "Active" })).toHaveAttribute("aria-current", "true");
  });

  it("forwards refs to list items", () => {
    const ref = createRef<HTMLLIElement>();
    render(
      <List>
        <ListItem ref={ref} title="Ref item" />
      </List>,
    );
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });

  it("renders a semantic list", () => {
    render(
      <List aria-label="Settings">
        <ListItem title="One" />
        <ListItem title="Two" />
      </List>,
    );
    expect(screen.getByRole("list", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
