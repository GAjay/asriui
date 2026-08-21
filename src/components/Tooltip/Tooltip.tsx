import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { useAsriUIId } from "../../hooks/useAsriUIId";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { TooltipProvider, useTooltipContext } from "./TooltipContext";
import type { TooltipContentProps, TooltipPlacement, TooltipProps, TooltipTriggerProps } from "./Tooltip.types";
import styles from "./Tooltip.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<"root" | "trigger" | "content">();

function computePosition(
  trigger: HTMLElement,
  _content: HTMLElement,
  placement: TooltipPlacement,
  sideOffset: number,
) {
  const triggerRect = trigger.getBoundingClientRect();
  const gap = sideOffset;
  let top = 0;
  let left = 0;

  switch (placement) {
    case "bottom":
      top = triggerRect.bottom + gap;
      left = triggerRect.left + triggerRect.width / 2;
      break;
    case "left":
      top = triggerRect.top + triggerRect.height / 2;
      left = triggerRect.left - gap;
      break;
    case "right":
      top = triggerRect.top + triggerRect.height / 2;
      left = triggerRect.right + gap;
      break;
    case "top":
    default:
      top = triggerRect.top - gap;
      left = triggerRect.left + triggerRect.width / 2;
      break;
  }

  return { top, left };
}

function TooltipRoot({ delayDuration = 200, skipDelayDuration = 0, classNames, children }: TooltipProps) {
  const reactId = useId();
  const idPrefix = useAsriUIId(`tooltip-${reactId.replace(/:/g, "")}`);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<TooltipPlacement>("top");
  const [sideOffset, setSideOffset] = useState(8);
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (showTimerRef.current) window.clearTimeout(showTimerRef.current);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    showTimerRef.current = null;
    hideTimerRef.current = null;
  }, []);

  const scheduleShow = useCallback(() => {
    clearTimers();
    showTimerRef.current = window.setTimeout(() => setOpen(true), delayDuration);
  }, [clearTimers, delayDuration]);

  const scheduleHide = useCallback(() => {
    clearTimers();
    hideTimerRef.current = window.setTimeout(() => setOpen(false), skipDelayDuration);
  }, [clearTimers, skipDelayDuration]);

  const registerTrigger = useCallback((node: HTMLElement | null) => {
    triggerRef.current = node;
  }, []);

  const registerContent = useCallback((node: HTMLElement | null) => {
    contentRef.current = node;
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      triggerId: `${idPrefix}-trigger`,
      contentId: `${idPrefix}-content`,
      placement,
      setPlacement,
      sideOffset,
      setSideOffset,
      registerTrigger,
      registerContent,
      scheduleShow,
      scheduleHide,
    }),
    [
      idPrefix,
      open,
      placement,
      registerContent,
      registerTrigger,
      scheduleHide,
      scheduleShow,
      sideOffset,
    ],
  );

  return (
    <TooltipProvider value={contextValue}>
      <SlotClassNamesProvider classNames={classNames}>
        <span className={cn(styles.root, classNames?.root)}>{children}</span>
      </SlotClassNamesProvider>
    </TooltipProvider>
  );
}
TooltipRoot.displayName = "Tooltip";

const TooltipTrigger = forwardRef<HTMLSpanElement, TooltipTriggerProps>(function TooltipTrigger(
  { className, children, onMouseEnter, onMouseLeave, onFocus, onBlur, ...rest },
  ref,
) {
  const { triggerId, contentId, open, scheduleShow, scheduleHide, registerTrigger } =
    useTooltipContext("Tooltip.Trigger");
  const slotClassName = useSlotClassName("trigger");

  const setRef = (node: HTMLSpanElement | null) => {
    registerTrigger(node);
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  return (
    <span
      ref={setRef}
      id={triggerId}
      className={cn(styles.trigger, slotClassName, className)}
      aria-describedby={open ? contentId : undefined}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        if (!event.defaultPrevented) scheduleShow();
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        if (!event.defaultPrevented) scheduleHide();
      }}
      onFocus={(event) => {
        onFocus?.(event);
        if (!event.defaultPrevented) scheduleShow();
      }}
      onBlur={(event) => {
        onBlur?.(event);
        if (!event.defaultPrevented) scheduleHide();
      }}
      {...rest}
    >
      {children}
    </span>
  );
});
TooltipTrigger.displayName = "Tooltip.Trigger";

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(function TooltipContent(
  { className, children, placement: placementProp = "top", sideOffset: sideOffsetProp = 8, style, ...rest },
  ref,
) {
  const {
    open,
    placement,
    setPlacement,
    sideOffset,
    setSideOffset,
    contentId,
    triggerId,
    registerContent,
  } = useTooltipContext("Tooltip.Content");
  const slotClassName = useSlotClassName("content");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setPlacement(placementProp);
    setSideOffset(sideOffsetProp);
  }, [placementProp, setPlacement, setSideOffset, sideOffsetProp]);

  const setRef = (node: HTMLDivElement | null) => {
    contentRef.current = node;
    registerContent(node);
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  const updatePosition = useCallback(() => {
    const trigger = document.getElementById(triggerId);
    const content = contentRef.current;
    if (!trigger || !content) return;
    setCoords(computePosition(trigger, content, placement, sideOffset));
  }, [placement, sideOffset, triggerId]);

  useEffect(() => {
    if (!open) return undefined;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  if (!open || typeof document === "undefined") return null;

  const contentStyle: CSSProperties = {
    top: coords.top,
    left: coords.left,
    ...style,
  };

  return createPortal(
    <div
      ref={setRef}
      id={contentId}
      role="tooltip"
      data-placement={placement}
      className={cn(styles.content, slotClassName, className)}
      style={contentStyle}
      {...rest}
    >
      {children}
    </div>,
    document.body,
  );
});
TooltipContent.displayName = "Tooltip.Content";

/**
 * Tooltip shows contextual help on hover or focus.
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <Tooltip.Trigger>
 *     <Button variant="outline">Hover me</Button>
 *   </Tooltip.Trigger>
 *   <Tooltip.Content>Copies the install command</Tooltip.Content>
 * </Tooltip>
 * ```
 */
export const Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
});
