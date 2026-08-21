import { Badge, Button, Icon, List, ListItem, PageLayout, SideNav, Typography, toast } from "axiom-ui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

const MEMBERS = [
  { id: "u1", name: "Ava Chen", role: "Owner", email: "ava@acme.dev", status: "Active" },
  { id: "u2", name: "Marcus Lee", role: "Admin", email: "marcus@acme.dev", status: "Active" },
  { id: "u3", name: "Priya Shah", role: "Developer", email: "priya@acme.dev", status: "Active" },
  { id: "u4", name: "Jordan Blake", role: "Viewer", email: "jordan@acme.dev", status: "Invited" },
];

export function TeamPage() {
  return (
    <PageLayout variant="sidebar" sidebarWidth={248}>
      <PageLayout.Sidebar>
        <SideNav aria-label="Team navigation">
          <SideNav.Header>
            <Typography variant="h4">Workspace</Typography>
            <Typography variant="muted">People</Typography>
          </SideNav.Header>
          <SideNav.List>
            <SideNav.Item>
              <SideNav.Link href="#" active icon={<Icon name="accessibility" size="sm" />}>
                Members
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="form" size="sm" />}>
                Roles
              </SideNav.Link>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Link href="#" icon={<Icon name="package" size="sm" />}>
                Groups
              </SideNav.Link>
            </SideNav.Item>
          </SideNav.List>
        </SideNav>
      </PageLayout.Sidebar>
      <PageLayout.Main>
        <PageLayout.Content maxWidth="52rem">
          <TemplateDemoShell title="Team page">
            <header className={styles.dashboardHeader}>
              <div>
                <Badge variant="secondary">Admin</Badge>
                <h1 className={styles.dashboardTitle}>Team</h1>
                <Typography variant="muted">Invite teammates and manage roles with ListItem rows.</Typography>
              </div>
              <div className={styles.dashboardActions}>
                <Button
                  onClick={() =>
                    toast.success("Invite sent", { description: "jordan@acme.dev can join for 7 days." })
                  }
                >
                  Invite member
                </Button>
              </div>
            </header>

            <section className={styles.panel}>
              <div className={styles.teamToolbar}>
                <h2 className={styles.panelTitle}>Members · {MEMBERS.length}</h2>
                <Badge variant="outline">4 seats used</Badge>
              </div>
              <List>
                {MEMBERS.map((member) => (
                  <ListItem
                    key={member.id}
                    title={member.name}
                    description={`${member.email} · ${member.role}`}
                    media={
                      <span className={styles.teamAvatar} aria-hidden="true">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </span>
                    }
                    trailing={
                      <Badge variant={member.status === "Active" ? "secondary" : "outline"}>
                        {member.status}
                      </Badge>
                    }
                  />
                ))}
              </List>
            </section>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
