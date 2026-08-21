import { lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../src/components/Button";
import { BrandMark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";
import { LandingHashLink } from "./landingHash";
import { LANDING_HEADER_LINKS } from "./landingNavData";
import { useSiteTheme } from "./useSiteTheme";
import styles from "./LandingPage.module.css";

const LandingMenu = lazy(() =>
  import("./LandingMenu").then((m) => ({ default: m.LandingMenu })),
);
const LandingHeaderSearch = lazy(() =>
  import("./LandingHeaderSearch").then((m) => ({ default: m.LandingHeaderSearch })),
);

type LandingSiteHeaderProps = {
  /** Kept for callers; header paints immediately (no entrance fade). */
  animated?: boolean;
};

export function LandingSiteHeader({ animated: _animated = false }: LandingSiteHeaderProps) {
  const { theme, setTheme } = useSiteTheme();
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.logo} to="/">
          <BrandMark size={28} />
          AxiomUI
        </Link>

        <nav className={styles.headerNav} aria-label="Primary">
          {LANDING_HEADER_LINKS.map((item) => {
            const className =
              item.href === "/about" && pathname === "/about"
                ? `${styles.headerNavLink} ${styles.headerNavLinkActive}`
                : styles.headerNavLink;
            if (item.href.startsWith("#")) {
              return (
                <LandingHashLink key={item.href} hash={item.href} className={className}>
                  {item.label}
                </LandingHashLink>
              );
            }
            return (
              <Link key={item.href} className={className} to={item.href}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Suspense fallback={null}>
          <LandingMenu />
        </Suspense>

        <Suspense fallback={null}>
          <LandingHeaderSearch />
        </Suspense>

        <div className={styles.headerActions}>
          <ThemeToggle theme={theme} onThemeChange={setTheme} />
          <Link to="/docs">
            <Button size="sm" className={`${styles.btnPrimary} ${styles.btnHeader}`}>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
