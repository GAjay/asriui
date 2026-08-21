import type { CSSProperties, ReactNode } from "react";
import { Accordion } from "../Accordion";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Card } from "../Card";
import { CodeBlock } from "../CodeBlock";
import { Form } from "../Form";
import { Grid } from "../Grid";
import { Image } from "../Image";
import { List, ListItem } from "../ListItem";
import { Markdown } from "../Markdown";
import { Table } from "../Table";
import { Tabs } from "../Tabs";
import { Timeline } from "../Timeline";
import { Typography } from "../Typography";
import { AspectRatio } from "../AspectRatio";
import { cn } from "../../utils/cn";
import type {
  PageActionConfig,
  PageActionEvent,
  PageBlock,
  PageClassNames,
  PageProps,
} from "./Page.types";
import styles from "./Page.module.css";

type RenderCtx = {
  onAction?: PageProps["onAction"];
  onFormSubmit?: PageProps["onFormSubmit"];
  slots?: PageProps["slots"];
  classNames?: PageClassNames;
};

function renderActions(
  items: PageActionConfig[],
  onAction: PageProps["onAction"],
  align: "start" | "center" | "end" = "start",
) {
  const alignClass =
    align === "center" ? styles.actionsCenter : align === "end" ? styles.actionsEnd : styles.actionsStart;

  return (
    <div className={cn(styles.actions, alignClass)}>
      {items.map((item) => {
        const handleClick = () => {
          onAction?.({ type: "action", id: item.id, href: item.href });
        };

        if (item.href) {
          return (
            <Button
              key={item.id}
              variant={item.variant ?? "primary"}
              size={item.size ?? "md"}
              type="button"
              onClick={() => {
                handleClick();
                window.location.assign(item.href!);
              }}
            >
              {item.label}
            </Button>
          );
        }

        return (
          <Button
            key={item.id}
            variant={item.variant ?? "primary"}
            size={item.size ?? "md"}
            type="button"
            onClick={handleClick}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}

export function renderBlock(block: PageBlock, ctx: RenderCtx): ReactNode {
  const { onAction, onFormSubmit, slots, classNames } = ctx;
  const wrap = (node: ReactNode) => (
    <div key={block.id} className={cn(styles.block, classNames?.block)} data-block-type={block.type} data-block-id={block.id}>
      {node}
    </div>
  );

  switch (block.type) {
    case "typography":
      return wrap(
        <Typography variant={block.variant ?? "p"} align={block.align}>
          {block.text}
        </Typography>,
      );
    case "badge":
      return wrap(<Badge variant={block.variant ?? "secondary"}>{block.label}</Badge>);
    case "markdown":
      return wrap(<Markdown>{block.content}</Markdown>);
    case "code":
      return wrap(
        <CodeBlock
          code={block.code}
          language={block.language}
          filename={block.filename}
          showCopy={block.showCopy ?? true}
        />,
      );
    case "image":
      return wrap(
        block.aspectRatio ? (
          <AspectRatio ratio={block.aspectRatio}>
            <Image src={block.src} alt={block.alt} />
          </AspectRatio>
        ) : (
          <Image src={block.src} alt={block.alt} />
        ),
      );
    case "spacer":
      return wrap(
        <div
          className={
            block.size === "sm" ? styles.spacerSm : block.size === "lg" ? styles.spacerLg : styles.spacerMd
          }
          aria-hidden="true"
        />,
      );
    case "divider":
      return wrap(<hr className={styles.divider} />);
    case "actions":
      return wrap(renderActions(block.items, onAction, block.align ?? "start"));
    case "stats":
      return wrap(
        <div
          className={styles.stats}
          style={{ "--page-stats-cols": String(block.columns ?? Math.min(block.items.length, 4)) } as CSSProperties}
          aria-label="Stats"
        >
          {block.items.map((item) => (
            <article key={`${block.id}-${item.label}`} className={styles.stat}>
              <p className={styles.statLabel}>{item.label}</p>
              <p className={styles.statValue}>{item.value}</p>
              {item.hint ? <p className={styles.statHint}>{item.hint}</p> : null}
            </article>
          ))}
        </div>,
      );
    case "card":
      return wrap(
        <Card>
          {block.title || block.description ? (
            <Card.Header>
              {block.title ? <Card.Title>{block.title}</Card.Title> : null}
              {block.description ? <Typography variant="muted">{block.description}</Typography> : null}
            </Card.Header>
          ) : null}
          <Card.Content>
            <div className={styles.cardBody}>
              {(block.blocks ?? []).map((child) => renderBlock(child, ctx))}
            </div>
          </Card.Content>
          {block.footer ? (
            <Card.Footer>
              <Typography variant="muted">{block.footer}</Typography>
            </Card.Footer>
          ) : null}
        </Card>,
      );
    case "form":
      return wrap(
        <Form
          config={block.config}
          onSubmit={async (values) => {
            await onFormSubmit?.(block.id, values);
          }}
        />,
      );
    case "list":
      return wrap(
        <List>
          {block.items.map((item) => (
            <ListItem
              key={item.id}
              title={item.title}
              description={item.description}
              trailing={item.badge ? <Badge variant="secondary">{item.badge}</Badge> : undefined}
            />
          ))}
        </List>,
      );
    case "table":
      return wrap(
        <Table scrollable>
          {block.caption ? <Table.Caption>{block.caption}</Table.Caption> : null}
          <Table.Header>
            <Table.Row>
              {block.columns.map((column) => (
                <Table.Head key={column.id}>{column.header}</Table.Head>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {block.rows.map((row, index) => (
              <Table.Row key={`${block.id}-row-${index}`}>
                {block.columns.map((column) => (
                  <Table.Cell key={column.id}>{row[column.id] ?? ""}</Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>,
      );
    case "grid":
      return wrap(
        <Grid variant="fixed" columns={block.columns ?? 2} gap={block.gap ?? "md"}>
          {block.blocks.map((child) => renderBlock(child, ctx))}
        </Grid>,
      );
    case "tabs": {
      const defaultValue = block.defaultValue ?? block.items[0]?.value;
      return wrap(
        <Tabs defaultValue={defaultValue}>
          <Tabs.List>
            {block.items.map((item) => (
              <Tabs.Trigger key={item.value} value={item.value}>
                {item.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {block.items.map((item) => (
            <Tabs.Content key={item.value} value={item.value}>
              <div className={styles.tabPanel}>
                {item.blocks.map((child) => renderBlock(child, ctx))}
              </div>
            </Tabs.Content>
          ))}
        </Tabs>,
      );
    }
    case "accordion":
      return wrap(
        <Accordion
          type={block.typeMode ?? "single"}
          collapsible={block.collapsible ?? true}
          defaultValue={block.defaultValue}
          variant="bordered"
        >
          {block.items.map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Trigger>{item.title}</Accordion.Trigger>
              <Accordion.Content>
                {item.content ? <Typography variant="muted">{item.content}</Typography> : null}
                {(item.blocks ?? []).map((child) => renderBlock(child, ctx))}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>,
      );
    case "timeline":
      return wrap(
        <Timeline>
          {block.items.map((item) => (
            <Timeline.Item
              key={item.id}
              title={item.title}
              description={item.description}
              date={item.date}
              status={item.status}
            />
          ))}
        </Timeline>,
      );
    case "custom": {
      const slot = slots?.[block.id];
      return wrap(
        slot ?? (
          <div className={styles.missingSlot} role="note">
            Missing slot for custom block &quot;{block.id}&quot;. Pass slots with that id.
          </div>
        ),
      );
    }
    default: {
      const _exhaustive: never = block;
      return wrap(
        <div className={styles.missingSlot} role="note">
          Unknown block type: {String((_exhaustive as PageBlock).type)}
        </div>,
      );
    }
  }
}

export function emitNavAction(
  onAction: PageProps["onAction"],
  event: PageActionEvent,
) {
  onAction?.(event);
}

export { renderActions };
