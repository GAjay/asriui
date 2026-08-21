import type { CodeLanguage } from "../CodeBlock";

export type InlineNode =
  | { type: "text"; value: string }
  | { type: "strong"; children: InlineNode[] }
  | { type: "em"; children: InlineNode[] }
  | { type: "del"; children: InlineNode[] }
  | { type: "code"; value: string }
  | { type: "link"; href: string; children: InlineNode[] }
  | { type: "image"; src: string; alt: string };

export type BlockNode =
  | { type: "heading"; depth: 1 | 2 | 3 | 4; children: InlineNode[] }
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "blockquote"; children: BlockNode[] }
  | { type: "list"; ordered: boolean; items: InlineNode[][] }
  | { type: "code"; language: CodeLanguage; value: string }
  | { type: "hr" }
  | { type: "table"; headers: InlineNode[][]; rows: InlineNode[][][] };

const CODE_LANGUAGES = new Set<CodeLanguage>(["tsx", "ts", "jsx", "js", "json", "bash", "text"]);

function normalizeLanguage(raw: string | undefined): CodeLanguage {
  const value = (raw ?? "text").trim().toLowerCase();
  if (value === "typescript") return "ts";
  if (value === "javascript") return "js";
  if (value === "shell" || value === "sh" || value === "zsh") return "bash";
  if (CODE_LANGUAGES.has(value as CodeLanguage)) return value as CodeLanguage;
  return "text";
}

function isHttpUrl(href: string) {
  return /^https?:\/\//i.test(href);
}

function charAt(input: string, index: number): string {
  return input.charAt(index);
}

