import { forwardRef, useCallback, useId, useMemo, useState, type ReactNode } from "react";
import { useAxiomId } from "../../hooks/useAxiomId";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
} from "./AccordionContext";
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
  AccordionType,
} from "./Accordion.types";
import styles from "./Accordion.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<
  "root" | "item" | "trigger" | "content"
>();

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function renderSideContent(content: ReactNode, className?: string) {
  if (!content) return null;
  return <span className={className}>{content}</span>;
}

function normalizeMultipleValue(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function getDefaultState(type: AccordionType, defaultValue?: string | string[]) {
  if (type === "multiple") return normalizeMultipleValue(defaultValue);
  if (typeof defaultValue === "string") return defaultValue;
  return "";
}

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    type = "single",
    collapsible = false,
    value,
    defaultValue,
    onValueChange,
    variant = "default",
    disabled = false,
    className,
    classNames,
    children,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const idPrefix = useAxiomId(`accordion-${reactId.replace(/:/g, "")}`);
  const [uncontrolled, setUncontrolled] = useState<string | string[]>(() =>
    getDefaultState(type, defaultValue),
  );
  const openValue = value ?? uncontrolled;

  const isOpen = useCallback(
    (itemValue: string) => {
      if (type === "single") return openValue === itemValue;
      return normalizeMultipleValue(openValue).includes(itemValue);
    },
    [openValue, type],
  );

  const toggle = useCallback(
    (itemValue: string) => {
      if (type === "single") {
        const currentlyOpen = openValue === itemValue;
        const resolved = currentlyOpen ? (collapsible ? "" : itemValue) : itemValue;
        if (value === undefined) setUncontrolled(resolved);
        onValueChange?.(resolved);
        return;
      }

      const current = normalizeMultipleValue(openValue);
      const next = current.includes(itemValue)
        ? current.filter((entry) => entry !== itemValue)
        : [...current, itemValue];
      if (value === undefined) setUncontrolled(next);
      onValueChange?.(next);
    },
    [collapsible, onValueChange, openValue, type, value],
  );

  const contextValue = useMemo(
    () => ({
      type,
      collapsible,
      variant,
      disabled,
      idPrefix,
      isOpen,
      toggle,
    }),
    [collapsible, disabled, idPrefix, isOpen, toggle, type, variant],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <SlotClassNamesProvider classNames={classNames}>
        <div
          ref={ref}
          className={cn(styles.root, classNames?.root, className)}
          data-variant={variant}
          {...rest}
        >
          {children}
        </div>
      </SlotClassNamesProvider>
    </AccordionContext.Provider>
  );
});
AccordionRoot.displayName = "Accordion";

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { value: itemValue, disabled: itemDisabled = false, className, children, ...rest },
  ref,
) {
  const { variant, disabled: rootDisabled, idPrefix, isOpen } = useAccordionContext("Accordion.Item");
  const open = isOpen(itemValue);
  const disabled = rootDisabled || itemDisabled;
  const triggerId = `${idPrefix}-trigger-${itemValue}`;
  const contentId = `${idPrefix}-content-${itemValue}`;

  const itemContextValue = useMemo(
    () => ({
      value: itemValue,
      disabled,
      open,
      triggerId,
      contentId,
    }),
    [contentId, disabled, itemValue, open, triggerId],
  );

  return (
    <AccordionItemContext.Provider value={itemContextValue}>
      <div
        ref={ref}
        className={cn(styles.item, useSlotClassName("item"), className)}
        data-state={open ? "open" : "closed"}
        data-variant={variant}
        data-disabled={disabled ? "true" : undefined}
        {...rest}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});
AccordionItem.displayName = "Accordion.Item";

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(function AccordionTrigger(
  {
    className,
    children,
    icon,
    startContent,
    endContent,
    hideIndicator = false,
    disabled: triggerDisabled = false,
    onClick,
    ...rest
  },
  ref,
) {
  const { toggle } = useAccordionContext("Accordion.Trigger");
  const { value, disabled: itemDisabled, open, triggerId, contentId } = useAccordionItemContext(
    "Accordion.Trigger",
  );
  const disabled = itemDisabled || triggerDisabled;
  const leading = startContent ?? icon;

  return (
    <button
      ref={ref}
      id={triggerId}
      type="button"
      className={cn(styles.trigger, useSlotClassName("trigger"), className)}
      data-open={open ? "true" : "false"}
      aria-expanded={open}
      aria-controls={contentId}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) toggle(value);
      }}
      {...rest}
    >
      {renderSideContent(leading, styles.startContent)}
      <span className={styles.label}>{children}</span>
      {renderSideContent(endContent, styles.endContent)}
      {!hideIndicator ? (
        <span className={styles.indicator} aria-hidden="true">
          <ChevronIcon />
        </span>
      ) : null}
    </button>
  );
});
AccordionTrigger.displayName = "Accordion.Trigger";

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(function AccordionContent(
  { className, children, ...rest },
  ref,
) {
  const { open, contentId, triggerId } = useAccordionItemContext("Accordion.Content");

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      className={cn(styles.panel, useSlotClassName("content"), className)}
      data-open={open ? "true" : "false"}
      {...(open ? {} : ({ inert: "" } as { inert?: string }))}
      {...rest}
    >
      <div className={styles.panelInner}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
});
AccordionContent.displayName = "Accordion.Content";

/** Expandable sections with single or multiple selection, side content slots, and animated panels. */
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
