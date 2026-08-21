import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Badge, Breadcrumb, Button, CodeBlock } from "asriui";
import { DocPageShell } from "./DocPageShell";
import { getTemplateSnippet } from "./templateSnippets";
import styles from "./GettingStartedPage.module.css";

export function TemplateDocPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const template = slug ? getTemplateSnippet(slug) : undefined;

  if (!template) {
    return <Navigate to="/docs/templates" replace />;
  }

  const toc = [
    { id: "overview", label: "Overview" },
    { id: "source", label: "Source code" },
  ];

  return (
    <DocPageShell toc={toc}>
      <article className={styles.page}>
        <Breadcrumb
          className={styles.breadcrumb}
          showBack
          onBack={() => navigate("/docs/templates")}
          items={[
            { label: "Home", href: "/" },
            { label: "Docs", href: "/docs/getting-started" },
            { label: "Templates", href: "/docs/templates" },
            { label: template.title, current: true },
          ]}
        />

        <header className={styles.header} id="overview">
          <p className={styles.kicker}>Templates / {template.title}</p>
          <h1 className={styles.title}>{template.title}</h1>
          <p className={styles.lead}>{template.description}</p>
          <div className={styles.metaRow}>
            <Badge variant="outline">{template.layout} layout</Badge>
            <Badge variant="secondary">{template.filename}</Badge>
            <span className={styles.metaBadge}>Copy-paste ready</span>
          </div>
        </header>

        <section className={styles.section}>
          <p className={styles.prose}>
            Preview the full layout in the live demo, then copy the snippet below into your project. Complete styles
            and assets live in <code>site/templates/{template.filename}</code> in the repository.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link to={template.demoPath}>
              <Button>Open live demo</Button>
            </Link>
            <Link to="/templates">
              <Button variant="outline">Browse all demos</Button>
            </Link>
          </div>
        </section>

        <section id="source" className={styles.section}>
          <h2 className={styles.sectionTitle}>Source code</h2>
          <CodeBlock code={template.code} language="tsx" showCopy filename={template.filename} />
        </section>
      </article>
    </DocPageShell>
  );
}
