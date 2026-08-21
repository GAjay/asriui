import type { PageConfig } from "./Page.types";

/** Example contact page — centered layout + form. */
export const EXAMPLE_CONTACT_PAGE: PageConfig = {
  id: "contact-page",
  layout: { variant: "centered", contentMaxWidth: "36rem" },
  header: {
    badge: "Support",
    title: "Contact us",
    description: "Tell us what you need — we reply within one business day.",
  },
  blocks: [
    {
      id: "contact-form",
      type: "form",
      config: {
        submitLabel: "Send message",
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
              { label: "Partnerships", value: "partnerships" },
            ],
          },
          {
            name: "message",
            type: "textarea",
            label: "Message",
            required: true,
            minLength: 12,
            placeholder: "How can we help?",
          },
        ],
      },
    },
  ],
};

/** Example dashboard page — sidebar + stats + table. */
export const EXAMPLE_DASHBOARD_PAGE: PageConfig = {
  id: "dashboard-page",
  layout: { variant: "sidebar", sidebarWidth: 248, contentMaxWidth: "72rem" },
  sidebar: {
    title: "Console",
    subtitle: "Operations",
    items: [
      { id: "overview", label: "Overview", icon: "grid", active: true },
      { id: "orders", label: "Orders", icon: "package" },
      { id: "customers", label: "Customers", icon: "accessibility" },
    ],
  },
  header: {
    badge: "Admin",
    title: "Overview",
    description: "Ship pages from JSON — layout, stats, and tables included.",
    actions: [
      { id: "export", label: "Export", variant: "outline" },
      { id: "new-report", label: "New report", variant: "primary" },
    ],
  },
  blocks: [
    {
      id: "kpis",
      type: "stats",
      columns: 4,
      items: [
        { label: "Revenue", value: "$48.2k", hint: "+12.4% vs last month" },
        { label: "Active users", value: "3,842", hint: "+6.1%" },
        { label: "Orders", value: "1,204", hint: "+3.8%" },
        { label: "Conversion", value: "4.7%", hint: "+0.6 pts" },
      ],
    },
    {
      id: "orders-table",
      type: "table",
      caption: "Recent orders",
      columns: [
        { id: "customer", header: "Customer" },
        { id: "plan", header: "Plan" },
        { id: "amount", header: "Amount" },
        { id: "status", header: "Status" },
      ],
      rows: [
        { customer: "Northwind Labs", plan: "Pro", amount: "$24.00", status: "Paid" },
        { customer: "Acme Studio", plan: "Enterprise", amount: "$899.00", status: "Paid" },
        { customer: "Pixel Foundry", plan: "Pro", amount: "$24.00", status: "Pending" },
      ],
    },
    {
      id: "activity",
      type: "timeline",
      items: [
        {
          id: "1",
          title: "New Pro subscription",
          description: "Northwind Labs upgraded from Starter.",
          status: "complete",
        },
        {
          id: "2",
          title: "Usage spike detected",
          description: "Acme Studio crossed 80% of monthly quota.",
          status: "active",
        },
      ],
    },
  ],
};
