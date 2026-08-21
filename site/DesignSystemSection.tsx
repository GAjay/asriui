import { useState } from "react";
import { Link } from "react-router-dom";
import { ColorPalette, Icon, Typography } from "../src";
import styles from "./DesignSystemSection.module.css";

type TokenCategory = "colors" | "spacing" | "radius" | "type" | "shadows";

const CATEGORIES: Array<{
  id: TokenCategory;
  label: string;
  icon: "palette" | "grid" | "sparkles" | "type" | "package";
  blurb: string;
}> = [
  {
    id: "colors",
    label: "Colors",
    icon: "palette",
    blurb: "Monochrome zinc palette with semantic roles for surfaces and feedback.",
  },
  {
    id: "spacing",
    label: "Spacing",
    icon: "grid",
    blurb: "4px base scale for padding, gaps, and layout rhythm.",
  },
  {
    id: "radius",
    label: "Radius",
    icon: "sparkles",
    blurb: "Corner radii mapped to button props and card shells.",
  },
  {
    id: "type",
    label: "Typography",
    icon: "type",
    blurb: "Work Sans stack with rem-based sizes and line heights.",
  },
  {
    id: "shadows",
    label: "Shadows",
    icon: "package",
    blurb: "Elevation tokens plus focus ring glow for accessibility.",
  },
];

const COLOR_TOKENS = [
  { token: "--axiom-color-primary", light: "#000000", dark: "#fafafa" },
  { token: "--axiom-color-background", light: "#ffffff", dark: "#09090b" },
  { token: "--axiom-color-foreground", light: "#09090b", dark: "#fafafa" },
  { token: "--axiom-color-muted", light: "#f4f4f5", dark: "#18181b" },
  { token: "--axiom-color-border", light: "#e4e4e7", dark: "#27272a" },
] as const;

const SPACE_TOKENS = [
  { token: "--axiom-space-2", value: "8px" },
  { token: "--axiom-space-4", value: "16px" },
  { token: "--axiom-space-6", value: "24px" },
  { token: "--axiom-space-8", value: "32px" },
  { token: "--axiom-space-12", value: "48px" },
] as const;

const RADIUS_TOKENS = [
  { token: "--axiom-radius-sm", value: "4px" },
  { token: "--axiom-radius-md", value: "8px" },
  { token: "--axiom-radius-lg", value: "12px" },
  { token: "--axiom-radius-xl", value: "16px" },
  { token: "--axiom-radius-full", value: "9999px" },
] as const;

const TYPE_TOKENS = [
  { token: "--axiom-font-family", sample: "Work Sans" },
  { token: "--axiom-font-size-sm", sample: "0.875rem" },
  { token: "--axiom-font-size-md", sample: "1rem" },
  { token: "--axiom-font-size-lg", sample: "1.125rem" },
  { token: "--axiom-line-height-normal", sample: "1.5" },
] as const;

const SHADOW_TOKENS = [
  { token: "--axiom-shadow-sm", label: "sm" },
  { token: "--axiom-shadow-md", label: "md" },
  { token: "--axiom-shadow-lg", label: "lg" },
  { token: "--axiom-shadow-focus", label: "focus" },
] as const;

const TYPE_PREVIEW = [
  { label: "H2", node: <Typography.H2 as="p">Section title</Typography.H2> },
  { label: "Lead", node: <Typography.Lead>Lead copy for intros.</Typography.Lead> },
  { label: "Body", node: <Typography.P>Body text for UI and docs.</Typography.P> },
  { label: "Code", node: <Typography.Code>--axiom-font-size-md</Typography.Code> },
] as const;

/**
 * Token system playground — header lives on LandingHeroSection.
 */
