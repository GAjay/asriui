import { forwardRef, useCallback, useState, type CSSProperties } from "react";
import { cn } from "../../utils/cn";
import type { ColorPaletteProps, ColorSwatch, ColorSwatchProps } from "./ColorPalette.types";
import styles from "./ColorPalette.module.css";

export const DEFAULT_PALETTE: ColorSwatch[] = [
  { name: "Primary", value: "var(--axiom-color-primary)", token: "--axiom-color-primary", foreground: "var(--axiom-color-primary-foreground)" },
  { name: "Foreground", value: "var(--axiom-color-foreground)", token: "--axiom-color-foreground", foreground: "var(--axiom-color-background)" },
  { name: "Background", value: "var(--axiom-color-background)", token: "--axiom-color-background", foreground: "var(--axiom-color-foreground)" },
  { name: "Muted", value: "var(--axiom-color-muted)", token: "--axiom-color-muted", foreground: "var(--axiom-color-foreground)" },
  { name: "Border", value: "var(--axiom-color-border)", token: "--axiom-color-border", foreground: "var(--axiom-color-foreground)" },
  { name: "Danger", value: "var(--axiom-color-danger)", token: "--axiom-color-danger", foreground: "var(--axiom-color-danger-foreground)" },
  { name: "Success", value: "var(--axiom-color-success)", token: "--axiom-color-success", foreground: "#ffffff" },
  { name: "Warning", value: "var(--axiom-color-warning)", token: "--axiom-color-warning", foreground: "#111111" },
];

const ColorSwatchButton = forwardRef<HTMLButtonElement, ColorSwatchProps>(function ColorSwatchButton(
  { swatch, copyable = true, className, ...rest },
  ref,
) {
  const [copied, setCopied] = useState(false);
  const copyValue = swatch.token ?? swatch.value;

  const handleCopy = useCallback(async () => {
    if (!copyable) return;
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard unavailable
    }
  }, [copyValue, copyable]);

  return (
    <button
      ref={ref}
      type="button"
      className={cn(styles.swatch, className)}
      onClick={handleCopy}
      aria-label={`${swatch.name} color ${copyValue}${copied ? ", copied" : ""}`}
      {...rest}
    >
      <span
        className={styles.preview}
        style={{ background: swatch.value, color: swatch.foreground ?? "inherit" }}
        aria-hidden="true"
      >
        Aa
      </span>
      <span className={styles.meta}>
        <span className={styles.name}>{swatch.name}</span>
        <span className={styles.value}>{copied ? "Copied!" : copyValue}</span>
        {swatch.token ? <span className={styles.token}>{swatch.value}</span> : null}
      </span>
    </button>
  );
});
ColorSwatchButton.displayName = "ColorPalette.Swatch";

const ColorPaletteRoot = forwardRef<HTMLDivElement, ColorPaletteProps>(function ColorPalette(
  { colors = DEFAULT_PALETTE, copyable = true, columns = 4, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(styles.root, className)}
      style={{ ...style, "--palette-columns": String(columns) } as CSSProperties}
      role="list"
      aria-label="Color palette"
      {...rest}
    >
      {colors.map((swatch) => (
        <ColorSwatchButton key={swatch.name} swatch={swatch} copyable={copyable} role="listitem" />
      ))}
    </div>
  );
});
ColorPaletteRoot.displayName = "ColorPalette";

/** Accessible color swatch grid with copy-to-clipboard support. */
export const ColorPalette = Object.assign(ColorPaletteRoot, {
  Swatch: ColorSwatchButton,
  defaults: DEFAULT_PALETTE,
});
