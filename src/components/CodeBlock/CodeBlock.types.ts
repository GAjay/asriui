import type { HTMLAttributes } from "react";

export type CodeTokenType =
  | "keyword"
  | "string"
  | "comment"
  | "tag"
  | "attr"
  | "function"
  | "number"
  | "operator"
  | "plain";

export type CodeToken = {
  type: CodeTokenType;
  value: string;
};

export type CodeLanguage = "tsx" | "ts" | "jsx" | "js" | "json" | "bash" | "text";

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  /** Source code string to display. */
  code: string;
  /**
   * Language for syntax highlighting.
   * @default "tsx"
   */
  language?: CodeLanguage;
  /** Show a copy button in the toolbar. @default false */
  showCopy?: boolean;
  /** Optional filename label in the toolbar. */
  filename?: string;
  /** Hide line numbers gutter. @default false */
  lineNumbers?: boolean;
}
