import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Table } from "./Table";

describe("Table", () => {
  it("renders rows and headers", () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Button</Table.Cell>
            <Table.Cell>Stable</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Button" })).toBeInTheDocument();
  });

  it("applies striped variant", () => {
    const { container } = render(
      <Table variant="striped">
        <Table.Body>
          <Table.Row>
            <Table.Cell>A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    expect(container.querySelector("table")?.className).toMatch(/variantStriped/);
  });
});
