import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SITE_AUTHOR } from "./author";
import { BrandMark } from "./BrandMark";
import { SectionContextMenu } from "./SectionContextMenu";
import type { LandingBand } from "./landingBandTypes";
import { LandingHashLink } from "./landingHash";
import { LANDING_PAGE_SECTIONS } from "./landingNavData";
import { SECTION_LAYOUTS } from "./sectionLayouts";
import styles from "./LandingFooter.module.css";

const FOOTER_LINKS = {
  product: [
    ...LANDING_PAGE_SECTIONS.map((item) => ({ label: item.label, to: item.href })),
    { label: "Templates", to: "/templates" },
  ],
  docs: [
    { label: "Overview", to: "/docs/getting-started" },
    { label: "Styling", to: "/docs/styling" },
    { label: "Theme", to: "/docs/theme" },
    { label: "Typography", to: "/docs/typography" },
    { label: "Tokens", to: "/docs/tokens" },
    { label: "Roadmap", to: "/docs/roadmap" },
    { label: "Releases", to: "/docs/releases" },
  ],
  company: [
    { label: "About", to: "/about" },
    { label: "GitHub", to: SITE_AUTHOR.github, external: true },
    { label: "LinkedIn", to: SITE_AUTHOR.linkedIn, external: true },
    { label: "Buy me a coffee", to: SITE_AUTHOR.buyMeACoffee, external: true },
    { label: "Email", to: `mailto:${SITE_AUTHOR.email}`, external: true },
  ],
} as const;

function FooterLink({
  to,
  external,
  children,
}: {
  to: string;
  external?: boolean;
  children: ReactNode;
}) {
  if (external || to.startsWith("mailto:") || to.startsWith("http")) {
    return (
      <a className={styles.link} href={to} target={to.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
        {children}
      </a>
    );
  }

  if (to.startsWith("#")) {
    return (
      <LandingHashLink hash={to} className={styles.link}>
        {children}
      </LandingHashLink>
    );
  }

  return (
    <Link className={styles.link} to={to}>
      {children}
    </Link>
  );
}

export function LandingFooter({ band = "white" }: { band?: LandingBand }) {
  return (
    <footer className={styles.footer} data-band={band}>
      <SectionContextMenu layoutCode={SECTION_LAYOUTS.footer} />
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Link className={styles.brand} to="/">
              <BrandMark size={42} className={styles.brandMark} />
              <span className={styles.brandName}>AxiomUI</span>
            </Link>
            <p className={styles.tagline}>
              Accessible React components you own — typed, tree-shakable, and ready to ship.
            </p>
            <Link className={styles.cta} to="/docs/getting-started">
              Read the docs
            </Link>
          </div>

          <nav className={styles.col} aria-label="Product">
            <h2 className={styles.colTitle}>Product</h2>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.product.map((item) => (
                <li key={item.label}>
                  <FooterLink to={item.to}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Documentation">
            <h2 className={styles.colTitle}>Docs</h2>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.docs.map((item) => (
                <li key={item.label}>
                  <FooterLink to={item.to}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Connect">
            <h2 className={styles.colTitle}>Connect</h2>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.company.map((item) => (
                <li key={item.label}>
                  <FooterLink to={item.to} external={"external" in item ? item.external : undefined}>
                    {item.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {SITE_AUTHOR.name}. MIT Licensed.
          </p>
          <p className={styles.credit}>
            Built with craft · Inspired by{" "}
            <a href="https://ui.shadcn.com/" target="_blank" rel="noreferrer">
              shadcn/ui
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
