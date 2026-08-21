import { createElement, forwardRef, useMemo } from "react";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { HeroContext, useHeroContext } from "./HeroContext";
import type {
  HeroActionsProps,
  HeroBackground,
  HeroBackgroundProps,
  HeroCopyProps,
  HeroDescriptionProps,
  HeroEyebrowProps,
  HeroMediaProps,
  HeroProps,
  HeroTitleProps,
} from "./Hero.types";
import styles from "./Hero.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<
  "root" | "background" | "copy" | "eyebrow" | "title" | "description" | "actions" | "media"
>();

const BACKGROUND_CLASS: Record<HeroBackground, string | undefined> = {
  none: undefined,
  muted: styles.muted,
  dotted: styles.dotted,
  grid: styles.grid,
  glow: styles.glow,
  aurora: styles.aurora,
  mesh: styles.mesh,
};

const HeroRoot = forwardRef<HTMLElement, HeroProps>(function Hero(
  {
    variant = "full",
    textSide = "left",
    align = "start",
    size = "lg",
    background = "none",
    animated = true,
    as = "section",
    className,
    classNames,
    children,
    ...rest
  },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const motionOn = animated && !reducedMotion && background !== "none";
  const value = useMemo(
    () => ({ variant, textSide, align, size }),
    [align, size, textSide, variant],
  );

  return (
    <HeroContext.Provider value={value}>
      <SlotClassNamesProvider classNames={classNames}>
        {createElement(
          as,
          {
            ref,
            className: cn(
              styles.root,
              variant === "split" ? styles.split : styles.full,
              align === "center" ? styles.alignCenter : styles.alignStart,
              size === "md" ? styles.sizeMd : styles.sizeLg,
              classNames?.root,
              className,
            ),
            "data-variant": variant,
            "data-text-side": textSide,
            "data-align": align,
            "data-background": background,
            "data-animated": motionOn ? "true" : undefined,
            ...rest,
          },
          background !== "none" ? (
            <div
              key="hero-backdrop"
              className={cn(
                styles.backdrop,
                BACKGROUND_CLASS[background],
                motionOn ? styles.animatedBackdrop : undefined,
                classNames?.background,
              )}
              aria-hidden="true"
            />
          ) : null,
          children,
        )}
      </SlotClassNamesProvider>
    </HeroContext.Provider>
  );
});
HeroRoot.displayName = "Hero";

const HeroCopy = forwardRef<HTMLDivElement, HeroCopyProps>(function HeroCopy(
  { className, children, ...rest },
  ref,
) {
  useHeroContext("Hero.Copy");
  return (
    <div ref={ref} className={cn(styles.copy, useSlotClassName("copy"), className)} {...rest}>
      {children}
    </div>
  );
});
HeroCopy.displayName = "Hero.Copy";

const HeroEyebrow = forwardRef<HTMLParagraphElement, HeroEyebrowProps>(function HeroEyebrow(
  { className, children, ...rest },
  ref,
) {
  useHeroContext("Hero.Eyebrow");
  return (
    <p ref={ref} className={cn(styles.eyebrow, useSlotClassName("eyebrow"), className)} {...rest}>
      {children}
    </p>
  );
});
HeroEyebrow.displayName = "Hero.Eyebrow";

const HeroTitle = forwardRef<HTMLHeadingElement, HeroTitleProps>(function HeroTitle(
  { className, children, as = "h1", ...rest },
  ref,
) {
  useHeroContext("Hero.Title");
  return createElement(
    as,
    { ref, className: cn(styles.title, useSlotClassName("title"), className), ...rest },
    children,
  );
});
HeroTitle.displayName = "Hero.Title";

const HeroDescription = forwardRef<HTMLParagraphElement, HeroDescriptionProps>(function HeroDescription(
  { className, children, ...rest },
  ref,
) {
  useHeroContext("Hero.Description");
  return (
    <p ref={ref} className={cn(styles.description, useSlotClassName("description"), className)} {...rest}>
      {children}
    </p>
  );
});
HeroDescription.displayName = "Hero.Description";

const HeroActions = forwardRef<HTMLDivElement, HeroActionsProps>(function HeroActions(
  { className, children, ...rest },
  ref,
) {
  useHeroContext("Hero.Actions");
  return (
    <div ref={ref} className={cn(styles.actions, useSlotClassName("actions"), className)} {...rest}>
      {children}
    </div>
  );
});
HeroActions.displayName = "Hero.Actions";

const HeroMedia = forwardRef<HTMLDivElement, HeroMediaProps>(function HeroMedia(
  { className, children, ...rest },
  ref,
) {
  useHeroContext("Hero.Media");
  return (
    <div ref={ref} className={cn(styles.media, useSlotClassName("media"), className)} {...rest}>
      {children}
    </div>
  );
});
HeroMedia.displayName = "Hero.Media";

const HeroBackground = forwardRef<HTMLDivElement, HeroBackgroundProps>(function HeroBackground(
  { variant = "none", animated = true, className, children, ...rest },
  ref,
) {
  useHeroContext("Hero.Background");
  const reducedMotion = useReducedMotion();
  const motionOn = animated && !reducedMotion && variant !== "none";

  return (
    <div
      ref={ref}
      className={cn(
        styles.backdrop,
        BACKGROUND_CLASS[variant],
        motionOn ? styles.animatedBackdrop : undefined,
        children ? styles.backdropCustom : undefined,
        useSlotClassName("background"),
        className,
      )}
      aria-hidden={children ? undefined : true}
      data-background={variant}
      {...rest}
    >
      {children}
    </div>
  );
});
HeroBackground.displayName = "Hero.Background";

export const Hero = Object.assign(HeroRoot, {
  Copy: HeroCopy,
  Eyebrow: HeroEyebrow,
  Title: HeroTitle,
  Description: HeroDescription,
  Actions: HeroActions,
  Media: HeroMedia,
  Background: HeroBackground,
});
