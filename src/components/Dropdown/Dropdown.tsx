import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ForwardedRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useAxiomId } from "../../hooks/useAxiomId";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { computeMenuPosition } from "../Menu/menuPosition";
import { DropdownProvider, useDropdownContext } from "./DropdownContext";
import { getNodeSearchText, matchesSearchText, emitSelection, toValueArray } from "./dropdown.utils";
import type {
  DropdownContentProps,
  DropdownGroupProps,
  DropdownItemProps,
  DropdownLabelProps,
  DropdownProps,
  DropdownSeparatorProps,
  DropdownTriggerProps,
} from "./Dropdown.types";
import styles from "./Dropdown.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<
  "root" | "trigger" | "content" | "item" | "separator" | "label" | "group" | "search" | "list"
>();

function getListOptions(container: HTMLElement | null) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLButtonElement>('[role="option"]:not([disabled]):not([hidden])'),
  );
}

function toCssSize(value: number | string | undefined, fallback: string) {
  if (value === undefined) return fallback;
  return typeof value === "number" ? `${value}px` : value;
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const DropdownRoot = forwardRef<HTMLDivElement, DropdownProps>(function DropdownRoot(
  {
    value,
    defaultValue,
    onValueChange,
    options = [],
    placeholder = "Select an option",
    label,
    helperText,
    error,
    disabled = false,
    required = false,
    multiple = false,
    size = "md",
    placement = "bottom-start",
    searchable = false,
    searchPlaceholder,
    listMaxHeight = "16rem",
    portal = true,
    className,
    classNames,
    children,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const idPrefix = useAxiomId(`dropdown-${reactId.replace(/:/g, "")}`);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() => toValueArray(defaultValue));
  const selectedValues = value !== undefined ? toValueArray(value) : uncontrolledValue;
  const selectedValue = selectedValues[0];
  const [itemLabels, setItemLabels] = useState<Map<string, ReactNode>>(new Map());
  const [itemSearchText, setItemSearchText] = useState<Map<string, string>>(new Map());

  const registerItem = useCallback((itemValue: string, itemLabel: ReactNode, searchText?: string) => {
    setItemLabels((prev) => {
      const next = new Map(prev);
      next.set(itemValue, itemLabel);
      return next;
    });
    setItemSearchText((prev) => {
      const next = new Map(prev);
      next.set(itemValue, searchText ?? getNodeSearchText(itemLabel));
      return next;
    });
  }, []);

  const unregisterItem = useCallback((itemValue: string) => {
    setItemLabels((prev) => {
      if (!prev.has(itemValue)) return prev;
      const next = new Map(prev);
      next.delete(itemValue);
      return next;
    });
    setItemSearchText((prev) => {
      if (!prev.has(itemValue)) return prev;
      const next = new Map(prev);
      next.delete(itemValue);
      return next;
    });
  }, []);

  const getItemLabel = useCallback((itemValue: string) => itemLabels.get(itemValue), [itemLabels]);
  const getItemSearchText = useCallback(
    (itemValue: string) => itemSearchText.get(itemValue),
    [itemSearchText],
  );

  const setValue = useCallback(
    (next: string) => {
      const current = value !== undefined ? toValueArray(value) : uncontrolledValue;
      const nextValues = multiple
        ? current.includes(next)
          ? current.filter((entry) => entry !== next)
          : [...current, next]
        : [next];

      if (value === undefined) setUncontrolledValue(nextValues);
      onValueChange?.(emitSelection(multiple, nextValues));
    },
    [multiple, onValueChange, uncontrolledValue, value],
  );

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) setQuery("");
  }, []);

  const filteredOptions = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    return options.filter((option) =>
      matchesSearchText(getNodeSearchText(option.label), query),
    );
  }, [options, query, searchable]);

  const contextValue = useMemo(
    () => ({
      open,
      setOpen: handleOpenChange,
      value: selectedValue,
      values: selectedValues,
      multiple,
      setValue,
      triggerId: `${idPrefix}-trigger`,
      contentId: `${idPrefix}-content`,
      placement,
      placeholder,
      disabled,
      error,
      searchable,
      query,
      setQuery,
      portal,
      listMaxHeight,
      size,
      registerItem,
      unregisterItem,
      getItemLabel,
      getItemSearchText,
      optionItems: options,
    }),
    [
      disabled,
      error,
      getItemLabel,
      getItemSearchText,
      handleOpenChange,
      idPrefix,
      listMaxHeight,
      open,
      options,
      placeholder,
      placement,
      portal,
      query,
      registerItem,
      searchable,
      selectedValue,
      selectedValues,
      multiple,
      setValue,
      size,
      unregisterItem,
    ],
  );

  const hasCompoundChildren = Boolean(children);

  return (
    <DropdownProvider value={contextValue}>
      <SlotClassNamesProvider classNames={classNames}>
        <div ref={ref} className={cn(styles.root, classNames?.root, className)} {...rest}>
          {label ? (
            <label className={styles.label} htmlFor={contextValue.triggerId}>
              {label}
              {required ? (
                <span className={styles.required} aria-hidden="true">
                  *
                </span>
              ) : null}
            </label>
          ) : null}

          {hasCompoundChildren ? (
            children
          ) : (
            <>
              <DropdownTrigger searchPlaceholder={searchPlaceholder} />
              <DropdownContent aria-label={typeof label === "string" ? label : "Options"}>
                {filteredOptions.length ? (
                  filteredOptions.map((option) => (
                    <DropdownItem key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </DropdownItem>
                  ))
                ) : (
                  <div className={styles.emptyState} role="status">
                    No matches found
                  </div>
                )}
              </DropdownContent>
            </>
          )}

          {error ? (
            <p className={cn(styles.message, styles.error)} role="alert">
              {error}
            </p>
          ) : helperText ? (
            <p className={styles.message}>{helperText}</p>
          ) : null}
        </div>
      </SlotClassNamesProvider>
    </DropdownProvider>
  );
});
DropdownRoot.displayName = "Dropdown";

