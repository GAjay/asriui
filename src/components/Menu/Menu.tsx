import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { useAsriUIId } from "../../hooks/useAsriUIId";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { MenuProvider, useMenuContext } from "./MenuContext";
import { computeMenuPosition } from "./menuPosition";
import type {
  MenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuLabelProps,
  MenuProps,
  MenuSeparatorProps,
  MenuTriggerProps,
} from "./Menu.types";
import styles from "./Menu.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<
  "root" | "trigger" | "content" | "item" | "separator" | "label" | "group"
>();

function getMenuItems(container: HTMLElement | null) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not([disabled])'),
  );
}

const MenuRoot = forwardRef<HTMLDivElement, MenuProps>(function Menu(
  {
    open,
    defaultOpen = false,
    onOpenChange,
    placement = "bottom-start",
    closeOnSelect = true,
    portal = true,
    className,
    classNames,
    children,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const idPrefix = useAsriUIId(`menu-${reactId.replace(/:/g, "")}`);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange, open],
  );

  const contextValue = useMemo(
    () => ({
      open: isOpen,
      setOpen,
      triggerId: `${idPrefix}-trigger`,
      contentId: `${idPrefix}-content`,
      placement,
      closeOnSelect,
      portal,
    }),
    [closeOnSelect, idPrefix, isOpen, placement, portal, setOpen],
  );

  return (
    <MenuProvider value={contextValue}>
      <SlotClassNamesProvider classNames={classNames}>
        <div ref={ref} className={cn(styles.root, classNames?.root, className)} {...rest}>
          {children}
        </div>
      </SlotClassNamesProvider>
    </MenuProvider>
  );
});
MenuRoot.displayName = "Menu";

const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(function MenuTrigger(
  { className, children, onClick, ...rest },
  ref,
) {
  const { open, setOpen, triggerId, contentId } = useMenuContext("Menu.Trigger");
  const slotClassName = useSlotClassName("trigger");

  return (
    <button
      ref={ref}
      type="button"
      id={triggerId}
      className={cn(styles.trigger, slotClassName, className)}
      aria-haspopup="true"
      aria-expanded={open}
      aria-controls={contentId}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(!open);
      }}
      {...rest}
    >
      {children}
    </button>
  );
});
MenuTrigger.displayName = "Menu.Trigger";

const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(function MenuContent(
  {
    className,
    children,
    "aria-label": ariaLabel = "Menu",
    role = "menu",
    autoFocus,
    onKeyDown,
    style,
    ...rest
  },
  ref,
) {
  const { open, setOpen, contentId, triggerId, placement, portal } = useMenuContext("Menu.Content");
  const slotClassName = useSlotClassName("content");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [positioned, setPositioned] = useState(false);
  const shouldAutoFocus = autoFocus ?? role === "menu";

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
    setCoords(computeMenuPosition(trigger, content, placement));
    setPositioned(true);
  }, [placement, portal, triggerId]);

  useEffect(() => {
    if (!open) return undefined;

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      const trigger = document.getElementById(triggerId);
      if (trigger?.contains(target)) return;
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
    if (!open || !shouldAutoFocus || role !== "menu") return;
    const items = getMenuItems(rootRef.current);
    items[0]?.focus();
  }, [open, role, shouldAutoFocus]);

  useEffect(() => {
    if (!open) {
      setPositioned(false);
      return undefined;
    }
    if (!portal) {
      setPositioned(true);
      return undefined;
    }

    // Measure after paint so width/height are accurate, then keep in sync.
    updatePosition();
    const frame = window.requestAnimationFrame(() => {
      updatePosition();
      window.requestAnimationFrame(updatePosition);
    });

    const content = rootRef.current;
    const observer =
      content && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updatePosition())
        : null;
    if (content && observer) observer.observe(content);

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, portal, updatePosition]);

  if (!open) return null;

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented || role !== "menu") return;

    const items = getMenuItems(rootRef.current);
    if (!items.length) return;

    const index = items.findIndex((item) => item === document.activeElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = items[(index + 1) % items.length];
      next?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = items[(index - 1 + items.length) % items.length];
      next?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    }
  }

  const contentStyle: CSSProperties = portal
    ? {
        top: coords.top,
        left: coords.left,
        right: "auto",
        opacity: positioned ? 1 : 0,
        ...(style ?? {}),
      }
    : (style ?? {});

  const panel = (
    <div
      ref={setRefs}
      id={contentId}
      role={role}
      aria-label={ariaLabel}
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
      {children}
    </div>
  );

  if (portal && typeof document !== "undefined") {
    return createPortal(panel, document.body);
  }

  return panel;
});
MenuContent.displayName = "Menu.Content";

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  { className, children, disabled, destructive, onClick, onSelect, ...rest },
  ref,
) {
  const { setOpen, closeOnSelect } = useMenuContext("Menu.Item");
  const slotClassName = useSlotClassName("item");

  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      disabled={disabled}
      className={cn(styles.item, destructive && styles.itemDestructive, slotClassName, className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;
        onSelect?.(event.nativeEvent);
        if (closeOnSelect) setOpen(false);
      }}
      {...rest}
    >
      {children}
    </button>
  );
});
MenuItem.displayName = "Menu.Item";

const MenuSeparator = forwardRef<HTMLHRElement, MenuSeparatorProps>(function MenuSeparator(
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
MenuSeparator.displayName = "Menu.Separator";

const MenuLabel = forwardRef<HTMLDivElement, MenuLabelProps>(function MenuLabel(
  { className, children, ...rest },
  ref,
) {
  const slotClassName = useSlotClassName("label");
  return (
    <div ref={ref} role="presentation" className={cn(styles.label, slotClassName, className)} {...rest}>
      {children}
    </div>
  );
});
MenuLabel.displayName = "Menu.Label";

const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(function MenuGroup(
  { className, children, label, ...rest },
  ref,
) {
  const slotClassName = useSlotClassName("group");
  return (
    <div ref={ref} role="group" aria-label={label} className={cn(styles.group, slotClassName, className)} {...rest}>
      {label ? <MenuLabel>{label}</MenuLabel> : null}
      {children}
    </div>
  );
});
MenuGroup.displayName = "Menu.Group";

/**
 * Dropdown menu with keyboard navigation and compound parts.
 *
 * @example
 * ```tsx
 * <Menu>
 *   <Menu.Trigger>Options</Menu.Trigger>
 *   <Menu.Content>
 *     <Menu.Item onSelect={() => edit()}>Edit</Menu.Item>
 *     <Menu.Separator />
 *     <Menu.Item destructive onSelect={() => remove()}>Delete</Menu.Item>
 *   </Menu.Content>
 * </Menu>
 * ```
 */
export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  Separator: MenuSeparator,
  Label: MenuLabel,
  Group: MenuGroup,
});
