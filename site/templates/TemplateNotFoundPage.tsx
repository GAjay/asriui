import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Badge, Breadcrumb, Button, PageLayout, Typography } from "axiom-ui";
import { PAGE_TEMPLATES } from "./templateMeta";
import styles from "./TemplateNotFoundPage.module.css";

const SUGGESTIONS = ["dashboard", "login", "pricing", "shop", "inbox", "watch-landing"] as const;

export function TemplateNotFoundPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const missingSlug = pathname.replace(/^\/templates\/?/, "").split("/")[0] || "unknown";

  const picks = PAGE_TEMPLATES.filter((template) =>
    SUGGESTIONS.includes(template.slug as (typeof SUGGESTIONS)[number]),
  ).slice(0, 4);

  return (
    <PageLayout variant="centered" contentMaxWidth="52rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Breadcrumb
            className={styles.breadcrumb}
            showBack
            onBack={() => navigate("/templates")}
            items={[
              { label: "Templates", href: "/templates" },
              { label: "404", current: true },
            ]}
          />

          <section className={styles.hero} aria-labelledby="template-404-title">
            <div className={styles.artboard} aria-hidden="true">
              <motion.div
                className={styles.wireSidebar}
                animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className={styles.wireMain}>
                <motion.div
                  className={styles.wireHeader}
                  animate={reducedMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className={styles.wireGrid}>
                  <span />
                  <span />
                  <span className={styles.wireMissing} />
                </div>
              </div>
              <div className={styles.code404}>404</div>
            </div>

            <Badge variant="outline">Template missing</Badge>
            <h1 id="template-404-title" className={styles.title}>
              This page layout was never shipped
            </h1>
            <p className={styles.lead}>
              <code className={styles.path}>/templates/{missingSlug}</code> is not in the catalog.
              Pick a live demo below or copy a production layout from the docs.
            </p>

            <div className={styles.actions}>
              <Button onClick={() => navigate("/templates")}>Browse all templates</Button>
              <Button variant="outline" onClick={() => navigate("/docs/templates")}>
                Copy source
              </Button>
            </div>
          </section>

          <section className={styles.suggestions} aria-label="Suggested templates">
            <Typography variant="h3" className={styles.suggestionsTitle}>
              Try one of these instead
            </Typography>
            <div className={styles.suggestionGrid}>
              {picks.map((template) => (
                <Link key={template.slug} className={styles.suggestionCard} to={`/templates/${template.slug}`}>
                  <span className={styles.suggestionTag}>
                    {template.useCase} · {template.layout}
                  </span>
                  <strong>{template.title}</strong>
                  <span>{template.description}</span>
                </Link>
              ))}
            </div>
          </section>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
