import { useState } from "react";
import { Button } from "../src/components/Button";
import { Card } from "../src/components/Card";
import { Input } from "../src/components/Input";
import { List, ListItem } from "../src/components/ListItem";
import styles from "./HeroShowcase.module.css";

const SIDEBAR_SECTIONS = [
  {
    label: "Overview",
    items: ["Analytics", "Transactions", "Accounts"],
  },
  {
    label: "Components",
    items: ["Button", "Input", "Card", "List"],
  },
  {
    label: "Settings",
    items: ["Profile", "Billing", "Notifications"],
  },
] as const;

export function HeroShowcase() {
  const [active, setActive] = useState("Button");
  const [email, setEmail] = useState("you@company.com");

  return (
    <div className={styles.frame} role="region" aria-label="Product preview">
      <div className={styles.chrome}>
        <span />
        <span />
        <span />
        <p>Dashboard</p>
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <p className={styles.sidebarBrand}>AxiomUI</p>
          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.label} className={styles.sidebarGroup}>
              <p className={styles.sidebarLabel}>{section.label}</p>
              <ul className={styles.sidebarList}>
                {section.items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className={
                        active === item ? styles.sidebarLinkActive : styles.sidebarLink
                      }
                      onClick={() => setActive(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <div className={styles.main}>
          <div className={styles.toolbar}>
            <div className={styles.chips}>
              <Button size="sm">Primary</Button>
              <Button size="sm" variant="secondary">
                Secondary
              </Button>
              <Button size="sm" variant="outline">
                Outline
              </Button>
            </div>
          </div>

          <Card className={styles.panel}>
            <Card.Header>
              <Card.Title>Workspace access</Card.Title>
            </Card.Header>
            <Card.Content>
              <Input
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                helperText="Invite teammates to your workspace."
              />
              <List aria-label="Quick settings" className={styles.list}>
                <ListItem
                  title="Notifications"
                  description="Email and push alerts"
                  media="N"
                  trailing="On"
                  interactive
                  selected={active === "Notifications"}
                  onClick={() => setActive("Notifications")}
                />
                <ListItem
                  title="Security"
                  description="Password and 2FA"
                  media="S"
                  trailing="›"
                  interactive
                  selected={active === "Security"}
                  onClick={() => setActive("Security")}
                />
              </List>
            </Card.Content>
            <Card.Footer>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button size="sm">Save changes</Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}
