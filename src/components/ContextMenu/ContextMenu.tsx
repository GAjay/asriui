import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { ContextMenuProvider, useContextMenu } from "./ContextMenuContext";
import type {
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuProps,
  ContextMenuSeparatorProps,
  ContextMenuTriggerProps,
} from "./ContextMenu.types";
import styles from "./ContextMenu.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<
  "root" | "trigger" | "content" | "item" | "separator"
>();

const ContextMenuRoot = function ContextMenu({
  open,
  defaultOpen = false,
  onOpenChange,
  classNames,
  children,
}: ContextMenuProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isOpen = open ?? uncontrolled;
  const [point, setPoint] = useState({ x: 0, y: 0 });

  const setOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [onOpenChange, open],
  );

  const value = useMemo(
    () => ({ open: isOpen, setOpen, point, setPoint }),
    [isOpen, point, setOpen],
  );

  return (
    <ContextMenuProvider value={value}>
      <SlotClassNamesProvider classNames={classNames}>{children}</SlotClassNamesProvider>
    </ContextMenuProvider>
  );
};

const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(function ContextMenuTrigger(
  { attach = "self", children, className, onContextMenu, ...rest },
  ref,
) {
  const { setOpen, setPoint } = useContextMenu("ContextMenu.Trigger");
  const localRef = useRef<HTMLDivElement | null>(null);

  const openAt = useCallback(
    (event: MouseEvent | ReactMouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setPoint({ x: event.clientX, y: event.clientY });
      setOpen(true);
    },
    [setOpen, setPoint],
  );

  useEffect(() => {
    if (attach !== "parent") return undefined;
    const parent = localRef.current?.parentElement;
    if (!parent) return undefined;
    const onMenu = (event: MouseEvent) => openAt(event);
    parent.addEventListener("contextmenu", onMenu);
    return () => parent.removeEventListener("contextmenu", onMenu);
  }, [attach, openAt]);

  return (
    <div
      ref={(node) => {
        localRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(attach === "parent" ? styles.parentAnchor : styles.trigger, useSlotClassName("trigger"), className)}
      onContextMenu={
        attach === "parent"
          ? undefined
          : (event) => {
              onContextMenu?.(event);
              if (!event.defaultPrevented) openAt(event);
            }
      }
      {...rest}
    >
      {children}
    </div>
  );
});

const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(function ContextMenuContent(
  { className, children, style, ...rest },
  ref,
) {
  const { open, setOpen, point } = useContextMenu("ContextMenu.Content");
  const slotContent = useSlotClassName("content");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState(point);
  const labelId = useId();

  useLayoutEffect(() => {
    if (!open) return;
    const el = menuRef.current;
    const width = el?.offsetWidth ?? 220;
    const height = el?.offsetHeight ?? 160;
    const pad = 8;
    setCoords({
      x: Math.min(Math.max(pad, point.x), window.innerWidth - width - pad),
      y: Math.min(Math.max(pad, point.y), window.innerHeight - height - pad),
    });
  }, [open, point]);

  useEffect(() => {
    if (!open) return undefined;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointer(event: MouseEvent) {
      if (menuRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open, setOpen]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={(node) => {
        menuRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(styles.content, slotContent, className)}
      role="menu"
      aria-labelledby={labelId}
      style={{ top: coords.y, left: coords.x, ...style }}
      {...rest}
    >
      <span id={labelId} className={styles.srOnly}>
        Section actions
      </span>
      {children}
    </div>,
    document.body,
  );
});

const ContextMenuItem = forwardRef<HTMLButtonElement, ContextMenuItemProps>(function ContextMenuItem(
  { children, className, disabled, onSelect, onClick, ...rest },
  ref,
) {
  const { setOpen } = useContextMenu("ContextMenu.Item");

  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      disabled={disabled}
      className={cn(styles.item, useSlotClassName("item"), className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;
        onSelect?.();
        setOpen(false);
      }}
      {...rest}
    >
      {children}
    </button>
  );
});

const ContextMenuSeparator = forwardRef<HTMLHRElement, ContextMenuSeparatorProps>(function ContextMenuSeparator(
  { className, ...rest },
  ref,
) {
  return <hr ref={ref} className={cn(styles.separator, useSlotClassName("separator"), className)} {...rest} />;
});

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  Separator: ContextMenuSeparator,
});
