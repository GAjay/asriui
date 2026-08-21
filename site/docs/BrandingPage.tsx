import { useNavigate } from "react-router-dom";
import { Breadcrumb, CodeBlock } from "asriui";
import { BrandMark, markPalette } from "../BrandMark";
import { DocPageShell } from "./DocPageShell";
import styles from "./GuidesPage.module.css";
import brandStyles from "./BrandingPage.module.css";

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "logo-mark", label: "Logo mark" },
  { id: "wordmark", label: "Wordmark" },
  { id: "colors", label: "Color variants" },
  { id: "clear-space", label: "Clear space" },
  { id: "favicon", label: "Favicon assets" },
  { id: "usage", label: "Usage in code" },
  { id: "dont", label: "What to avoid" },
] as const;

const MARK_CODE = `import { BrandMark } from "./BrandMark";

<BrandMark size={26} />
<BrandMark size={40} label="AsriUI" />`;

const PALETTE_CODE = `import { markPalette } from "./BrandMark";

// Light surface
const darkMark = markPalette("light", false);
// { plate: "#09090b", plateAccent: "#18181b", letter: "#ffffff" }

// Dark theme or black band
const lightMark = markPalette("dark", true);
// { plate: "#ffffff", plateAccent: "#e4e4e7", letter: "#09090b" }`;

const FAVICON_SNIPPET = `<link rel="icon" href="/favicon.svg" type="image/svg+xml" media="(prefers-color-scheme: light)" />
<link rel="icon" href="/favicon-dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)" />
<link rel="apple-touch-icon" href="/apple-touch-icon.svg" />`;

const PALETTE_ROWS = [
  { token: "plate", label: "Plate left" },
  { token: "plateAccent", label: "Plate right" },
  { token: "letter", label: "Letter" },
] as const;

function ColorSwatch({ value, label }: { value: string; label: string }) {
  return (
    <span className={brandStyles.swatch} data-label={label} role="cell">
      <span
        className={brandStyles.swatchChip}
        style={{ background: value }}
        aria-hidden="true"
      />
      <code>{value}</code>
    </span>
  );
}

