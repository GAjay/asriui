import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { appleGentle } from "../../motion/presets";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { SideNavContext, useSideNavContextOptional } from "./SideNavContext";
import { SideNavMenusContext } from "./SideNavMenusContext";
import type {
  SideNavGroupProps,
  SideNavHeaderProps,
  SideNavHomeProps,
  SideNavItemProps,
  SideNavLinkProps,
  SideNavListProps,
  SideNavMenuProps,
  SideNavMenusProps,
  SideNavProps,
  SideNavSubmenuProps,
  SideNavToggleProps,
} from "./SideNav.types";
import { SideNavVirtualList } from "./SideNavVirtualList";
import styles from "./SideNav.module.css";

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

function isSideNavMenuElement(child: ReactNode): child is ReactElement<SideNavMenuProps> {
  return (
    isValidElement(child) &&
    (child.type as { displayName?: string }).displayName === "SideNav.Menu"
  );
}

function renderIcon(icon: ReactNode, className?: string) {
  if (!icon) return null;
  return <span className={className}>{icon}</span>;
}

function toCssSize(value: number | string): string {
  return typeof value === "number" ? `${value}px` : value;
}

function HomeIcon({ className }: { className?: string }) {
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
      <path d="m3 9 9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}

const SideNavRoot = forwardRef<HTMLElement, SideNavProps>(function SideNav(
  {
    className,
    children,
    side = "left",
    collapsible = false,
    collapseMode = "rail",
    collapsed: collapsedProp,
    defaultCollapsed = false,
    onCollapsedChange,
    collapsedWidth = "3.5rem",
    "aria-label": ariaLabel = "Sidebar",
    style,
    ...rest
  },
  ref,
) {
  const [collapsedState, setCollapsedState] = useState(defaultCollapsed);
  const collapsed = collapsedProp ?? collapsedState;

  const setCollapsed = useCallback(
    (next: boolean) => {
      if (collapsedProp === undefined) setCollapsedState(next);
      onCollapsedChange?.(next);
    },
    [collapsedProp, onCollapsedChange],
  );

  const contextValue = useMemo(
    () => ({
      collapsible,
      collapsed,
      setCollapsed,
      side,
      collapseMode,
    }),
    [collapsible, collapsed, setCollapsed, side, collapseMode],
  );

  const isCollapsed = collapsible && collapsed;

  return (
    <SideNavContext.Provider value={contextValue}>
      <nav
        ref={ref}
        className={cn(styles.root, className)}
        aria-label={ariaLabel}
        data-collapsed={isCollapsed ? "true" : undefined}
        data-collapse-mode={collapsible ? collapseMode : undefined}
        data-side={side}
        style={
          {
            ...style,
            ...(collapsible && collapsed && collapseMode === "rail"
              ? { "--side-nav-collapsed-width": toCssSize(collapsedWidth) }
              : {}),
          } as CSSProperties
        }
        {...rest}
      >
        {children}
      </nav>
    </SideNavContext.Provider>
  );
});
SideNavRoot.displayName = "SideNav";

const SideNavHeader = forwardRef<HTMLDivElement, SideNavHeaderProps>(function SideNavHeader(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.header, className)} {...rest}>
      {children}
    </div>
  );
});
SideNavHeader.displayName = "SideNav.Header";

const SideNavHome = forwardRef<HTMLAnchorElement, SideNavHomeProps>(function SideNavHome(
  { className, href, label = "Home", icon, active = false, ...rest },
  ref,
) {
  const sideNav = useSideNavContextOptional();

  return (
    <a
      ref={ref}
      href={href}
      className={cn(styles.home, active && styles.active, className)}
      aria-current={active ? "page" : undefined}
      title={sideNav?.collapsed ? label : undefined}
      {...rest}
    >
      {icon ? renderIcon(icon, styles.homeIcon) : <HomeIcon className={styles.homeIcon} />}
      <span className={styles.homeLabel}>{label}</span>
    </a>
  );
});
SideNavHome.displayName = "SideNav.Home";

