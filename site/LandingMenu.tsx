import { useId, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../src/components/Icon";
import { Menu } from "../src/components/Menu";
import { COMPONENT_CATEGORIES, LANDING_PAGE_SECTIONS, getFlatComponents } from "./landingNavData";
import { LandingHashLink } from "./landingHash";
import { useSiteTheme } from "./useSiteTheme";
import styles from "./LandingMenu.module.css";

type LandingMenuProps = {
  className?: string;
};

export function LandingMenu({ className }: LandingMenuProps) {
  const menuId = useId();
  const navigate = useNavigate();
  const { theme } = useSiteTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const flatComponents = useMemo(() => getFlatComponents(), []);

  const filteredComponents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return flatComponents;
    return flatComponents.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.slug.includes(q),
    );
  }, [flatComponents, query]);

  function goToComponent(slug: string) {
    setQuery("");
    setOpen(false);
    navigate(`/docs/components/${slug}`);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <Menu
      className={className}
      open={open}
      onOpenChange={setOpen}
      placement="bottom-start"
      closeOnSelect={false}
      classNames={{
        trigger: styles.trigger,
        content: styles.panel,
        item: styles.menuItem,
        label: styles.sectionTitle,
        group: styles.section,
      }}
    >
      <Menu.Trigger aria-label="Open site menu">
        <Icon name="grid" size="sm" />
        <span className={styles.triggerLabel}>Menu</span>
      </Menu.Trigger>

      <Menu.Content
        role="dialog"
        aria-label="Site menu"
        className={styles.panel}
        data-theme={theme}
      >
        <div className={styles.panelGrid}>
          <Menu.Group label="Explore" className={`${styles.section} ${styles.exploreSection}`}>
            <nav className={styles.exploreList} aria-label="Explore">
              <Link className={styles.link} to="/about" onClick={closeMenu}>
                About
              </Link>
              {LANDING_PAGE_SECTIONS.map((item) => (
                <LandingHashLink
                  key={item.href}
                  hash={item.href}
                  className={styles.link}
                  onClick={closeMenu}
                >
                  {item.label}
                </LandingHashLink>
              ))}
            </nav>
          </Menu.Group>

          <section className={styles.section} aria-label="Components">
            <h3 className={styles.sectionTitle}>Components</h3>
            <label className={styles.searchLabel} htmlFor={`${menuId}-search`}>
              Search components
            </label>
            <input
              id={`${menuId}-search`}
              className={styles.search}
              type="search"
              placeholder="Button, DataGrid, ServerQuery…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />

            {query.trim() ? (
              <ul className={styles.componentResults}>
                {filteredComponents.length ? (
                  filteredComponents.map((item) => (
                    <li key={item.slug}>
                      <Menu.Item
                        className={styles.componentBtn}
                        onSelect={() => goToComponent(item.slug)}
                      >
                        <span>{item.name}</span>
                        <span className={styles.componentMeta}>{item.category}</span>
                      </Menu.Item>
                    </li>
                  ))
                ) : (
                  <li className={styles.empty}>No components match</li>
                )}
              </ul>
            ) : (
              <div className={styles.categories}>
                {COMPONENT_CATEGORIES.map((category) => (
                  <div key={category.name} className={styles.category}>
                    <p className={styles.categoryTitle}>{category.name}</p>
                    <ul className={styles.categoryList}>
                      {category.slugs.map((slug) => (
                        <li key={slug}>
                          <Menu.Item
                            className={styles.componentChip}
                            onSelect={() => goToComponent(slug)}
                          >
                            {flatComponents.find((item) => item.slug === slug)?.name ?? slug}
                          </Menu.Item>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </Menu.Content>
    </Menu>
  );
}
