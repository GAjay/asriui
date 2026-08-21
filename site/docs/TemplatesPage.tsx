import { Link, useNavigate } from "react-router-dom";
import { Badge, Breadcrumb, Button } from "axiom-ui";
import { DocPageShell } from "./DocPageShell";
import { ThemeDocPreview } from "./ThemeDocPreview";
import { TEMPLATE_SNIPPETS } from "./templateSnippets";
import styles from "./GettingStartedPage.module.css";

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "theming", label: "Theming" },
  { id: "catalog", label: "All templates" },
];

export function TemplatesPage() {
  const navigate = useNavigate();

  return (
    <DocPageShell toc={TOC}>
      <article className={styles.page}>
        <Breadcrumb
          className={styles.breadcrumb}
          showBack
          onBack={() => navigate("/docs/getting-started")}
          items={[
            { label: "Home", href: "/" },
            { label: "Docs", href: "/docs/getting-started" },
            { label: "Page templates", current: true },
          ]}
        />

        <header className={styles.header} id="overview">
          <p className={styles.kicker}>Recipes</p>
          <h1 className={styles.title}>Page templates</h1>
          <p className={styles.lead}>
            Full-page layouts you can copy into your app — marketing, auth, admin, ecommerce (shop → cart → checkout),
            settings, inbox shells, and builder demos built with PageLayout, SideNav, Form, DataGrid, and ListItem.
          </p>
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>Copy-paste ready</span>
            <span className={styles.metaBadge}>Live demos</span>
            <span className={styles.metaBadge}>MIT licensed</span>
          </div>
        </header>

        <section className={styles.section}>
          <p className={styles.prose}>
            Each template has its own doc page with a copy-ready snippet. Open a live demo to preview the layout, or
            jump straight to the source from the catalog below.
          </p>
          <Link to="/templates">
            <Button variant="outline">Browse live template demos</Button>
          </Link>
        </section>

        <section id="theming" className={styles.section}>
          <h2 className={styles.sectionTitle}>Theming templates</h2>
          <p className={styles.prose}>
            Page templates respect the same <code>data-theme</code> attribute as the rest of AxiomUI. Toggle light or
            dark from the docs sidebar, live demo header, or your own app shell — layouts use semantic tokens so
            borders, surfaces, and text adapt automatically.
          </p>
          <ThemeDocPreview />
        </section>

        <section id="catalog" className={styles.section}>
          <h2 className={styles.sectionTitle}>All templates</h2>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gap: "0.75rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
            }}
          >
            {TEMPLATE_SNIPPETS.map((template) => (
              <li
                key={template.slug}
                style={{
                  border: "1px solid var(--axiom-color-border)",
                  borderRadius: "var(--axiom-radius-md)",
                  padding: "1rem",
                }}
              >
                <Link
                  to={`/docs/templates/${template.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <strong style={{ display: "block", marginBottom: "0.35rem" }}>{template.title}</strong>
                  <p style={{ margin: "0 0 0.65rem", fontSize: "0.875rem", color: "var(--axiom-color-muted-foreground)" }}>
                    {template.description}
                  </p>
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                    <Badge variant="outline">{template.layout}</Badge>
                    <Badge variant="secondary">{template.filename}</Badge>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </DocPageShell>
  );
}
