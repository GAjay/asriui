import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Breadcrumb, Button, CodeBlock, Input } from "asriui";
import type { ThemeMode } from "../../src/config";
import { DocPageShell } from "./DocPageShell";
import { ThemeDocPreview } from "./ThemeDocPreview";
import { PWA_CONFIG_CODE, PWA_VITE_CODE } from "../pwa.docs";
import { DebugModeDemo } from "./DebugModeDemo";
import styles from "./GettingStartedPage.module.css";

const TOC = [
  { id: "installation", label: "Installation" },
  { id: "configuration", label: "Configuration" },
  { id: "debugging", label: "Debug mode" },
  { id: "pwa", label: "PWA" },
  { id: "subpath-imports", label: "Subpath imports" },
  { id: "theming", label: "Theming" },
] as const;

const INSTALL_CODE = `pnpm add asriui framer-motion

import { Button } from "asriui";
import "asriui/style.css";

export function App() {
  return <Button>Get Started</Button>;
}`;

const CONFIG_CODE = `import { AsriUIProvider } from "asriui/config";
import { Button } from "asriui";
import "asriui/style.css";

const config = {
  theme: "light", // "light" | "dark" | "system"
  motion: "apple", // "apple" | "snappy" | "soft" | "playful" | "minimal"
  fontFamily: '"Work Sans", ui-sans-serif, sans-serif',
  analytics: {
    enabled: true,
    gtmId: "GTM-XXXX",
    dataLayerName: "dataLayer",
  },
  monitoring: {
    enabled: true,
    reportUrl: "/api/errors",
  },
  debug: import.meta.env.DEV, // toast + console logs in development
};

export function App() {
  return (
    <AsriUIProvider config={config}>
      <Button>Get Started</Button>
    </AsriUIProvider>
  );
}`;

const DEBUG_CODE = `import { AsriUIProvider, useAsriUIDebug } from "asriui/config";
import { ErrorBoundary, ToastProvider } from "asriui";

const config = {
  debug: {
    enabled: true,
    notify: true,
    logToConsole: true,
    captureGlobal: true,
    showStack: true,
  },
};

function ReportPanel() {
  const debug = useAsriUIDebug();

  return (
    <button type="button" onClick={() => debug.logError(new Error("Demo failure"))}>
      Log test error
    </button>
  );
}

export function App() {
  return (
    <AsriUIProvider config={config}>
      <ToastProvider>
        <ErrorBoundary>
          <ReportPanel />
        </ErrorBoundary>
      </ToastProvider>
    </AsriUIProvider>
  );
}`;

const SUBPATH_CODE = `import { Button } from "asriui/button";
import { Input } from "asriui/input";
import { Dialog } from "asriui/dialog";
import { Typography } from "asriui/typography";
import { cn } from "asriui/utils";
import "asriui/style.css";`;

const THEME_CODE = `// Toggle with a root attribute — no provider required
<div data-theme="dark">
  <Button>Save</Button>
</div>

// Or override tokens in CSS
:root {
  --asriui-color-primary: #0ea5e9;
}`;

const THEME_OPTIONS: Array<{ id: ThemeMode; label: string }> = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

