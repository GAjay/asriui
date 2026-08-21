import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, PageLayout, Typography } from "axiom-ui";
import { PAGE_TEMPLATES } from "./templateMeta";
import styles from "./templates.module.css";

export function TemplatesIndex() {
  const navigate = useNavigate();

  return (
    <PageLayout variant="centered" contentMaxWidth="56rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Breadcrumb
            className={styles.templateBreadcrumb}
            showBack
            onBack={() => navigate("/docs/getting-started")}
            items={[
              { label: "Home", href: "/" },
              { label: "Components", href: "/docs/getting-started" },
              { label: "Live demos", current: true },
            ]}
          />

          <header className={styles.hero}>
            <Typography variant="muted">Page templates</Typography>
            <h1 className={styles.heroTitle}>Copy-ready layouts</h1>
            <p className={styles.heroLead}>
              Marketing, auth, admin, ecommerce, account, and productivity pages — built with PageLayout, SideNav,
              Form, DataGrid, ListItem, and more. Open a live demo or copy the source from the docs.
            </p>
          </header>

          <div className={styles.templateGrid}>
            {PAGE_TEMPLATES.map((template) => (
              <Link key={template.slug} className={styles.templateCard} to={`/templates/${template.slug}`}>
                <span className={styles.templateTag}>
                  {template.useCase} · {template.layout}
                </span>
                <h2>{template.title}</h2>
                <p>{template.description}</p>
              </Link>
            ))}
          </div>

          <p className={styles.prose} style={{ marginTop: "2rem" }}>
            Need the raw source?{" "}
            <Link to="/docs/templates" style={{ color: "var(--lp-primary)" }}>
              View copy-paste snippets in the docs
            </Link>
            .
          </p>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
