import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Breadcrumb, Button, CodeBlock, Input } from "axiom-ui";
import {
  ThemeSwitch,
  type ThemeSwitchAnimation,
} from "../../src/components/ThemeSwitch";
import { useSiteTheme } from "../useSiteTheme";
import { DocPageShell } from "./DocPageShell";
import styles from "./GuidesPage.module.css";
import themeStyles from "./ThemePage.module.css";

const TOC = [
  { id: "modes", label: "Light & dark" },
  { id: "theme-switch", label: "ThemeSwitch" },
  { id: "animations", label: "Switch animations" },
  { id: "provider", label: "AxiomProvider" },
] as const;

const ANIMATIONS: Array<{ id: ThemeSwitchAnimation; label: string; body: string }> = [
  { id: "ripple", label: "Ripple", body: "Circular reveal from the click point (default)." },
  { id: "fade", label: "Fade", body: "Cross-fade between light and dark snapshots." },
  { id: "wipe", label: "Wipe", body: "Horizontal wipe that reveals the new theme." },
  { id: "blur", label: "Blur", body: "Soft blur + scale morph between themes." },
  { id: "slide", label: "Slide", body: "Subtle vertical slide with opacity." },
];

const SWITCH_CODE = `import { ThemeSwitch } from "axiom-ui/theme-switch";
import { useState } from "react";

export function AppChrome() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <ThemeSwitch
      theme={theme}
      onThemeChange={setTheme}
      animation="ripple" // "fade" | "wipe" | "blur" | "slide"
      showLabel
    />
  );
}`;

const PROVIDER_CODE = `import { AxiomProvider } from "axiom-ui/config";

<AxiomProvider config={{ theme: "system" }}>
  <App />
</AxiomProvider>`;

export function ThemePage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useSiteTheme();
  const [animation, setAnimation] = useState<ThemeSwitchAnimation>("ripple");

  const previewLabel = useMemo(() => (theme === "light" ? "Light" : "Dark"), [theme]);

  return (
    <DocPageShell toc={TOC.map((item) => ({ ...item }))}>
      <article className={styles.page}>
        <Breadcrumb
          className={styles.breadcrumb}
          showBack
          onBack={() => navigate("/docs/getting-started")}
          items={[
            { label: "Docs", href: "/docs/getting-started" },
            { label: "Guides", href: "/docs/theme" },
            { label: "Theme", current: true },
          ]}
        />

        <header className={styles.header}>
          <p className={styles.kicker}>Guides</p>
          <h1 className={styles.title}>Theme</h1>
          <p className={styles.lead}>
            Light and dark modes are driven by <code>data-theme</code> on the document root. Use{" "}
            <code>ThemeSwitch</code> for an animated toggle, or set theme from{" "}
            <code>AxiomProvider</code>.
          </p>
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>data-theme</span>
            <span className={styles.metaBadge}>View Transitions</span>
            <span className={styles.metaBadge}>prefers-reduced-motion</span>
          </div>
        </header>

        <section className={styles.section} id="modes">
          <h2 className={styles.sectionTitle}>Light &amp; dark</h2>
          <p className={styles.prose}>
            Toggle the live preview below. Components and tokens under <code>[data-theme]</code>{" "}
            update together — including this documentation shell when you use the header switch.
          </p>
          <div className={themeStyles.previewShell}>
            <div className={themeStyles.previewToolbar}>
              <span className={themeStyles.previewLabel}>Live theme · {previewLabel}</span>
              <ThemeSwitch theme={theme} onThemeChange={setTheme} animation={animation} showLabel />
            </div>
            <div className={themeStyles.previewStage} data-theme={theme}>
              <div className={themeStyles.previewCard}>
                <div className={themeStyles.previewCardHead}>
                  <Badge>Preview</Badge>
                  <span>{previewLabel} surface</span>
                </div>
                <Input label="Workspace name" placeholder="Acme Design" />
                <div className={themeStyles.previewActions}>
                  <Button size="sm">Save</Button>
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="theme-switch">
          <h2 className={styles.sectionTitle}>ThemeSwitch</h2>
          <p className={styles.prose}>
            <code>ThemeSwitch</code> is a library component with ripple (and other) view-transition
            animations. It sets <code>data-theme</code> and calls your <code>onThemeChange</code>{" "}
            handler. Import from <code>axiom-ui/theme-switch</code>.
          </p>
          <CodeBlock code={SWITCH_CODE} language="tsx" showCopy filename="AppChrome.tsx" />
        </section>

        <section className={styles.section} id="animations">
          <h2 className={styles.sectionTitle}>Switch animations</h2>
          <p className={styles.prose}>
            Pick an animation, then toggle the switch to compare. Unsupported browsers and{" "}
            <code>prefers-reduced-motion</code> fall back to an instant theme change.
          </p>
          <div className={themeStyles.animGrid} role="list">
            {ANIMATIONS.map((item) => {
              const active = animation === item.id;
              return (
                <div key={item.id} role="listitem">
                  <button
                    type="button"
                    className={`${themeStyles.animCard} ${active ? themeStyles.animCardActive : ""}`}
                    onClick={() => setAnimation(item.id)}
                    aria-pressed={active}
                  >
                    <strong>{item.label}</strong>
                    <span>{item.body}</span>
                  </button>
                </div>
              );
            })}
          </div>
          <div className={themeStyles.animDemo}>
            <ThemeSwitch
              theme={theme}
              onThemeChange={setTheme}
              animation={animation}
              size="lg"
              showLabel
            />
            <p className={styles.prose} style={{ margin: 0 }}>
              Active animation: <code>{animation}</code>
            </p>
          </div>
        </section>

        <section className={styles.section} id="provider">
          <h2 className={styles.sectionTitle}>AxiomProvider</h2>
          <p className={styles.prose}>
            For app-wide defaults (including <code>system</code>), configure theme on{" "}
            <code>AxiomProvider</code>. Pair with <code>ThemeSwitch</code> when users should override
            the preference in the UI.
          </p>
          <CodeBlock code={PROVIDER_CODE} language="tsx" showCopy filename="App.tsx" />
        </section>
      </article>
    </DocPageShell>
  );
}