const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps & { searchPlaceholder?: string }>(
  function DropdownTrigger({ className, children, searchPlaceholder, onClick, onKeyDown, ...rest }, ref) {
    const {
      open,
      setOpen,
      values,
      multiple,
      setValue,
      triggerId,
      contentId,
      placeholder,
      disabled,
      error,
      searchable,
      query,
      setQuery,
      getItemLabel,
      optionItems,
      size,
    } = useDropdownContext("Dropdown.Trigger");
    const slotClassName = useSlotClassName("trigger");
    const sizeClass = size === "sm" ? styles.sizeSm : undefined;
    const inputRef = useRef<HTMLInputElement | null>(null);

    function resolveLabel(itemValue: string) {
      return getItemLabel(itemValue) ?? optionItems.find((option) => option.value === itemValue)?.label ?? itemValue;
    }

    const selectedLabels = values.map((itemValue) => ({
      value: itemValue,
      label: resolveLabel(itemValue),
    }));
    const selectedLabel = selectedLabels[0]?.label;
    const hasSelection = values.length > 0;
    const joinedLabels = selectedLabels.map((entry) => String(entry.label)).join(", ");

    const displayValue = open && searchable ? query : multiple ? "" : selectedLabel ? String(selectedLabel) : "";

    const chips = multiple && hasSelection
      ? selectedLabels.map((entry) => (
          <span key={entry.value} className={styles.chip}>
            <span className={styles.chipLabel}>{entry.label}</span>
            <button
              type="button"
              className={styles.chipRemove}
              aria-label={`Remove ${String(entry.label)}`}
              disabled={disabled}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setValue(entry.value);
              }}
            >
              ×
            </button>
          </span>
        ))
      : null;

    useEffect(() => {
      if (open && searchable) {
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }, [open, searchable]);

    function focusNextOption(backward = false) {
      const list = document.getElementById(contentId);
      const items = getListOptions(list);
      if (!items.length) return;
      const currentIndex = items.findIndex((item) => item === document.activeElement);
      const nextIndex = backward
        ? (currentIndex - 1 + items.length) % items.length
        : (currentIndex + 1) % items.length;
      (currentIndex === -1 ? items[0] : items[nextIndex])?.focus();
    }

    if (searchable) {
      return (
        <div
          className={cn(
            styles.combobox,
            multiple && styles.comboboxMultiple,
            sizeClass,
            error ? styles.comboboxError : undefined,
            disabled && styles.comboboxDisabled,
            slotClassName,
            className,
          )}
          data-dropdown-trigger=""
        >
          {chips}
          <input
            ref={inputRef}
            id={triggerId}
            className={styles.comboboxInput}
            value={displayValue}
            placeholder={hasSelection && multiple && !open ? "" : (searchPlaceholder ?? placeholder)}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={contentId}
            onChange={(event) => {
              setQuery(event.target.value);
              if (!open) setOpen(true);
            }}
            onFocus={() => {
              if (!disabled) setOpen(true);
            }}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && multiple && !query && values.length) {
                setValue(values[values.length - 1]!);
                return;
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                if (!open) setOpen(true);
                focusNextOption(false);
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                focusNextOption(true);
              } else if (event.key === "Escape") {
                event.preventDefault();
                setOpen(false);
              }
            }}
          />
          <button
            ref={ref}
            type="button"
            className={styles.comboboxToggle}
            aria-label="Toggle options"
            disabled={disabled}
            tabIndex={-1}
            onClick={() => {
              if (!disabled) setOpen(!open);
            }}
          >
            <ChevronIcon className={styles.chevron} />
          </button>
        </div>
      );
    }

    const triggerLabel = children ?? (multiple
      ? (hasSelection ? joinedLabels : placeholder)
      : (selectedLabel || placeholder));

    if (multiple) {
      return (
        <div
          ref={ref as ForwardedRef<HTMLDivElement> as never}
          id={triggerId}
          data-dropdown-trigger=""
          role="combobox"
          tabIndex={disabled ? -1 : 0}
          className={cn(
            styles.trigger,
            styles.triggerMultiple,
            sizeClass,
            slotClassName,
            !hasSelection && styles.triggerPlaceholder,
            error ? styles.triggerError : undefined,
            className,
          )}
          aria-label={placeholder}
          aria-invalid={error ? true : undefined}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={contentId}
          aria-disabled={disabled || undefined}
          onClick={(event) => {
            if (disabled) return;
            const target = event.target as HTMLElement;
            if (target.closest(`.${styles.chipRemove}`)) return;
            setOpen(!open);
          }}
          onKeyDown={(event) => {
            if (disabled) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpen(!open);
            } else if (event.key === "ArrowDown") {
              event.preventDefault();
              setOpen(true);
            } else if (event.key === "Escape") {
              setOpen(false);
            }
          }}
        >
          {children ? (
            <span className={styles.triggerValue}>{children}</span>
          ) : hasSelection ? (
            <span className={styles.chipList}>{chips}</span>
          ) : (
            <span className={styles.triggerValue}>{placeholder}</span>
          )}
          <ChevronIcon className={styles.chevron} />
        </div>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        id={triggerId}
        data-dropdown-trigger=""
        className={cn(
          styles.trigger,
          multiple && styles.triggerMultiple,
          sizeClass,
          slotClassName,
          !hasSelection && styles.triggerPlaceholder,
          error ? styles.triggerError : undefined,
          className,
        )}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && !disabled) setOpen(!open);
        }}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {multiple && hasSelection && !children ? (
          <span className={styles.chipList}>{chips}</span>
        ) : (
          <span className={styles.triggerValue}>{triggerLabel}</span>
        )}
        <ChevronIcon className={styles.chevron} />
      </button>
    );
  },
);
DropdownTrigger.displayName = "Dropdown.Trigger";

