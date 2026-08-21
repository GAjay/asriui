import { Fragment, forwardRef } from "react";
import { cn } from "../../utils/cn";
import type {
  BreadcrumbBackProps,
  BreadcrumbItemProps,
  BreadcrumbListProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from "./Breadcrumb.types";
import styles from "./Breadcrumb.module.css";

function BackIcon() {
  return (
    <svg
      className={styles.backIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function SeparatorIcon() {
  return (
    <span className={styles.separatorSlash} aria-hidden="true">
      /
    </span>
  );
}

function defaultBack() {
  if (typeof window !== "undefined") window.history.back();
}

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  {
    className,
    children,
    items,
    showBack = false,
    backLabel = "Back",
    onBack,
    backHref,
    separator,
    "aria-label": ariaLabel = "Breadcrumb",
    ...rest
  },
  ref,
) {
  const resolvedSeparator = separator ?? <SeparatorIcon />;

  return (
    <nav ref={ref} className={cn(styles.root, className)} aria-label={ariaLabel} {...rest}>
      {showBack ? (
        <BreadcrumbBack
          href={backHref}
          label={backLabel}
          onClick={
            onBack
              ? (event) => {
                  event.preventDefault();
                  onBack();
                }
              : undefined
          }
        />
      ) : null}

      {items?.length ? (
        <BreadcrumbList>
          {items.map((item, index) => {
            const key = typeof item.label === "string" ? item.label : `crumb-${index}`;
            const isCurrent = item.current ?? index === items.length - 1;
            return (
              <Fragment key={key}>
                {index > 0 ? (
                  <li className={styles.separatorItem} aria-hidden="true">
                    <span className={styles.separator}>{resolvedSeparator}</span>
                  </li>
                ) : null}
                <BreadcrumbItem
                  href={isCurrent ? undefined : item.href}
                  current={isCurrent}
                  onClick={item.onClick}
                >
                  {item.label}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      ) : (
        children
      )}
    </nav>
  );
});
BreadcrumbRoot.displayName = "Breadcrumb";

const BreadcrumbBack = forwardRef<HTMLButtonElement, BreadcrumbBackProps>(function BreadcrumbBack(
  { className, children, label = "Back", href, onClick, type = "button", ...rest },
  ref,
) {
  const content = (
    <>
      <BackIcon />
      <span>{children ?? label}</span>
    </>
  );

  if (href) {
    return (
      <a ref={ref as never} href={href} className={cn(styles.back, className)} {...(rest as object)}>
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={cn(styles.back, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) defaultBack();
      }}
      {...rest}
    >
      {content}
    </button>
  );
});
BreadcrumbBack.displayName = "Breadcrumb.Back";

const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(function BreadcrumbList(
  { className, children, ...rest },
  ref,
) {
  return (
    <ol ref={ref} className={cn(styles.list, className)} {...rest}>
      {children}
    </ol>
  );
});
BreadcrumbList.displayName = "Breadcrumb.List";

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(function BreadcrumbItem(
  { className, children, href, current = false, onClick, ...rest },
  ref,
) {
  return (
    <li ref={ref} className={cn(styles.item, className)} {...rest}>
      {current || !href ? (
        <span className={styles.current} aria-current={current ? "page" : undefined}>
          {children}
        </span>
      ) : (
        <a className={styles.link} href={href} onClick={onClick}>
          {children}
        </a>
      )}
    </li>
  );
});
BreadcrumbItem.displayName = "Breadcrumb.Item";

const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  function BreadcrumbSeparator({ className, children, ...rest }, ref) {
    return (
      <li ref={ref} className={styles.separatorItem} aria-hidden="true" {...rest}>
        <span className={cn(styles.separator, className)}>{children ?? <SeparatorIcon />}</span>
      </li>
    );
  },
);
BreadcrumbSeparator.displayName = "Breadcrumb.Separator";

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Back: BreadcrumbBack,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Separator: BreadcrumbSeparator,
});
