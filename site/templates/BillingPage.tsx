import { Badge, Button, DataGrid, Icon, PageLayout, SideNav, Typography, toast } from "axiom-ui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Open" | "Failed";
};

const INVOICES: Invoice[] = [
  { id: "inv_204", date: "Mar 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "inv_203", date: "Feb 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "inv_202", date: "Jan 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "inv_201", date: "Dec 1, 2025", amount: "$29.00", status: "Open" },
];

const COLUMNS = [
  { id: "id", header: "Invoice", accessor: "id" as const, sortable: true },
  { id: "date", header: "Date", accessor: "date" as const, sortable: true },
  { id: "amount", header: "Amount", accessor: "amount" as const, align: "right" as const },
  {
    id: "status",
    header: "Status",
    accessor: "status" as const,
    renderCell: (row: Invoice) => (
      <Badge variant={row.status === "Paid" ? "secondary" : row.status === "Open" ? "outline" : "destructive"}>
        {row.status}
      </Badge>
    ),
  },
];

export function BillingPage() {
  return (
    <PageLayout variant="sidebar" sidebarWidth={248}>
      <PageLayout.Sidebar>
        <SideNav aria-label="Billing navigation">
          <SideNav.Header>
            <Typography variant="h4">Account</Typography>
            <Typography variant="muted">Billing</Typography>
          </SideNav.Header>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="form" size="sm" />}>
                Profile
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" active icon={<Icon name="package" size="sm" />}>
                Billing
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="sparkles" size="sm" />}>
                Usage
              </SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav>
      </PageLayout.Sidebar>
      <PageLayout.Main>
        <PageLayout.Content maxWidth="56rem">
          <TemplateDemoShell title="Billing page">
            <header className={styles.dashboardHeader}>
              <div>
                <Badge variant="secondary">Account</Badge>
                <h1 className={styles.dashboardTitle}>Billing</h1>
                <Typography variant="muted">Plan summary, payment method, and invoice history.</Typography>
              </div>
              <div className={styles.dashboardActions}>
                <Button
                  variant="outline"
                  onClick={() => toast.info("Opening portal", { description: "Wire to Stripe Customer Portal." })}
                >
                  Manage payment
                </Button>
                <Button onClick={() => toast.success("Upgrade started")}>Upgrade plan</Button>
              </div>
            </header>

            <section className={styles.billingGrid} aria-label="Plan and payment">
              <article className={styles.panel}>
                <h2 className={styles.panelTitle}>Current plan</h2>
                <p className={styles.billingPlan}>Pro · $49 / month</p>
                <Typography variant="muted">Includes unlimited projects, SSO, and priority support.</Typography>
                <p className={styles.billingRenew}>Renews Apr 1, 2026</p>
              </article>
              <article className={styles.panel}>
                <h2 className={styles.panelTitle}>Payment method</h2>
                <p className={styles.billingPlan}>Visa ···· 4242</p>
                <Typography variant="muted">Expires 08 / 28 · Billing email: finance@acme.dev</Typography>
              </article>
            </section>

            <section className={styles.panel} aria-label="Invoices">
              <h2 className={styles.panelTitle}>Invoices</h2>
              <DataGrid
                columns={COLUMNS}
                rows={INVOICES}
                getRowId={(row) => row.id}
                height={260}
                exportable={{ csv: true, filename: "invoices" }}
              />
            </section>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
