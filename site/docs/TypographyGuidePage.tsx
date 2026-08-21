import { useNavigate } from "react-router-dom";
import { Breadcrumb, CodeBlock, Typography } from "axiom-ui";
import { DocPageShell } from "./DocPageShell";
import styles from "./GuidesPage.module.css";
import guideStyles from "./TypographyGuidePage.module.css";

const TOC = [
  { id: "font-family", label: "Font family" },
  { id: "provider", label: "AxiomProvider" },
  { id: "scale", label: "Type scale" },
  { id: "weights", label: "Weights & leading" },
  { id: "component", label: "Typography component" },
  { id: "custom", label: "Custom fonts" },
] as const;

const FAMILY_CODE = `:root {
  --axiom-font-family: "Work Sans", ui-sans-serif, system-ui, -apple-system,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --axiom-font-family-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo,
    Consolas, monospace;
}`;

const PROVIDER_CODE = `import { AxiomProvider } from "axiom-ui/config";

const config = {
  fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
  theme: "system",
};

export function App() {
  return (
    <AxiomProvider config={config}>
      <YourApp />
    </AxiomProvider>
  );
}`;

const COMPONENT_CODE = `import { Typography } from "axiom-ui/typography";

<>
  <Typography.H1>Page title</Typography.H1>
  <Typography.Lead>Supporting sentence under the title.</Typography.Lead>
  <Typography.P>Body copy uses the sans stack from --axiom-font-family.</Typography.P>
  <Typography.Code>npm install axiom-ui</Typography.Code>
</>`;

const CUSTOM_CSS = `:root {
  --axiom-font-family: "Geist", ui-sans-serif, system-ui, sans-serif;
  --axiom-font-family-mono: "Geist Mono", ui-monospace, monospace;
}

/* Load the face before components render */
@import url("https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap");`;

const SIZES = [
  { token: "--axiom-font-size-xs", value: "0.75rem", sample: "xs · captions" },
  { token: "--axiom-font-size-sm", value: "0.875rem", sample: "sm · labels" },
  { token: "--axiom-font-size-md", value: "1rem", sample: "md · body" },
  { token: "--axiom-font-size-lg", value: "1.125rem", sample: "lg · lead" },
  { token: "--axiom-font-size-xl", value: "1.25rem", sample: "xl · titles" },
  { token: "--axiom-font-size-2xl", value: "1.5rem", sample: "2xl · display" },
] as const;

const WEIGHTS = [
  { token: "--axiom-font-weight-regular", value: "400", weight: 400 },
  { token: "--axiom-font-weight-medium", value: "500", weight: 500 },
  { token: "--axiom-font-weight-semibold", value: "600", weight: 600 },
  { token: "--axiom-font-weight-bold", value: "700", weight: 700 },
] as const;

/**
 * Typography guide — font families, scale, and the Typography component.
 */
