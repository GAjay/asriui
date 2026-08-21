import { Badge, Button, DataGrid, Icon, PageLayout, SideNav, Timeline, Typography } from "axiom-ui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

type Order = {
  id: string;
  customer: string;
  plan: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
};

const STATS = [
  { label: "Revenue", value: "$48.2k", delta: "+12.4% vs last month" },
  { label: "Active users", value: "3,842", delta: "+6.1% vs last month" },
  { label: "Orders", value: "1,204", delta: "+3.8% vs last month" },
  { label: "Conversion", value: "4.7%", delta: "+0.6 pts" },
];

const ORDERS: Order[] = [
  { id: "ord_1042", customer: "Northwind Labs", plan: "Pro", amount: "$24.00", status: "Paid" },
  { id: "ord_1041", customer: "Acme Studio", plan: "Enterprise", amount: "$899.00", status: "Paid" },
  { id: "ord_1040", customer: "Pixel Foundry", plan: "Pro", amount: "$24.00", status: "Pending" },
  { id: "ord_1039", customer: "Orbit Health", plan: "Starter", amount: "$0.00", status: "Paid" },
  { id: "ord_1038", customer: "Lumen AI", plan: "Pro", amount: "$24.00", status: "Failed" },
];

const ORDER_COLUMNS = [
  { id: "customer", header: "Customer", accessor: "customer" as const, sortable: true },
  { id: "plan", header: "Plan", accessor: "plan" as const, sortable: true },
  { id: "amount", header: "Amount", accessor: "amount" as const, align: "right" as const },
  {
    id: "status",
    header: "Status",
    accessor: "status" as const,
    renderCell: (row: Order) => (
      <Badge variant={row.status === "Paid" ? "secondary" : row.status === "Pending" ? "outline" : "destructive"}>
        {row.status}
      </Badge>
    ),
  },
];

const ACTIVITY = [
  { id: "1", title: "New Pro subscription", description: "Northwind Labs upgraded from Starter.", status: "complete" as const },
  { id: "2", title: "Support ticket resolved", description: "API key rotation question closed in 14m.", status: "complete" as const },
  { id: "3", title: "Usage spike detected", description: "Acme Studio crossed 80% of monthly quota.", status: "active" as const },
];

export function DashboardPage() {
  return (
    <PageLayout variant="sidebar" sidebarWidth={248}>
      <PageLayout.Sidebar>
        <SideNav aria-label="Dashboard navigation">
          <SideNav.Header>
            <Typography variant="h4">Axiom Console</Typography>
            <Typography variant="muted">Operations</Typography>
          </SideNav.Header>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" active icon={<Icon name="grid" size="sm" />}>
                Overview
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="sparkles" size="sm" />}>
                Analytics
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="form" size="sm" />}>
                Orders
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="package" size="sm" />}>
                Customers
              </SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav>
      </PageLayout.Sidebar>

      <PageLayout.Main>
        <PageLayout.Content maxWidth="72rem">
          <TemplateDemoShell title="Dashboard page">
            <header className={styles.dashboardHeader}>
              <div>
                <h1 className={styles.dashboardTitle}>Overview</h1>
                <Typography variant="muted">Welcome back — here&apos;s what changed today.</Typography>
              </div>
              <div className={styles.dashboardActions}>
                <Button variant="outline">Export</Button>
                <Button>New report</Button>
              </div>
            </header>

            <section className={styles.statsGrid} aria-label="Key metrics">
              {STATS.map((stat) => (
                <article key={stat.label} className={styles.statCard}>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statDelta}>{stat.delta}</p>
                </article>
              ))}
            </section>

            <div className={styles.dashboardGrid}>
              <section className={styles.panel} aria-label="Recent orders">
                <h2 className={styles.panelTitle}>Recent orders</h2>
                <DataGrid
                  columns={ORDER_COLUMNS}
                  rows={ORDERS}
                  getRowId={(row) => row.id}
                  height={280}
                  exportable={{ csv: true, excel: true, filename: "orders" }}
                  defaultSort={{ columnId: "customer", direction: "asc" }}
                />
              </section>

              <section className={styles.panel} aria-label="Activity">
                <h2 className={styles.panelTitle}>Activity</h2>
                <Timeline>
                  {ACTIVITY.map((item) => (
                    <Timeline.Item key={item.id} title={item.title} description={item.description} status={item.status} />
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