const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(function DropdownContent(
  { className, children, "aria-label": ariaLabel = "Options", onKeyDown, style, ...rest },
  ref,
) {
  const { open, setOpen, contentId, triggerId, placement, portal, listMaxHeight, searchable, multiple } =
    useDropdownContext("Dropdown.Content");
  const slotClassName = useSlotClassName("content");
  const listClassName = useSlotClassName("list");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [positioned, setPositioned] = useState(false);

  const setRefs = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  const updatePosition = useCallback(() => {
    if (!portal) return;
    const trigger = document.getElementById(triggerId);
    const content = rootRef.current;
    if (!trigger || !content) return;
    const next = computeMenuPosition(trigger, content, placement);
    setCoords(next);
    setPositioned(true);
    content.style.minWidth = `${Math.max(trigger.offsetWidth, 176)}px`;
  }, [placement, portal, triggerId]);

  useEffect(() => {
    if (!open) return undefined;

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      const trigger = document.getElementById(triggerId);
      if (trigger?.contains(target)) return;
      const triggerShell = trigger?.closest("[data-dropdown-trigger]");
      if (triggerShell?.contains(target)) return;
      setOpen(false);
    }

    function onKeyDownDocument(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        document.getElementById(triggerId)?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDownDocument);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDownDocument);
    };
  }, [open, setOpen, triggerId]);

  useEffect(() => {
    if (!open || searchable) return;
    const items = getListOptions(rootRef.current);
    const selected = items.find((item) => item.getAttribute("aria-selected") === "true");
    (selected ?? items[0])?.focus();
  }, [open, searchable]);

  useEffect(() => {
    if (!open) {
      setPositioned(false);
      return undefined;
    }
    if (!portal) {
      setPositioned(true);
      return undefined;
    }
    const frame = window.requestAnimationFrame(() => {
      updatePosition();
      window.requestAnimationFrame(updatePosition);
    });
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, portal, updatePosition]);

  if (!open) return null;

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const items = getListOptions(rootRef.current);
    if (!items.length) return;

    const index = items.findIndex((item) => item === document.activeElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    }
  }

  const contentStyle: CSSProperties = {
    ...(portal
      ? {
          top: coords.top,
          left: coords.left,
          right: "auto",
          opacity: positioned ? 1 : 0,
        }
      : {}),
    ...(style ?? {}),
  };

  const listStyle: CSSProperties = {
    maxHeight: toCssSize(listMaxHeight, "16rem"),
  };

  const panel = (
    <div
      ref={setRefs}
      id={contentId}
      role="listbox"
      tabIndex={-1}
      aria-label={ariaLabel}
      aria-multiselectable={multiple || undefined}
      data-placement={placement}
      className={cn(
        styles.content,
        portal ? styles.contentPortal : styles.contentInline,
        slotClassName,
        className,
      )}
      style={contentStyle}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div
        className={cn(styles.listViewport, listClassName)}
        style={listStyle}
        data-lenis-prevent=""
      >
        {children}
      </div>
    </div>
  );

  if (portal && typeof document !== "undefined") {
    return createPortal(panel, document.body);
  }

  return panel;
});
DropdownContent.displayName = "Dropdown.Content";