export function TypographyGuidePage() {
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
            { label: "Guides", href: "/docs/typography" },
            { label: "Typography", current: true },
          ]}
        />

        <header className={styles.header}>
          <p className={styles.kicker}>Guides</p>
          <h1 className={styles.title}>Typography</h1>
          <p className={styles.lead}>
            AxiomUI uses CSS font tokens for the sans and mono stacks, then maps them into the{" "}
            <code>Typography</code> component. Set the family once — every heading, body, and code
            sample stays consistent.
          </p>
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>Font families</span>
            <span className={styles.metaBadge}>Type scale</span>
            <span className={styles.metaBadge}>axiom-ui/typography</span>
          </div>
        </header>

        <section className={styles.section} id="font-family">
          <h2 className={styles.sectionTitle}>Font family</h2>
          <p className={styles.prose}>
            Two families ship by default. <code>--axiom-font-family</code> is the UI sans stack
            (Work Sans first). <code>--axiom-font-family-mono</code> is for code, keyboard shortcuts,
            and technical labels.
          </p>
          <CodeBlock code={FAMILY_CODE} language="tsx" showCopy filename="typography.css" />

          <div className={guideStyles.specimenGrid}>
            <div className={guideStyles.specimen}>
              <p className={guideStyles.specimenLabel}>Sans · --axiom-font-family</p>
              <p className={guideStyles.specimenSans}>
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className={guideStyles.specimenSans} style={{ fontSize: "1.35rem", fontWeight: 700 }}>
                AxiomUI Design System
              </p>
            </div>
            <div className={guideStyles.specimen}>
              <p className={guideStyles.specimenLabel}>Mono · --axiom-font-family-mono</p>
              <p className={guideStyles.specimenMono}>
                const theme = &quot;dark&quot;;
              </p>
              <p className={guideStyles.specimenMono}>pnpm add axiom-ui framer-motion</p>
            </div>
          </div>
        </section>

        <section className={styles.section} id="provider">
          <h2 className={styles.sectionTitle}>AxiomProvider</h2>
          <p className={styles.prose}>
            Prefer configuring the sans family through <code>AxiomProvider</code>. It writes{" "}
            <code>--axiom-font-family</code> (and the landing <code>--lp-font-sans</code> token) on
            the document root so the whole app updates together.
          </p>
          <CodeBlock code={PROVIDER_CODE} language="tsx" showCopy filename="App.tsx" />
        </section>

        <section className={styles.section} id="scale">
          <h2 className={styles.sectionTitle}>Type scale</h2>
          <p className={styles.prose}>
            Size tokens are rem-based so they respect the user’s browser default. Use them in custom
            CSS or rely on <code>Typography</code> variants that already map to the scale.
          </p>
          <div className={guideStyles.scaleList}>
            {SIZES.map((row) => (
              <div key={row.token} className={guideStyles.scaleRow}>
                <code className={guideStyles.tokenName}>{row.token}</code>
                <span className={guideStyles.tokenValue}>{row.value}</span>
                <span className={guideStyles.scaleSample} style={{ fontSize: `var(${row.token})` }}>
                  {row.sample}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="weights">
          <h2 className={styles.sectionTitle}>Weights &amp; leading</h2>
          <p className={styles.prose}>
            Weight and line-height tokens keep hierarchy consistent across products. Pair tight
            leading with headings and normal/relaxed with body copy.
          </p>
          <div className={guideStyles.weightGrid}>
            {WEIGHTS.map((row) => (
              <div key={row.token} className={guideStyles.weightCard}>
                <code>{row.token}</code>
                <p style={{ fontWeight: row.weight, margin: "0.5rem 0 0", fontSize: "1.15rem" }}>
                  Weight {row.value}
                </p>
              </div>
            ))}
          </div>
          <ul className={styles.changeList}>
            <li>
              <code>--axiom-line-height-tight</code> · 1.25 — headings
            </li>
            <li>
              <code>--axiom-line-height-normal</code> · 1.5 — body
            </li>
            <li>
              <code>--axiom-line-height-relaxed</code> · 1.625 — long-form
            </li>
          </ul>
        </section>

        <section className={styles.section} id="component">
          <h2 className={styles.sectionTitle}>Typography component</h2>
          <p className={styles.prose}>
            Import from <code>axiom-ui/typography</code>. Variants cover headings, lead, body, small,
            muted, and inline code — all wired to the tokens above.
          </p>
          <CodeBlock code={COMPONENT_CODE} language="tsx" showCopy filename="HeroCopy.tsx" />
          <div className={guideStyles.componentPreview}>
            <Typography.H2>Semantic presets</Typography.H2>
            <Typography.Lead>Lead text for intros and empty states.</Typography.Lead>
            <Typography.P>
              Body paragraphs inherit the sans family and normal line height from the token system.
            </Typography.P>
            <Typography.Small>Small print and helper text.</Typography.Small>
            <Typography.Muted>Muted secondary copy.</Typography.Muted>
            <Typography.Code>axiom-ui/typography</Typography.Code>
          </div>
          <p className={styles.prose}>
            Full API and examples live in the{" "}
            <a href="/docs/components/typography">Typography component docs</a>.
          </p>
        </section>

        <section className={styles.section} id="custom">
          <h2 className={styles.sectionTitle}>Custom fonts</h2>
          <p className={styles.prose}>
            Load your webfont, then override the family tokens (or pass <code>fontFamily</code> to{" "}
            <code>AxiomProvider</code>). Keep a system fallback after your brand face so text never
            flashes unstyled.
          </p>
          <CodeBlock code={CUSTOM_CSS} language="tsx" showCopy filename="fonts.css" />
        </section>
      </article>
    </DocPageShell>
  );
}
