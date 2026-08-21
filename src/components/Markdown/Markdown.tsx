import { createElement, forwardRef, Fragment, useMemo, type ReactNode } from "react";
import { CodeBlock } from "../CodeBlock";
import { cn } from "../../utils/cn";
import type { MarkdownProps } from "./Markdown.types";
import { isHttpUrl, parseMarkdown, type BlockNode, type InlineNode } from "./parseMarkdown";
import styles from "./Markdown.module.css";

function renderInline(
  nodes: InlineNode[],
  keyPrefix: string,
  externalLinksInNewTab: boolean,
  components: MarkdownProps["components"],
): ReactNode[] {
  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`;
    switch (node.type) {
      case "text":
        return <Fragment key={key}>{node.value}</Fragment>;
      case "strong":
        return <strong key={key}>{renderInline(node.children, key, externalLinksInNewTab, components)}</strong>;
      case "em":
        return <em key={key}>{renderInline(node.children, key, externalLinksInNewTab, components)}</em>;
      case "del":
        return <del key={key}>{renderInline(node.children, key, externalLinksInNewTab, components)}</del>;
      case "code":
        return (
          <code key={key} className={styles.inlineCode}>
            {node.value}
          </code>
        );
      case "link": {
        const external = isHttpUrl(node.href);
        const children = renderInline(node.children, key, externalLinksInNewTab, components);
        if (components?.a) {
          return <Fragment key={key}>{components.a({ href: node.href, children })}</Fragment>;
        }
        return (
          <a
            key={key}
            href={node.href}
            className={styles.link}
            {...(external && externalLinksInNewTab
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {children}
          </a>
        );
      }
      case "image":
        if (components?.img) {
          return <Fragment key={key}>{components.img({ src: node.src, alt: node.alt })}</Fragment>;
        }
        return <img key={key} src={node.src} alt={node.alt} className={styles.image} loading="lazy" />;
      default:
        return null;
    }
  });
}

function renderBlocks(
  blocks: BlockNode[],
  keyPrefix: string,
  options: {
    externalLinksInNewTab: boolean;
    showCodeCopy: boolean;
    codeLineNumbers: boolean;
    components: MarkdownProps["components"];
  },
): ReactNode[] {
  const { externalLinksInNewTab, showCodeCopy, codeLineNumbers, components } = options;

  return blocks.map((block, index) => {
    const key = `${keyPrefix}-b${index}`;

    switch (block.type) {
      case "heading": {
        const tag = `h${block.depth}` as "h1" | "h2" | "h3" | "h4";
        const children = renderInline(block.children, key, externalLinksInNewTab, components);
        const override = components?.[tag];
        if (override) {
          return <Fragment key={key}>{override({ children })}</Fragment>;
        }
        return createElement(tag, { key, className: styles[tag] }, children);
      }
      case "paragraph": {
        const children = renderInline(block.children, key, externalLinksInNewTab, components);
        if (components?.p) {
          return <Fragment key={key}>{components.p({ children })}</Fragment>;
        }
        return (
          <p key={key} className={styles.p}>
            {children}
          </p>
        );
      }
      case "blockquote": {
        const children = renderBlocks(block.children, key, options);
        if (components?.blockquote) {
          return <Fragment key={key}>{components.blockquote({ children })}</Fragment>;
        }
        return (
          <blockquote key={key} className={styles.blockquote}>
            {children}
          </blockquote>
        );
      }
      case "list": {
        const items = block.items.map((item, itemIndex) => {
          const liChildren = renderInline(item, `${key}-i${itemIndex}`, externalLinksInNewTab, components);
          if (components?.li) {
            return <Fragment key={`${key}-i${itemIndex}`}>{components.li({ children: liChildren })}</Fragment>;
          }
          return (
            <li key={`${key}-i${itemIndex}`} className={styles.li}>
              {liChildren}
            </li>
          );
        });
        if (block.ordered) {
          if (components?.ol) {
            return <Fragment key={key}>{components.ol({ children: items })}</Fragment>;
          }
          return (
            <ol key={key} className={styles.ol}>
              {items}
            </ol>
          );
        }
        if (components?.ul) {
          return <Fragment key={key}>{components.ul({ children: items })}</Fragment>;
        }
        return (
          <ul key={key} className={styles.ul}>
            {items}
          </ul>
        );
      }
      case "code": {
        if (components?.code) {
          return (
            <Fragment key={key}>
              {components.code({ language: block.language, code: block.value })}
            </Fragment>
          );
        }
        return (
          <div key={key} className={styles.codeBlock}>
            <CodeBlock
              code={block.value}
              language={block.language}
              showCopy={showCodeCopy}
              lineNumbers={codeLineNumbers}
            />
          </div>
        );
      }
      case "hr":
        if (components?.hr) {
          return <Fragment key={key}>{components.hr()}</Fragment>;
        }
        return <hr key={key} className={styles.hr} />;
      case "table": {
        const head = (
          <thead>
            <tr>
              {block.headers.map((cell, cellIndex) => (
                <th key={`${key}-h${cellIndex}`} className={styles.th}>
                  {renderInline(cell, `${key}-h${cellIndex}`, externalLinksInNewTab, components)}
                </th>
              ))}
            </tr>
          </thead>
        );
        const body = (
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`${key}-r${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${key}-r${rowIndex}-c${cellIndex}`} className={styles.td}>
                    {renderInline(cell, `${key}-r${rowIndex}-c${cellIndex}`, externalLinksInNewTab, components)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        );
        const tableChildren = (
          <>
            {head}
            {body}
          </>
        );
        if (components?.table) {
          return <Fragment key={key}>{components.table({ children: tableChildren })}</Fragment>;
        }
        return (
          <div key={key} className={styles.tableWrap}>
            <table className={styles.table}>{tableChildren}</table>
          </div>
        );
      }
      default:
        return null;
    }
  });
}

/**
 * Lightweight Markdown renderer — headings, lists, tables, links, and fenced
 * code (via CodeBlock). Zero markdown dependencies; HTML in source is treated as text.
 */
export const Markdown = forwardRef<HTMLElement, MarkdownProps>(function Markdown(
  {
    source,
    children,
    externalLinksInNewTab = true,
    showCodeCopy = true,
    codeLineNumbers = false,
    components,
    className,
    ...rest
  },
  ref,
) {
  const markdown = source ?? (typeof children === "string" ? children : "");
  const blocks = useMemo(() => parseMarkdown(markdown), [markdown]);

  return (
    <article
      ref={ref}
      className={cn(styles.root, className)}
      data-asriui-markdown=""
      {...rest}
    >
      {renderBlocks(blocks, "md", {
        externalLinksInNewTab,
        showCodeCopy,
        codeLineNumbers,
        components,
      })}
    </article>
  );
});

Markdown.displayName = "Markdown";
