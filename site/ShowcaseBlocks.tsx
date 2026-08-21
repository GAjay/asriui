import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CodeBlock,
  Dialog,
  Input,
  Label,
  Loader,
  SideNav,
  Skeleton,
  Switch,
  Tabs,
} from "../src";
import styles from "./ShowcaseBlocks.module.css";

const TAG_SLUGS: Record<string, string> = {
  Input: "input",
  Label: "label",
  Switch: "switch",
  Dialog: "dialog",
  Button: "button",
  Tabs: "tabs",
  Badge: "badge",
  Card: "card",
  ListItem: "list-item",
  SideNav: "side-nav",
  PageLayout: "page-layout",
  CodeBlock: "code-block",
  Loader: "loader",
  Timeline: "timeline",
  Skeleton: "skeleton",
  Form: "form",
  VirtualList: "virtual-list",
};

type Block = {
  title: string;
  description: string;
  tags: string[];
  preview: ReactNode;
};

export function ShowcaseBlocks() {
  const [notifications, setNotifications] = useState(true);

  const blocks: Block[] = useMemo(
    () => [
      {
        title: "Forms & validation",
        description:
          "Inputs wire up labels, helpers, and errors automatically. Build entire forms from JSON config — no Formik required.",
        tags: ["Input", "Label", "Switch", "Form"],
        preview: (
          <div className={styles.stack}>
            <Input label="Email" placeholder="you@company.com" />
            <div className={styles.row}>
              <Switch
                id="notify"
                checked={notifications}
                onCheckedChange={setNotifications}
                aria-labelledby="notify-label"
              />
              <Label id="notify-label" htmlFor="notify">
                Email alerts
              </Label>
            </div>
          </div>
        ),
      },
      {
        title: "Overlays & feedback",
        description:
          "Portaled dialogs with focus trap and escape dismiss. Loader spinners, skeleton placeholders, and status badges.",
        tags: ["Dialog", "Button", "Loader", "Skeleton", "Badge"],
        preview: (
          <div className={styles.stack}>
            <div className={styles.badgeRow}>
              <Badge className={styles.chip}>Live</Badge>
              <Badge variant="outline" className={styles.chip}>
                Syncing
              </Badge>
            </div>
            <div className={styles.row}>
              <Loader variant="spinner" size="sm" />
              <Skeleton variant="text" width="60%" />
            </div>
            <Dialog>
              <Dialog.Trigger className={styles.dialogTrigger}>Open dialog</Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Close />
                <Dialog.Header>
                  <Dialog.Title>Confirm action</Dialog.Title>
                  <Dialog.Description>This cannot be undone.</Dialog.Description>
                </Dialog.Header>
                <Dialog.Footer>
                  <Dialog.Close>Cancel</Dialog.Close>
                  <Button size="sm">Confirm</Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog>
          </div>
        ),
      },
      {
        title: "Navigation & layout",
        description:
          "Tabs, SideNav with left-border active states, and PageLayout presets for docs sites and dashboards.",
        tags: ["Tabs", "SideNav", "PageLayout"],
        preview: (
          <div className={styles.stack}>
            <div className={styles.miniNav}>
              <SideNav>
                <SideNav.List>
                  <SideNav.Item>
                    <SideNav.Link href="#" active>
                      Overview
                    </SideNav.Link>
                  </SideNav.Item>
                  <SideNav.Item>
                    <SideNav.Link href="#">API</SideNav.Link>
                  </SideNav.Item>
                </SideNav.List>
              </SideNav>
            </div>
            <Tabs defaultValue="overview">
              <Tabs.List>
                <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="overview">418.2K visitors</Tabs.Content>
              <Tabs.Content value="reports">Export ready</Tabs.Content>
            </Tabs>
          </div>
        ),
      },
      {
        title: "Docs & code",
        description:
          "VS Code–style CodeBlock for snippets, compound Cards, and a full documentation site included.",
        tags: ["CodeBlock", "Card", "Button"],
        preview: (
          <div className={styles.stack}>
            <CodeBlock
              code={`import { Button } from "asriui/button";`}
              showCopy
              filename="App.tsx"
            />
            <Card>
              <Card.Header>
                <Card.Title>Pro plan</Card.Title>
              </Card.Header>
              <Card.Content>
                <p className={styles.balance}>$29/mo</p>
              </Card.Content>
            </Card>
          </div>
        ),
      },
    ],
    [notifications],
  );

  return (
    <div className={styles.grid}>
      {blocks.map((block) => (
        <article key={block.title} className={styles.card}>
          <div className={styles.preview}>{block.preview}</div>
          <div className={styles.body}>
            <h3>{block.title}</h3>
            <p>{block.description}</p>
            <div className={styles.tags}>
              {block.tags.map((tag) => (
                <Link
                  key={tag}
                  className={styles.tag}
                  to={`/docs/components/${TAG_SLUGS[tag] ?? tag.toLowerCase()}`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export type { Block };
