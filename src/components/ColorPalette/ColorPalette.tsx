import { forwardRef, useCallback, useState, type CSSProperties } from "react";
import { cn } from "../../utils/cn";
import type { ColorPaletteProps, ColorSwatch, ColorSwatchProps } from "./ColorPalette.types";
import styles from "./ColorPalette.module.css";

export const DEFAULT_PALETTE: ColorSwatch[] = [
  { name: "Primary", value: "var(--asriui-color-primary)", token: "--asriui-color-primary", foreground: "var(--asriui-color-primary-foreground)" },
  { name: "Foreground", value: "var(--asriui-color-foreground)", token: "--asriui-color-foreground", foreground: "var(--asriui-color-background)" },
  { name: "Background", value: "var(--asriui-color-background)", token: "--asriui-color-background", foreground: "var(--asriui-color-foreground)" },
  { name: "Muted", value: "var(--asriui-color-muted)", token: "--asriui-color-muted", foreground: "var(--asriui-color-foreground)" },
  { name: "Border", value: "var(--asriui-color-border)", token: "--asriui-color-border", foreground: "var(--asriui-color-foreground)" },
  { name: "Danger", value: "var(--asriui-color-danger)", token: "--asriui-color-danger", foreground: "var(--asriui-color-danger-foreground)" },
  { name: "Success", value: "var(--asriui-color-success)", token: "--asriui-color-success", foreground: "#ffffff" },
  { name: "Warning", value: "var(--asriui-color-warning)", token: "--asriui-color-warning", foreground: "#111111" },
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
