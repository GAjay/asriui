import { toast } from "./toast";
import { Button } from "../Button";
import type { ButtonProps } from "../Button/Button.types";
import { cn } from "../../utils/cn";
import { ToastProvider } from "./ToastProvider";
import type { ToastInput, ToastProviderProps } from "./Toast.types";
import styles from "./ToastShowcase.module.css";

export type ToastShowcaseItem = {
  /** Button label that triggers the toast. */
  label: string;
  /** Toast payload — title, description, variant, icon, colors, action, etc. */
  toast: ToastInput;
  /** Optional button style. @default "outline" */
  buttonVariant?: ButtonProps["variant"];
};

export type ToastShowcaseProps = {
  /** Optional heading above the trigger grid. */
  title?: string;
  /** Optional supporting copy. */
  description?: string;
  /** Toast definitions — one button per item. */
  items: ToastShowcaseItem[];
  /** Grid columns on wide screens. @default 3 */
  columns?: 2 | 3 | 4;
  className?: string;
} & Omit<ToastProviderProps, "children">;

const COLUMN_CLASS = {
  2: styles.cols2 ?? "",
  3: styles.cols3 ?? "",
  4: styles.cols4 ?? "",
} as const;

/**
 * Config-driven toast demo page — pass `items` and the UI is generated for you.
 * Wraps `ToastProvider` so you only supply configuration.
 */
export function ToastShowcase({
  title,
  description,
  items,
  columns = 3,
  className,
  position = "bottom-right",
  duration,
  limit,
  showProgress = true,
  variants,
}: ToastShowcaseProps) {
  return (
    <ToastProvider
      position={position}
      duration={duration}
      limit={limit}
      showProgress={showProgress}
      variants={variants}
    >
      <div className={cn(styles.root, className)}>
        {title || description ? (
          <header className={styles.header}>
            {title ? <h3 className={styles.title}>{title}</h3> : null}
            {description ? <p className={styles.description}>{description}</p> : null}
          </header>
        ) : null}
        <div className={cn(styles.grid, COLUMN_CLASS[columns])}>
          {items.map((item) => (
            <Button
              key={item.label}
              type="button"
              variant={item.buttonVariant ?? "outline"}
              onClick={() => toast({ ...item.toast })}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </ToastProvider>
  );
}

ToastShowcase.displayName = "ToastShowcase";
