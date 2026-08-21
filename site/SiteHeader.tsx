import { Link, NavLink } from "react-router-dom";
import { Button } from "axiom-ui";
import { BrandMark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";
import { useSiteTheme } from "./useSiteTheme";
import styles from "./SiteHeader.module.css";

const NAV = [
  { label: "Components", to: "/docs/getting-started" },
  { label: "Templates", to: "/docs/templates" },
  { label: "Live demos", to: "/templates" },
] as const;

export function SiteHeader() {
  const { theme, setTheme } = useSiteTheme();

  return (
    <header className={styles.siteHeader}>
      <div className={styles.inner}>
        <Link className={styles.logo} to="/">
          <BrandMark size={26} />
          AxiomUI
        </Link>

        <nav className={styles.nav} aria-label="Site">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/templates"}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.navLinkActive : ""].filter(Boolean).join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle theme={theme} onThemeChange={setTheme} />
          <Link to="/docs/getting-started">
            <Button size="sm" variant="primary">
              Docs
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
