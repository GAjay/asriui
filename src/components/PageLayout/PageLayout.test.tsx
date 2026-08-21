import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageLayout } from "./PageLayout";

describe("PageLayout", () => {
  it("renders sidebar and main regions", () => {
    render(
      <PageLayout>
        <PageLayout.Sidebar>
          <nav>Nav</nav>
        </PageLayout.Sidebar>
        <PageLayout.Main>
          <PageLayout.Content>Body</PageLayout.Content>
        </PageLayout.Main>
      </PageLayout>,
    );
    expect(screen.getByText("Nav")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("supports right sidebar placement", () => {
    const { container } = render(
      <PageLayout sidebarSide="right">
        <PageLayout.Sidebar>
          <nav>Nav</nav>
        </PageLayout.Sidebar>
        <PageLayout.Main>Body</PageLayout.Main>
      </PageLayout>,
    );

    const shell = container.firstElementChild;
    expect(shell).toHaveAttribute("data-sidebar-side", "right");
    expect(shell?.className).toMatch(/sidebarRight/);
  });
});