function parseInline(input: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let i = 0;

  const pushText = (value: string) => {
    if (!value) return;
    const last = nodes[nodes.length - 1];
    if (last?.type === "text") {
      last.value += value;
      return;
    }
    nodes.push({ type: "text", value });
  };

  while (i < input.length) {
    const current = charAt(input, i);

    if (current === "`") {
      const end = input.indexOf("`", i + 1);
      if (end !== -1) {
        nodes.push({ type: "code", value: input.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    if (current === "!" && charAt(input, i + 1) === "[") {
      const altEnd = input.indexOf("]", i + 2);
      if (altEnd !== -1 && charAt(input, altEnd + 1) === "(") {
        const srcEnd = input.indexOf(")", altEnd + 2);
        if (srcEnd !== -1) {
          nodes.push({
            type: "image",
            alt: input.slice(i + 2, altEnd),
            src: input.slice(altEnd + 2, srcEnd),
          });
          i = srcEnd + 1;
          continue;
        }
      }
    }

    if (current === "[") {
      const labelEnd = input.indexOf("]", i + 1);
      if (labelEnd !== -1 && charAt(input, labelEnd + 1) === "(") {
        const hrefEnd = input.indexOf(")", labelEnd + 2);
        if (hrefEnd !== -1) {
          nodes.push({
            type: "link",
            href: input.slice(labelEnd + 2, hrefEnd),
            children: parseInline(input.slice(i + 1, labelEnd)),
          });
          i = hrefEnd + 1;
          continue;
        }
      }
    }

    if (
      (current === "*" && charAt(input, i + 1) === "*") ||
      (current === "_" && charAt(input, i + 1) === "_")
    ) {
      const marker = input.slice(i, i + 2);
      const end = input.indexOf(marker, i + 2);
      if (end !== -1) {
        nodes.push({ type: "strong", children: parseInline(input.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    }

    if (current === "*" || current === "_") {
      const end = input.indexOf(current, i + 1);
      if (end !== -1 && end > i + 1) {
        nodes.push({ type: "em", children: parseInline(input.slice(i + 1, end)) });
        i = end + 1;
        continue;
      }
    }

    if (current === "~" && charAt(input, i + 1) === "~") {
      const end = input.indexOf("~~", i + 2);
      if (end !== -1) {
        nodes.push({ type: "del", children: parseInline(input.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    }

    pushText(current);
    i += 1;
  }

  return nodes;
}

function isHr(line: string) {
  return /^(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line.trim());
}

function isTableSeparator(line: string) {
  return /^\|?[\s:|-]+\|[\s:|-]+\|?$/.test(line.trim()) && line.includes("-");
}

function splitTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function lineAt(lines: string[], index: number): string | undefined {
  return lines[index];
}

function parseBlocks(source: string): BlockNode[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: BlockNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lineAt(lines, i);
    if (line === undefined) break;

    if (!line.trim()) {
      i += 1;
      continue;
    }

    const fence = line.match(/^```([\w-]*)\s*$/);
    if (fence) {
      const language = normalizeLanguage(fence[1]);
      const body: string[] = [];
      i += 1;
      while (i < lines.length) {
        const bodyLine = lineAt(lines, i);
        if (bodyLine === undefined || bodyLine.startsWith("```")) break;
        body.push(bodyLine);
        i += 1;
      }
      if (i < lines.length) i += 1;
      blocks.push({ type: "code", language, value: body.join("\n") });
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading?.[1] && heading[2]) {
      blocks.push({
        type: "heading",
        depth: heading[1].length as 1 | 2 | 3 | 4,
        children: parseInline(heading[2].trim()),
      });
      i += 1;
      continue;
    }

    if (isHr(line)) {
      blocks.push({ type: "hr" });
      i += 1;
      continue;
    }

    const nextLine = lineAt(lines, i + 1);
    if (line.includes("|") && nextLine !== undefined && isTableSeparator(nextLine)) {
      const headers = splitTableRow(line).map(parseInline);
      i += 2;
      const rows: InlineNode[][][] = [];
      while (i < lines.length) {
        const rowLine = lineAt(lines, i);
        if (rowLine === undefined || !rowLine.includes("|") || !rowLine.trim()) break;
        rows.push(splitTableRow(rowLine).map(parseInline));
        i += 1;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length) {
        const quoteLine = lineAt(lines, i);
        if (quoteLine === undefined || !quoteLine.startsWith(">")) break;
        quoteLines.push(quoteLine.replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push({ type: "blockquote", children: parseBlocks(quoteLines.join("\n")) });
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const items: InlineNode[][] = [];
      while (i < lines.length) {
        const itemLine = lineAt(lines, i);
        if (itemLine === undefined || !/^\s*[-*+]\s+/.test(itemLine)) break;
        items.push(parseInline(itemLine.replace(/^\s*[-*+]\s+/, "")));
        i += 1;
      }
      blocks.push({ type: "list", ordered: false, items });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: InlineNode[][] = [];
      while (i < lines.length) {
        const itemLine = lineAt(lines, i);
        if (itemLine === undefined || !/^\s*\d+\.\s+/.test(itemLine)) break;
        items.push(parseInline(itemLine.replace(/^\s*\d+\.\s+/, "")));
        i += 1;
      }
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    const paragraphLines: string[] = [line.trim()];
    i += 1;
    while (i < lines.length) {
      const next = lineAt(lines, i);
      if (next === undefined || !next.trim()) break;
      const peek = lineAt(lines, i + 1);
      if (
        next.startsWith("#") ||
        next.startsWith(">") ||
        next.startsWith("```") ||
        isHr(next) ||
        /^\s*[-*+]\s+/.test(next) ||
        /^\s*\d+\.\s+/.test(next) ||
        (next.includes("|") && peek !== undefined && isTableSeparator(peek))
      ) {
        break;
      }
      paragraphLines.push(next.trim());
      i += 1;
    }
    blocks.push({ type: "paragraph", children: parseInline(paragraphLines.join(" ")) });
  }

  return blocks;
}

export function parseMarkdown(source: string): BlockNode[] {
  return parseBlocks(source);
}

export { isHttpUrl };
