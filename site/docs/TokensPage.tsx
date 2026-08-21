import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, CodeBlock, ColorPalette } from "axiom-ui";
import { useSiteTheme } from "../useSiteTheme";
import { DocPageShell } from "./DocPageShell";
import styles from "./GuidesPage.module.css";
import tokenStyles from "./TokensPage.module.css";
import {
  BREAKPOINT_TOKENS,
  COLOR_GROUPS,
  MOTION_TOKENS,
  RADIUS_TOKENS,
  SHADOW_TOKENS,
  SPACING_TOKENS,
  TOKEN_FILES,
  TYPOGRAPHY_TOKENS,
  Z_INDEX_TOKENS,
} from "./tokenData";

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "colors", label: "Colors" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Radius" },
  { id: "shadows", label: "Shadows" },
  { id: "type", label: "Typography" },
  { id: "motion", label: "Motion" },
  { id: "z-index", label: "Z-index" },
  { id: "breakpoints", label: "Breakpoints" },
  { id: "usage", label: "Using tokens" },
] as const;

const IMPORT_CODE = `import "axiom-ui/style.css";

/* Tokens are CSS custom properties on :root and [data-theme]. */`;

const USAGE_CODE = `.panel {
  padding: var(--axiom-space-4);
  border: 1px solid var(--axiom-color-border);
  border-radius: var(--axiom-radius-lg);
  background: var(--axiom-color-background);
  color: var(--axiom-color-foreground);
  box-shadow: var(--axiom-shadow-sm);
  font-family: var(--axiom-font-family);
  transition: box-shadow var(--axiom-duration-normal) var(--axiom-easing-standard);
}`;

const OVERRIDE_CODE = `/* Default palette is monochrome zinc — override on :root / [data-theme] to rebrand. */
:root,
[data-theme="light"] {
  --axiom-color-primary: #18181b;
  --axiom-color-primary-hover: #27272a;
  --axiom-color-primary-foreground: #ffffff;
  --axiom-color-ring: #18181b;
}

[data-theme="dark"] {
  --axiom-color-primary: #fafafa;
  --axiom-color-primary-hover: #e4e4e7;
  --axiom-color-primary-foreground: #09090b;
  --axiom-color-ring: #fafafa;
}`;

const BREAKPOINT_CODE = `@media (min-width: 768px) {
  .sidebar {
  /* or: min-width: var(--axiom-breakpoint-md) */
    display: block;
  }
}`;

function ColorSwatch({ value }: { value: string }) {
  return (
    <span className={tokenStyles.valueCell}>
      <i style={{ background: value }} aria-hidden="true" />
      <span>{value}</span>
    </span>
  );
}

/**
 * Design tokens guide — mirrors src/tokens/* exactly.
 */
