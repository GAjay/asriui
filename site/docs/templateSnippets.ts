export type TemplateSnippet = {
  slug: string;
  title: string;
  description: string;
  layout: "centered" | "sidebar";
  demoPath: string;
  filename: string;
  code: string;
};

export function getTemplateSnippet(slug: string): TemplateSnippet | undefined {
  return TEMPLATE_SNIPPETS.find((template) => template.slug === slug);
}

export const TEMPLATE_SNIPPETS: TemplateSnippet[] = [
  {
    slug: "watch-landing",
    title: "Watches landing",
    description: "Luxury product hero, animated collection grid, craft features, and conversion CTA.",
    layout: "centered",
    demoPath: "/templates/watch-landing",
    filename: "WatchLandingPage.tsx",
    code: `import { Badge, Button, PageLayout, Typography } from "asriui";
import "asriui/style.css";

export function WatchLandingPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="72rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <Badge variant="secondary">New collection</Badge>
            <Typography variant="h1">Precision crafted for every moment</Typography>
            <Typography variant="lead">
              Explore titanium, ceramic, and steel timepieces with sapphire crystal and in-house movements.
            </Typography>
            <Button style={{ marginTop: "1rem" }}>Shop collection</Button>
          </header>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "about",
    title: "About page",
    description: "Centered marketing page with hero, values grid, and team cards.",
    layout: "centered",
    demoPath: "/templates/about",
    filename: "AboutPage.tsx",
    code: `import { Badge, PageLayout, Typography } from "asriui";
import "asriui/style.css";

const VALUES = [
  { title: "Accessible first", description: "Semantic landmarks and readable type scale." },
  { title: "Composable", description: "Built from PageLayout, Card, and Typography." },
  { title: "Theme aware", description: "Uses design tokens for light and dark modes." },
];

export function AboutPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="56rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <Badge variant="secondary">Company</Badge>
            <Typography variant="h1">We build tools developers love</Typography>
            <Typography variant="lead">
              AsriUI helps teams ship polished interfaces faster with accessible components.
            </Typography>
          </header>

          <section>
            <Typography variant="h2">What we value</Typography>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {VALUES.map((value) => (
                <article key={value.title} style={{ padding: "1rem", border: "1px solid var(--asriui-color-border)", borderRadius: 8 }}>
                  <Typography variant="h3">{value.title}</Typography>
                  <Typography variant="muted">{value.description}</Typography>
                </article>
              ))}
            </div>
          </section>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "contact",
    title: "Contact page",
    description: "JSON-driven Form with topic select and contact info aside.",
    layout: "centered",
    demoPath: "/templates/contact",
    filename: "ContactPage.tsx",
    code: `import { Form, PageLayout, Typography } from "asriui";
import "asriui/style.css";

const CONTACT_FORM = {
  fields: [
    { name: "name", type: "text", label: "Full name", required: true },
    { name: "email", type: "email", label: "Work email", required: true },
    {
      name: "topic",
      type: "select",
      label: "Topic",
      required: true,
      options: [
        { label: "Sales", value: "sales" },
        { label: "Support", value: "support" },
      ],
    },
    { name: "message", type: "textarea", label: "Message", required: true, minLength: 12 },
  ],
};

export function ContactPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="56rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h1">Let's talk</Typography>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "1.5rem" }}>
            <Form config={CONTACT_FORM} onSubmit={async (values) => console.log(values)} />
            <aside>
              <Typography variant="h3">Email</Typography>
              <Typography variant="muted">hello@asriui.dev</Typography>
            </aside>
          </div>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "pricing",
    title: "Pricing page",
    description: "Three-tier pricing cards with FAQ accordion.",
    layout: "centered",
    demoPath: "/templates/pricing",
    filename: "PricingPage.tsx",
    code: `import { Accordion, Button, PageLayout, Typography } from "asriui";
import "asriui/style.css";

const PLANS = [
  { name: "Starter", price: "$0", features: ["MIT license", "Core components"] },
  { name: "Pro", price: "$24", features: ["Page templates", "Email support"] },
  { name: "Enterprise", price: "Custom", features: ["SSO", "Dedicated support"] },
];

export function PricingPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="60rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h1">Simple plans that scale</Typography>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {PLANS.map((plan) => (
              <article key={plan.name} style={{ padding: "1.25rem", border: "1px solid var(--asriui-color-border)", borderRadius: 8 }}>
                <Typography variant="h3">{plan.name}</Typography>
                <Typography variant="h2">{plan.price}</Typography>
                <ul>{plan.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <Button style={{ width: "100%" }}>Choose {plan.name}</Button>
              </article>
            ))}
          </div>
          <Accordion type="single" collapsible defaultValue="billing">
            <Accordion.Item value="billing">
              <Accordion.Trigger>Can I switch plans later?</Accordion.Trigger>
              <Accordion.Content>Yes — upgrade or downgrade any time.</Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "dashboard",
    title: "Dashboard page",
    description: "Sidebar shell with stats, DataGrid orders table, and activity timeline.",
    layout: "sidebar",
    demoPath: "/templates/dashboard",
    filename: "DashboardPage.tsx",
    code: `import { Badge, Button, DataGrid, Icon, PageLayout, SideNav, Timeline, Typography } from "asriui";
import "asriui/style.css";

const ORDERS = [
  { id: "1", customer: "Northwind", plan: "Pro", amount: "$24", status: "Paid" },
  { id: "2", customer: "Acme", plan: "Enterprise", amount: "$899", status: "Pending" },
];

export function DashboardPage() {
  return (
    <PageLayout variant="sidebar" sidebarWidth={248}>
      <PageLayout.Sidebar>
        <SideNav>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" active icon={<Icon name="grid" size="sm" />}>Overview</SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="form" size="sm" />}>Orders</SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav>
      </PageLayout.Sidebar>
      <PageLayout.Main>
        <PageLayout.Content maxWidth="72rem">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <Typography variant="h2">Overview</Typography>
            <Button>New report</Button>
          </div>
          <DataGrid
            columns={[
              { id: "customer", header: "Customer", accessor: "customer", sortable: true },
              { id: "plan", header: "Plan", accessor: "plan" },
              { id: "status", header: "Status", accessor: "status", renderCell: (row) => <Badge>{row.status}</Badge> },
            ]}
            rows={ORDERS}
            getRowId={(row) => row.id}
            height={260}
          />
          <Timeline>
            <Timeline.Item title="New subscription" status="complete" description="Northwind upgraded to Pro." />
          </Timeline>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "login",
    title: "Login page",
    description: "OAuth + email LoginForm with toast feedback.",
    layout: "centered",
    demoPath: "/templates/login",
    filename: "LoginPage.tsx",
    code: `import { LoginForm, PageLayout, toast } from "asriui";
import "asriui/style.css";

export function LoginPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="32rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <LoginForm
            title="Welcome back"
            onSubmit={async () => toast.success("Signed in")}
            onOAuth={(provider) => toast.info(\`Redirecting to \${provider}\`)}
            providers={["microsoft", "google", "github", "apple"]}
          />
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "shop",
    title: "Shop page",
    description: "Ecommerce product catalog with category filters and add-to-cart toasts.",
    layout: "centered",
    demoPath: "/templates/shop",
    filename: "ShopPage.tsx",
    code: `import { Badge, Button, PageLayout, Typography, toast } from "asriui";
import "asriui/style.css";

const PRODUCTS = [
  { id: "1", name: "Soft Tee", price: "$32", category: "Apparel" },
  { id: "2", name: "Mono Cap", price: "$24", category: "Accessories" },
];

export function ShopPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="64rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Badge variant="secondary">Ecommerce</Badge>
          <Typography variant="h1">AsriUI Store</Typography>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
            {PRODUCTS.map((product) => (
              <article key={product.id} style={{ border: "1px solid var(--asriui-color-border)", borderRadius: 8, padding: 16 }}>
                <Typography variant="muted">{product.category}</Typography>
                <Typography variant="h3">{product.name}</Typography>
                <Typography variant="h4">{product.price}</Typography>
                <Button onClick={() => toast.success("Added to cart", { description: product.name })}>
                  Add to cart
                </Button>
              </article>
            ))}
          </div>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "cart",
    title: "Cart page",
    description: "Line items with quantity controls, promo code, and order summary.",
    layout: "centered",
    demoPath: "/templates/cart",
    filename: "CartPage.tsx",
    code: `import { useState } from "react";
import { Button, Input, PageLayout, Typography } from "asriui";
import "asriui/style.css";

export function CartPage() {
  const [qty, setQty] = useState(1);
  const subtotal = 32 * qty;

  return (
    <PageLayout variant="centered" contentMaxWidth="60rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h1">Your cart</Typography>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.9fr", gap: 16 }}>
            <article style={{ border: "1px solid var(--asriui-color-border)", borderRadius: 8, padding: 16 }}>
              <Typography variant="h3">AsriUI Soft Tee</Typography>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Button size="sm" variant="outline" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</Button>
                <span>{qty}</span>
                <Button size="sm" variant="outline" onClick={() => setQty((q) => q + 1)}>+</Button>
              </div>
            </article>
            <aside style={{ border: "1px solid var(--asriui-color-border)", borderRadius: 8, padding: 16 }}>
              <Typography variant="h3">Order summary</Typography>
              <p>Subtotal \${subtotal}</p>
              <Input label="Promo code" placeholder="ASRIUI10" />
              <Button style={{ width: "100%" }}>Checkout</Button>
            </aside>
          </div>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "checkout",
    title: "Checkout page",
    description: "Schema-driven shipping Form with payment summary panel.",
    layout: "centered",
    demoPath: "/templates/checkout",
    filename: "CheckoutPage.tsx",
    code: `import { Form, PageLayout, Typography, toast } from "asriui";
import "asriui/style.css";

const CHECKOUT_FORM = {
  submitLabel: "Place order",
  fields: [
    { name: "email", type: "email", label: "Email", required: true },
    { name: "name", type: "text", label: "Full name", required: true },
    { name: "address", type: "text", label: "Street address", required: true },
    {
      name: "shipping",
      type: "select",
      label: "Shipping method",
      required: true,
      options: [
        { label: "Standard — $8", value: "standard" },
        { label: "Express — $18", value: "express" },
      ],
    },
  ],
};

export function CheckoutPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="56rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h1">Checkout</Typography>
          <Form
            config={CHECKOUT_FORM}
            onSubmit={async () => toast.success("Order placed")}
          />
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "settings",
    title: "Settings page",
    description: "Sidebar account settings with Tabs, Form, Switch, and danger zone.",
    layout: "sidebar",
    demoPath: "/templates/settings",
    filename: "SettingsPage.tsx",
    code: `import { Form, Icon, PageLayout, SideNav, Switch, Tabs, Typography, toast } from "asriui";
import "asriui/style.css";

export function SettingsPage() {
  return (
    <PageLayout variant="sidebar" sidebarWidth={248}>
      <PageLayout.Sidebar>
        <SideNav>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" active icon={<Icon name="form" size="sm" />}>Profile</SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav>
      </PageLayout.Sidebar>
      <PageLayout.Main>
        <PageLayout.Content maxWidth="48rem">
          <Typography variant="h2">Settings</Typography>
          <Tabs defaultValue="profile">
            <Tabs.List>
              <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
              <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="profile">
              <Form
                config={{
                  submitLabel: "Save",
                  fields: [
                    { name: "name", type: "text", label: "Display name", required: true },
                    { name: "email", type: "email", label: "Email", required: true },
                  ],
                }}
                onSubmit={async () => toast.success("Saved")}
              />
            </Tabs.Content>
            <Tabs.Content value="notifications">
              <label style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span>Product updates</span>
                <Switch defaultChecked />
              </label>
            </Tabs.Content>
          </Tabs>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "inbox",
    title: "Inbox page",
    description: "Message list with ListItem selection and a reading pane.",
    layout: "sidebar",
    demoPath: "/templates/inbox",
    filename: "InboxPage.tsx",
    code: `import { useState } from "react";
import { Badge, List, ListItem, PageLayout, Typography } from "asriui";
import "asriui/style.css";

const MESSAGES = [
  { id: "1", subject: "Invoice ready", preview: "March Pro plan invoice", unread: true },
  { id: "2", subject: "Support reply", preview: "DataGrid tip for large sets", unread: false },
];

export function InboxPage() {
  const [selectedId, setSelectedId] = useState("1");
  const selected = MESSAGES.find((m) => m.id === selectedId)!;

  return (
    <PageLayout variant="sidebar" sidebarWidth={248}>
      <PageLayout.Main>
        <PageLayout.Content maxWidth="64rem">
          <Typography variant="h2">Inbox</Typography>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <List>
              {MESSAGES.map((message) => (
                <ListItem
                  key={message.id}
                  interactive
                  selected={message.id === selectedId}
                  title={message.subject}
                  description={message.preview}
                  trailing={message.unread ? <Badge>New</Badge> : null}
                  onClick={() => setSelectedId(message.id)}
                />
              ))}
            </List>
            <article style={{ border: "1px solid var(--asriui-color-border)", borderRadius: 8, padding: 16 }}>
              <Typography variant="h3">{selected.subject}</Typography>
              <Typography variant="muted">{selected.preview}</Typography>
            </article>
          </div>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "analytics",
    title: "Analytics page",
    description: "KPI cards, channel bars, and a Timeline of product signals.",
    layout: "sidebar",
    demoPath: "/templates/analytics",
    filename: "AnalyticsPage.tsx",
    code: `import { Badge, PageLayout, Timeline, Typography } from "asriui";
import "asriui/style.css";

export function AnalyticsPage() {
  return (
    <PageLayout variant="sidebar" sidebarWidth={248}>
      <PageLayout.Main>
        <PageLayout.Content maxWidth="72rem">
          <Typography variant="h2">Analytics</Typography>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              ["Sessions", "128.4k"],
              ["Activation", "38%"],
              ["Retention D7", "44%"],
              ["NPS", "62"],
            ].map(([label, value]) => (
              <article key={label} style={{ border: "1px solid var(--asriui-color-border)", borderRadius: 8, padding: 12 }}>
                <Badge variant="secondary">{label}</Badge>
                <Typography variant="h3">{value}</Typography>
              </article>
            ))}
          </div>
          <Timeline>
            <Timeline.Item title="Template gallery spike" description="+18% sessions" status="complete" />
            <Timeline.Item title="Watching onboarding funnel" status="active" />
          </Timeline>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "billing",
    title: "Billing page",
    description: "Plan summary and invoice DataGrid for account billing.",
    layout: "sidebar",
    demoPath: "/templates/billing",
    filename: "BillingPage.tsx",
    code: `import { Badge, Button, DataGrid, PageLayout, Typography } from "asriui";
import "asriui/style.css";

const INVOICES = [
  { id: "inv_204", date: "Mar 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "inv_203", date: "Feb 1, 2026", amount: "$49.00", status: "Paid" },
];

export function BillingPage() {
  return (
    <PageLayout variant="sidebar" sidebarWidth={248}>
      <PageLayout.Main>
        <PageLayout.Content maxWidth="56rem">
          <Typography variant="h2">Billing</Typography>
          <article style={{ border: "1px solid var(--asriui-color-border)", borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <Badge>Pro</Badge>
            <Typography variant="h3">$49 / month</Typography>
            <Button size="sm">Upgrade plan</Button>
          </article>
          <DataGrid
            columns={[
              { id: "id", header: "Invoice", accessor: "id" },
              { id: "date", header: "Date", accessor: "date" },
              { id: "amount", header: "Amount", accessor: "amount", align: "right" },
              { id: "status", header: "Status", accessor: "status" },
            ]}
            rows={INVOICES}
            getRowId={(row) => row.id}
            height={220}
          />
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "team",
    title: "Team page",
    description: "Member directory with roles and invite action.",
    layout: "sidebar",
    demoPath: "/templates/team",
    filename: "TeamPage.tsx",
    code: `import { Badge, Button, List, ListItem, PageLayout, Typography } from "asriui";
import "asriui/style.css";

const MEMBERS = [
  { id: "1", name: "Ava Chen", role: "Owner", status: "Active" },
  { id: "2", name: "Marcus Lee", role: "Admin", status: "Active" },
];

export function TeamPage() {
  return (
    <PageLayout variant="sidebar" sidebarWidth={248}>
      <PageLayout.Main>
        <PageLayout.Content maxWidth="52rem">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <Typography variant="h2">Team</Typography>
            <Button>Invite member</Button>
          </div>
          <List>
            {MEMBERS.map((member) => (
              <ListItem
                key={member.id}
                title={member.name}
                description={member.role}
                trailing={<Badge variant="secondary">{member.status}</Badge>}
              />
            ))}
          </List>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "onboarding",
    title: "Onboarding page",
    description: "Multi-step workspace setup with Form schemas.",
    layout: "centered",
    demoPath: "/templates/onboarding",
    filename: "OnboardingPage.tsx",
    code: `import { useState } from "react";
import { Badge, Form, PageLayout, Typography } from "asriui";
import "asriui/style.css";

const STEPS = ["Workspace", "Profile", "Invite"];

export function OnboardingPage() {
  const [step, setStep] = useState(0);

  return (
    <PageLayout variant="centered" contentMaxWidth="36rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Badge variant="secondary">Step {step + 1} of {STEPS.length}</Badge>
          <Typography variant="h2">{STEPS[step]}</Typography>
          <Form
            config={{
              submitLabel: step === 2 ? "Finish" : "Continue",
              fields: [{ name: "value", type: "text", label: STEPS[step], required: true }],
            }}
            onSubmit={async () => setStep((value) => Math.min(value + 1, 2))}
          />
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "json-page",
    title: "JSON Page builder",
    description: "Render a full screen from a serializable PageConfig.",
    layout: "sidebar",
    demoPath: "/templates/json-page",
    filename: "JsonPageDemo.tsx",
    code: `import { Page } from "asriui/page";
import "asriui/style.css";

const config = {
  layout: { variant: "sidebar", sidebarWidth: 248 },
  sidebar: {
    title: "Console",
    items: [{ id: "overview", label: "Overview", icon: "grid", active: true }],
  },
  header: { title: "Overview", description: "Built from JSON." },
  blocks: [
    {
      id: "kpis",
      type: "stats",
      items: [
        { label: "Revenue", value: "$48.2k" },
        { label: "Users", value: "3,842" },
      ],
    },
  ],
};

export function JsonPageDemo() {
  return <Page config={config} />;
}`,
  },
  {
    slug: "ai-workflow",
    title: "AI workflow builder",
    description: "n8n-style canvas with templates, AsriUI blocks, scripts, and run preview.",
    layout: "centered",
    demoPath: "/templates/ai-workflow",
    filename: "AiWorkflowPage.tsx",
    code: `import { AiWorkflowBuilder } from "asriui/ai-workflow-builder";
import { PageLayout } from "asriui/page-layout";
import "asriui/style.css";

export function AiWorkflowPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="72rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <AiWorkflowBuilder
            templateId="omnichannel-notify"
            height={560}
            executeOnRun
            runInput={{ event: "order.shipped", channel: "whatsapp" }}
            onRun={({ nodes, edges, result }) => {
              console.log({ nodes, edges, result });
            }}
          />
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
  {
    slug: "ai-orchestrator",
    title: "AI orchestrator",
    description: "Summarizer, data analyst, form filler, semantic search, and multi-step pipeline in one shell.",
    layout: "centered",
    demoPath: "/templates/ai-orchestrator",
    filename: "AiOrchestratorPage.tsx",
    code: `import { AiOrchestrator } from "asriui/ai-orchestrator";
import { PageLayout } from "asriui/page-layout";
import "asriui/style.css";

const CORPUS = [
  { id: "1", title: "Theming", description: "CSS variables and dark mode", tags: ["docs"] },
];

export function AiOrchestratorPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="72rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <AiOrchestrator searchItems={CORPUS} onRunPipeline={(input) => console.log(input)} />
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,
  },
];
