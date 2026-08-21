import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";
import { Button } from "../Button";

describe("Card", () => {
  it("renders children", () => {
    render(
      <Card>
        <Card.Content>Account information</Card.Content>
      </Card>,
    );
    expect(screen.getByText("Account information")).toBeInTheDocument();
  });

  it("supports compound components", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Account</Card.Title>
        </Card.Header>
        <Card.Content>Details</Card.Content>
        <Card.Footer>
          <Button>Save</Button>
        </Card.Footer>
      </Card>,
    );

    expect(screen.getByRole("heading", { name: "Account", level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("allows custom heading levels", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title as="h3">Settings</Card.Title>
        </Card.Header>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: "Settings", level: 3 })).toBeInTheDocument();
  });

  it("preserves semantic structure via display names", () => {
    expect(Card.displayName).toBe("Card");
    expect(Card.Header.displayName).toBe("Card.Header");
    expect(Card.Title.displayName).toBe("Card.Title");
    expect(Card.Content.displayName).toBe("Card.Content");
    expect(Card.Footer.displayName).toBe("Card.Footer");
  });
});
