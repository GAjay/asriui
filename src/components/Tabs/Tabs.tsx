import { forwardRef, useCallback, useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAsriUIId } from "../../hooks/useAsriUIId";
import { appleGentle } from "../../motion/presets";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { TabsContext, useTabsContext } from "./TabsContext";
import { TabsListContext, useTabsListContext } from "./TabsListContext";
import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
  TabsVariant,
} from "./Tabs.types";
import styles from "./Tabs.module.css";

const LIST_VARIANT_CLASS: Record<TabsVariant, string> = {
  default: styles.listDefault ?? "",
  underline: styles.listUnderline ?? "",
  pills: styles.listPills ?? "",
  ghost: styles.listGhost ?? "",
};

const TRIGGER_VARIANT_CLASS: Record<TabsVariant, string> = {
  default: styles.triggerDefault ?? "",
  underline: styles.triggerUnderline ?? "",
  pills: styles.triggerPills ?? "",
  ghost: styles.triggerGhost ?? "",
};

const ACTIVE_VARIANT_CLASS: Record<TabsVariant, string> = {
  default: styles.activeDefault ?? "",
  underline: styles.activeUnderline ?? "",
  pills: styles.activePills ?? "",
  ghost: styles.activeGhost ?? "",
};

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<
  "root" | "list" | "trigger" | "content"
>();

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    value,
    defaultValue = "",
    onValueChange,
    variant = "default",
    animated = true,
    className,
    classNames,
    children,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const idPrefix = useAsriUIId(`tabs-${reactId.replace(/:/g, "")}`);
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const activeValue = value ?? uncontrolled;

  const handleValueChange = useCallback(
    (next: string) => {
      if (value === undefined) setUncontrolled(next);
      onValueChange?.(next);
    },
    [onValueChange, value],
  );

  const contextValue = useMemo(
    () => ({
      value: activeValue,
      onValueChange: handleValueChange,
      idPrefix,
      animated,
      variant,
    }),
    [activeValue, animated, handleValueChange, idPrefix, variant],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <SlotClassNamesProvider classNames={classNames}>
        <div ref={ref} className={cn(styles.root, classNames?.root, className)} data-variant={variant} {...rest}>
          {children}
        </div>
      </SlotClassNamesProvider>
    </TabsContext.Provider>
  );
});
TabsRoot.displayName = "Tabs";

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { variant: variantProp, className, children, ...rest },
  ref,
) {
  const { variant: rootVariant } = useTabsContext("TabsList");
  const listVariant = variantProp ?? rootVariant;

  return (
    <TabsListContext.Provider value={{ variant: listVariant }}>
      <div
        ref={ref}
        role="tablist"
        className={cn(styles.list, LIST_VARIANT_CLASS[listVariant], useSlotClassName("list"), className)}
        data-variant={listVariant}
        {...rest}
      >
        {children}
      </div>
    </TabsListContext.Provider>
  );
});
TabsList.displayName = "Tabs.List";

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { value, disabled = false, className, children, ...rest },
  ref,
) {
  const { value: activeValue, onValueChange, idPrefix } = useTabsContext("TabsTrigger");
  const { variant } = useTabsListContext("TabsTrigger");
  const reducedMotion = useReducedMotion();
  const selected = activeValue === value;
  const tabId = `${idPrefix}-tab-${value}`;
  const panelId = `${idPrefix}-panel-${value}`;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={tabId}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      className={cn(
        styles.trigger,
        TRIGGER_VARIANT_CLASS[variant],
        selected && ACTIVE_VARIANT_CLASS[variant],
        useSlotClassName("trigger"),
        className,
      )}
      onClick={() => onValueChange(value)}
      {...rest}
    >
      {variant === "underline" && selected ? (
        reducedMotion ? (
          <span className={styles.underlineIndicator} aria-hidden="true" />
        ) : (
          <motion.span
            layoutId={`${idPrefix}-underline`}
            className={styles.underlineIndicator}
            transition={appleGentle}
            aria-hidden="true"
          />
        )
      ) : null}
      <span className={styles.triggerLabel}>{children}</span>
    </button>
  );
});
TabsTrigger.displayName = "Tabs.Trigger";

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { value, className, children, ...rest },
  ref,
) {
  const { value: activeValue, idPrefix, animated } = useTabsContext("TabsContent");
  const reducedMotion = useReducedMotion();
  const selected = activeValue === value;
  const tabId = `${idPrefix}-tab-${value}`;
  const panelId = `${idPrefix}-panel-${value}`;
  const shouldAnimate = animated && !reducedMotion;

  const panelProps = {
    ref,
    role: "tabpanel" as const,
    id: panelId,
    "aria-labelledby": tabId,
    tabIndex: 0,
    className: cn(styles.content, useSlotClassName("content"), className),
  };

  if (!shouldAnimate) {
    if (!selected) return null;

    return (
      <div {...panelProps} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {selected ? (
        <motion.div
          key={value}
          {...panelProps}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={appleGentle}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
});
TabsContent.displayName = "Tabs.Content";

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
