import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { ResetProvider, useReset } from "./ResetContext";
import type { ResetRootProps, ResetTargetProps, ResetTriggerProps } from "./Reset.types";
import styles from "./Reset.module.css";

function ResetRoot<T extends Record<string, unknown>>({ defaults, className, children }: ResetRootProps<T>) {
  return (
    <ResetProvider defaults={defaults}>
      {(context) => (
        <div className={cn(styles.root, className)}>
          {typeof children === "function" ? children(context) : children}
        </div>
      )}
    </ResetProvider>
  );
}
ResetRoot.displayName = "Reset.Root";

const ResetTrigger = forwardRef<HTMLButtonElement, ResetTriggerProps>(function ResetTrigger(
  { className, children = "Reset to defaults", type = "button", onClick, ...rest },
  ref,
) {
  const { reset } = useReset();

  return (
    <button
      ref={ref}
      type={type}
      className={cn(styles.trigger, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) reset();
      }}
      {...rest}
    >
      {children}
    </button>
  );
});
ResetTrigger.displayName = "Reset.Trigger";

const ResetTarget = forwardRef<HTMLDivElement, ResetTargetProps>(function ResetTarget(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.target, className)} {...rest}>
      {children}
    </div>
  );
});
ResetTarget.displayName = "Reset.Target";

export const Reset = Object.assign(ResetRoot, {
  Root: ResetRoot,
  Trigger: ResetTrigger,
  Target: ResetTarget,
});

export { useReset, useResetOptional } from "./ResetContext";