export function DesignSystemSection() {
  const [active, setActive] = useState<TokenCategory>("colors");
  const category = CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0]!;

  return (
    <div className={styles.root}>
      <div className={styles.categoryRail} role="tablist" aria-label="Token categories">
        {CATEGORIES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active === item.id}
            aria-controls={`token-panel-${item.id}`}
            id={`token-tab-${item.id}`}
            className={active === item.id ? styles.categoryActive : styles.category}
            onClick={() => setActive(item.id)}
          >
            <Icon name={item.icon} size="sm" />
            {item.label}
          </button>
        ))}
      </div>

      <div
        className={styles.workspace}
        role="tabpanel"
        id={`token-panel-${category.id}`}
        aria-labelledby={`token-tab-${category.id}`}
      >
        <div className={styles.reference}>
          <div className={styles.referenceHead}>
            <h3 className={styles.referenceTitle}>{category.label}</h3>
            <p className={styles.referenceBlurb}>{category.blurb}</p>
          </div>

          {active === "colors" ? (
            <ul className={styles.tokenTable}>
              {COLOR_TOKENS.map((row) => (
                <li key={row.token} className={styles.tokenRow}>
                  <code>{row.token}</code>
                  <span className={styles.tokenSwatches} aria-hidden="true">
                    <i style={{ background: row.light }} title="Light" />
                    <i style={{ background: row.dark }} title="Dark" />
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {active === "spacing" ? (
            <ul className={styles.tokenTable}>
              {SPACE_TOKENS.map((row) => (
                <li key={row.token} className={styles.tokenRow}>
                  <code>{row.token}</code>
                  <span className={styles.tokenMeta}>{row.value}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {active === "radius" ? (
            <ul className={styles.tokenTable}>
              {RADIUS_TOKENS.map((row) => (
                <li key={row.token} className={styles.tokenRow}>
                  <code>{row.token}</code>
                  <span className={styles.tokenMeta}>{row.value}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {active === "type" ? (
            <ul className={styles.tokenTable}>
              {TYPE_TOKENS.map((row) => (
                <li key={row.token} className={styles.tokenRow}>
                  <code>{row.token}</code>
                  <span className={styles.tokenMeta}>{row.sample}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {active === "shadows" ? (
            <ul className={styles.tokenTable}>
              {SHADOW_TOKENS.map((row) => (
                <li key={row.token} className={styles.tokenRow}>
                  <code>{row.token}</code>
                  <span className={styles.tokenMeta}>{row.label}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <Link to="/docs/tokens" className={styles.docsLink}>
            Full token reference
            <Icon name="chevron-right" size="sm" />
          </Link>
        </div>

        <div className={styles.preview} aria-label={`${category.label} live preview`}>
          {active === "colors" ? (
            <div className={styles.previewColors}>
              <ColorPalette columns={2} />
            </div>
          ) : null}

          {active === "spacing" ? (
            <div className={styles.spacingPreview}>
              {SPACE_TOKENS.map((row) => (
                <div key={row.token} className={styles.spacingRow}>
                  <code>{row.value}</code>
                  <span
                    className={styles.spacingBar}
                    style={{ width: `var(${row.token})` }}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          ) : null}

          {active === "radius" ? (
            <div className={styles.radiusPreview}>
              {RADIUS_TOKENS.map((row) => (
                <div key={row.token} className={styles.radiusCard}>
                  <span
                    className={styles.radiusShape}
                    style={{ borderRadius: `var(${row.token})` }}
                    aria-hidden="true"
                  />
                  <code>{row.value}</code>
                </div>
              ))}
            </div>
          ) : null}

          {active === "type" ? (
            <div className={styles.typePreview}>
              {TYPE_PREVIEW.map((row) => (
                <div key={row.label} className={styles.typeRow}>
                  <span className={styles.typeLabel}>{row.label}</span>
                  <div className={styles.typeSample}>{row.node}</div>
                </div>
              ))}
            </div>
          ) : null}

          {active === "shadows" ? (
            <div className={styles.shadowPreview}>
              {SHADOW_TOKENS.map((row) => (
                <div
                  key={row.token}
                  className={styles.shadowCard}
                  style={{ boxShadow: `var(${row.token})` }}
                >
                  <strong>{row.label}</strong>
                  <code>{row.token}</code>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.footerStrip}>
        <div className={styles.footerStat}>
          <strong>5</strong>
          <span>token layers</span>
        </div>
        <div className={styles.footerStat}>
          <strong>2</strong>
          <span>themes</span>
        </div>
        <div className={styles.footerStat}>
          <strong>CSS</strong>
          <span>variables only</span>
        </div>
        <Link to="/docs/styling" className={styles.footerLink}>
          Styling guide
        </Link>
      </div>
    </div>
  );
}
