import { lazy, Suspense } from "react";
import { LandingSectionTabs } from "./LandingSectionTabs";
import styles from "./ExploreSection.module.css";

const ComponentCatalog = lazy(() =>
  import("./ComponentCatalog").then((m) => ({ default: m.ComponentCatalog })),
);
const PageTemplatesSection = lazy(() =>
  import("./PageTemplatesSection").then((m) => ({ default: m.PageTemplatesSection })),
);

function TabFallback() {
  return <div className={styles.fallback} aria-hidden="true" />;
}

export function ExploreSection() {
  return (
    <LandingSectionTabs
      ariaLabel="Explore catalog options"
      defaultValue="components"
      items={[
        {
          value: "components",
          label: "Component catalog",
          panel: (
            <Suspense fallback={<TabFallback />}>
              <ComponentCatalog />
            </Suspense>
          ),
        },
        {
          value: "templates",
          label: "Page templates",
          panel: (
            <Suspense fallback={<TabFallback />}>
              <PageTemplatesSection />
            </Suspense>
          ),
        },
      ]}
    />
  );
}