const SideNavToggle = forwardRef<HTMLButtonElement, SideNavToggleProps>(function SideNavToggle(
  {
    className,
    variant = "chevron",
    expandLabel,
    collapseLabel,
    onClick,
    ...rest
  },
  ref,
) {
  const context = useSideNavContextOptional();
  if (!context?.collapsible) return null;

  const isHamburger = variant === "hamburger";
  const resolvedExpandLabel = expandLabel ?? (isHamburger ? "Open menu" : "Expand sidebar");
  const resolvedCollapseLabel = collapseLabel ?? (isHamburger ? "Close menu" : "Collapse sidebar");

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        styles.toggle,
        isHamburger && styles.toggleHamburger,
        className,
      )}
      data-collapsed={context.collapsed ? "true" : undefined}
      data-side={context.side}
      data-variant={variant}
      aria-expanded={!context.collapsed}
      aria-label={context.collapsed ? resolvedExpandLabel : resolvedCollapseLabel}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.setCollapsed(!context.collapsed);
      }}
      {...rest}
    >
      {isHamburger ? (
        <span className={styles.hamburger} aria-hidden="true">
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </span>
      ) : (
        <ChevronIcon className={styles.toggleIcon} />
      )}
    </button>
  );
});
SideNavToggle.displayName = "SideNav.Toggle";

