import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { useAsriUIId } from "../../hooks/useAsriUIId";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { DialogContext, useDialogContext } from "./DialogContext";
import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "./Dialog.types";
import styles from "./Dialog.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<
  "overlay" | "content" | "header" | "title" | "description" | "footer" | "trigger" | "close"
>();

function createFocusTrapHandler(
  dialogEl: HTMLDivElement,
  closeOnEscape: boolean,
  setOpen: (open: boolean) => void,
) {
  return function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && closeOnEscape) {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key !== "Tab") return;

    const items = getFocusableElements(dialogEl);
    if (items.length === 0) {
      event.preventDefault();
      dialogEl.focus();
      return;
    }

    const first = items[0]!;
    const last = items[items.length - 1]!;
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute("disabled") && element.tabIndex !== -1,
  );
}

function DialogRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  classNames,
  children,
}: DialogProps) {
  const titleId = useAsriUIId("dialog-title");
  const descriptionId = useAsriUIId("dialog-description");
  const triggerRef = useRef<HTMLElement | null>(null);
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isOpen = open ?? uncontrolled;

  const setOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [onOpenChange, open],
  );

  const registerTrigger = useCallback((element: HTMLElement | null) => {
    triggerRef.current = element;
  }, []);

  return (
    <SlotClassNamesProvider classNames={classNames}>
      <DialogContext.Provider
        value={{ open: isOpen, setOpen, titleId, descriptionId, triggerRef, registerTrigger }}
      >
        {children}
      </DialogContext.Provider>
    </SlotClassNamesProvider>
  );
}
DialogRoot.displayName = "Dialog";

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(function DialogTrigger(
  { className, children, onClick, ...rest },
  ref,
) {
  const { setOpen, registerTrigger } = useDialogContext("DialogTrigger");

  const setRefs = useCallback(
    (node: HTMLButtonElement | null) => {
      registerTrigger(node);
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref, registerTrigger],
  );

  return (
    <button
      ref={setRefs}
      type="button"
      className={cn(useSlotClassName("trigger"), className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(true);
      }}
      {...rest}
    >
      {children}
    </button>
  );
});
DialogTrigger.displayName = "Dialog.Trigger";

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(function DialogClose(
  { className, children, onClick, variant, ...rest },
  ref,
) {
  const { setOpen } = useDialogContext("DialogClose");
  const resolvedVariant = variant ?? (children == null ? "icon" : "button");
  const isIcon = resolvedVariant === "icon";

  return (
    <button
      ref={ref}
      type="button"
      className={cn(isIcon ? styles.closeIcon : styles.closeButton, useSlotClassName("close"), className)}
      aria-label={
        rest["aria-label"] ??
        (typeof children === "string" ? children : isIcon ? "Close dialog" : undefined)
      }
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(false);
      }}
      {...rest}
    >
      {children ?? (isIcon ? "×" : "Close")}
    </button>
  );
});
DialogClose.displayName = "Dialog.Close";

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  {
    className,
    children,
    title,
    description,
    showClose,
    portal = true,
    container,
    closeOnEscape = true,
    closeOnOverlayClick = true,
    overlayClassName,
    ...rest
  },
  ref,
) {
  const { open, setOpen, titleId, descriptionId, triggerRef } = useDialogContext("DialogContent");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const shouldShowClose = showClose ?? Boolean(title);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const dialogEl = contentRef.current;
    if (!dialogEl) return;

    const focusable = getFocusableElements(dialogEl);
    const initialFocus = focusable[0] ?? dialogEl;
    initialFocus.focus();

    const onKeyDown = createFocusTrapHandler(dialogEl, closeOnEscape, setOpen);

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const triggerNode = triggerRef.current;

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerNode?.focus();
    };
  }, [closeOnEscape, open, setOpen, triggerRef]);

  const overlaySlotClassName = useSlotClassName("overlay");
  const contentSlotClassName = useSlotClassName("content");

  if (!open) return null;

  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (!closeOnOverlayClick) return;
    if (event.target === event.currentTarget) setOpen(false);
  }

  const panel = (
    <div
      className={cn(styles.overlay, overlaySlotClassName, overlayClassName)}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={setRefs}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(styles.content, contentSlotClassName, className)}
        tabIndex={-1}
        {...rest}
      >
        {shouldShowClose ? <DialogClose aria-label="Close dialog" /> : null}

        {title || description ? (
          <DialogHeader>
            {title ? <DialogTitle>{title}</DialogTitle> : null}
            {description ? <DialogDescription>{description}</DialogDescription> : null}
          </DialogHeader>
        ) : null}

        {children}
      </div>
    </div>
  );

  if (!portal) return panel;
  if (!mounted || typeof document === "undefined") return null;

  const portalTarget = container ?? document.body;
  return createPortal(panel, portalTarget);
});
DialogContent.displayName = "Dialog.Content";

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(function DialogHeader(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.header, useSlotClassName("header"), className)} {...rest}>
      {children}
    </div>
  );
});
DialogHeader.displayName = "Dialog.Header";

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(function DialogTitle(
  { className, children, ...rest },
  ref,
) {
  const { titleId } = useDialogContext("DialogTitle");
  return (
    <h2 ref={ref} id={titleId} className={cn(styles.title, useSlotClassName("title"), className)} {...rest}>
      {children}
    </h2>
  );
});
DialogTitle.displayName = "Dialog.Title";

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  function DialogDescription({ className, children, ...rest }, ref) {
    const { descriptionId } = useDialogContext("DialogDescription");
    return (
      <p ref={ref} id={descriptionId} className={cn(styles.description, useSlotClassName("description"), className)} {...rest}>
        {children}
      </p>
    );
  },
);
DialogDescription.displayName = "Dialog.Description";

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(function DialogFooter(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.footer, useSlotClassName("footer"), className)} {...rest}>
      {children}
    </div>
  );
});
DialogFooter.displayName = "Dialog.Footer";

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
});
