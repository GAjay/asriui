import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Markdown } from "./Markdown";
import { parseMarkdown } from "./parseMarkdown";

describe("parseMarkdown", () => {
  it("parses headings, emphasis, and links", () => {
    const blocks = parseMarkdown("# Title\n\nHello **world** and [docs](https://example.com)");
    expect(blocks[0]).toMatchObject({ type: "heading", depth: 1 });
    expect(blocks[1]).toMatchObject({ type: "paragraph" });
  });

  it("parses fenced code with language", () => {
    const blocks = parseMarkdown("```tsx\nconst x = 1;\n```");
    expect(blocks[0]).toEqual({ type: "code", language: "tsx", value: "const x = 1;" });
  });

  it("parses unordered lists", () => {
    const blocks = parseMarkdown("- one\n- two");
    const list = blocks[0];
    expect(list?.type).toBe("list");
    if (list?.type === "list") {
      expect(list.ordered).toBe(false);
      expect(list.items).toHaveLength(2);
    }
  });
});

describe("Markdown", () => {
  it("renders headings and bold text", () => {
    render(<Markdown source={"# Hello\n\nThis is **bold**"} />);
    expect(screen.getByRole("heading", { level: 1, name: "Hello" })).toBeInTheDocument();
    expect(screen.getByText("bold").tagName).toBe("STRONG");
  });

  it("renders links with safe new-tab attributes for http urls", () => {
    render(<Markdown source={"See [site](https://example.com)"} />);
    const link = screen.getByRole("link", { name: "site" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders fenced code via CodeBlock", () => {
    render(
      <Markdown
        source={"```tsx\nconst greeting = \"hi\";\n```"}
        showCodeCopy={false}
      />,
    );
    expect(screen.getByText("const")).toBeInTheDocument();
  });

  it("treats raw html as text content", () => {
    render(<Markdown source={"Hello <script>alert(1)</script>"} />);
    expect(screen.getByText(/<script>alert\(1\)<\/script>/)).toBeInTheDocument();
  });

  it("accepts string children", () => {
    render(<Markdown>{"## Child heading"}</Markdown>);
    expect(screen.getByRole("heading", { level: 2, name: "Child heading" })).toBeInTheDocument();
  });
});
