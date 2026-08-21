import { Badge, Button, Form, Icon, PageLayout, SideNav, Switch, Tabs, Typography, toast } from "axiom-ui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

const PROFILE_FORM = {
  submitLabel: "Save changes",
  fields: [
    { name: "name", type: "text" as const, label: "Display name", required: true },
    { name: "email", type: "email" as const, label: "Email", required: true },
    {
      name: "timezone",
      type: "select" as const,
      label: "Timezone",
      required: true,
      options: [
        { label: "Pacific Time (PT)", value: "pt" },
        { label: "Eastern Time (ET)", value: "et" },
        { label: "UTC", value: "utc" },
      ],
    },
    {
      name: "bio",
      type: "textarea" as const,
      label: "Bio",
      required: false,
      placeholder: "Short intro for your profile…",
    },
  ],
};

export function SettingsPage() {
  return (
    <PageLayout variant="sidebar" sidebarWidth={248}>
      <PageLayout.Sidebar>
        <SideNav aria-label="Settings navigation">
          <SideNav.Header>
            <Typography variant="h4">Account</Typography>
            <Typography variant="muted">Settings</Typography>
          </SideNav.Header>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" active icon={<Icon name="form" size="sm" />}>
                Profile
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="sparkles" size="sm" />}>
                Notifications
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="package" size="sm" />}>
                Billing
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="accessibility" size="sm" />}>
                Security
              </SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav>
      </PageLayout.Sidebar>
      <PageLayout.Main>
        <PageLayout.Content maxWidth="48rem">
          <TemplateDemoShell title="Settings page">
            <header className={styles.dashboardHeader}>
              <div>
                <Badge variant="secondary">Account</Badge>
                <h1 className={styles.dashboardTitle}>Settings</h1>
                <Typography variant="muted">
                  Tabs, Form, Switch, and SideNav — the usual SaaS account surface.
                </Typography>
              </div>
            </header>

            <Tabs defaultValue="profile">
              <Tabs.List>
                <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
                <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
                <Tabs.Trigger value="danger">Danger zone</Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="profile" className={styles.settingsPanel}>
                <Typography variant="h3">Profile</Typography>
                <Typography variant="muted">Update how you appear across the product.</Typography>
                <Form
                  config={PROFILE_FORM}
                  initialValues={{
                    name: "Alex Chen",
                    email: "alex@axiom-ui.dev",
                    timezone: "pt",
                    bio: "Design systems & product engineering.",
                  }}
                  onSubmit={async () => {
                    toast.success("Profile saved");
                  }}
                />
              </Tabs.Content>

              <Tabs.Content value="notifications" className={styles.settingsPanel}>
                <Typography variant="h3">Notifications</Typography>
                <div className={styles.switchStack}>
                  <div className={styles.switchRow}>
                    <span>
                      <strong>Product updates</strong>
                      <Typography variant="muted">Release notes and new template alerts.</Typography>
                    </span>
                    <Switch defaultChecked aria-label="Product updates" />
                  </div>
                  <div className={styles.switchRow}>
                    <span>
                      <strong>Marketing email</strong>
                      <Typography variant="muted">Occasional tips and case studies.</Typography>
                    </span>
                    <Switch aria-label="Marketing email" />
                  </div>
                  <div className={styles.switchRow}>
                    <span>
                      <strong>Security alerts</strong>
                      <Typography variant="muted">Sign-in from new devices and API key changes.</Typography>
                    </span>
                    <Switch defaultChecked aria-label="Security alerts" />
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="danger" className={styles.settingsPanel}>
                <div className={styles.dangerCard}>
                  <Typography variant="h3">Delete account</Typography>
                  <Typography variant="muted">
                    Permanently remove your workspace data. This demo only shows the UI pattern.
                  </Typography>
                  <Button
                    variant="danger"
                    onClick={() => toast.error("Blocked in demo", { description: "No data was deleted." })}
                  >
                    Delete account
                  </Button>
                </div>
              </Tabs.Content>
            </Tabs>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
