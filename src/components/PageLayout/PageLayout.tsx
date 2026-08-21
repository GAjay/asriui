import { createContext, forwardRef, useContext, useMemo } from "react";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import type {
  PageLayoutAsideProps,
  PageLayoutContentProps,
  PageLayoutMainProps,
  PageLayoutProps,
  PageLayoutSidebarProps,
  PageLayoutStyleVars,
} from "./PageLayout.types";
import styles from "./PageLayout.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<
  "root" | "sidebar" | "main" | "content" | "aside"
>();

type LayoutContextValue = { variant: NonNullable<PageLayoutProps["variant"]> };

const LayoutContext = createContext<LayoutContextValue>({ variant: "sidebar" });

function usePageLayoutContext() {
  return useContext(LayoutContext);
}

function toCssSize(value: number | string | undefined, fallback: string): string {
  if (value === undefined) return fallback;
  return typeof value === "number" ? `${value}px` : value;
}

const PageLayoutRoot = forwardRef<HTMLDivElement, PageLayoutProps>(function PageLayout(
  {
    variant = "sidebar",
    sidebarSide = "left",
    sidebarWidth,
    asideWidth,
    contentMaxWidth,
    className,
    classNames,
    style,
    children,
    ...rest
  },
  ref,
) {
  const ctx = useMemo(() => ({ variant }), [variant]);
  const shellClass =
    variant === "docs"
      ? styles.variantDocs
      : variant === "centered"
        ? styles.variantCentered
        : variant === "full"
          ? styles.variantFull
          : styles.variantSidebar;
  const sideClass = sidebarSide === "right" ? styles.sidebarRight : undefined;

  const cssVars: PageLayoutStyleVars = {
    "--page-sidebar-width": toCssSize(sidebarWidth, "260px"),
    "--page-aside-width": toCssSize(asideWidth, "180px"),
    "--page-content-max": toCssSize(contentMaxWidth, variant === "centered" ? "42rem" : "56rem"),
    ...style,
  };

  return (
    <LayoutContext.Provider value={ctx}>
      <SlotClassNamesProvider classNames={classNames}>
        <div
          ref={ref}
          className={cn(styles.shell, shellClass, sideClass, classNames?.root, className)}
          data-sidebar-side={sidebarSide}
          style={cssVars}
          {...rest}
        >
          {children}
        </div>
      </SlotClassNamesProvider>
    </LayoutContext.Provider>
  );
});
PageLayoutRoot.displayName = "PageLayout";

const PageLayoutSidebar = forwardRef<HTMLElement, PageLayoutSidebarProps>(function PageLayoutSidebar(
  { className, children, ...rest },
  ref,
) {
  return (
    <aside ref={ref} className={cn(styles.sidebarPanel, useSlotClassName("sidebar"), className)} {...rest}>
      {children}
    </aside>
  );
});
PageLayoutSidebar.displayName = "PageLayout.Sidebar";

const PageLayoutMain = forwardRef<HTMLElement, PageLayoutMainProps>(function PageLayoutMain(
  { className, children, ...rest },
  ref,
) {
  const { variant } = usePageLayoutContext();
  const mainClass =
    variant === "docs"
      ? styles.docsMain
      : variant === "centered"
        ? styles.centeredMain
        : variant === "full"
          ? styles.fullMain
          : styles.main;

  return (
    <main ref={ref} className={cn(mainClass, useSlotClassName("main"), className)} {...rest}>
      {children}
    </main>
  );
});
PageLayoutMain.displayName = "PageLayout.Main";

const PageLayoutContent = forwardRef<HTMLDivElement, PageLayoutContentProps>(function PageLayoutContent(
  { maxWidth, className, style, children, ...rest },
  ref,
) {
  const cssVars: PageLayoutStyleVars = {
    ...(maxWidth !== undefined ? { "--page-content-max": toCssSize(maxWidth, "56rem") } : {}),
    ...style,
  };

  return (
    <div
      ref={ref}
      className={cn(styles.content, maxWidth !== undefined && styles.contentMax, useSlotClassName("content"), className)}
      style={cssVars}
      {...rest}
    >
      {children}
    </div>
  );
});
PageLayoutContent.displayName = "PageLayout.Content";

const PageLayoutAside = forwardRef<HTMLElement, PageLayoutAsideProps>(function PageLayoutAside(
  { width, className, style, children, ...rest },
  ref,
) {
  const cssVars: PageLayoutStyleVars = {
    "--page-aside-width": toCssSize(width, "180px"),
    ...style,
  };

  return (
    <aside ref={ref} className={cn(styles.aside, useSlotClassName("aside"), className)} style={cssVars} {...rest}>
      {children}
    </aside>
  );
});
PageLayoutAside.displayName = "PageLayout.Aside";

/**
 * Configurable page shell with sidebar, centered, full-width, and docs layouts.
 *
 * @example
 * ```tsx
 * <PageLayout variant="sidebar">
 *   <PageLayout.Sidebar><SideNav>...</SideNav></PageLayout.Sidebar>
 *   <PageLayout.Main>
 *     <PageLayout.Content maxWidth="56rem">{children}</PageLayout.Content>
 *   </PageLayout.Main>
 * </PageLayout>
 * ```
 */
export const PageLayout = Object.assign(PageLayoutRoot, {
  Sidebar: PageLayoutSidebar,
  Main: PageLayoutMain,
  Content: PageLayoutContent,
  Aside: PageLayoutAside,
});