export function GettingStartedPage() {
  const navigate = useNavigate();
  const [previewTheme, setPreviewTheme] = useState<ThemeMode>("light");
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => setSystemDark(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const resolvedTheme = useMemo(() => {
    if (previewTheme === "system") return systemDark ? "dark" : "light";
    return previewTheme;
  }, [previewTheme, systemDark]);

  return (
    <DocPageShell toc={[...TOC]}>
      <article className={styles.page}>
        <Breadcrumb
          className={styles.breadcrumb}
          showBack
          onBack={() => navigate(-1)}
          items={[
            { label: "Home", href: "/" },
            { label: "Overview", current: true },
          ]}
        />
        <header className={styles.header}>
          <p className={styles.kicker}>Documentation</p>
          <h1 className={styles.title}>Overview</h1>
          <p className={styles.lead}>
            Install AsriUI, wrap your app with <code>AsriUIProvider</code>, and configure theme,
            fonts, analytics, and monitoring from a single config object.
          </p>
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>React 18+</span>
            <span className={styles.metaBadge}>TypeScript</span>
            <span className={styles.metaBadge}>Tree-shakable</span>
          </div>
        </header>

        <section id="installation" className={styles.section}>
          <h2 className={styles.sectionTitle}>Installation</h2>
          <p className={styles.prose}>
            Add the package and import styles once at your app entry. Peer dependencies:{" "}
            <code>react</code>, <code>react-dom</code> (≥18), and <code>framer-motion</code> (≥11).
          </p>
          <CodeBlock code={INSTALL_CODE} language="bash" showCopy filename="setup" />
        </section>

        <section id="configuration" className={styles.section}>
          <h2 className={styles.sectionTitle}>Configuration</h2>
          <p className={styles.prose}>
            <code>AsriUIProvider</code> applies theme mode, global font stack, Google Tag Manager
            analytics, and remote error reporting. Use the preview to see how theme mode affects
            components.
          </p>

          <div className={styles.configShell}>
            <div className={styles.codePane}>
              <div className={styles.paneLabel}>Provider setup</div>
              <div className={styles.codeBody}>
                <CodeBlock code={CONFIG_CODE} language="tsx" showCopy filename="App.tsx" />
              </div>
            </div>

            <div className={styles.previewPane}>
              <div className={styles.previewToolbar}>
                <span className={styles.paneLabel}>Live preview</span>
                <div className={styles.themeSwitch} role="group" aria-label="Preview theme">
                  {THEME_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={
                        previewTheme === option.id ? styles.themeBtnActive : styles.themeBtn
                      }
                      aria-pressed={previewTheme === option.id}
                      onClick={() => setPreviewTheme(option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.previewStage} data-theme={resolvedTheme}>
                <div className={styles.previewCard}>
                  <div className={styles.previewHeader}>
                    <Badge>Preview</Badge>
                    <span className={styles.previewThemeLabel}>{resolvedTheme} mode</span>
                  </div>
                  <Input label="Email" placeholder="you@company.com" />
                  <div className={styles.previewActions}>
                    <Button size="sm">Primary</Button>
                    <Button size="sm" variant="outline">
                      Outline
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.callout}>
            <p className={styles.calloutLabel}>Config options</p>
            <ul className={styles.optionList}>
              <li>
                <code>theme</code> — <code>light</code>, <code>dark</code>, or{" "}
                <code>system</code>
              </li>
              <li>
                <code>motion</code> — <code>apple</code>, <code>snappy</code>, <code>soft</code>,{" "}
                <code>playful</code>, or <code>minimal</code> animation preset pack
              </li>
              <li>
                <code>fontFamily</code> — sets <code>--asriui-font-family</code> on the document root
              </li>
              <li>
                <code>analytics.gtmId</code> — injects GTM; <code>Button</code> and <code>Link</code>{" "}
                emit <code>asriui_button_click</code> / <code>asriui_link_click</code> events. Override
                per instance with <code>trackEvent</code>, <code>trackLabel</code>, and{" "}
                <code>trackPayload</code>.
              </li>
              <li>
                <code>monitoring.reportUrl</code> — <code>ErrorBoundary</code> POSTs caught errors
              </li>
              <li>
                <code>debug</code> — developer mode with toast notifications, console logs, and
                global error capture (see below)
              </li>
            </ul>
          </div>
        </section>

        <section id="debugging" className={styles.section}>
          <h2 className={styles.sectionTitle}>Debug mode</h2>
          <p className={styles.prose}>
            Enable <code>debug</code> on <code>AsriUIProvider</code> to surface errors with toast
            notifications, structured console logs, and an in-memory log you can inspect via{" "}
            <code>useAsriUIDebug()</code>. Pair with <code>ToastProvider</code> and{" "}
            <code>ErrorBoundary</code> for the best experience.
          </p>
          <CodeBlock code={DEBUG_CODE} language="tsx" showCopy filename="App.tsx" />
          <DebugModeDemo />
        </section>

        <section id="pwa" className={styles.section}>
          <h2 className={styles.sectionTitle}>Progressive web app (PWA)</h2>
          <p className={styles.prose}>
            This docs site is installable as a PWA. Configure the web app manifest, icons, and
            service worker in <code>site/pwa.config.ts</code>, then register the plugin in your Vite
            config. Run <code>pnpm build:site</code> to generate the service worker and manifest.
          </p>
          <CodeBlock code={PWA_CONFIG_CODE} language="tsx" showCopy filename="site/pwa.config.ts" />
          <div className={styles.codeSpacer} />
          <CodeBlock code={PWA_VITE_CODE} language="tsx" showCopy filename="vite.config.ts" />
          <div className={styles.callout}>
            <p className={styles.calloutLabel}>PWA checklist</p>
            <ul className={styles.optionList}>
              <li>
                Add <code>public/favicon.svg</code>, <code>apple-touch-icon.svg</code>, and PNG icons
                at 192×192 and 512×512
              </li>
              <li>
                Set <code>theme_color</code> and <code>background_color</code> to match your brand
              </li>
              <li>
                <code>registerType: &quot;autoUpdate&quot;</code> refreshes the service worker when you deploy
              </li>
              <li>
                Images and fonts use CacheFirst with expiration so repeat views stay local, then refetch after the TTL
              </li>
            </ul>
          </div>
        </section>

        <section id="subpath-imports" className={styles.section}>
          <h2 className={styles.sectionTitle}>Subpath imports</h2>
          <p className={styles.prose}>
            Import only the modules you need. Each component ships as a separate ESM chunk under{" "}
            <code>dist/</code> for smaller bundles.
          </p>
          <CodeBlock code={SUBPATH_CODE} language="tsx" showCopy filename="imports.ts" />
        </section>

        <section id="theming" className={styles.section}>
          <h2 className={styles.sectionTitle}>Theming</h2>
          <p className={styles.prose}>
            AsriUI uses CSS custom properties. Toggle light or dark with a root attribute, or
            override tokens in your own stylesheet. Use the site theme toggle in the docs sidebar or
            the preview below to see components in each mode.
          </p>
          <ThemeDocPreview />
          <div className={styles.codeSpacer} />
          <CodeBlock code={THEME_CODE} language="tsx" showCopy filename="theme.tsx" />
        </section>
      </article>
    </DocPageShell>
  );
}
