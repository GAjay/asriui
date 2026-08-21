import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "../src";
import { AnimatedNumber } from "./AnimatedNumber";
import { CardCarousel, CardCarouselItem } from "./CardCarousel";
import carouselStyles from "./CardCarousel.module.css";
import { COMPONENT_CATEGORIES, COMPONENT_COUNT, SLUG_TO_NAME } from "./landingNavData";
import { componentRegistry } from "./docs/registry";
import styles from "./ComponentCatalog.module.css";

const CATEGORY_ICONS: Record<string, IconName> = {
  "Form & input": "form",
  "Layout & docs": "grid",
  "Feedback & navigation": "sparkles",
  "Data & advanced": "package",
};

const DESCRIPTION_BY_SLUG = Object.fromEntries(
  componentRegistry.map((item) => [item.slug, item.description]),
) as Record<string, string>;

function shortDescription(slug: string) {
  const full = DESCRIPTION_BY_SLUG[slug] ?? "";
  if (!full) return "Open docs and live examples.";
  const sentence = full.split(/(?<=\.)\s/)[0] ?? full;
  return sentence.length > 100 ? `${sentence.slice(0, 97).trimEnd()}…` : sentence;
}

function SearchIcon() {
  return (
    <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="m16.2 16.2 4.3 4.3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function ComponentCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>(COMPONENT_CATEGORIES[0]!.name);
  const [query, setQuery] = useState("");

  const totalCount = COMPONENT_COUNT;

  const active =
    COMPONENT_CATEGORIES.find((category) => category.name === activeCategory) ??
    COMPONENT_CATEGORIES[0]!;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source = q
      ? COMPONENT_CATEGORIES.flatMap((category) =>
          category.slugs.map((slug) => ({
            slug,
            name: SLUG_TO_NAME[slug] ?? slug,
            category: category.name,
          })),
        )
      : active.slugs.map((slug) => ({
          slug,
          name: SLUG_TO_NAME[slug] ?? slug,
          category: active.name,
        }));

    if (!q) return source;
    return source.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.slug.includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (DESCRIPTION_BY_SLUG[item.slug] ?? "").toLowerCase().includes(q),
    );
  }, [active, query]);

  const searching = Boolean(query.trim());

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.stats} aria-label="Catalog summary">
          <span className={styles.stat}>
            <strong>
              <AnimatedNumber value={totalCount} />
            </strong>{" "}
            components
          </span>
          <span className={styles.statDivider} aria-hidden="true" />
          <span className={styles.stat}>
            <strong>
              <AnimatedNumber value={COMPONENT_CATEGORIES.length} />
            </strong>{" "}
            categories
          </span>
          {searching ? (
            <>
              <span className={styles.statDivider} aria-hidden="true" />
              <span className={styles.stat}>
                <strong>
                  <AnimatedNumber value={filtered.length} />
                </strong>{" "}
                matches
              </span>
            </>
          ) : null}
        </div>

        <label className={styles.search}>
          <span className={styles.srOnly}>Search components</span>
          <SearchIcon />
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search Button, DataGrid, Menu…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          {query ? (
            <button
              type="button"
              className={styles.clearSearch}
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <Icon name="x" size="sm" />
            </button>
          ) : null}
        </label>
      </div>

      {!searching ? (
        <div className={styles.tabs} role="tablist" aria-label="Component categories">
          {COMPONENT_CATEGORIES.map((category) => {
            const selected = category.name === activeCategory;
            const icon = CATEGORY_ICONS[category.name] ?? "grid";
            return (
              <button
                key={category.name}
                type="button"
                role="tab"
                aria-selected={selected}
                className={selected ? styles.tabActive : styles.tab}
                onClick={(event) => {
                  setActiveCategory(category.name);
                  if (window.matchMedia("(min-width: 721px)").matches) {
                    event.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                      block: "nearest",
                    });
                  }
                }}
              >
                <Icon name={icon} size="sm" />
                <span className={styles.tabText}>
                  <span className={styles.tabLabel}>{category.name}</span>
                  <span className={styles.tabCount}>{category.slugs.length}</span>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      <div className={styles.panel} role={searching ? undefined : "tabpanel"}>
        <div className={styles.panelHead}>
          <div>
            <h3 className={styles.panelTitle}>{searching ? "Search results" : active.name}</h3>
            <p className={styles.panelLead}>
              {searching
                ? filtered.length
                  ? `Scroll the carousel — ${filtered.length} match${filtered.length === 1 ? "" : "es"}.`
                  : `Nothing matched “${query.trim()}”.`
                : active.description}
            </p>
          </div>
          <Link to="/docs/components/button" className={styles.browseLink}>
            Open docs →
          </Link>
        </div>

        {filtered.length ? (
          <CardCarousel
            key={`${activeCategory}-${query}`}
            label={searching ? "Component search results" : `${active.name} components`}
          >
            {filtered.map((item) => {
              const icon = CATEGORY_ICONS[item.category] ?? "grid";
              return (
                <CardCarouselItem key={`${item.category}-${item.slug}`}>
                  <Link className={carouselStyles.card} to={`/docs/components/${item.slug}`}>
                    <span className={carouselStyles.cardTop}>
                      <span className={carouselStyles.cardIcon} aria-hidden="true">
                        <Icon name={icon} size="sm" />
                      </span>
                      {searching ? (
                        <span className={carouselStyles.cardTag}>{item.category}</span>
                      ) : (
                        <span className={carouselStyles.cardTag}>{item.slug}</span>
                      )}
                    </span>
                    <h4 className={carouselStyles.cardTitle}>{item.name}</h4>
                    <p className={carouselStyles.cardMuted}>{shortDescription(item.slug)}</p>
                    <span className={carouselStyles.cardFooter}>
                      <span className={carouselStyles.cardMeta}>Component</span>
                      <span className={carouselStyles.cardArrow} aria-hidden="true">
                        →
                      </span>
                    </span>
                  </Link>
                </CardCarouselItem>
              );
            })}
          </CardCarousel>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No matches</p>
            <p className={styles.emptyLead}>Try another name, or clear search to browse by category.</p>
            <button type="button" className={styles.emptyAction} onClick={() => setQuery("")}>
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