export function TokensPage() {
  const navigate = useNavigate();
  const { theme } = useSiteTheme();
  const activeShadowTheme = theme === "dark" ? "dark" : "light";

  return (
    <DocPageShell toc={TOC.map((item) => ({ ...item }))}>
      <article className={styles.page}>
        <Breadcrumb
          className={styles.breadcrumb}
          showBack
          onBack={() => navigate("/docs/getting-started")}
          items={[
            { label: "Docs", href: "/docs/getting-started" },
            { label: "Guides", href: "/docs/tokens" },
            { label: "Tokens", current: true },
          ]}
        />

        <header className={styles.header}>
          <p className={styles.kicker}>Guides</p>
          <h1 className={styles.title}>Tokens</h1>
          <p className={styles.lead}>
            AxiomUI ships a zinc monochrome palette as CSS custom properties in{" "}
            <code>src/tokens/</code>. Import <code>axiom-ui/style.css</code> once — components,
            templates, and your own CSS Modules all read the same variables.
          </p>
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>src/tokens/*</span>
            <span className={styles.metaBadge}>data-theme light / dark</span>
            <span className={styles.metaBadge}>Active theme · {theme}</span>
          </div>
        </header>

        <section className={styles.section} id="overview">
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p className={styles.prose}>
            Token files are composed in <code>src/tokens/index.css</code>. Light colors and shadows
            live on <code>:root</code> and <code>[data-theme=&quot;light&quot;]</code>; dark overrides
            are scoped to <code>[data-theme=&quot;dark&quot;]</code> in <code>themes.css</code>.
            Spacing, radius, typography, motion, z-index, and breakpoints are theme-agnostic.
          </p>
          <CodeBlock code={IMPORT_CODE} language="tsx" showCopy filename="main.tsx" />

          <div className={tokenStyles.fileList}>
            {TOKEN_FILES.map((entry) => (
              <div key={entry.file} className={tokenStyles.fileCard}>
                <div className={tokenStyles.fileHead}>
                  <code>{entry.file}</code>
                  <span className={tokenStyles.fileScope}>{entry.scope}</span>
                </div>
                <p>{entry.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="colors">
          <h2 className={styles.sectionTitle}>Colors</h2>
          <p className={styles.prose}>
            Defaults from <code>colors.css</code> with dark overrides in <code>themes.css</code>.
            Primary is near-black on light surfaces and near-white on dark — not a separate accent hue.
          </p>

          <div className={tokenStyles.paletteWrap}>
            <p className={tokenStyles.previewLabel}>Live swatches · {theme} theme</p>
            <ColorPalette columns={4} />
          </div>

          <div className={tokenStyles.tableWrap}>
            {COLOR_GROUPS.map((group) => (
              <div key={group.group} className={tokenStyles.tableBlock}>
                <h3 className={tokenStyles.tableHeading}>{group.group}</h3>
                <div className={tokenStyles.table} role="table" aria-label={`${group.group} color tokens`}>
                  <div className={tokenStyles.tableHead} role="row">
                    <span role="columnheader">Token</span>
                    <span role="columnheader">Light</span>
                    <span role="columnheader">Dark</span>
                  </div>
                  {group.items.map((row) => (
                    <div key={row.token} className={tokenStyles.tableRow} role="row">
                      <code role="cell">{row.token}</code>
                      <ColorSwatch value={row.light} />
                      <ColorSwatch value={row.dark} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="spacing">
          <h2 className={styles.sectionTitle}>Spacing</h2>
          <p className={styles.prose}>
            4px base scale from <code>spacing.css</code>. Use for padding, gaps, and layout rhythm.
          </p>
          <div className={tokenStyles.spaceList}>
            {SPACING_TOKENS.map((item) => (
              <div key={item.token} className={tokenStyles.spaceRow}>
                <code>{item.token}</code>
                <span className={tokenStyles.meta}>{item.value}</span>
                <span
                  className={tokenStyles.spaceBar}
                  style={{ width: item.value === "0" ? 0 : `var(${item.token})` }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="radius">
          <h2 className={styles.sectionTitle}>Radius</h2>
          <p className={styles.prose}>
            Corner radii from <code>radius.css</code>. Button and Card components map{" "}
            <code>none | sm | md | lg | full</code> props to these tokens.
          </p>
          <div className={tokenStyles.radiusGrid}>
            {RADIUS_TOKENS.map((item) => (
              <div key={item.token} className={tokenStyles.radiusCard}>
                <span
                  className={tokenStyles.radiusShape}
                  style={{ borderRadius: `var(${item.token})` }}
                  aria-hidden="true"
                />
                <code>{item.token}</code>
                <span className={tokenStyles.meta}>{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="shadows">
          <h2 className={styles.sectionTitle}>Shadows</h2>
          <p className={styles.prose}>
            Light shadows ship in <code>shadows.css</code>; dark theme uses deeper values from{" "}
            <code>themes.css</code>. <code>--axiom-shadow-focus</code> is the default focus ring glow.
          </p>

          <div className={tokenStyles.shadowGrid}>
            {SHADOW_TOKENS.map((item) => (
              <div
                key={item.token}
                className={tokenStyles.shadowCard}
                style={{ boxShadow: activeShadowTheme === "dark" ? item.dark : item.light }}
              >
                <strong>{item.label}</strong>
                <code>{item.token}</code>
              </div>
            ))}
          </div>

          <div className={tokenStyles.tableWrap}>
            <div className={tokenStyles.tableBlock}>
              <h3 className={tokenStyles.tableHeading}>Shadow values</h3>
              <div className={tokenStyles.table} role="table" aria-label="Shadow token values">
                <div className={tokenStyles.tableHead} role="row">
                  <span role="columnheader">Token</span>
                  <span role="columnheader">Light</span>
                  <span role="columnheader">Dark</span>
                </div>
                {SHADOW_TOKENS.map((row) => (
                  <div key={row.token} className={tokenStyles.tableRowShadow} role="row">
                    <code role="cell">{row.token}</code>
                    <span role="cell" className={tokenStyles.shadowValue}>
                      {row.light}
                    </span>
                    <span role="cell" className={tokenStyles.shadowValue}>
                      {row.dark}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="type">
          <h2 className={styles.sectionTitle}>Typography</h2>
          <p className={styles.prose}>
            Families, sizes, weights, leading, and tracking from <code>typography.css</code>. See the{" "}
            <Link to="/docs/typography">Typography guide</Link> for specimens and{" "}
            <code>AxiomProvider</code> font setup.
          </p>
          <div className={tokenStyles.kvList}>
            {TYPOGRAPHY_TOKENS.map((row) => (
              <div key={row.token} className={tokenStyles.kvRow}>
                <code>{row.token}</code>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="motion">
          <h2 className={styles.sectionTitle}>Motion</h2>
          <p className={styles.prose}>
            Durations and easing curves from <code>transitions.css</code> — used by interactive
            components and theme transitions.
          </p>
          <div className={tokenStyles.kvList}>
            {MOTION_TOKENS.map((row) => (
              <div key={row.token} className={tokenStyles.kvRow}>
                <code>{row.token}</code>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="z-index">
          <h2 className={styles.sectionTitle}>Z-index</h2>
          <p className={styles.prose}>
            Stacking order from <code>z-index.css</code>. Dialog, Toast, Tooltip, and Menu layers
            use these values so overlays never fight each other.
          </p>
          <div className={tokenStyles.zStack}>
            {Z_INDEX_TOKENS.map((row) => (
              <div key={row.token} className={tokenStyles.zRow}>
                <code>{row.token}</code>
                <span className={tokenStyles.meta}>{row.value}</span>
                <span
                  className={tokenStyles.zBar}
                  style={{ width: `${Math.max(12, Number(row.value) / 18)}%` }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="breakpoints">
          <h2 className={styles.sectionTitle}>Breakpoints</h2>
          <p className={styles.prose}>
            Width tokens from <code>breakpoints.css</code>. Use in media queries or layout logic
            when you need consistent responsive cutoffs.
          </p>
          <div className={tokenStyles.breakpointList}>
            {BREAKPOINT_TOKENS.map((row) => (
              <div key={row.token} className={tokenStyles.breakpointRow}>
                <code>{row.token}</code>
                <span className={tokenStyles.meta}>{row.value}</span>
              </div>
            ))}
          </div>
          <CodeBlock code={BREAKPOINT_CODE} language="tsx" showCopy filename="Layout.module.css" />
        </section>

        <section className={styles.section} id="usage">
          <h2 className={styles.sectionTitle}>Using tokens</h2>
          <p className={styles.prose}>
            Reference tokens in CSS Modules so custom UI matches Axiom components. Override on{" "}
            <code>:root</code> or <code>[data-theme]</code> to rebrand without forking primitives.
          </p>
          <div className={tokenStyles.codeStack}>
            <CodeBlock code={USAGE_CODE} language="tsx" showCopy filename="Panel.module.css" />
            <CodeBlock code={OVERRIDE_CODE} language="tsx" showCopy filename="brand.css" />
          </div>
        </section>
      </article>
    </DocPageShell>
  );
}
