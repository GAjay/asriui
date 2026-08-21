import { forwardRef, createElement } from "react";
import { motion } from "framer-motion";
import { useMotionPresetsOptional } from "../../motion/MotionContext";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import type {
  CardContentProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from "./Card.types";
import styles from "./Card.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<
  "root" | "header" | "title" | "content" | "footer"
>();

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, classNames, children, motion: motionEnabled = true, ...rest },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const { pack, enabled: globalMotion } = useMotionPresetsOptional();
  const animate = motionEnabled && globalMotion && !reducedMotion;

  return (
    <SlotClassNamesProvider classNames={classNames}>
      <motion.div
        ref={ref}
        className={cn(styles.root, classNames?.root, className)}
        variants={pack.scaleIn}
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
        whileHover={
          animate
            ? { y: -2, boxShadow: "var(--axiom-shadow-md)", transition: pack.reveal }
            : undefined
        }
        transition={pack.reveal}
        {...rest}
      >
        {children}
      </motion.div>
    </SlotClassNamesProvider>
  );
});
CardRoot.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.header, useSlotClassName("header"), className)} {...rest}>
      {children}
    </div>
  );
});
CardHeader.displayName = "Card.Header";

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { className, children, as = "h2", ...rest },
  ref,
) {
  return createElement(
    as,
    { ref, className: cn(styles.title, useSlotClassName("title"), className), ...rest },
    children,
  );
});
CardTitle.displayName = "Card.Title";

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.content, useSlotClassName("content"), className)} {...rest}>
      {children}
    </div>
  );
});
CardContent.displayName = "Card.Content";

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.footer, useSlotClassName("footer"), className)} {...rest}>
      {children}
    </div>
  );
});
CardFooter.displayName = "Card.Footer";

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
  Footer: CardFooter,
});
