import type { Meta, StoryObj } from "@storybook/react";
import { PageLayout } from "./PageLayout";
import { SideNav } from "../SideNav";

const meta: Meta<typeof PageLayout> = {
  title: "Components/PageLayout",
  component: PageLayout,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

export const Sidebar: Story = {
  render: () => (
    <PageLayout variant="sidebar" style={{ minHeight: 320 }}>
      <PageLayout.Sidebar>
        <SideNav>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" active>
                Home
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#">Settings</SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav>
      </PageLayout.Sidebar>
      <PageLayout.Main>
        <PageLayout.Content maxWidth="40rem">
          <h2>Main content</h2>
          <p>Sidebar + main layout.</p>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  ),
};

export const Docs: Story = {
  render: () => (
    <PageLayout variant="docs" style={{ minHeight: 320 }}>
      <PageLayout.Sidebar>
        <SideNav>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" active>
                Button
              </SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav>
      </PageLayout.Sidebar>
      <PageLayout.Main>
        <PageLayout.Content>
          <h2>Button</h2>
          <p>Docs content area.</p>
        </PageLayout.Content>
        <PageLayout.Aside>
          <p style={{ fontSize: 12, opacity: 0.7 }}>On this page</p>
        </PageLayout.Aside>
      </PageLayout.Main>
    </PageLayout>
  ),
};