const SideNavMenus = forwardRef<HTMLDivElement, SideNavMenusProps>(function SideNavMenus(
  { className, children, activeMenu: activeMenuProp, defaultMenu, onMenuChange, ...rest },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const menus = useMemo(
    () =>
      Children.toArray(children).filter(isSideNavMenuElement).map((child) => ({
        id: child.props.id,
        label: child.props.label,
        icon: child.props.icon,
        content: child.props.children,
      })),
    [children],
  );

  const [activeMenuState, setActiveMenuState] = useState(defaultMenu ?? menus[0]?.id ?? "");
  const [slideDirection, setSlideDirection] = useState(0);
  const activeMenu = activeMenuProp ?? activeMenuState;
  const activePanel = menus.find((menu) => menu.id === activeMenu) ?? menus[0];
  const activeMenuRef = useRef(activeMenu);

  if (activeMenuRef.current !== activeMenu) {
    activeMenuRef.current = activeMenu;
  }

  const setActiveMenu = useCallback(
    (menuId: string) => {
      if (menuId === activeMenuRef.current) return;

      const currentIndex = menus.findIndex((menu) => menu.id === activeMenuRef.current);
      const nextIndex = menus.findIndex((menu) => menu.id === menuId);
      if (currentIndex !== -1 && nextIndex !== -1) {
        setSlideDirection(nextIndex >= currentIndex ? 1 : -1);
      }

      activeMenuRef.current = menuId;
      if (activeMenuProp === undefined) setActiveMenuState(menuId);
      onMenuChange?.(menuId);
    },
    [activeMenuProp, menus, onMenuChange],
  );

  const menusContextValue = useMemo(
    () => ({
      activeMenu,
      setActiveMenu,
    }),
    [activeMenu, setActiveMenu],
  );

  const panelMotion = reducedMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, x: slideDirection * 12 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: slideDirection * -12 },
      };

  if (menus.length === 0) return null;

  return (
    <SideNavMenusContext.Provider value={menusContextValue}>
      <div ref={ref} className={cn(styles.menus, className)} {...rest}>
        {menus.length > 1 ? (
          <div className={styles.menuRail} role="tablist" aria-label="Sidebar menus">
            {menus.map((menu) => {
              const isActive = activeMenu === menu.id;

              return (
                <button
                  key={menu.id}
                  type="button"
                  role="tab"
                  className={styles.menuRailButton}
                  data-active={isActive ? "true" : undefined}
                  aria-selected={isActive}
                  aria-label={menu.label}
                  title={menu.label}
                  onClick={() => setActiveMenu(menu.id)}
                >
                  {isActive ? (
                    reducedMotion ? (
                      <span className={styles.menuRailIndicator} aria-hidden="true" />
                    ) : (
                      <motion.span
                        layoutId="side-nav-menu-indicator"
                        className={styles.menuRailIndicator}
                        transition={appleGentle}
                        aria-hidden="true"
                      />
                    )
                  ) : null}
                  {renderIcon(menu.icon, styles.menuRailIcon)}
                  <span className={styles.menuRailLabel}>{menu.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        <div className={styles.menuPanel}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeMenu}
              role="tabpanel"
              aria-label={activePanel?.label}
              className={styles.menuPanelContent}
              initial={panelMotion.initial}
              animate={panelMotion.animate}
              exit={panelMotion.exit}
              transition={reducedMotion ? { duration: 0 } : appleGentle}
            >
              {activePanel?.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SideNavMenusContext.Provider>
  );
});
SideNavMenus.displayName = "SideNav.Menus";

const SideNavMenu = forwardRef<HTMLDivElement, SideNavMenuProps>(function SideNavMenu(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(className)} {...rest}>
      {children}
    </div>
  );
});
SideNavMenu.displayName = "SideNav.Menu";

const SideNavGroup = forwardRef<HTMLDivElement, SideNavGroupProps>(function SideNavGroup(
  {
    className,
    label,
    icon,
    collapsible = false,
    open: openProp,
    defaultOpen = true,
    onOpenChange,
    children,
    ...rest
  },
  ref,
) {
  const panelId = useId();
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;
  const sideNav = useSideNavContextOptional();

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpenState(next);
      onOpenChange?.(next);
    },
    [onOpenChange, openProp],
  );

  const collapsed = Boolean(sideNav?.collapsed);
  const isPanelOpen = open && !collapsed;
  const heading = label ? (
    <span className={styles.groupHeading}>
      {renderIcon(icon, styles.groupIcon)}
      {!icon && collapsed ? (
        <span className={styles.groupIconFallback} aria-hidden="true">
          {label.trim().charAt(0).toUpperCase()}
        </span>
      ) : null}
      <span>{label}</span>
    </span>
  ) : null;

  return (
    <div ref={ref} className={cn(styles.group, className)} {...rest}>
      {label && collapsible ? (
        <button
          type="button"
          className={styles.groupTrigger}
          data-open={isPanelOpen ? "true" : "false"}
          aria-expanded={isPanelOpen}
          aria-controls={panelId}
          title={collapsed ? label : undefined}
          onClick={() => {
            if (collapsed) return;
            setOpen(!open);
          }}
        >
          {heading}
          <ChevronIcon className={styles.groupChevron} />
        </button>
      ) : label ? (
        <p className={styles.groupLabel}>{heading}</p>
      ) : null}

      <div
        id={panelId}
        className={styles.groupPanel}
        data-open={isPanelOpen ? "true" : "false"}
        {...(collapsible && !isPanelOpen ? ({ inert: "" } as { inert?: string }) : {})}
      >
        <div className={styles.groupPanelInner}>{children}</div>
      </div>
    </div>
  );
});
SideNavGroup.displayName = "SideNav.Group";

const SideNavSubmenu = forwardRef<HTMLLIElement, SideNavSubmenuProps>(function SideNavSubmenu(
  {
    className,
    label,
    icon,
    collapsible = true,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    children,
    ...rest
  },
  ref,
) {
  const panelId = useId();
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;
  const sideNav = useSideNavContextOptional();

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpenState(next);
      onOpenChange?.(next);
    },
    [onOpenChange, openProp],
  );

  const collapsed = Boolean(sideNav?.collapsed);
  const isPanelOpen = open && !collapsed;

  return (
    <li ref={ref} className={cn(styles.item, className)} {...rest}>
      {collapsible ? (
        <button
          type="button"
          className={cn(styles.link, styles.submenuTrigger, collapsed && styles.linkCollapsed)}
          data-open={isPanelOpen ? "true" : "false"}
          aria-expanded={isPanelOpen}
          aria-controls={panelId}
          title={collapsed ? label : undefined}
          onClick={() => {
            if (collapsed) return;
            setOpen(!open);
          }}
        >
          {icon ? (
            renderIcon(icon, styles.linkIcon)
          ) : collapsed ? (
            <span className={styles.linkIconFallback} aria-hidden="true">
              {label.trim().charAt(0).toUpperCase()}
            </span>
          ) : null}
          <span className={styles.linkLabel}>{label}</span>
          <ChevronIcon className={styles.groupChevron} />
        </button>
      ) : (
        <div className={cn(styles.link, styles.submenuLabel)}>
          {renderIcon(icon, styles.linkIcon)}
          <span className={styles.linkLabel}>{label}</span>
        </div>
      )}

      <div
        id={panelId}
        className={styles.groupPanel}
        data-open={isPanelOpen ? "true" : "false"}
        {...(collapsible && !isPanelOpen ? ({ inert: "" } as { inert?: string }) : {})}
      >
        <div className={styles.groupPanelInner}>
          <ul className={cn(styles.list, styles.nestedList)}>{children}</ul>
        </div>
      </div>
    </li>
  );
});
SideNavSubmenu.displayName = "SideNav.Submenu";