const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(function DropdownItem(
  { className, children, value: itemValue, disabled, searchText, onClick, ...rest },
  ref,
) {
  const { values, setValue, setOpen, registerItem, unregisterItem, searchable, query, getItemSearchText, multiple } =
    useDropdownContext("Dropdown.Item");
  const slotClassName = useSlotClassName("item");
  const selected = values.includes(itemValue);

  useEffect(() => {
    registerItem(itemValue, children, searchText);
    return () => unregisterItem(itemValue);
  }, [children, itemValue, registerItem, searchText, unregisterItem]);

  const text = searchText ?? getItemSearchText(itemValue) ?? getNodeSearchText(children);
  const visible = !searchable || matchesSearchText(text, query);
  if (!visible) return null;

  return (
    <button
      ref={ref}
      type="button"
      role="option"
      aria-selected={selected}
      disabled={disabled}
      className={cn(styles.item, selected && styles.itemSelected, slotClassName, className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;
        setValue(itemValue);
        if (!multiple) setOpen(false);
      }}
      {...rest}
    >
      <span>{children}</span>
      {selected ? (
        <span className={styles.check} aria-hidden="true">
          ✓
        </span>
      ) : null}
    </button>
  );
});
DropdownItem.displayName = "Dropdown.Item";

const DropdownSeparator = forwardRef<HTMLHRElement, DropdownSeparatorProps>(function DropdownSeparator(
  { className, ...rest },
  ref,
) {
  const slotClassName = useSlotClassName("separator");
  return (
    <hr
      ref={ref}
      aria-orientation="horizontal"
      className={cn(styles.separator, slotClassName, className)}
      {...rest}
    />
  );
});
DropdownSeparator.displayName = "Dropdown.Separator";

const DropdownLabel = forwardRef<HTMLDivElement, DropdownLabelProps>(function DropdownLabel(
  { className, children, ...rest },
  ref,
) {
  const slotClassName = useSlotClassName("label");
  return (
    <div
      ref={ref}
      role="presentation"
      className={cn(styles.labelHeading, slotClassName, className)}
      {...rest}
    >
      {children}
    </div>
  );
});
DropdownLabel.displayName = "Dropdown.Label";

const DropdownGroup = forwardRef<HTMLDivElement, DropdownGroupProps>(function DropdownGroup(
  { className, children, label, ...rest },
  ref,
) {
  const slotClassName = useSlotClassName("group");
  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={cn(styles.group, slotClassName, className)}
      {...rest}
    >
      {label ? <DropdownLabel>{label}</DropdownLabel> : null}
      {children}
    </div>
  );
});
DropdownGroup.displayName = "Dropdown.Group";

/**
 * Select-style dropdown for choosing a single value from a list.
 */
export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
  Separator: DropdownSeparator,
  Label: DropdownLabel,
  Group: DropdownGroup,
});
