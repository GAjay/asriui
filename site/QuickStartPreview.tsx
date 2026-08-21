import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, CodeBlock, Icon, Input } from "../src";
import { MotionProvider } from "../src/motion/MotionContext";
import { MOTION_PRESET_LIST, type MotionPresetName } from "../src/motion/presetPacks";
import type { ThemeMode } from "../src/config";
import { buildInstallSnippet } from "./buildInstallSnippet";
import { MotionPresetPreview } from "./MotionPresetPreview";
import styles from "./QuickStartPreview.module.css";

const THEME_OPTIONS: Array<{ id: ThemeMode; label: string }> = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

const STEPS = [
  { title: "Install", body: "Add axiom-ui and framer-motion." },
  { title: "Configure", body: "Wrap with AxiomProvider + motion preset." },
  { title: "Compose", body: "Import components and ship." },
] as const;

export function QuickStartPreview() {
  const [previewTheme, setPreviewTheme] = useState<ThemeMode>("light");
  const [motionPreset, setMotionPreset] = useState<MotionPresetName>("apple");
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

  const installSnippet = useMemo(() => buildInstallSnippet(motionPreset), [motionPreset]);

  return (
    <div className={styles.root}>
      <ol className={styles.steps} aria-label="Quick start steps">
        {STEPS.map((step, i) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.stepNum} aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <p className={styles.stepTitle}>{step.title}</p>
              <p className={styles.stepBody}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.shell}>
        <section className={styles.codePane} aria-label="Installation snippet">
          <div className={styles.paneHead}>
            <div className={styles.paneHeadCopy}>
              <span className={styles.paneLabel}>Setup</span>
              <p className={styles.paneTitle}>Install &amp; provider</p>
            </div>
            <Link to="/docs/getting-started" className={styles.docLink}>
              Full guide →
            </Link>
          </div>
          <div className={styles.codeBody}>
            <CodeBlock code={installSnippet} language="tsx" showCopy filename="App.tsx" />
          </div>
        </section>

        <section className={styles.previewPane} aria-label="Live preview">
          <div className={styles.paneHead}>
            <div className={styles.paneHeadCopy}>
              <span className={styles.paneLabel}>Preview</span>
              <p className={styles.paneTitle}>Theme &amp; motion</p>
            </div>
            <div className={styles.themeSwitch} role="group" aria-label="Preview theme">
              {THEME_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={previewTheme === option.id ? styles.themeBtnActive : styles.themeBtn}
                  aria-pressed={previewTheme === option.id}
                  onClick={() => setPreviewTheme(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.motionToolbar}>
            <span className={styles.motionLabel}>Motion preset</span>
            <div className={styles.motionSwitch} role="group" aria-label="Animation preset">
              {MOTION_PRESET_LIST.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  className={motionPreset === option.name ? styles.motionBtnActive : styles.motionBtn}
                  aria-pressed={motionPreset === option.name}
                  title={option.description}
                  onClick={() => setMotionPreset(option.name)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.previewStage} data-theme={resolvedTheme}>
            <MotionProvider preset={motionPreset}>
              <div className={styles.previewCard}>
                <div className={styles.previewHeader}>
                  <Badge variant="secondary">Configured</Badge>
                  <span className={styles.previewThemeLabel}>
                    {resolvedTheme} · {motionPreset}
                  </span>
                </div>
                <p className={styles.previewLead}>
                  Isolated preview — light and dark tokens stay readable regardless of the page theme.
                </p>
                <Input label="Workspace" placeholder="acme-corp" />
                <div className={styles.previewActions}>
                  <Button size="sm">Deploy</Button>
                  <Button size="sm" variant="outline">
                    Settings
                  </Button>
                </div>
              </div>

              <MotionPresetPreview />
            </MotionProvider>
          </div>
        </section>
      </div>

      <div className={styles.notes}>
        <div className={styles.note}>
          <span className={styles.noteIcon} aria-hidden="true">
            <Icon name="sparkles" size="sm" />
          </span>
          <div>
            <p className={styles.noteTitle}>Motion-ready</p>
            <p className={styles.noteDesc}>
              Set <code>config.motion</code> on <code>AxiomProvider</code> — apple, snappy, soft, playful, or minimal.
            </p>
          </div>
        </div>
        <div className={styles.note}>
          <span className={styles.noteIcon} aria-hidden="true">
            <Icon name="package" size="sm" />
          </span>
          <div>
            <p className={styles.noteTitle}>AxiomProvider</p>
            <p className={styles.noteDesc}>
              Theme, fonts, motion, analytics, and monitoring from one config object.
            </p>
          </div>
        </div>
        <div className={styles.note}>
          <span className={styles.noteIcon} aria-hidden="true">
            <Icon name="rocket" size="sm" />
          </span>
          <div>
            <p className={styles.noteTitle}>Installable PWA</p>
            <p className={styles.noteDesc}>
              Point <code>VitePWA</code> at <code>site/pwa.config.ts</code> for offline docs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
