import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../Icon";
import { SideNav } from "./SideNav";

const meta: Meta<typeof SideNav> = {
  title: "Components/SideNav",
  component: SideNav,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SideNav>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 240, padding: 16, background: "var(--axiom-color-muted)" }}>
      <SideNav>
        <SideNav.Header>
          <strong>Docs</strong>
        </SideNav.Header>
        <SideNav.Group label="Getting started" icon={<Icon name="sparkles" size="sm" aria-hidden />}>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" active icon={<Icon name="check" size="sm" aria-hidden />}>
                Introduction
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#">Installation</SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav.Group>
        <SideNav.Group label="Components" icon={<Icon name="grid" size="sm" aria-hidden />}>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#">Button</SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#">Input</SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav.Group>
      </SideNav>
    </div>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <div style={{ maxWidth: 240, padding: 16, background: "var(--axiom-color-muted)" }}>
      <SideNav collapsible defaultCollapsed>
        <SideNav.Home href="#" active />
        <SideNav.Toggle />
        <SideNav.Group
          label="Getting started"
          icon={<Icon name="sparkles" size="sm" aria-hidden />}
          collapsible
          defaultOpen
        >
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" active icon={<Icon name="check" size="sm" aria-hidden />}>
                Introduction
              </SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav.Group>
        <SideNav.Group
          label="Components"
          icon={<Icon name="grid" size="sm" aria-hidden />}
          collapsible
        >
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="grid" size="sm" aria-hidden />}>
                Button
              </SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav.Group>
      </SideNav>
    </div>
  ),
};

export const RightSide: Story = {
  render: () => (
    <div style={{ maxWidth: 240, padding: 16, background: "var(--axiom-color-muted)" }}>
      <SideNav side="right" collapsible>
        <SideNav.Home href="#" />
        <SideNav.Toggle />
        <SideNav.List>
          <SideNav.Item>
            <SideNav.Link href="#" active icon={<Icon name="check" size="sm" aria-hidden />}>
              Dashboard
            </SideNav.Link>
          </SideNav.Item>
        </SideNav.List>
      </SideNav>
    </div>
  ),
};

export const HamburgerHidden: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 16,
        minHeight: 220,
        padding: 16,
        background: "var(--axiom-color-muted)",
        borderRadius: 8,
      }}
    >
      <SideNav collapsible collapseMode="hidden" style={{ width: 220 }}>
        <SideNav.Toggle variant="hamburger" />
        <SideNav.Header>
          <strong>App</strong>
        </SideNav.Header>
        <SideNav.Group label="Pages" collapsible defaultOpen>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" active icon={<Icon name="check" size="sm" aria-hidden />}>
                Dashboard
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="grid" size="sm" aria-hidden />}>
                Components
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#">Settings</SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav.Group>
      </SideNav>
      <div style={{ flex: 1, padding: "0.5rem 0", color: "var(--axiom-color-muted-foreground)", fontSize: 14 }}>
        Click the hamburger to hide the sidebar. It animates to an X while open, and back to bars when closed.
      </div>
    </div>
  ),
};

export const MultipleMenus: Story = {
  render: () => (
    <div style={{ maxWidth: 280, padding: 16, background: "var(--axiom-color-muted)" }}>
      <SideNav collapsible>
        <SideNav.Toggle />
        <SideNav.Menus defaultMenu="docs">
          <SideNav.Menu id="docs" label="Docs" icon={<Icon name="sparkles" size="sm" aria-hidden />}>
            <SideNav.Group label="Components" icon={<Icon name="grid" size="sm" aria-hidden />} collapsible>
              <SideNav.List>
                <SideNav.Submenu label="Form" icon={<Icon name="form" size="sm" aria-hidden />} defaultOpen>
                  <SideNav.Item>
                    <SideNav.Link href="#" active>
                      Button
                    </SideNav.Link>
                  </SideNav.Item>
                </SideNav.Submenu>
              </SideNav.List>
            </SideNav.Group>
          </SideNav.Menu>
          <SideNav.Menu id="settings" label="Settings" icon={<Icon name="package" size="sm" aria-hidden />}>
            <SideNav.List>
              <SideNav.Item>
                <SideNav.Link href="#">Profile</SideNav.Link>
              </SideNav.Item>
            </SideNav.List>
          </SideNav.Menu>
        </SideNav.Menus>
      </SideNav>
    </div>
  ),
};

const virtualNavItems = Array.from({ length: 80 }, (_, index) => ({
  id: `nav-${index}`,
  label: `Page ${index + 1}`,
  href: `#page-${index}`,
}));

export const Virtualized: Story = {
  render: () => (
    <div style={{ maxWidth: 260, padding: 16, background: "var(--axiom-color-muted)" }}>
      <SideNav>
        <SideNav.Header>
          <strong>Large nav</strong>
        </SideNav.Header>
        <SideNav.Group label="Pages" collapsible defaultOpen>
          <SideNav.VirtualList
            items={virtualNavItems}
            itemHeight={36}
            height={220}
            getItemKey={(item) => item.id}
            renderItem={(item) => <SideNav.Link href={item.href}>{item.label}</SideNav.Link>}
          />
        </SideNav.Group>
      </SideNav>
    </div>
  ),
};
