import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../src";
import { AnimatedNumber } from "./AnimatedNumber";
import { CardCarousel, CardCarouselItem } from "./CardCarousel";
import carouselStyles from "./CardCarousel.module.css";
import { PAGE_TEMPLATES } from "./templates/templateMeta";
import styles from "./PageTemplatesSection.module.css";

const USE_CASES = ["All", ...Array.from(new Set(PAGE_TEMPLATES.map((t) => t.useCase)))] as const;

/**
 * Template catalog — horizontal card carousel. Header lives on LandingHeroSection.
 */
export function PageTemplatesSection() {
  const [filter, setFilter] = useState<(typeof USE_CASES)[number]>("All");

  const filtered = useMemo(
    () => (filter === "All" ? PAGE_TEMPLATES : PAGE_TEMPLATES.filter((t) => t.useCase === filter)),
    [filter],
  );

  const useCaseCount = USE_CASES.length - 1;

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.stats} aria-label="Template catalog stats">
          <div className={styles.stat}>
            <strong>
              <AnimatedNumber value={PAGE_TEMPLATES.length} />
            </strong>
            <span>templates</span>
          </div>
          <div className={styles.stat}>
            <strong>
              <AnimatedNumber value={useCaseCount} />
            </strong>
            <span>use cases</span>
          </div>
          <div className={styles.stat}>
            <strong>
              <AnimatedNumber value={filtered.length} />
            </strong>
            <span>shown</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/templates" className={styles.primaryLink}>
            Browse all
          </Link>
          <Link to="/docs/templates" className={styles.ghostLink}>
            Snippets
            <Icon name="chevron-right" size="sm" />
          </Link>
        </div>
      </div>

      <div className={styles.filters} role="tablist" aria-label="Filter templates by use case">
        {USE_CASES.map((useCase) => {
          const active = filter === useCase;
          return (
            <button
              key={useCase}
              type="button"
              role="tab"
              aria-selected={active}
              className={active ? styles.filterActive : styles.filter}
              onClick={() => setFilter(useCase)}
            >
              {useCase}
            </button>
          );
        })}
      </div>

      <CardCarousel key={filter} label={`Page templates${filter !== "All" ? ` — ${filter}` : ""}`}>
        {filtered.map((template) => (
          <CardCarouselItem key={template.slug}>
            <Link className={carouselStyles.card} to={`/templates/${template.slug}`}>
              <span className={carouselStyles.cardSketch} aria-hidden="true">
                <span className={carouselStyles.sketchRail} />
                <span className={carouselStyles.sketchStack}>
                  <span />
                  <span />
                  <span />
                </span>
              </span>
              <span className={carouselStyles.cardTop}>
                <span className={carouselStyles.cardTag}>{template.useCase}</span>
              </span>
              <h4 className={carouselStyles.cardTitle}>{template.title}</h4>
              <p className={carouselStyles.cardMuted}>{template.description}</p>
              <span className={carouselStyles.cardFooter}>
                <span className={carouselStyles.cardMeta}>{template.layout}</span>
                <span className={carouselStyles.cardArrow} aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          </CardCarouselItem>
        ))}
      </CardCarousel>
    </div>
  );
}
