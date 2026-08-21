import { Badge, Button, Icon, PageLayout, SideNav, Timeline, Typography } from "axiom-ui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

const KPIS = [
  { label: "Sessions", value: "128.4k", delta: "+9.2%" },
  { label: "Activation", value: "38%", delta: "+2.1 pts" },
  { label: "Retention D7", value: "44%", delta: "+1.4 pts" },
  { label: "NPS", value: "62", delta: "+3" },
];

const CHANNELS = [
  { name: "Product", value: 72 },
  { name: "Docs", value: 54 },
  { name: "Templates", value: 41 },
  { name: "Changelog", value: 28 },
];

const EVENTS = [
  {
    id: "1",
    title: "Template gallery spike",
    description: "Shop + Checkout demos drove +18% sessions.",
    status: "complete" as const,
  },
  {
    id: "2",
    title: "Docs search CTR up",
    description: "Component catalog filter improved findability.",
    status: "complete" as const,
  },
  {
    id: "3",
    title: "Watching onboarding funnel",
    description: "Step 2 drop-off under review this week.",
    status: "active" as const,
  },
];

export function AnalyticsPage() {
  return (
    <PageLayout variant="sidebar" sidebarWidth={248}>
      <PageLayout.Sidebar>
        <SideNav aria-label="Analytics navigation">
          <SideNav.Header>
            <Typography variant="h4">Axiom Console</Typography>
            <Typography variant="muted">Insights</Typography>
          </SideNav.Header>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="grid" size="sm" />}>
                Overview
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" active icon={<Icon name="sparkles" size="sm" />}>
                Analytics
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="form" size="sm" />}>
                Funnels
              </SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav>
      </PageLayout.Sidebar>
      <PageLayout.Main>
        <PageLayout.Content maxWidth="72rem">
          <TemplateDemoShell title="Analytics page">
            <header className={styles.dashboardHeader}>
              <div>
                <Badge variant="secondary">Admin</Badge>
                <h1 className={styles.dashboardTitle}>Analytics</h1>
                <Typography variant="muted">KPI strip, channel mix, and a living activity feed.</Typography>
              </div>
              <div className={styles.dashboardActions}>
                <Button variant="outline">Last 30 days</Button>
                <Button>Export</Button>
              </div>
            </header>

            <section className={styles.statsGrid} aria-label="Key metrics">
              {KPIS.map((stat) => (
                <article key={stat.label} className={styles.statCard}>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statDelta}>{stat.delta}</p>
                </article>
              ))}
            </section>

            <div className={styles.dashboardGrid}>
              <section className={styles.panel} aria-label="Traffic by channel">
                <h2 className={styles.panelTitle}>Traffic by channel</h2>
                <ul className={styles.channelList}>
                  {CHANNELS.map((channel) => (
                    <li key={channel.name} className={styles.channelRow}>
                      <div className={styles.channelMeta}>
                        <span>{channel.name}</span>
                        <strong>{channel.value}%</strong>
                      </div>
                      <div className={styles.channelTrack} aria-hidden="true">
                        <span className={styles.channelFill} style={{ width: `${channel.value}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.panel} aria-label="Recent signals">
                <h2 className={styles.panelTitle}>Recent signals</h2>
                <Timeline>
                  {EVENTS.map((event) => (
                    <Timeline.Item
                      key={event.id}
                      title={event.title}
                      description={event.description}
                      status={event.status}
                    />
                  ))}
                </Timeline>
              </section>
            </div>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
