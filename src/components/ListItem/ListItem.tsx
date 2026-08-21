import { forwardRef } from "react";
import { motion } from "framer-motion";
import {
  applePress,
  appleSpring,
  staggerContainerVariants,
  staggerItemVariants,
} from "../../motion/presets";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import type { ListItemProps, ListProps } from "./ListItem.types";
import styles from "./ListItem.module.css";

function ListItemContent({
  title,
  description,
  media,
  trailing,
}: Pick<ListItemProps, "title" | "description" | "media" | "trailing">) {
  return (
    <>
      {media ? <span className={styles.media}>{media}</span> : null}
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {trailing ? <span className={styles.trailing}>{trailing}</span> : null}
    </>
  );
}

/**
 * Semantic list container for `ListItem` rows with optional staggered entrance.
 */
export const List = forwardRef<HTMLUListElement, ListProps>(function List(
  { className, children, unstyled = true, motion: motionEnabled = true, ...rest },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const animate = motionEnabled && !reducedMotion;

  return (
    <motion.ul
      ref={ref}
      className={cn(unstyled && styles.list, className)}
      variants={staggerContainerVariants}
      initial={animate ? "hidden" : undefined}
      whileInView={animate ? "visible" : undefined}
      viewport={{ once: true, margin: "-24px" }}
      {...rest}
    >
      {children}
    </motion.ul>
  );
});
List.displayName = "List";

/**
 * Accessible list row with optional media, description, trailing content, and press motion.
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  {
    title,
    description,
    media,
    trailing,
    selected = false,
    disabled = false,
    interactive = false,
    motion: motionEnabled = true,
    className,
    onClick,
    ...rest
  },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const animate = motionEnabled && !reducedMotion && !disabled;
  const rowClassName = cn(
    styles.row,
    interactive ? styles.interactive : styles.staticRow,
    selected && styles.selected,
    disabled && styles.disabled,
    className,
  );

  if (interactive) {
    return (
      <motion.li
        ref={ref}
        className={styles.item}
        variants={staggerItemVariants}
        layout={animate ? "position" : false}
        {...rest}
      >
        <motion.button
          type="button"
          className={cn(rowClassName, styles.interactiveButton)}
          disabled={disabled}
          aria-current={selected ? "true" : undefined}
          onClick={onClick}
          whileTap={animate ? applePress : undefined}
          transition={appleSpring}
        >
          <ListItemContent
            title={title}
            description={description}
            media={media}
            trailing={trailing}
          />
        </motion.button>
      </motion.li>
    );
  }

  return (
    <motion.li
      ref={ref}
      className={styles.item}
      aria-current={selected ? "true" : undefined}
      variants={staggerItemVariants}
      layout={animate ? "position" : false}
      {...rest}
    >
      <div className={rowClassName}>
        <ListItemContent
          title={title}
          description={description}
          media={media}
          trailing={trailing}
        />
      </div>
    </motion.li>
  );
});
ListItem.displayName = "ListItem";
