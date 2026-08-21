import { Badge } from "../Badge";
import { Icon } from "../Icon";
import { PageLayout } from "../PageLayout";
import { SideNav } from "../SideNav";
import { Typography } from "../Typography";
import { cn } from "../../utils/cn";
import { emitNavAction, renderActions, renderBlock } from "./renderBlock";
import type { PageProps } from "./Page.types";
import styles from "./Page.module.css";

/**
 * JSON-configured page renderer.
 *
 * Pass a serializable {@link PageConfig} and AsriUI builds the layout,
 * sidebar, header, and content blocks — forms, stats, tables, tabs, and more.
 */
export function Page({
  config,
  onAction,
  onFormSubmit,
  slots,
  className,
  classNames,
}: PageProps) {
  const layout = config.layout ?? {};
  const variant = layout.variant ?? "centered";
  const hasSidebar = (variant === "sidebar" || variant === "docs") && Boolean(config.sidebar);
  const ctx = { onAction, onFormSubmit, slots, classNames };

  const main = (
    <PageLayout.Main>
      <PageLayout.Content maxWidth={layout.contentMaxWidth}>
        <div className={cn(styles.root, classNames?.root, className)} id={config.id}>
          {config.header ? (
            <header className={cn(styles.header, classNames?.header)}>
              <div className={styles.headerCopy}>
                {config.header.badge ? <Badge variant="secondary">{config.header.badge}</Badge> : null}
                {config.header.title ? <Typography variant="h2">{config.header.title}</Typography> : null}
                {config.header.description ? (
                  <Typography variant="muted">{config.header.description}</Typography>
                ) : null}
              </div>
              {config.header.actions?.length
                ? renderActions(config.header.actions, onAction, "end")
                : null}
            </header>
          ) : null}

          <div className={cn(styles.blocks, classNames?.blocks)}>
            {(config.blocks ?? []).map((block) => renderBlock(block, ctx))}
          </div>
        </div>
      </PageLayout.Content>
    </PageLayout.Main>
  );

  if (!hasSidebar) {
    return (
      <PageLayout variant={variant} contentMaxWidth={layout.contentMaxWidth}>
        {main}
      </PageLayout>
    );
  }

  const sidebar = config.sidebar!;

  return (
    <PageLayout variant={variant} sidebarWidth={layout.sidebarWidth} contentMaxWidth={layout.contentMaxWidth}>
      <PageLayout.Sidebar width={layout.sidebarWidth}>
        <SideNav aria-label={sidebar.title ?? "Page navigation"}>
          {sidebar.title || sidebar.subtitle ? (
            <SideNav.Header>
              {sidebar.title ? <Typography variant="h4">{sidebar.title}</Typography> : null}
              {sidebar.subtitle ? <Typography variant="muted">{sidebar.subtitle}</Typography> : null}
            </SideNav.Header>
          ) : null}
          <SideNav.List>
            {(sidebar.items ?? []).map((item) => (
              <SideNav.Item key={item.id}>
                <SideNav.Link
                  href={item.href ?? `#${item.id}`}
                  active={item.active}
                  icon={item.icon ? <Icon name={item.icon} size="sm" /> : undefined}
                  onClick={(event) => {
                    if (!item.href) event.preventDefault();
                    emitNavAction(onAction, { type: "nav", id: item.id, href: item.href });
                  }}
                >
                  {item.label}
                </SideNav.Link>
              </SideNav.Item>
            ))}
          </SideNav.List>
        </SideNav>
      </PageLayout.Sidebar>
      {main}
    </PageLayout>
  );
}
