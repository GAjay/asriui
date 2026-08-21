import { useNavigate } from "react-router-dom";
import { Breadcrumb, CodeBlock, Typography } from "asriui";
import { DocPageShell } from "./DocPageShell";
import styles from "./GuidesPage.module.css";
import guideStyles from "./TypographyGuidePage.module.css";

const TOC = [
  { id: "font-family", label: "Font family" },
  { id: "provider", label: "AsriUIProvider" },
  { id: "scale", label: "Type scale" },
  { id: "weights", label: "Weights & leading" },
  { id: "component", label: "Typography component" },
  { id: "custom", label: "Custom fonts" },
] as const;

const FAMILY_CODE = `:root {
  --asriui-font-family: "Work Sans", ui-sans-serif, system-ui, -apple-system,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --asriui-font-family-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo,
    Consolas, monospace;
}`;

const PROVIDER_CODE = `import { AsriUIProvider } from "asriui/config";

const config = {
  fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
  theme: "system",
};

export function App() {
  return (
    <AsriUIProvider config={config}>
      <YourApp />
    </AsriUIProvider>
  );
}`;

const COMPONENT_CODE = `import { Typography } from "asriui/typography";

<>
  <Typography.H1>Page title</Typography.H1>
  <Typography.Lead>Supporting sentence under the title.</Typography.Lead>
  <Typography.P>Body copy uses the sans stack from --asriui-font-family.</Typography.P>
  <Typography.Code>npm install asriui</Typography.Code>
</>`;

const CUSTOM_CSS = `:root {
  --asriui-font-family: "Geist", ui-sans-serif, system-ui, sans-serif;
  --asriui-font-family-mono: "Geist Mono", ui-monospace, monospace;
}

/* Load the face before components render */
@import url("https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap");`;

const SIZES = [
  { token: "--asriui-font-size-xs", value: "0.75rem", sample: "xs · captions" },
  { token: "--asriui-font-size-sm", value: "0.875rem", sample: "sm · labels" },
  { token: "--asriui-font-size-md", value: "1rem", sample: "md · body" },
  { token: "--asriui-font-size-lg", value: "1.125rem", sample: "lg · lead" },
  { token: "--asriui-font-size-xl", value: "1.25rem", sample: "xl · titles" },
  { token: "--asriui-font-size-2xl", value: "1.5rem", sample: "2xl · display" },
] as const;

const WEIGHTS = [
  { token: "--asriui-font-weight-regular", value: "400", weight: 400 },
  { token: "--asriui-font-weight-medium", value: "500", weight: 500 },
  { token: "--asriui-font-weight-semibold", value: "600", weight: 600 },
  { token: "--asriui-font-weight-bold", value: "700", weight: 700 },
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
            AsriUI uses CSS font tokens for the sans and mono stacks, then maps them into the{" "}
            <code>Typography</code> component. Set the family once — every heading, body, and code
            sample stays consistent.
          </p>
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>Font families</span>
            <span className={styles.metaBadge}>Type scale</span>
            <span className={styles.metaBadge}>asriui/typography</span>
          </div>
        </header>

        <section className={styles.section} id="font-family">
          <h2 className={styles.sectionTitle}>Font family</h2>
          <p className={styles.prose}>
            Two families ship by default. <code>--asriui-font-family</code> is the UI sans stack
            (Work Sans first). <code>--asriui-font-family-mono</code> is for code, keyboard shortcuts,
            and technical labels.
          </p>
          <CodeBlock code={FAMILY_CODE} language="tsx" showCopy filename="typography.css" />

          <div className={guideStyles.specimenGrid}>
            <div className={guideStyles.specimen}>
              <p className={guideStyles.specimenLabel}>Sans · --asriui-font-family</p>
              <p className={guideStyles.specimenSans}>
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className={guideStyles.specimenSans} style={{ fontSize: "1.35rem", fontWeight: 700 }}>
                AsriUI Design System
              </p>
            </div>
            <div className={guideStyles.specimen}>
              <p className={guideStyles.specimenLabel}>Mono · --asriui-font-family-mono</p>
              <p className={guideStyles.specimenMono}>
                const theme = &quot;dark&quot;;
              </p>
              <p className={guideStyles.specimenMono}>pnpm add asriui framer-motion</p>
            </div>
          </div>
        </section>

        <section className={styles.section} id="provider">
          <h2 className={styles.sectionTitle}>AsriUIProvider</h2>
          <p className={styles.prose}>
            Prefer configuring the sans family through <code>AsriUIProvider</code>. It writes{" "}
            <code>--asriui-font-family</code> (and the landing <code>--lp-font-sans</code> token) on
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
              <code>--asriui-line-height-tight</code> · 1.25 — headings
            </li>
            <li>
              <code>--asriui-line-height-normal</code> · 1.5 — body
            </li>
            <li>
              <code>--asriui-line-height-relaxed</code> · 1.625 — long-form
            </li>
          </ul>
        </section>

        <section className={styles.section} id="component">
          <h2 className={styles.sectionTitle}>Typography component</h2>
          <p className={styles.prose}>
            Import from <code>asriui/typography</code>. Variants cover headings, lead, body, small,
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
            <Typography.Code>asriui/typography</Typography.Code>
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
            <code>AsriUIProvider</code>). Keep a system fallback after your brand face so text never
            flashes unstyled.
          </p>
          <CodeBlock code={CUSTOM_CSS} language="tsx" showCopy filename="fonts.css" />
        </section>
      </article>
    </DocPageShell>
  );
}
