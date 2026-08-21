import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, Icon } from "axiom-ui";
import { PAGE_TEMPLATES } from "./templateMeta";
import styles from "./templates.module.css";

function currentSlug(pathname: string): string | null {
  const match = pathname.match(/^\/templates\/([^/]+)\/?$/);
  return match?.[1] ?? null;
}

/** Compact breadcrumb + next/prev controls for template demos — no second site nav bar. */
export function TemplateDemoNav() {
  const { pathname } = useLocation();
  const slug = currentSlug(pathname);

  if (!slug) return null;

  const index = PAGE_TEMPLATES.findIndex((template) => template.slug === slug);
  const current = PAGE_TEMPLATES[index];
  if (!current) return null;

  const previous = index > 0 ? PAGE_TEMPLATES[index - 1] : null;
  const next = index < PAGE_TEMPLATES.length - 1 ? PAGE_TEMPLATES[index + 1] : null;

  return (
    <div className={styles.demoToolbar}>
      <Breadcrumb
        className={styles.demoBreadcrumb}
        items={[
          { label: "Templates", href: "/templates" },
          { label: current.title, current: true },
        ]}
      />

      <div className={styles.demoToolbarActions}>
        {previous ? (
          <Link
            className={`${styles.demoToolbarButton} ${styles.demoToolbarButtonGhost}`}
            to={`/templates/${previous.slug}`}
            aria-label={`Previous template: ${previous.title}`}
          >
            <Icon name="chevron-left" size="sm" />
            <span className={styles.demoToolbarLabel}>{previous.title}</span>
          </Link>
        ) : null}

        {next ? (
          <Link className={`${styles.demoToolbarButton} ${styles.demoToolbarButtonPrimary}`} to={`/templates/${next.slug}`}>
            <span className={styles.demoToolbarLabel}>Next: {next.title}</span>
            <Icon name="chevron-right" size="sm" />
          </Link>
        ) : (
          <Link className={`${styles.demoToolbarButton} ${styles.demoToolbarButtonGhost}`} to="/templates">
            All templates
          </Link>
        )}
      </div>
    </div>
  );
}
