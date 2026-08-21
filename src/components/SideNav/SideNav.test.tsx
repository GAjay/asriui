import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SideNav } from "./SideNav";

describe("SideNav", () => {
  it("renders links with active state", () => {
    render(
      <SideNav>
        <SideNav.List>
          <SideNav.Item>
            <SideNav.Link href="/docs" active>
              Docs
            </SideNav.Link>
          </SideNav.Item>
        </SideNav.List>
      </SideNav>,
    );
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link.className).toMatch(/active/);
  });

  it("renders link and group icons", () => {
    render(
      <SideNav>
        <SideNav.Group label="Components" icon={<span data-testid="group-icon" />}>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="/button" icon={<span data-testid="link-icon" />}>
                Button
              </SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav.Group>
      </SideNav>,
    );

    expect(screen.getByTestId("group-icon")).toBeInTheDocument();
    expect(screen.getByTestId("link-icon")).toBeInTheDocument();
  });

  it("toggles collapsible groups", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <SideNav>
        <SideNav.Group label="Components" collapsible onOpenChange={onOpenChange}>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="/button">Button</SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav.Group>
      </SideNav>,
    );

    const trigger = screen.getByRole("button", { name: "Components" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("switches between multiple menus", async () => {
    const user = userEvent.setup();

    render(
      <SideNav>
        <SideNav.Menus defaultMenu="docs">
          <SideNav.Menu id="docs" label="Docs" icon={<span />}>
            <SideNav.List>
              <SideNav.Item>
                <SideNav.Link href="/docs">Guide</SideNav.Link>
              </SideNav.Item>
            </SideNav.List>
          </SideNav.Menu>
          <SideNav.Menu id="settings" label="Settings" icon={<span />}>
            <SideNav.List>
              <SideNav.Item>
                <SideNav.Link href="/settings">Profile</SideNav.Link>
              </SideNav.Item>
            </SideNav.List>
          </SideNav.Menu>
        </SideNav.Menus>
      </SideNav>,
    );

    expect(screen.getByRole("link", { name: "Guide" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Profile" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Settings" }));
    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Profile" })).toBeInTheDocument();
    });
  });

  it("expands nested submenu levels", async () => {
    const user = userEvent.setup();

    render(
      <SideNav>
        <SideNav.List>
          <SideNav.Submenu label="Form" defaultOpen={false}>
            <SideNav.Item>
              <SideNav.Link href="/button">Button</SideNav.Link>
            </SideNav.Item>
          </SideNav.Submenu>
        </SideNav.List>
      </SideNav>,
    );

    const trigger = screen.getByRole("button", { name: "Form" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Button" })).toBeVisible();
  });

  it("collapses the whole sidebar with toggle", async () => {
    const user = userEvent.setup();
    const onCollapsedChange = vi.fn();

    render(
      <SideNav collapsible onCollapsedChange={onCollapsedChange}>
        <SideNav.Toggle />
        <SideNav.Group label="Components" icon={<span data-testid="group-icon" />} collapsible>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="/button" icon={<span data-testid="link-icon" />}>
                Button
              </SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav.Group>
      </SideNav>,
    );

    await user.click(screen.getByRole("button", { name: "Collapse sidebar" }));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-collapsed", "true");
    expect(nav).toHaveAttribute("data-collapse-mode", "rail");
    expect(screen.getByTestId("group-icon")).toBeInTheDocument();
    expect(screen.getByTestId("link-icon")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Button" })).toHaveAttribute("title", "Button");
  });

  it("hides sidebar content with animated hamburger toggle", async () => {
    const user = userEvent.setup();
    const onCollapsedChange = vi.fn();

    render(
      <SideNav collapsible collapseMode="hidden" onCollapsedChange={onCollapsedChange}>
        <SideNav.Toggle variant="hamburger" />
        <SideNav.List>
          <SideNav.Item>
            <SideNav.Link href="/button">Button</SideNav.Link>
          </SideNav.Item>
        </SideNav.List>
      </SideNav>,
    );

    const toggle = screen.getByRole("button", { name: "Close menu" });
    expect(toggle).toHaveAttribute("data-variant", "hamburger");
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.click(toggle);
    expect(onCollapsedChange).toHaveBeenCalledWith(true);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-collapsed", "true");
    expect(nav).toHaveAttribute("data-collapse-mode", "hidden");
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  });

  it("renders home link with default label", () => {
    render(
      <SideNav>
        <SideNav.Home href="/" active />
      </SideNav>,
    );

    const home = screen.getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("href", "/");
    expect(home).toHaveAttribute("aria-current", "page");
  });

  it("sets side data attribute", () => {
    render(
      <SideNav side="right">
        <SideNav.List>
          <SideNav.Item>
            <SideNav.Link href="/docs">Docs</SideNav.Link>
          </SideNav.Item>
        </SideNav.List>
      </SideNav>,
    );

    expect(screen.getByRole("navigation")).toHaveAttribute("data-side", "right");
  });

  it("virtualizes large link lists when enabled", () => {
    const items = Array.from({ length: 200 }, (_, index) => ({
      id: `item-${index}`,
      label: `Item ${index}`,
      href: `/item-${index}`,
    }));

    render(
      <SideNav>
        <SideNav.Group label="All items" collapsible defaultOpen>
          <SideNav.VirtualList
            items={items}
            itemHeight={36}
            height={180}
            getItemKey={(item) => item.id}
            renderItem={(item) => <SideNav.Link href={item.href}>{item.label}</SideNav.Link>}
          />
        </SideNav.Group>
      </SideNav>,
    );

    expect(screen.getByRole("link", { name: "Item 0" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Item 199" })).not.toBeInTheDocument();
  });

  it("supports virtualized SideNav.List alias", () => {
    const items = [{ id: "a", label: "Alpha", href: "/a" }];

    render(
      <SideNav>
        <SideNav.List
          virtualized
          items={items}
          itemHeight={36}
          height={120}
          getItemKey={(item) => item.id}
          renderItem={(item) => <SideNav.Link href={item.href}>{item.label}</SideNav.Link>}
        />
      </SideNav>,
    );

    expect(screen.getByRole("link", { name: "Alpha" })).toBeInTheDocument();
  });
});
