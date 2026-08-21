import { Badge, Button, Input } from "axiom-ui";
import { ThemeToggle } from "../ThemeToggle";
import { useSiteTheme } from "../useSiteTheme";
import styles from "./ThemeDocPreview.module.css";

type ThemeDocPreviewProps = {
  /** Show light/dark toggle in the toolbar. @default true */
  showToggle?: boolean;
  className?: string;
};

/** Interactive light/dark preview for documentation pages. */
export function ThemeDocPreview({ showToggle = true, className }: ThemeDocPreviewProps) {
  const { theme, setTheme } = useSiteTheme();

  return (
    <div className={[styles.shell, className].filter(Boolean).join(" ")}>
      <div className={styles.toolbar}>
        <span className={styles.label}>Live preview</span>
        {showToggle ? <ThemeToggle theme={theme} onThemeChange={setTheme} /> : null}
      </div>
      <div className={styles.stage} data-theme={theme}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Badge>Preview</Badge>
            <span className={styles.themeLabel}>{theme} mode</span>
          </div>
          <Input label="Email" placeholder="you@company.com" />
          <div className={styles.actions}>
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="outline">
              Outline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