const SideNavList = forwardRef(function SideNavList<T>(
  props: SideNavListProps<T>,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  if (props.virtualized) {
    const { virtualized: _virtualized, ...virtualProps } = props;
    return <SideNavVirtualList ref={ref as React.ForwardedRef<HTMLDivElement>} {...virtualProps} />;
  }

  const { className, nested = false, children, ...rest } = props;

  return (
    <ul
      ref={ref}
      className={cn(styles.list, nested && styles.nestedList, className)}
      {...rest}
    >
      {children}
    </ul>
  );
}) as <T>(
  props: SideNavListProps<T> & { ref?: React.ForwardedRef<HTMLUListElement> },
) => React.ReactElement | null;

(SideNavList as { displayName?: string }).displayName = "SideNav.List";

const SideNavItem = forwardRef<HTMLLIElement, SideNavItemProps>(function SideNavItem(
  { className, children, ...rest },
  ref,
) {
  return (
    <li ref={ref} className={cn(styles.item, className)} {...rest}>
      {children}
    </li>
  );
});
SideNavItem.displayName = "SideNav.Item";

const SideNavLink = forwardRef<HTMLAnchorElement, SideNavLinkProps>(function SideNavLink(
  { className, active = false, icon, children, title, ...rest },
  ref,
) {
  const sideNav = useSideNavContextOptional();
  const label = typeof children === "string" ? children : undefined;
  const collapsed = Boolean(sideNav?.collapsed);
  const tooltipTitle = title ?? (collapsed && label ? label : undefined);

  return (
    <a
      ref={ref}
      className={cn(
        styles.link,
        active && styles.active,
        collapsed && styles.linkCollapsed,
        className,
      )}
      aria-current={active ? "page" : undefined}
      title={tooltipTitle}
      {...rest}
    >
      {icon ? (
        renderIcon(icon, styles.linkIcon)
      ) : collapsed && label ? (
        <span className={styles.linkIconFallback} aria-hidden="true">
          {label.trim().charAt(0).toUpperCase()}
        </span>
      ) : null}
      <span className={styles.linkLabel}>{children}</span>
    </a>
  );
});
SideNavLink.displayName = "SideNav.Link";

/** Sidebar navigation with collapsible groups, multi-menu rail, icons, nested submenus, and optional virtualization. */
export const SideNav = Object.assign(SideNavRoot, {
  Header: SideNavHeader,
  Home: SideNavHome,
  Toggle: SideNavToggle,
  Menus: SideNavMenus,
  Menu: SideNavMenu,
  Group: SideNavGroup,
  Submenu: SideNavSubmenu,
  List: SideNavList,
  VirtualList: SideNavVirtualList,
  Item: SideNavItem,
  Link: SideNavLink,
});
