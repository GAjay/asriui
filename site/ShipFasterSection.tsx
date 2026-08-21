import { lazy, Suspense } from "react";
import { LandingSectionTabs } from "./LandingSectionTabs";
import styles from "./ShipFasterSection.module.css";

const AuthShowcase = lazy(() =>
  import("./AuthFeaturesSection").then((m) => ({ default: m.AuthShowcase })),
);
const PwaConfigSection = lazy(() =>
  import("./PwaConfigSection").then((m) => ({ default: m.PwaConfigSection })),
);

function TabFallback() {
  return <div className={styles.fallback} aria-hidden="true" />;
}

export function ShipFasterSection() {
  return (
    <LandingSectionTabs
      ariaLabel="Ship faster options"
      defaultValue="auth"
      items={[
        {
          value: "auth",
          label: "Authentication",
          panel: (
            <Suspense fallback={<TabFallback />}>
              <AuthShowcase embedded />
            </Suspense>
          ),
        },
        {
          value: "pwa",
          label: "Progressive web app",
          panel: (
            <Suspense fallback={<TabFallback />}>
              <PwaConfigSection embedded />
            </Suspense>
          ),
        },
      ]}
    />
  );
}
