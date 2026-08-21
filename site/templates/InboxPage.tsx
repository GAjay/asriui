import { useState } from "react";
import { Badge, Button, Icon, List, ListItem, PageLayout, SideNav, Tabs, Typography } from "asriui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

type Message = {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  tag: string;
};

const MESSAGES: Message[] = [
  {
    id: "m1",
    from: "Billing",
    subject: "Invoice ready for March",
    preview: "Your Pro plan invoice is ready to download.",
    time: "2m",
    unread: true,
    tag: "Billing",
  },
  {
    id: "m2",
    from: "Support",
    subject: "Re: DataGrid virtualization",
    preview: "Yes — set height and estimatedRowHeight for large sets.",
    time: "1h",
    unread: true,
    tag: "Support",
  },
  {
    id: "m3",
    from: "Security",
    subject: "New sign-in from Chrome on macOS",
    preview: "If this wasn’t you, rotate your API keys.",
    time: "Yesterday",
    unread: false,
    tag: "Security",
  },
  {
    id: "m4",
    from: "Product",
    subject: "New templates: Shop & Cart",
    preview: "Ecommerce page templates are live in the docs.",
    time: "Mon",
    unread: false,
    tag: "Product",
  },
];

export function InboxPage() {
  const [selectedId, setSelectedId] = useState(MESSAGES[0]!.id);
  const selected = MESSAGES.find((message) => message.id === selectedId) ?? MESSAGES[0]!;

  return (
    <PageLayout variant="sidebar" sidebarWidth={248}>
      <PageLayout.Sidebar>
        <SideNav aria-label="Inbox navigation">
          <SideNav.Header>
            <Typography variant="h4">Inbox</Typography>
            <Typography variant="muted">Messages</Typography>
          </SideNav.Header>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" active icon={<Icon name="sparkles" size="sm" />}>
                All mail
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="form" size="sm" />}>
                Starred
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="package" size="sm" />}>
                Archive
              </SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav>
      </PageLayout.Sidebar>
      <PageLayout.Main>
        <PageLayout.Content maxWidth="64rem">
          <TemplateDemoShell title="Inbox page">
            <header className={styles.dashboardHeader}>
              <div>
                <Badge variant="secondary">Productivity</Badge>
                <h1 className={styles.dashboardTitle}>Inbox</h1>
                <Typography variant="muted">
                  List + ListItem with badges and a reading pane — common for support and notification UIs.
                </Typography>
              </div>
              <div className={styles.dashboardActions}>
                <Button variant="outline" size="sm">
                  Mark all read
                </Button>
                <Button size="sm">Compose</Button>
              </div>
            </header>

            <Tabs defaultValue="all">
              <Tabs.List>
                <Tabs.Trigger value="all">All</Tabs.Trigger>
                <Tabs.Trigger value="unread">Unread</Tabs.Trigger>
                <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
              </Tabs.List>
            </Tabs>

            <div className={styles.inboxShell}>
              <List className={styles.inboxList} aria-label="Messages">
                {MESSAGES.map((message) => (
                  <ListItem
                    key={message.id}
                    interactive
                    selected={message.id === selectedId}
                    title={message.subject}
                    description={`${message.from} · ${message.preview}`}
                    media={
                      <span className={styles.inboxAvatar} aria-hidden="true">
                        {message.from.slice(0, 1)}
                      </span>
                    }
                    trailing={
                      <span className={styles.inboxTrailing}>
                        {message.unread ? <Badge variant="secondary">New</Badge> : null}
                        <Typography variant="muted">{message.time}</Typography>
                      </span>
                    }
                    onClick={() => setSelectedId(message.id)}
                  />
                ))}
              </List>

              <article className={styles.inboxReading} aria-label="Selected message">
                <div className={styles.inboxReadingHead}>
                  <div>
                    <Badge variant="outline">{selected.tag}</Badge>
                    <h2 className={styles.inboxSubject}>{selected.subject}</h2>
                    <Typography variant="muted">
                      From {selected.from} · {selected.time} ago
                    </Typography>
                  </div>
                  <Button variant="outline" size="sm">
                    Reply
                  </Button>
                </div>
                <p className={styles.prose}>
                  {selected.preview} This reading pane is static demo content — connect ListItem selection to your
                  message API and render Markdown or HTML in production.
                </p>
              </article>
            </div>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
