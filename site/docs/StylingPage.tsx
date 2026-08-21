import { useNavigate } from "react-router-dom";
import { Breadcrumb, CodeBlock } from "asriui";
import { DocPageShell } from "./DocPageShell";
import styles from "./GuidesPage.module.css";

const TOC = [
  { id: "introduction", label: "Introduction" },
  { id: "what-you-get", label: "What you get" },
  { id: "overriding", label: "Overriding styles" },
  { id: "tokens", label: "Design tokens" },
  { id: "custom-components", label: "Custom components" },
  { id: "common-issues", label: "Common issues" },
] as const;

const TOKEN_CODE = `:root,
[data-theme="light"] {
  --asriui-color-background: #ffffff;
  --asriui-color-foreground: #09090b;
  --asriui-color-primary: #18181b;
  --asriui-radius-md: 0.5rem;
}

[data-theme="dark"] {
  --asriui-color-background: #09090b;
  --asriui-color-foreground: #fafafa;
}`;

const OVERRIDE_CODE = `import { Button } from "asriui/button";
import styles from "./SaveBar.module.css";

export function SaveBar() {
  return (
    <div className={styles.bar}>
      <Button className={styles.primary} size="sm">
        Save changes
      </Button>
    </div>
  );
}`;

const CUSTOM_CODE = `import { cn } from "asriui/utils";
import styles from "./Panel.module.css";

export function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={cn(styles.panel, className)}>{children}</section>;
}

/* Panel.module.css — reuse AsriUI tokens */
.panel {
  padding: var(--asriui-space-4);
  border: 1px solid var(--asriui-color-border);
  border-radius: var(--asriui-radius-lg);
  background: var(--asriui-color-background);
  color: var(--asriui-color-foreground);
}`;

/**
 * Styling guide — inspired by Radix Themes styling docs.
 * @see https://www.radix-ui.com/themes/docs/overview/styling
 */
export function StylingPage() {
  const navigate = useNavigate();

  return (
    <DocPageShell toc={TOC.map((item) => ({ ...item }))}>
      <article className={styles.page}>
        <Breadcrumb
          className={styles.breadcrumb}
          showBack
          onBack={() => navigate("/docs/getting-started")}
          items={[
            { label: "Docs", href: "/docs/getting-started" },
            { label: "Guides", href: "/docs/styling" },
            { label: "Styling", current: true },
          ]}
        />

        <header className={styles.header}>
          <p className={styles.kicker}>Guides</p>
          <h1 className={styles.title}>Styling</h1>
          <p className={styles.lead}>
            How to approach styling with AsriUI — CSS Modules, design tokens, and when to build
            custom components instead of fighting overrides.
          </p>
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>CSS Modules</span>
            <span className={styles.metaBadge}>Design tokens</span>
            <span className={styles.metaBadge}>No CSS-in-JS runtime</span>
          </div>
        </header>

        <section className={styles.section} id="introduction">
          <h2 className={styles.sectionTitle}>Introduction</h2>
          <p className={styles.prose}>
            AsriUI does not ship a <code>css</code> or <code>sx</code> prop and does not depend on a styling
            library at runtime. Components are built with vanilla CSS Modules. You pick the styling
            stack for your app — Tailwind, plain CSS, or Modules — without fighting an embedded system.
          </p>
          <p className={styles.prose}>
            Import styles once at your app entry: <code>import &quot;asriui/style.css&quot;</code>.
          </p>
        </section>

        <section className={styles.section} id="what-you-get">
          <h2 className={styles.sectionTitle}>What you get</h2>
          <p className={styles.prose}>
            Components are intentionally closed: they expose props and theme tokens rather than every
            internal class. You also get the same CSS custom properties that power the kit, so custom
            UI can feel native to AsriUI.
          </p>
          <ul className={styles.changeList}>
            <li>Tokenized color, space, radius, shadow, and typography variables</li>
            <li>
              <code>className</code> and <code>style</code> on most components for light composition
            </li>
            <li>Light and dark themes via <code>data-theme</code> (see the Theme guide)</li>
          </ul>
        </section>

        <section className={styles.section} id="overriding">
          <h2 className={styles.sectionTitle}>Overriding styles</h2>
          <p className={styles.prose}>
            Prefer props and tokens first. If you find yourself overriding many internals, that is a
            signal to compose a custom component with the same tokens — not to pierce deep selectors.
          </p>
          <CodeBlock code={OVERRIDE_CODE} language="tsx" showCopy filename="SaveBar.tsx" />
          <p className={styles.prose}>
            Good defaults: use existing variants and sizes, tweak tokens at the theme root, or wrap
            primitives. Avoid targeting generated CSS Module hashes.
          </p>
        </section>

        <section className={styles.section} id="tokens">
          <h2 className={styles.sectionTitle}>Design tokens</h2>
          <p className={styles.prose}>
            Override tokens on <code>:root</code> / <code>[data-theme]</code> to rebrand the whole kit.
            Token changes are treated as breaking when names are removed or renamed.
          </p>
          <CodeBlock code={TOKEN_CODE} language="tsx" showCopy filename="theme.css" />
        </section>

        <section className={styles.section} id="custom-components">
          <h2 className={styles.sectionTitle}>Custom components</h2>
          <p className={styles.prose}>
            Build product-specific UI with the same building blocks AsriUI uses: tokens,{" "}
            <code>cn()</code> for class merges, and layout primitives like{" "}
            <code>Container</code>, <code>Flex</code>, and <code>Grid</code>.
          </p>
          <CodeBlock code={CUSTOM_CODE} language="tsx" showCopy filename="Panel.tsx" />
        </section>

        <section className={styles.section} id="common-issues">
          <h2 className={styles.sectionTitle}>Common issues</h2>
          <h3 className={styles.releaseVersion} style={{ fontSize: "1.05rem" }}>
            Portals and theme tokens
          </h3>
          <p className={styles.prose}>
            Content rendered in a portal still inherits <code>data-theme</code> from{" "}
            <code>document.documentElement</code>. Keep theme on the root (via{" "}
            <code>AsriUIProvider</code> or <code>ThemeSwitch</code>) so overlays stay consistent.
          </p>
          <h3 className={styles.releaseVersion} style={{ fontSize: "1.05rem" }}>
            CSS import order
          </h3>
          <p className={styles.prose}>
            Import <code>asriui/style.css</code> before your app CSS so your rules can override
            tokens and utility classes predictably. If a framework reorders CSS in production, merge
            imports or use layers.
          </p>
          <h3 className={styles.releaseVersion} style={{ fontSize: "1.05rem" }}>
            Tailwind preflight
          </h3>
          <p className={styles.prose}>
            Tailwind base resets can strip button backgrounds. Prefer separate CSS layers, skip{" "}
            <code>@tailwind base</code> where it conflicts, or re-assert AsriUI button tokens after
            preflight.
          </p>
        </section>
      </article>
    </DocPageShell>
  );
}
