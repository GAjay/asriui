import { createElement, forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { TypographyProps, TypographyVariant } from "./Typography.types";
import styles from "./Typography.module.css";

const VARIANT_CLASS: Record<TypographyVariant, string | undefined> = {
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  h4: styles.h4,
  p: styles.p,
  lead: styles.lead,
  small: styles.small,
  muted: styles.muted,
  code: styles.code,
};

const DEFAULT_TAG: Record<TypographyVariant, TypographyProps["as"]> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  lead: "p",
  small: "small",
  muted: "p",
  code: "code",
};

function TypographyRoot(
  {
    variant = "p",
    as,
    align = "left",
    truncate = false,
    className,
    children,
    ...rest
  }: TypographyProps,
  ref: React.Ref<HTMLElement>,
) {
  const tag = as ?? DEFAULT_TAG[variant] ?? "p";
  const alignClass =
    align === "center" ? styles.alignCenter : align === "right" ? styles.alignRight : styles.alignLeft;

  return createElement(
    tag,
    {
      ref,
      className: cn(VARIANT_CLASS[variant], alignClass, truncate && styles.truncate, className),
      ...rest,
    },
    children,
  );
}

const TypographyBase = forwardRef(TypographyRoot);
TypographyBase.displayName = "Typography";

/** Semantic typography presets with accessible defaults and token-based styles. */
export const Typography = Object.assign(TypographyBase, {
  H1: forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(function H1(props, ref) {
    return <TypographyBase ref={ref} variant="h1" {...props} />;
  }),
  H2: forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(function H2(props, ref) {
    return <TypographyBase ref={ref} variant="h2" {...props} />;
  }),
  H3: forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(function H3(props, ref) {
    return <TypographyBase ref={ref} variant="h3" {...props} />;
  }),
  H4: forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(function H4(props, ref) {
    return <TypographyBase ref={ref} variant="h4" {...props} />;
  }),
  P: forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(function P(props, ref) {
    return <TypographyBase ref={ref} variant="p" {...props} />;
  }),
  Lead: forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(function Lead(props, ref) {
    return <TypographyBase ref={ref} variant="lead" {...props} />;
  }),
  Small: forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(function Small(props, ref) {
    return <TypographyBase ref={ref} variant="small" {...props} />;
  }),
  Muted: forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(function Muted(props, ref) {
    return <TypographyBase ref={ref} variant="muted" {...props} />;
  }),
  Code: forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(function Code(props, ref) {
    return <TypographyBase ref={ref} variant="code" {...props} />;
  }),
});

Typography.H1.displayName = "Typography.H1";
Typography.H2.displayName = "Typography.H2";
Typography.H3.displayName = "Typography.H3";
Typography.H4.displayName = "Typography.H4";
Typography.P.displayName = "Typography.P";
Typography.Lead.displayName = "Typography.Lead";
Typography.Small.displayName = "Typography.Small";
Typography.Muted.displayName = "Typography.Muted";
Typography.Code.displayName = "Typography.Code";
