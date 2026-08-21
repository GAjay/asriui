import type { HTMLAttributes, ReactNode } from "react";
import type { CodeLanguage } from "../CodeBlock";

export type MarkdownComponents = {
  h1?: (props: { children: ReactNode }) => ReactNode;
  h2?: (props: { children: ReactNode }) => ReactNode;
  h3?: (props: { children: ReactNode }) => ReactNode;
  h4?: (props: { children: ReactNode }) => ReactNode;
  p?: (props: { children: ReactNode }) => ReactNode;
  a?: (props: { href: string; children: ReactNode }) => ReactNode;
  ul?: (props: { children: ReactNode }) => ReactNode;
  ol?: (props: { children: ReactNode }) => ReactNode;
  li?: (props: { children: ReactNode }) => ReactNode;
  blockquote?: (props: { children: ReactNode }) => ReactNode;
  code?: (props: { language: CodeLanguage; code: string }) => ReactNode;
  hr?: () => ReactNode;
  img?: (props: { src: string; alt: string }) => ReactNode;
  table?: (props: { children: ReactNode }) => ReactNode;
};

export interface MarkdownProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Markdown source string. Takes precedence over string children. */
  source?: string;
  /** Markdown as a string child. Ignored when `source` is set. */
  children?: string;
  /**
   * Open links in a new tab when they are absolute http(s) URLs.
   * @default true
   */
  externalLinksInNewTab?: boolean;
  /** Show copy button on fenced code blocks. @default true */
  showCodeCopy?: boolean;
  /** Show line numbers on fenced code blocks. @default false */
  codeLineNumbers?: boolean;
  /** Optional element overrides for custom rendering. */
  components?: MarkdownComponents;
}