export function BrandingPage() {
  const navigate = useNavigate();
  const lightSurface = markPalette("light", false);
  const darkSurface = markPalette("dark", true);

  return (
    <DocPageShell toc={TOC.map((item) => ({ ...item }))}>
      <article className={styles.page}>
        <Breadcrumb
          className={styles.breadcrumb}
          showBack
          onBack={() => navigate("/docs/getting-started")}
          items={[
            { label: "Docs", href: "/docs/getting-started" },
            { label: "Guides", href: "/docs/branding" },
            { label: "Branding", current: true },
          ]}
        />

        <header className={styles.header}>
          <p className={styles.kicker}>Guides</p>
          <h1 className={styles.title}>Branding</h1>
          <p className={styles.lead}>
            AsriUI uses a sharp split-plate mark with a geometric “A” letterform. The mark inverts
            automatically on dark surfaces and black landing bands so it stays legible everywhere.
          </p>
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>Logo mark</span>
            <span className={styles.metaBadge}>Wordmark</span>
            <span className={styles.metaBadge}>Favicon</span>
          </div>
        </header>

        <section className={styles.section} id="overview">
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p className={styles.prose}>
            The brand is intentionally minimal: zinc neutrals, crisp geometry, and no gradients on
            the mark itself. Pair the logo with the wordmark <strong>AsriUI</strong> in semibold
            sans — or use the mark alone when space is tight (favicon, app icon, collapsed nav).
          </p>
        </section>

        <section className={styles.section} id="logo-mark">
          <h2 className={styles.sectionTitle}>Logo mark</h2>
          <p className={styles.prose}>
            The mark is a 48×48 viewBox: a vertical split plate with a centered “A”. Use the{" "}
            <code>BrandMark</code> component so theme and band context pick the correct palette.
          </p>

          <div className={brandStyles.specimenGrid}>
            <div className={brandStyles.specimen}>
              <p className={brandStyles.specimenLabel}>Light surface</p>
              <div className={`${brandStyles.specimenStage} ${brandStyles.stageLight}`}>
                <BrandMark size={48} label="AsriUI on light" />
              </div>
            </div>
            <div className={brandStyles.specimen}>
              <p className={brandStyles.specimenLabel}>Dark surface</p>
              <div className={`${brandStyles.specimenStage} ${brandStyles.stageDark}`} data-band="black">
                <BrandMark size={48} label="AsriUI on dark" />
              </div>
            </div>
          </div>

          <div className={brandStyles.sizeRow}>
            {[20, 26, 32, 40, 48].map((size) => (
              <div key={size} className={brandStyles.sizeItem}>
                <BrandMark size={size} />
                <span>{size}px</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="wordmark">
          <h2 className={styles.sectionTitle}>Wordmark</h2>
          <p className={styles.prose}>
            Default lockup: mark at 26px with the wordmark set in bold, tight tracking. Keep the gap
            between mark and text around 8–10px.
          </p>
          <div className={brandStyles.specimenGrid}>
            <div className={brandStyles.specimen}>
              <p className={brandStyles.specimenLabel}>Primary lockup</p>
              <div className={`${brandStyles.specimenStage} ${brandStyles.stageMuted}`}>
                <span className={brandStyles.wordmarkRow}>
                  <BrandMark size={26} />
                  AsriUI
                </span>
              </div>
            </div>
            <div className={brandStyles.specimen}>
              <p className={brandStyles.specimenLabel}>On black band</p>
              <div className={`${brandStyles.specimenStage} ${brandStyles.stageDark}`} data-band="black">
                <span className={`${brandStyles.wordmarkRow} ${brandStyles.wordmarkRowDark}`}>
                  <BrandMark size={26} />
                  AsriUI
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="colors">
          <h2 className={styles.sectionTitle}>Color variants</h2>
          <p className={styles.prose}>
            Two palettes ship with the mark. <code>markPalette(theme, onBlackBand)</code> returns
            plate, accent, and letter colors for SVG or static exports.
          </p>

          <div className={brandStyles.paletteTableWrap}>
            <div className={brandStyles.paletteTable} role="table" aria-label="Brand mark color variants">
              <div className={brandStyles.paletteTableHead} role="row">
                <span role="columnheader">Token</span>
                <span role="columnheader">Light surface</span>
                <span role="columnheader">Dark / black band</span>
              </div>
              {PALETTE_ROWS.map((row) => (
                <div key={row.token} className={brandStyles.paletteTableRow} role="row">
                  <span className={brandStyles.tokenCell} role="cell">
                    <code>{row.token}</code>
                    <span className={brandStyles.tokenLabel}>{row.label}</span>
                  </span>
                  <ColorSwatch value={lightSurface[row.token]} label="Light surface" />
                  <ColorSwatch value={darkSurface[row.token]} label="Dark / black band" />
                </div>
              ))}
            </div>
          </div>

          <CodeBlock code={PALETTE_CODE} language="tsx" showCopy filename="brand-palette.ts" />
        </section>

        <section className={styles.section} id="clear-space">
          <h2 className={styles.sectionTitle}>Clear space</h2>
          <p className={styles.prose}>
            Keep at least half the mark width as padding on all sides so the logo does not compete
            with nearby UI. Minimum digital size is <strong>20px</strong>; below that, use the SVG
            favicon only.
          </p>
          <div className={brandStyles.clearSpace}>
            <BrandMark size={32} />
          </div>
        </section>

        <section className={styles.section} id="favicon">
          <h2 className={styles.sectionTitle}>Favicon assets</h2>
          <p className={styles.prose}>
            Static SVGs live in <code>/public</code>. Serve light and dark variants so the icon
            matches the user&apos;s color scheme.
          </p>
          <ul className={brandStyles.assetList}>
            <li>
              <span>Default favicon (light scheme)</span>
              <code>/favicon.svg</code>
            </li>
            <li>
              <span>Dark scheme favicon</span>
              <code>/favicon-dark.svg</code>
            </li>
            <li>
              <span>Apple touch icon</span>
              <code>/apple-touch-icon.svg</code>
            </li>
          </ul>
          <CodeBlock code={FAVICON_SNIPPET} language="text" showCopy filename="index.html" />
        </section>

        <section className={styles.section} id="usage">
          <h2 className={styles.sectionTitle}>Usage in code</h2>
          <p className={styles.prose}>
            Import from the site module (or copy <code>BrandMark.tsx</code> into your app). Pass{" "}
            <code>label</code> when the mark is not accompanied by visible text.
          </p>
          <CodeBlock code={MARK_CODE} language="tsx" showCopy filename="Nav.tsx" />
        </section>

        <section className={styles.section} id="dont">
          <h2 className={styles.sectionTitle}>What to avoid</h2>
          <div className={brandStyles.dontGrid}>
            <div className={brandStyles.dontCard}>
              <BrandMark size={36} />
              <p>Do not stretch or squash the mark — always scale uniformly.</p>
            </div>
            <div className={brandStyles.dontCard}>
              <div style={{ filter: "hue-rotate(90deg)" }}>
                <BrandMark size={36} />
              </div>
              <p>Do not recolor the plate or letter outside the approved palettes.</p>
            </div>
            <div className={brandStyles.dontCard}>
              <div style={{ opacity: 0.35 }}>
                <BrandMark size={36} />
              </div>
              <p>Do not place the mark below 45% opacity on busy backgrounds.</p>
            </div>
          </div>
        </section>
      </article>
    </DocPageShell>
  );
}
