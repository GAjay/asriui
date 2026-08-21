import { useEffect, useId, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Icon, PageLayout, SideNav } from "asriui";
import { BrandMark } from "../BrandMark";
import { ThemeToggle } from "../ThemeToggle";
import { useSiteTheme } from "../useSiteTheme";
import { DocsSearch } from "./DocsSearch";
import { DOC_CATEGORY_LABELS } from "./types";
import { getComponentsByCategory } from "./registry";
import { TEMPLATE_SNIPPETS } from "./templateSnippets";
import { useDocsScrollRestoration } from "./useDocsScrollRestoration";
import styles from "./DocsLayout.module.css";

const CATEGORY_ORDER = ["form", "layout", "feedback", "navigation", "data", "advanced"] as const;

function DocsNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const active = location.pathname === to || (to !== "/" && location.pathname.startsWith(`${to}/`));

  return (
    <SideNav.Link
      href={to}
      active={active}
      onClick={(event) => {
        event.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </SideNav.Link>
  );
}

export function DocsLayout() {
  const grouped = getComponentsByCategory();
  useDocsScrollRestoration();
  const { theme, setTheme } = useSiteTheme();
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!navOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setNavOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [navOpen]);

  return (
    <PageLayout variant="docs" sidebarWidth={260} asideWidth={200} contentMaxWidth="48rem" className={styles.shell}>
      <PageLayout.Sidebar
        className={`${styles.docsSidebar} ${navOpen ? styles.docsSidebarOpen : ""}`}
        aria-labelledby={titleId}
      >
        <SideNav aria-label="Documentation navigation">
          <SideNav.Header>
            <div className={styles.sidebarHead}>
              <div>
                <NavLink to="/" className={styles.brand} id={titleId}>
                  <BrandMark size={26} />
                  AsriUI
                </NavLink>
                <p className={styles.sidebarLabel}>Documentation</p>
              </div>
              <div className={styles.sidebarHeadActions}>
                <ThemeToggle
                  theme={theme}
                  onThemeChange={setTheme}
                  className={styles.themeToggle}
                />
                <button
                  type="button"
                  className={styles.closeNav}
                  aria-label="Close documentation menu"
                  onClick={() => setNavOpen(false)}
                >
                  <Icon name="x" size="sm" />
                </button>
              </div>
            </div>
          </SideNav.Header>

          <div className={styles.searchSlot}>
            <DocsSearch />
          </div>

          <SideNav.Group label="Guides" defaultOpen className={styles.docGroup}>
            <SideNav.List>
              <SideNav.Item>
                <DocsNavLink to="/docs/getting-started">Overview</DocsNavLink>
              </SideNav.Item>
              <SideNav.Item>
                <DocsNavLink to="/docs/styling">Styling</DocsNavLink>
              </SideNav.Item>
              <SideNav.Item>
                <DocsNavLink to="/docs/theme">Theme</DocsNavLink>
              </SideNav.Item>
              <SideNav.Item>
                <DocsNavLink to="/docs/typography">Typography</DocsNavLink>
              </SideNav.Item>
              <SideNav.Item>
                <DocsNavLink to="/docs/branding">Branding</DocsNavLink>
              </SideNav.Item>
              <SideNav.Item>
                <DocsNavLink to="/docs/tokens">Tokens</DocsNavLink>
              </SideNav.Item>
              <SideNav.Item>
                <DocsNavLink to="/docs/roadmap">Roadmap</DocsNavLink>
              </SideNav.Item>
              <SideNav.Item>
                <DocsNavLink to="/docs/releases">Releases</DocsNavLink>
              </SideNav.Item>
            </SideNav.List>
          </SideNav.Group>

          <SideNav.Group label="Templates" defaultOpen className={styles.docGroup}>
            <SideNav.List>
              <SideNav.Item>
                <DocsNavLink to="/docs/templates">Overview</DocsNavLink>
              </SideNav.Item>
              {TEMPLATE_SNIPPETS.map((template) => (
                <SideNav.Item key={template.slug}>
                  <DocsNavLink to={`/docs/templates/${template.slug}`}>{template.title}</DocsNavLink>
                </SideNav.Item>
              ))}
            </SideNav.List>
          </SideNav.Group>

          {CATEGORY_ORDER.map((category) => {
            const items = grouped[category];
            if (!items?.length) return null;
            return (
              <SideNav.Group
                key={category}
                label={DOC_CATEGORY_LABELS[category]}
                collapsible
                defaultOpen={true}
                className={styles.docGroup}
              >
                <SideNav.List>
                  {items.map((doc) => (
                    <SideNav.Item key={doc.slug}>
                      <DocsNavLink to={`/docs/components/${doc.slug}`}>{doc.name}</DocsNavLink>
                    </SideNav.Item>
                  ))}
                </SideNav.List>
              </SideNav.Group>
            );
          })}
        </SideNav>
      </PageLayout.Sidebar>

      <PageLayout.Main className={styles.main}>
        <div className={styles.mobileBar}>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={navOpen}
            onClick={() => setNavOpen(true)}
          >
            <Icon name="menu" size="sm" />
            Docs menu
          </button>
          <ThemeToggle theme={theme} onThemeChange={setTheme} />
        </div>
        <Outlet />
      </PageLayout.Main>

      {navOpen ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close documentation menu"
          onClick={() => setNavOpen(false)}
        />
      ) : null}
    </PageLayout>
  );
}
